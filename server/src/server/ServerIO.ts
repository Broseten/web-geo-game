import { Server as HttpServer } from 'http';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';
import { RoomManager } from './RoomManager';
import { MapHandler } from './handlers/MapHandler';

export class ServerIO {
   public static instance: ServerIO;
   public ioServer: Server;
   public allUsers: { [uid: string]: string };
   public allSockets: string[];
   private roomManager: RoomManager;

   constructor(httpServer: HttpServer) {
      ServerIO.instance = this;
      this.allUsers = {};
      this.allSockets = [];
      this.ioServer = new Server(httpServer, {
         serveClient: false,
         pingInterval: 10000,
         pingTimeout: 5000,
         cookie: false,
         cors: { origin: '*' }
      });

      this.roomManager = new RoomManager(this.ioServer);
      this.ioServer.on('connect', this.OnClientConnected);

      console.log("Socket IO started");
   }

   OnClientConnected = (clientSocket: Socket) => {
      console.info('Connection established with ' + clientSocket.id);
      // just a placeholder now
      this.allSockets.push(clientSocket.id);

      new MapHandler(this.ioServer).startListeners(clientSocket);

      // TODO let the user to specify room parameters
      clientSocket.on('create-room', () => {
         // TODO
      });

      // TODO let the user to select which room to join
      clientSocket.on('join-room', (callback: (uid: string) => void) => {
         // TODO move the reconnection functionality somewhere?
         //      -- just a separate handshake before joining the room? -> then send list of rooms
         let uid = this.allUsers[clientSocket.id];
         if (uid) {
            // reconnected
            return;
         }
         uid = v4();
         this.allUsers[uid] = clientSocket.id;
         // will get called back on the client to notify about its uid
         callback(uid);



         const roomId = this.roomManager.assignPlayerToRoom(clientSocket);
         clientSocket.emit('room-assigned', roomId);
      });

      clientSocket.on('leave-room', () => {
         // TODO?
      });

      clientSocket.on('progress-game', () => {
         // get the room the player is in
         const roomId = this.roomManager.getRoomIdBySocket(clientSocket);
         if (roomId) {
            const room = this.roomManager.getRoom(roomId);
            // TODO first call of this will start the game: from lobby to the game-inprogress screen
            //                (lobby -> in progress game state)
            //      then it will progress each of the rounds through its states
            //                (not started -> in progress -> finished round state)
            //      then it will end the game -- move to the end screen
            //                (in-progress -> finished game state)
            if (room) room.progressGame();
         }
      });

      clientSocket.on('disconnect', () => {
         const uid = this.GetUidFromSocketID(clientSocket.id);
         if (uid) {
            delete this.allUsers[uid];
            this.roomManager.handleDisconnect(clientSocket);
         }
      });
   };

   GetUidFromSocketID = (id: string) => Object.keys(this.allUsers).find((uid) => this.allUsers[uid] === id);
}

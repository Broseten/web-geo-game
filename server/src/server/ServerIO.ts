import { Server as HttpServer } from 'http';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';
import { RoomManager } from './RoomManager';
import { MapHandler } from './handlers/MapHandler';
import { RoomInfo, RoomJoined, RoomPlayersInfo } from 'data/DataTypes';

export class ServerIO {
   public static instance: ServerIO;
   public ioServer: Server;
   // to keep track of users that were previously in a room, to be able to reconnect them
   public allConnectedUsers: { [uid: string]: string };
   public roomManager: RoomManager;

   constructor(httpServer: HttpServer) {
      ServerIO.instance = this;
      this.allConnectedUsers = {};
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

      // TODO move this to a game
      new MapHandler(this.ioServer).startListeners(clientSocket);

      // TODO remember the id in the future
      // // if the user was already on the server, reconnect
      // let uid = this.allConnectedUsers[clientSocket.id];
      // if (uid) {
      //    // reconnected
      //    // TODO notify the client about the room etc.
      //    return;
      // }
      // uid = v4();
      // this.allConnectedUsers[uid] = clientSocket.id;


      // TODO let the user to specify other room parameters
      clientSocket.on('create-room', (data: RoomJoined) => {
         const roomId = this.roomManager.createRoom(data, clientSocket);
         if (roomId) clientSocket.emit('room-created', roomId);
         else clientSocket.emit('room-exists');
      });

      clientSocket.on('join-room', (roomID: string) => {
         const gameRoom = this.roomManager.joinRoom(clientSocket, roomID);
         if (!gameRoom) {
            clientSocket.emit('room-not-found');
         } else {
            const roomInfo: RoomInfo = {
               id: gameRoom.id,
               data: gameRoom.roomInitData
            }
            clientSocket.emit('room-joined', roomInfo);
         }
      });

      clientSocket.on('request-room-players-info', (roomID) => {
         const room = this.roomManager.getRoom(roomID);
         if (room) {
            const roomUpdate: RoomPlayersInfo = {
               facilitatorID: room.getFacilitatorID(),
               players: room.getPlayers()
            };
            clientSocket.emit('room-players-info', roomUpdate);
         } else {
            clientSocket.emit('room-not-found');
         }
      });

      clientSocket.on('request-room-list', () => {
         clientSocket.emit('room-list', this.roomManager.getRoomList());
      });

      clientSocket.on('leave-room', () => {
         // TODO?
         // TODO update all clients in the room
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
            delete this.allConnectedUsers[uid];
            this.roomManager.handleDisconnect(clientSocket);
         }
      });
   };

   GetUidFromSocketID = (id: string) => Object.keys(this.allConnectedUsers).find((uid) => this.allConnectedUsers[uid] === id);
}

import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { PlayerInfoUpdate, RoomInfo, RoomJoined, RoomPlayersInfo } from './DataTypes';
import { RoomManager } from './RoomManager';

export class ServerIO {
   public static instance: ServerIO;
   public socketServer: Server;
   public allUsers: { [uid: string]: string };
   public roomManager: RoomManager;

   constructor(httpServer: HttpServer) {
      ServerIO.instance = this;
      this.allUsers = {};
      this.socketServer = new Server(httpServer, {
         serveClient: false,
         pingInterval: 10000,
         pingTimeout: 5000,
         cookie: false,
         cors: { origin: '*' }
      });

      this.roomManager = new RoomManager(this);
      this.socketServer.on('connect', this.OnClientConnected);

      console.log("Socket IO started");
   }

   OnClientConnected = (clientSocket: Socket) => {
      console.info('Connection established with ' + clientSocket.id);

      // to be able to search for the player even when first connected
      this.allUsers[clientSocket.id] = clientSocket.id;

      clientSocket.on('reconnect', (uid: string) => {
         console.log("Reconnected: " + uid);
         // save new pointer for the player
         this.allUsers[clientSocket.id] = uid;
         clientSocket.emit('reconnected');
      });

      clientSocket.on('update-player-info', (playerInfo: PlayerInfoUpdate) => {
         const roomID = this.roomManager.getRoomIdByPlayer(playerInfo.player.id);
         const room = this.roomManager.getRoom(roomID!);
         if (!room) {
            const message = "no room found";
            console.error(message + " for player " + playerInfo.player);
            clientSocket.emit('update-player-error', message);
            return;
         }
         if (!room.updatePlayer(playerInfo.player)) {
            // should never happen since we search for the room based on the player...
            const message = "the player data is invalid (color probably taken)";
            console.error(message);
            clientSocket.emit('update-player-error', message);
         }
      });

      clientSocket.on('create-room', (data: RoomJoined) => {
         const roomId = this.roomManager.createRoom(data, clientSocket);
         if (roomId) {
            clientSocket.emit('room-created', roomId);
            // update all clients that a new room has been created
            this.socketServer.sockets.emit('room-list', this.roomManager.getRoomList());
         }
         else clientSocket.emit('room-exists');
      });

      clientSocket.on('join-room', (roomID: string) => {
         this.roomManager.joinRoom(clientSocket, roomID);
      });

      clientSocket.on('request-room-players-info', (roomID) => {
         const room = this.roomManager.getRoom(roomID);
         if (room) {
            const roomUpdate: RoomPlayersInfo = {
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
         this.roomManager.handleDisconnect(clientSocket);
         delete this.allUsers[clientSocket.id];
      });
   };

   public GetPlayerID(socketID: string): string {
      return this.allUsers[socketID];
   }
}

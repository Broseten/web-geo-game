import { Socket } from 'socket.io';
import { RoomInfo, RoomJoined } from './DataTypes';
import { GameRoom } from './GameRoom';
import { ServerIO } from './ServerIO';

export class RoomManager {
   private rooms: Map<string, GameRoom>; // Map of roomId to GameRoom
   private playerRoomMap: Map<string, string>; // Map of socketId to roomId

   constructor(private ioServer: ServerIO) {
      this.ioServer = ioServer;
      this.rooms = new Map();
      this.playerRoomMap = new Map();
   }

   private roomExists(name: string): boolean {
      return Array.from(this.rooms.values()).some(room => room.roomInitData.name === name);
   }

   public createRoom(roomData: RoomJoined, socket: Socket): string | null {
      if (this.roomExists(roomData.name)) {
         return null;
      }
      let targetRoom = new GameRoom(this.ioServer, roomData, this.ioServer.GetPlayerID(socket.id));
      this.rooms.set(targetRoom.id, targetRoom);
      console.info(`Created new room with ID: ${targetRoom.id}`);
      return targetRoom.id;
   }

   public joinRoom(clientSocket: Socket, roomID: string) {
      const targetRoom = this.rooms.get(roomID);
      const playerID = this.ioServer.GetPlayerID(clientSocket.id);

      if (!targetRoom) {
         clientSocket.emit('room-join-error', "Room not found");
         return;
      }

      if (targetRoom.isFull()) {
         console.warn(`Room ${targetRoom.id} is full. Cannot add player ${playerID}.`);
         clientSocket.emit('room-join-error', "Room full");
         return;
      }

      if (targetRoom.getPlayers().find((p) => p.id === playerID)) {
         clientSocket.emit('room-join-error', "Player already in the room");
         return;
      }

      // do not allow joining a room that has already started for player that was not in it
      if (targetRoom.hasStarted() && !targetRoom.hadPlayer(playerID)) {
         clientSocket.emit('room-join-error', "Cannot join a room that has already started");
         return;
      }

      // Add the player to the target room
      targetRoom.addPlayer(clientSocket);
      this.playerRoomMap.set(playerID, roomID);

      console.info(`Player ${playerID} joined room ${roomID}`);
      // TODO actually send all data about the room, not only the initial

      const roomInfo: RoomInfo = {
         id: targetRoom.id,
         data: targetRoom.roomInitData,
         roomState: targetRoom.getGameRoomProgress().getRoomState()
      }
      clientSocket.emit('room-joined', roomInfo);
      return targetRoom;
   }

   leaveRoom(clientSocket: Socket<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>) {
      const playerID = this.ioServer.GetPlayerID(clientSocket.id);
      const roomId = this.playerRoomMap.get(playerID);
      if (!roomId) {
         console.warn(`Player ${playerID} is not in any room.`);
         return;
      }
      const targetRoom = this.rooms.get(roomId);
      if (targetRoom?.removePlayer(playerID)) {
         clientSocket.emit('room-left');
      }
   }

   // Starts a round in the specified room
   startRoundInRoom(roomId: string) {
      const room = this.rooms.get(roomId);
      if (room) {
         room.progressGame();
      } else {
         console.warn(`Room ${roomId} not found.`);
      }
   }

   // Retrieves the room ID of a given player based on the player's socket ID
   getRoomIdByPlayer(playerID: string): string | undefined {
      return this.playerRoomMap.get(playerID);
   }

   // Retrieves the room ID of a given player based on their socket ID
   getRoomIdBySocket(clientSocket: Socket): string | undefined {
      return this.playerRoomMap.get(this.ioServer.GetPlayerID(clientSocket.id));
   }

   // Retrieves a specific GameRoom instance by its ID
   getRoom(roomId: string): GameRoom | undefined {
      return this.rooms.get(roomId);
   }

   getAvailableRoomList(playerID: string): { id: string; name: string }[] {
      return this.getRoomList().filter((room) => {
         const gameRoom = this.getRoom(room.id);
         return gameRoom && (!gameRoom.hasStarted() || gameRoom.hadPlayer(playerID));
      });
   }

   // Retrieves "tuples" with roomId and room name
   getRoomList(): { id: string; name: string }[] {
      return Array.from(this.rooms.entries()).map(([roomID, gameRoom]) => ({
         id: roomID,
         name: gameRoom.roomInitData.name
      }));
   }

   // Handles player disconnection
   handleDisconnect(clientSocket: Socket) {
      const roomId = this.playerRoomMap.get(this.ioServer.GetPlayerID(clientSocket.id));
      if (roomId) {
         const room = this.rooms.get(roomId);
         if (room) {
            room.removePlayer(this.ioServer.GetPlayerID(clientSocket.id));
            console.info(`Player ${this.ioServer.GetPlayerID(clientSocket.id)} removed from room ${roomId}`);

            // Clean up empty room
            if (room.isEmpty()) {
               this.rooms.delete(roomId);
               console.info(`Room ${roomId} is empty and has been deleted.`);
            }
         }
         this.playerRoomMap.delete(this.ioServer.GetPlayerID(clientSocket.id));
      }
   }
}

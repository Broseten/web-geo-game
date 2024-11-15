import { Server, Socket } from 'socket.io';
import { GameRoom } from './GameRoom';
import { RoomJoined } from 'data/DataTypes';

export class RoomManager {
   private ioServer: Server;
   private rooms: Map<string, GameRoom>; // Map of roomId to GameRoom
   private playerRoomMap: Map<string, string>; // Map of socketId to roomId

   constructor(ioServer: Server) {
      this.ioServer = ioServer;
      this.rooms = new Map();
      this.playerRoomMap = new Map();
   }

   private roomExists(name: string): boolean {
      return Array.from(this.rooms.values()).some(room => room.roomInitData.name === name);
   }

   // TODO check if room with the same name exists
   public createRoom(roomData: RoomJoined, socket: Socket): string | null {
      if (this.roomExists(roomData.name)) {
         return null;
      }
      // TODO let users create a room and assign them as a facilitator
      let targetRoom = new GameRoom(this.ioServer, roomData, socket);
      this.rooms.set(targetRoom.id, targetRoom);
      console.info(`Created new room with ID: ${targetRoom.id}`);
      // TODO notify all clients (that are in the lobby?) that a new room was created to refresh
      return targetRoom.id;
   }

   public joinRoom(clientSocket: Socket, roomID: string): GameRoom | null {
      let targetRoom = this.rooms.get(roomID);

      if (!targetRoom) {
         return null;
      }

      // Add the player to the target room
      targetRoom.addPlayer(clientSocket);
      this.playerRoomMap.set(clientSocket.id, roomID);

      console.info(`Player ${clientSocket.id} joined room ${roomID}`);
      // TODO actually send all data about the room, not only the initial
      return targetRoom;
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

   // Retrieves the room ID of a given player based on their socket ID
   getRoomIdBySocket(clientSocket: Socket): string | undefined {
      return this.playerRoomMap.get(clientSocket.id);
   }

   // Retrieves a specific GameRoom instance by its ID
   getRoom(roomId: string): GameRoom | undefined {
      return this.rooms.get(roomId);
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
      const roomId = this.playerRoomMap.get(clientSocket.id);
      if (roomId) {
         const room = this.rooms.get(roomId);
         if (room) {
            room.removePlayer(clientSocket.id);
            console.info(`Player ${clientSocket.id} removed from room ${roomId}`);

            // Clean up empty room
            if (room.isEmpty()) {
               this.rooms.delete(roomId);
               console.info(`Room ${roomId} is empty and has been deleted.`);
            }
         }
         this.playerRoomMap.delete(clientSocket.id);
      }
   }
}

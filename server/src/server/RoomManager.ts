import { Server, Socket } from 'socket.io';
import { GameRoom } from './GameRoom';

export class RoomManager {
   private ioServer: Server;
   private rooms: Map<string, GameRoom>; // Map of roomId to GameRoom
   private playerRoomMap: Map<string, string>; // Map of socketId to roomId

   constructor(ioServer: Server) {
      this.ioServer = ioServer;
      this.rooms = new Map();
      this.playerRoomMap = new Map();
   }

   // Assigns a player to a room and returns the room ID
   assignPlayerToRoom(clientSocket: Socket): string {
      // TODO let users select rooms
      // Find an available room that is not full
      let targetRoom = [...this.rooms.values()].find(room => !room.isFull());

      if (!targetRoom) {
         // Create a new room if all existing rooms are full
         targetRoom = this.createRoom();
      }

      // Add the player to the target room
      targetRoom.addPlayer(clientSocket);
      this.playerRoomMap.set(clientSocket.id, targetRoom.id);

      console.info(`Player ${clientSocket.id} assigned to room ${targetRoom.id}`);
      return targetRoom.id;
   }

   createRoom(): GameRoom {
      // TODO let users create a room and assigned them as a facilitator
      let targetRoom = new GameRoom(this.ioServer);
      this.rooms.set(targetRoom.id, targetRoom);
      console.info(`Created new room with ID: ${targetRoom.id}`);
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

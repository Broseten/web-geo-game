import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { Player } from '../data/Player';
import { RoomJoined, RoomPlayersInfo } from 'data/DataTypes';

const gameRoomMaxPlayers = 4;

export class GameRoom {
   public id: string;
   private ioServer: Server;
   private facilitator: string; //player ID of the facilitator
   private players: Map<string, Player>; // Map of playerId to Player instance
   public roomInitData: RoomJoined;
   private availableRoles: string[];
   private availableColors = ["red", "green", "blue", "yellow"];
   private availableNames = ["Alice", "Bob", "Charlie", "David"];

   // placeholders
   private totalRounds = 3;
   private currentRound = 0;

   // TODO add Map handler for each player in the room

   constructor(ioServer: Server, initialRoomData: RoomJoined, facilitator: Socket) {
      this.id = uuidv4(); // Unique ID for the room
      this.ioServer = ioServer;
      this.players = new Map();
      this.roomInitData = initialRoomData;
      this.availableRoles = initialRoomData.roles;
      this.facilitator = facilitator.id;
   }

   // Adds a player to the room
   addPlayer(clientSocket: Socket): void {
      if (this.players.size >= gameRoomMaxPlayers) {
         console.warn(`Room ${this.id} is full. Cannot add player ${clientSocket.id}.`);
         return;
      }

      const role = this.availableRoles.shift() || "explorer";
      const color = this.availableColors.shift() || "gray";
      const name = this.availableNames.shift() || `Player ${clientSocket.id}`;
      const player = new Player(clientSocket, role, color, name);

      this.players.set(clientSocket.id, player);
      clientSocket.join(this.id);
      console.info(`Player ${clientSocket.id} joined room ${this.id}`);

      // Notify all players in the room about the new player
      const roomUpdate: RoomPlayersInfo = {
         facilitatorID: this.facilitator,
         players: this.getPlayers()
      };
      this.ioServer.to(this.id).emit('room-players-info', roomUpdate);
   }

   // Removes a player from the room
   removePlayer(playerId: string): void {
      const player = this.players.get(playerId);
      if (player) {
         player.getSocket().leave(this.id);
         this.players.delete(playerId);
         console.info(`Player ${playerId} left room ${this.id}`);

         // Return attributes for reassigning in the future
         this.availableRoles.push(player.role);
         this.availableColors.push(player.color);
         this.availableNames.push(player.name);

         // Notify remaining players
         this.ioServer.to(this.id).emit('player-left', playerId);
      }
   }

   // Starts the next round in the game room
   progressGame(): void {
      // TODO just placeholder functionality now
      if (this.currentRound >= this.totalRounds) {
         this.endGame();
         return;
      }

      this.currentRound++;
      console.info(`Starting round ${this.currentRound} in room ${this.id}`);
      this.ioServer.to(this.id).emit('round-started', { round: this.currentRound });

      // Example: Handle round logic, e.g., resetting player actions, etc.
      this.handleRoundLogic();
   }

   // Game logic for each round (stub function to be customized)
   private handleRoundLogic() {
      // Implement per-round game logic here, such as timing, scoring, etc.
      console.info(`Handling logic for round ${this.currentRound} in room ${this.id}`);
      // Emit updates to all players as needed during the round
   }

   // Ends the game and notifies players
   private endGame(): void {
      console.info(`Ending game in room ${this.id}`);
      this.ioServer.to(this.id).emit('game-ended', { totalRounds: this.totalRounds });
      // Optionally, clear the room or reset data if needed for reuse
   }

   // Checks if the room has reached its maximum player capacity
   isFull(): boolean {
      return this.players.size >= gameRoomMaxPlayers;
   }

   // Checks if the room is empty
   isEmpty(): boolean {
      return this.players.size === 0;
   }

   getFacilitatorID(): string {
      return this.facilitator;
   }

   // Returns the current players in the room with their attributes
   getPlayers(): Array<{ id: string; role: string; color: string; name: string }> {
      return Array.from(this.players.values()).map(player => ({
         id: player.id,
         role: player.role,
         color: player.color,
         name: player.name,
      }));
   }
}

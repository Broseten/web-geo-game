import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { Player } from '../data/Player';

export class GameRoom {
   public id: string;
   private ioServer: Server;
   private players: Map<string, Player>; // Map of playerId to Player instance
   private maxPlayers: number;
   private currentRound: number;
   private totalRounds: number;
   private roles = ['warrior', 'mage', 'archer'];
   private colors = ['red', 'blue', 'green'];
   private names = ['Alice', 'Bob', 'Charlie'];

   // TODO add Map handler for each player in the room

   constructor(ioServer: Server, maxPlayers = 4, totalRounds = 5) {
      this.id = uuidv4(); // Unique ID for the room
      this.ioServer = ioServer;
      this.players = new Map();
      this.maxPlayers = maxPlayers;
      this.currentRound = 0;
      this.totalRounds = totalRounds;
   }

   // Adds a player to the room
   addPlayer(clientSocket: Socket): void {
      if (this.players.size >= this.maxPlayers) {
         console.warn(`Room ${this.id} is full. Cannot add player ${clientSocket.id}.`);
         return;
      }

      const role = this.roles.shift() || 'explorer';
      const color = this.colors.shift() || 'gray';
      const name = this.names.shift() || `Player ${clientSocket.id}`;
      const player = new Player(clientSocket, role, color, name);

      this.players.set(clientSocket.id, player);
      clientSocket.join(this.id);
      console.info(`Player ${clientSocket.id} joined room ${this.id}`);

      // Notify all players in the room about the new player
      this.ioServer.to(this.id).emit('player-joined', {
         id: player.data.id,
         role: player.data.role,
         color: player.data.color,
         name: player.data.name,
      });

      // Start the game if room is full
      if (this.isFull()) {
         this.progressGame();
      }
   }

   // Removes a player from the room
   removePlayer(playerId: string): void {
      const player = this.players.get(playerId);
      if (player) {
         player.getSocket().leave(this.id);
         this.players.delete(playerId);
         console.info(`Player ${playerId} left room ${this.id}`);

         // Return attributes for reassigning in the future
         this.roles.push(player.data.role);
         this.colors.push(player.data.color);
         this.names.push(player.data.name);

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
      return this.players.size >= this.maxPlayers;
   }

   // Checks if the room is empty
   isEmpty(): boolean {
      return this.players.size === 0;
   }

   // Returns the current players in the room with their attributes
   getPlayers(): Array<{ id: string; role: string; color: string; name: string }> {
      return Array.from(this.players.values()).map(player => ({
         id: player.data.id,
         role: player.data.role,
         color: player.data.color,
         name: player.data.name,
      }));
   }
}

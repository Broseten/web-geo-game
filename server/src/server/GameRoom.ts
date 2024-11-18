import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { Player } from '../data/Player';
import { PlayerData, RoomJoined, RoomPlayersInfo } from 'data/DataTypes';
import { MapHandler } from './handlers/MapHandler';

const gameRoomMaxPlayers = 4;
const availableColors = ["red", "green", "blue", "yellow"];
const defaultNames = ["Alice", "Bob", "Charlie", "David"];

export class GameRoom {
   public id: string;
   private ioServer: Server;
   private facilitator: string; //player ID of the facilitator
   private players: Map<string, Player>; // Map of playerId to Player instance
   public roomInitData: RoomJoined;
   // list of roles without the role that has been asigned to the player

   // placeholders
   private totalRounds = 3;
   private currentRound = 0;

   private mapHandler: MapHandler;

   constructor(ioServer: Server, initialRoomData: RoomJoined, facilitator: Socket) {
      this.id = uuidv4(); // Unique ID for the room
      this.ioServer = ioServer;
      this.players = new Map();
      this.roomInitData = initialRoomData;
      this.facilitator = facilitator.id;
      this.mapHandler = new MapHandler(this.ioServer, this.id);
   }

   // Adds a player to the room
   addPlayer(clientSocket: Socket): void {
      if (this.players.size >= gameRoomMaxPlayers) {
         console.warn(`Room ${this.id} is full. Cannot add player ${clientSocket.id}.`);
         return;
      }

      // if there is no role, than assign the first one (players can have same role)
      const playerRole = this.roomInitData.roles.find((role) => {
         return !Array.from(this.players.values()).some((player) => player.role === role);
      }) || this.roomInitData.roles[0];

      const color = availableColors.find((color) => {
         return !Array.from(this.players.values()).some((player) => player.color === color);
      });

      if (!color) {
         console.warn(`Cannot add player ${clientSocket.id} to room ${this.id} due to lack of colors.`);
         return;
      }

      const name = defaultNames.shift() || `Player ${clientSocket.id}`;
      const player = new Player(clientSocket, playerRole, color, name);

      this.players.set(clientSocket.id, player);
      clientSocket.join(this.id);
      console.info(`Player ${clientSocket.id} joined room ${this.id}`);

      // init the map handler
      this.mapHandler.startListeners(clientSocket);

      // Notify all players in the room about the new player
      const roomUpdate: RoomPlayersInfo = {
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
         defaultNames.push(player.name);

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
      this.ioServer.to(this.id).emit('round-info', { round: this.currentRound });

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
   getPlayers(): Array<PlayerData> {
      return Array.from(this.players.values()).map(player => ({
         id: player.id,
         role: player.role,
         color: player.color,
         name: player.name,
         isFacilitator: player.id === this.facilitator,
      }));
   }
}

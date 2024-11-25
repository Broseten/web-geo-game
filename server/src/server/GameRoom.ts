import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { global_icon_colors } from './data/data';
import { PlayerData, ProgressState, RoomJoined, RoomPlayersInfo } from './DataTypes';
import { GameRoomProgress } from './GameRoomProgress';
import { MapHandler } from './handlers/MapHandler';
import { TimerHandler } from './handlers/TimerHandler';
import { Player } from './Player';

const gameRoomMaxPlayers = 4;

export class GameRoom {
   public id: string;
   private ioServer: Server;
   private facilitator: string; //player ID of the facilitator
   private players: Map<string, Player>; // Map of playerId to Player instance
   public roomInitData: RoomJoined;
   // copy the global list of colors for this room
   private availableColors = global_icon_colors.slice();
   // TODO smarter way for assigning names
   private defaultNames = ["Alice", "Bob", "Charlie", "David"];

   private mapHandler: MapHandler;
   private timerHandler: TimerHandler;

   private gameRoomProgress: GameRoomProgress;

   constructor(ioServer: Server, initialRoomData: RoomJoined, facilitator: Socket) {
      this.id = uuidv4(); // Unique ID for the room
      this.ioServer = ioServer;
      this.players = new Map<string, Player>();
      this.roomInitData = initialRoomData;
      this.facilitator = facilitator.id;
      this.mapHandler = new MapHandler(this.ioServer, this.id);
      this.timerHandler = new TimerHandler(this.ioServer, this.id);
      this.gameRoomProgress = new GameRoomProgress(this.id, initialRoomData.totalRounds);
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
      // TODO assign no role at first and then make sure that to role is assigned when starting the game
      // const playerRole = "";

      const color = this.availableColors.find((color) => {
         return !Array.from(this.players.values()).some((player) => player.color === color);
      });

      if (!color) {
         console.warn(`Cannot add player ${clientSocket.id} to room ${this.id} due to lack of colors.`);
         return;
      }

      const name = this.defaultNames.shift() || `Player ${clientSocket.id}`;
      const player = new Player(clientSocket, playerRole, color, name);

      this.players.set(clientSocket.id, player);
      clientSocket.join(this.id);
      console.info(`Player ${clientSocket.id} joined room ${this.id}`);

      // init the map handler listeners for the new player
      this.mapHandler.startListeners(clientSocket);
      // init the room timer handler
      this.timerHandler.startListeners(clientSocket);

      // Notify all players in the room about the new player
      this.sendPlayersUpdate();
   }

   updatePlayer(playerData: PlayerData) {
      const p = this.getPlayer(playerData.id);
      if (!p) {
         return false;
      }
      if (Array.from(this.players.values()).find(p => p.color === playerData.color)) {
         return false;
      }
      // update from player data
      p.update(playerData);
      // update the player
      this.players.set(p.id, p);
      this.sendPlayersUpdate();
      return true;
   }

   // Removes a player from the room
   removePlayer(playerId: string): void {
      const player = this.getPlayer(playerId);
      if (player) {
         player.getSocket().leave(this.id);
         this.players.delete(playerId);
         console.info(`Player ${playerId} left room ${this.id}`);

         // Return attributes for reassigning in the future
         this.defaultNames.push(player.name);

         // Notify remaining players
         this.ioServer.to(this.id).emit('player-left', playerId);
      }
   }

   private getPlayer(playerId: string) {
      return this.players.get(playerId);
   }

   private sendPlayersUpdate() {
      const roomUpdate: RoomPlayersInfo = {
         players: this.getPlayers()
      };
      this.ioServer.to(this.id).emit('room-players-info', roomUpdate);
   }

   // Starts the next round in the game room and notifies all players
   progressGame(): void {
      console.log("Trying to progress game");
      if (this.gameRoomProgress?.getGameProgressState() === ProgressState.NotStarted) {
         this.gameRoomProgress.startGame();
         const roomState = this.gameRoomProgress.getRoomState();
         this.ioServer.to(this.id).emit('start-game', roomState);
         return;
      }
      if (this.gameRoomProgress.next()) {
         const roomState = this.gameRoomProgress.getRoomState();
         // notify all players in the room
         this.ioServer.to(this.id).emit('room-state', roomState);
         // if any stage is in progress (placing/voting), then start the timer
         if (roomState.round.stageProgress === ProgressState.Finished) {
            this.timerHandler.tryStopTimer();
         }
         else if (roomState.round.stageProgress === ProgressState.InProgress) {
            // when the timer finishes, progress the stage again
            console.log(`Starting timer for ${this.roomInitData.timePerRound} in room ${this.id}.`)
            this.timerHandler.startTimer(this.roomInitData.timePerRound, () => {
               this.progressGame();
            });
         }
         // if (roomState.gameState === ProgressState.Finished) {
         //    // TODO cleanup after game end?
         // }
      }
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

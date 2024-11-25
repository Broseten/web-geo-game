import { GameRoomState, ProgressState, RoundStage, RoundState } from "./DataTypes";

export class GameRoomProgress {
   private gameState: ProgressState = ProgressState.NotStarted;
   // first round 0, game ends when {roundIndex === totalRounds}
   private roundIndex = 0;
   private roundStage: RoundStage = RoundStage.Placing;
   private roundStageProgress: ProgressState = ProgressState.NotStarted;

   constructor(private roomID: string, private totalRounds: number) { }

   public startGame(): boolean {
      if (this.gameState === ProgressState.NotStarted) {
         this.gameState = ProgressState.InProgress;
         console.log(`Starting game in room ${this.roomID}`);
         return true;
      }
      console.error("Cannot start game. Game already in progress.");
      return false;
   }

   public next(): boolean {
      if (this.gameState === ProgressState.Finished) {
         console.error("Cannot progress game. Already finished.");
         return false;
      }

      if (this.gameState === ProgressState.NotStarted) {
         console.error("Cannot progress game. Not started yet.");
         return false;
      }

      // first try progressing the round stage itself
      if (this.progressRoundStage()) {
         // can progress round itself
         console.log(`Progressing round stage (${RoundStage[this.roundStage]}) in game room ${this.roomID}.`);
         return true;
      }
      // try progressing to the next stage of the round (from placing to voting)
      if (this.roundStage === RoundStage.Placing) {
         this.roundStage = RoundStage.Voting;
         // reset the stage progress
         this.roundStageProgress = ProgressState.NotStarted;
         console.log(`Progressing round from placing to voting in game room ${this.roomID}.`);
         return true;
      }

      // cannot progress further, start new round
      this.newRound();

      return true;
   }

   private newRound(): void {
      // clear the progress of the last round
      this.roundStageProgress = ProgressState.NotStarted;
      this.roundStage = RoundStage.Placing;
      // next round
      this.roundIndex++;

      // if this was the last round, then finish the game
      if (this.roundIndex >= this.totalRounds) {
         this.gameState = ProgressState.Finished;
      }
   }

   private progressRoundStage(): boolean {
      switch (this.roundStageProgress) {
         case ProgressState.NotStarted:
            this.roundStageProgress = ProgressState.InProgress;
            return true;
         case ProgressState.InProgress:
            this.roundStageProgress = ProgressState.Finished;
            return true;
         case ProgressState.Finished:
            return false;
         default:
            break;
      }
      return false;
   }

   public getGameProgressState(): ProgressState {
      return this.gameState;
   }

   // returns the serializable version of this class
   public getRoomState(): GameRoomState {
      const roundState: RoundState = {
         index: this.roundIndex,
         stage: this.roundStage,
         stageProgress: this.roundStageProgress,
      }
      const state: GameRoomState = {
         id: this.roomID,
         gameState: this.gameState,
         round: roundState,
      }
      return state;
   }
}
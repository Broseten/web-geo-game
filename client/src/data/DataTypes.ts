// TODO figure out a better way to share this between client and server?
// TODO use this generic message everywhere?
export interface Message {
   status: "ok" | "error";
   error?: any;
   data?: any;
}

export interface PlayerData {
   id: string;
   role: string;
   color: string;
   name: string;
   isFacilitator: boolean;
}

// initial data to setup the room
export interface RoomJoined {
   name: string;
   polygonLatLngs: any;
   solutionIDs: string[];
   roles: string[];
   timePerRound: number;
   initialBudget: number;
   budgetPerRound: number;
   totalRounds: number;
}

export interface RoomInfo {
   id: string;
   data: RoomJoined;
}

// sent to all users in one room when something changes
export interface RoomPlayersInfo {
   players: PlayerData[];
}

export interface PlayerInfoUpdate {
   player: PlayerData;
}

export interface Solution {
   id: string;
   name: string;
   description: string;
   image: string;
   price: number;
}

//// GAME PROGRESS TYPES

// can probably be used both for the game itself and each round stage as well
export enum ProgressState {
   NotStarted,
   InProgress,
   Finished,
}

export enum RoundStage {
   Placing,
   Voting,
}

export type Dictionary<K extends string | number | symbol, V> = {
   [Key in K]: V;
}

// the serializable version of the room progress
// send when a new player joins
export interface GameRoomState {
   id: string;
   // lobby/not started, in progress, or finished
   gameState: ProgressState;
   // which round and in which state are we in
   round: RoundState;
   // custom dictionary of player IDs to their budget
   // playerBudgets: Dictionary<string, number>;
}

export interface RoundState {
   index: number;
   stage: RoundStage;
   stageProgress: ProgressState;
}

//// MAP

export interface CustomLatLng {
   lat: number;
   lng: number;
}

export interface MapMarkerData {
   id: number;
   coordinates: CustomLatLng;
   solutionID: string;
   ownerPlayerID: string;
}

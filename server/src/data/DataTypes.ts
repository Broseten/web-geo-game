// TODO figure out a better way to share this between client and server?
// TODO use this generic message everywhere?
export interface Message {
    status: "ok" | "error",
    error?: any
    data?: any
}

export interface PlayerData {
    id: string;
    role: string;
    color: string;
    name: string;
}

// initial data to setup the room
export interface RoomJoined {
    name: string;
    polygon: any;
    solutionIDs: string[];
    roles: string[];
    timePerRound: number;
    initialBudget: number;
    budgetPerRound: number;
}

export interface RoomInfo {
    id: string,
    data: RoomJoined
}

// sent to all users in one room when something changes
export interface RoomPlayersInfo {
    facilitatorID: string;
    players: PlayerData[]
}

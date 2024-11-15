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

export interface LatLng {
    latitude: number;
    longitude: number;
}

export interface Polygon {
    points: LatLng[];
}

// initial data to setup the room
// TODO rename to: RoomCreationInfo
export interface RoomData {
    name: string;
    polygon: Polygon | undefined;
    solutionIDs: string[];
    roles: string[];
    timePerRound: number;
    initialBudget: number;
    budgetPerRound: number;
}

// sent to all users in one room when something changes
export interface RoomUpdate {
    facilitatorID: string;
    players: PlayerData[]
}

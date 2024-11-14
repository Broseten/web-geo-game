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

export interface RoomData {
    name: string;
    polygon: Polygon | undefined;
    solutionIDs: string[];
    roles: string[];
    timePerRound: number;
    initialBudget: number;
    budgetPerRound: number;
}
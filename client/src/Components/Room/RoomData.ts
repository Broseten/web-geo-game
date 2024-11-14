// TODO this is just copied form the server...we should figure out a better way... idk, no time
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
import { createContext, useContext, useState, ReactNode } from "react";
import { PlayerData, RoomJoined } from "../../data/DataTypes";

interface GameRoomContextProps {
    roomID: string | null;
    roomInfo: RoomJoined | null;
    roomStatus: RoomStatus | null;
    setRoomStatus: (roomStatus: RoomStatus) => void;
    setGameRoom: (roomID: string, roomInfo: RoomJoined) => void;
    clearGameRoom: () => void;
    players: PlayerData[];
    setPlayers: (players: PlayerData[]) => void;
    getFacilitator: () => PlayerData | undefined;
    isFacilitator: (id: string | undefined) => boolean;
}

interface RoomStatus {
    selectSolutionID: string;
}

const GameRoomContext = createContext<GameRoomContextProps | undefined>(undefined);
export const GameRoomProvider = ({ children }: { children: ReactNode }) => {
    const [roomID, setRoomID] = useState<string | null>(null);
    const [roomInfo, setRoomInfo] = useState<RoomJoined | null>(null);
    const [roomStatus, setRoomStatus] = useState<RoomStatus | null>(null);
    const [players, setPlayers] = useState<PlayerData[]>([]);

    const setGameRoom = (id: string, info: RoomJoined) => {
        setRoomID(id);
        setRoomInfo(info);
    };

    const clearGameRoom = () => {
        setRoomID(null);
        setRoomInfo(null);
    };

    const isFacilitator = (playerID: string | undefined): boolean => {
        const player = players.find((p) => p.id === playerID);
        if (!player) {
            console.error(`No such player (${playerID}) found in the current players list for Room ${roomID}.`);
            return false;
        }
        return player?.isFacilitator;
    };

    const getFacilitator = (): PlayerData | undefined => {
        const facilitator = players.find((p) => p.isFacilitator);
        if (!facilitator) {
            console.error(`No facilitator found in the current players list for Room ${roomID}.`);
        }
        return facilitator;
    };

    return (
        <GameRoomContext.Provider value={{
            roomID, roomInfo, setGameRoom, clearGameRoom,
            roomStatus, setRoomStatus,
            players, setPlayers,
            getFacilitator, isFacilitator
        }}>
            {children}
        </GameRoomContext.Provider>
    );
};


export const useGameRoom = () => {
    const context = useContext(GameRoomContext);
    if (!context) {
        throw new Error("useGameRoom must be used within a GameRoomProvider");
    }
    return context;
};

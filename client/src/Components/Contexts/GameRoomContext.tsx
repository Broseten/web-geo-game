import { createContext, useContext, useState, ReactNode } from "react";
import { RoomJoined } from "../../data/DataTypes";

interface GameRoomContextProps {
    roomID: string | null;
    roomInfo: RoomJoined | null;
    roomStatus: RoomStatus | null;
    setRoomStatus: (roomStatus: RoomStatus) => void;
    setGameRoom: (roomID: string, roomInfo: RoomJoined) => void;
    clearGameRoom: () => void;
    facilitatorID: string | null;
    setFacilitatorID: (id: string) => void;
}

interface RoomStatus {
    selectSolutionID: string;
}

const GameRoomContext = createContext<GameRoomContextProps | undefined>(undefined);

export const GameRoomProvider = ({ children }: { children: ReactNode }) => {
    const [roomID, setRoomID] = useState<string | null>(null);
    const [roomInfo, setRoomInfo] = useState<RoomJoined | null>(null);
    const [roomStatus, setRoomStatus] = useState<RoomStatus | null>(null);
    const [facilitatorID, setFacilitatorID] = useState<string | null>(null);

    const setGameRoom = (id: string, info: RoomJoined) => {
        setRoomID(id);
        setRoomInfo(info);
    };

    const clearGameRoom = () => {
        setRoomID(null);
        setRoomInfo(null);
    };

    return (
        <GameRoomContext.Provider value={{
            roomID, roomInfo, setGameRoom, clearGameRoom,
            roomStatus, setRoomStatus, facilitatorID, setFacilitatorID
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

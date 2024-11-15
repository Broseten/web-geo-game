import { createContext, useContext, useState, ReactNode } from "react";
import { RoomJoined } from "../../data/DataTypes";

interface GameRoomContextProps {
    roomID: string | null;
    roomInfo: RoomJoined | null;
    setGameRoom: (roomID: string, roomInfo: RoomJoined) => void;
    clearGameRoom: () => void;
}

const GameRoomContext = createContext<GameRoomContextProps | undefined>(undefined);

export const GameRoomProvider = ({ children }: { children: ReactNode }) => {
    const [roomID, setRoomID] = useState<string | null>(null);
    const [roomInfo, setRoomInfo] = useState<RoomJoined | null>(null);

    const setGameRoom = (id: string, info: RoomJoined) => {
        setRoomID(id);
        setRoomInfo(info);
    };

    const clearGameRoom = () => {
        setRoomID(null);
        setRoomInfo(null);
    };

    return (
        <GameRoomContext.Provider value={{ roomID, roomInfo, setGameRoom, clearGameRoom }}>
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

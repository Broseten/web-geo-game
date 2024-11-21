import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { PlayerData, PlayerInfoUpdate, RoomJoined } from "../../data/DataTypes";
import initSocket from "../../Hooks/useSocket";
import { socket } from "../../main";

interface GameRoomContextProps {
    roomID: string | null;
    roomInfo: RoomJoined | null;
    roomStatus: RoomStatus | null;
    setRoomStatus: (roomStatus: RoomStatus) => void;
    setGameRoom: (roomID: string, roomInfo: RoomJoined) => void;
    clearGameRoom: () => void;
    players: PlayerData[];
    setPlayers: (players: PlayerData[]) => void;
    getPlayerData: (playerID: string | undefined) => PlayerData | undefined;
    updatePlayer: (player: PlayerData) => void;
    getFacilitator: () => PlayerData | undefined;
    isFacilitator: (id: string | undefined) => boolean;
}

interface RoomStatus {
    selectedSolutionID: string;
}

const GameRoomContext = createContext<GameRoomContextProps | undefined>(undefined);

export const GameRoomProvider = ({ children }: { children: ReactNode }) => {
    const [roomID, setRoomID] = useState<string | null>(null);
    const [roomInfo, setRoomInfo] = useState<RoomJoined | null>(null);
    const [roomStatus, setRoomStatus] = useState<RoomStatus | null>(null);
    const [players, setPlayers] = useState<PlayerData[]>([]);
    // TODO rounds and game data

    // TODO leaving a room should reset this context! (also restarting the game)

    const setGameRoom = (id: string, info: RoomJoined) => {
        setRoomID(id);
        setRoomInfo(info);
    };

    const clearGameRoom = () => {
        setRoomID(null);
        setRoomInfo(null);
    };

    const updatePlayer = (player: PlayerData) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((p) => (p.id === player.id ? { ...p, ...player } : p))
        );
        const data: PlayerInfoUpdate = { player };
        socket.emit('update-player-info', data);
    };

    const getPlayerData = (playerID: string | undefined): PlayerData | undefined => players.find((p) => p.id === playerID)

    const isFacilitator = (playerID: string | undefined): boolean => {
        const player = players.find((p) => p.id === playerID);
        if (!player) {
            console.error(
                `No such player (${playerID}) found in the current players list for Room ${roomID}.`
            );
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

    initSocket('room-players-info', (roomUpdate: { players: PlayerData[] }) => {
        setPlayers(roomUpdate.players);
    });

    initSocket('update-player-error', (mess) => {
        console.error(mess);
    });

    return (
        <GameRoomContext.Provider
            value={{
                roomID,
                roomInfo,
                setGameRoom,
                clearGameRoom,
                roomStatus,
                setRoomStatus,
                players,
                setPlayers,
                getPlayerData,
                updatePlayer,
                getFacilitator,
                isFacilitator,
            }}
        >
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

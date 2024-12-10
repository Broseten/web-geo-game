import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { GameRoomState, PlayerData, PlayerInfoUpdate, RoomInfo, RoomJoined } from "../../data/DataTypes";
import initSocket from "../../Hooks/useSocket";
import { socket } from "../../main";
import { useScreenSelection } from "./useScreenSelection";
import { useToast } from "@chakra-ui/react";

interface GameRoomContextProps {
    roomID: string | null;
    roomInfo: RoomJoined | null;
    gameRoomState: GameRoomState | undefined;
    setGameRoomState: (gameRoomState: GameRoomState) => void;
    setGameRoom: (roomID: string, roomInfo: RoomJoined) => void;
    clearGameRoom: () => void;
    players: PlayerData[];
    setPlayers: (players: PlayerData[]) => void;
    getPlayerData: (playerID: string | undefined) => PlayerData | undefined;
    updatePlayer: (player: PlayerData) => void;
    getFacilitator: () => PlayerData | undefined;
    isFacilitator: (id: string | undefined) => boolean;
}

const GameRoomContext = createContext<GameRoomContextProps | undefined>(undefined);

// TODO leaving a room should reset this context! (also restarting the game)
// TODO clear room state on finishing a game...cleanup in general
// it should be ok to just shuffle the hiararchy and "render" this later when connecting to a room
export const GameRoomProvider = ({ children }: { children: ReactNode }) => {
    const [roomID, setRoomID] = useState<string | null>(null);
    const [roomInfo, setRoomInfo] = useState<RoomJoined | null>(null);
    const [players, setPlayers] = useState<PlayerData[]>([]);
    const [gameRoomState, setGameRoomState] = useState<GameRoomState | undefined>(undefined);
    const { setCurrentScreen } = useScreenSelection();
    const toast = useToast();

    initSocket('room-join-error', (msg: string) => {
        toast({
            title: msg,
            status: 'error',
            isClosable: true,
        });
    });

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

    initSocket('room-state', (gameRoomState: GameRoomState) => {
        setGameRoomState(gameRoomState);
    });


    // same for the facilitator (creator of the room) and for the players just directly joining
    initSocket('room-joined', (roomInfo: RoomInfo) => {
        const lastRoomID = roomInfo.id;
        sessionStorage.setItem('lastRoom', JSON.stringify({ lastRoomID }));
        setGameRoom(roomInfo.id, roomInfo.data);
        // not necessary since we use it only for the facilitator:
        //setMapPolygon(roomInfo.data.polygonLatLngs);
        setCurrentScreen('lobby');
    });

    // Memoize room-specific values to avoid rerenders
    const memoizedRoomInfo = useMemo(() => roomInfo, [roomInfo]);
    const memoizedGameRoomState = useMemo(() => gameRoomState, [gameRoomState]);
    const memoizedPlayers = useMemo(() => players, [players]);

    const value = useMemo(() => ({
        roomID,
        roomInfo: memoizedRoomInfo,
        gameRoomState: memoizedGameRoomState,
        setGameRoomState,
        setGameRoom,
        clearGameRoom,
        players: memoizedPlayers,
        setPlayers,
        getPlayerData,
        updatePlayer,
        getFacilitator,
        isFacilitator,
    }), [
        roomID,
        memoizedRoomInfo,
        memoizedGameRoomState,
        memoizedPlayers,
    ]);

    return (
        <GameRoomContext.Provider value={value}>
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

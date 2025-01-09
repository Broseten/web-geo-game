import { useToast } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { global_solutions } from "../../data/data";
import { GameRoomState, PlayerData, PlayerInfoUpdate, RoomInfo, RoomJoined, RoundStage, Solution } from "../../data/DataTypes";
import initSocket from "../../Hooks/useSocket";
import { socket } from "../../main";

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
    getTimeForCurrentRound: () => number;
    getRoomSolutions: () => Solution[];
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
    const toast = useToast();

    const getRoomSolutions = () => {
        return global_solutions.filter((s) => roomInfo?.solutionIDs.includes(s.id));
    };

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

    const getPlayerData = (playerID: string | undefined): PlayerData | undefined => players.find((p) => p.id === playerID);

    const getTimeForCurrentRound = () => {
        if (!roomInfo) return 0;
        switch (gameRoomState?.round.stage) {
            case RoundStage.Placing:
                return roomInfo.timeForPlacement;
            case RoundStage.Voting:
                return roomInfo.timeForVoting;
            default:
                break;
        }
        return 0;
    }

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
        setGameRoomState(roomInfo.roomState);
    });

    initSocket('room-left', () => {
        // TODO go back to the join screen instead of just reloading
        // reload the page on leaving a room
        location.reload();
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
        getTimeForCurrentRound,
        getRoomSolutions,
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

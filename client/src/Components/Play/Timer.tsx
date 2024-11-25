import { useEffect, useState } from "react";
import initSocket from "../../Hooks/useSocket";
import { socket } from "../../main";
import { Text } from "@chakra-ui/react";
import { useGameRoom } from "../Contexts/GameRoomContext";
import { ProgressState } from "../../data/DataTypes";

export default function Timer() {
    const [timeSeconds, setTimeSeconds] = useState(0);
    const { roomInfo, gameRoomState } = useGameRoom();

    initSocket('timer-update', (seconds: number) => setTimeSeconds(seconds));

    useEffect(() => {
        // init the state
        socket.emit('request-timer-update');
    }, []);

    return (
        <Text align="center">
            {
                gameRoomState?.round.stageProgress === ProgressState.InProgress
                    ?
                    // show the time only when counting
                    new Date(timeSeconds * 1000).toISOString().slice(14, 19)
                    :
                    new Date((roomInfo ? roomInfo.timePerRound : 0) * 1000).toISOString().slice(14, 19)
            }
        </Text>
    );
}
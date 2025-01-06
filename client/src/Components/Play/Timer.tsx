import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ProgressState } from "../../data/DataTypes";
import initSocket from "../../Hooks/useSocket";
import { socket } from "../../main";
import { useGameRoom } from "../Contexts/GameRoomContext";

export default function Timer() {
    const { getTimeForCurrentRound, gameRoomState } = useGameRoom();
    const [currentTimeSeconds, setTimeSeconds] = useState(0);

    initSocket('timer-update', (seconds: number) => setTimeSeconds(seconds));

    useEffect(() => {
        // init the state
        socket.emit('request-timer-update');
    }, []);

    let currentShownTime = currentTimeSeconds;
    if (gameRoomState?.round.stageProgress === ProgressState.NotStarted) {
        currentShownTime = getTimeForCurrentRound();
    }

    return (
        <Text align="center">
            {
                new Date((currentShownTime) * 1000).toISOString().slice(14, 19)
            }
        </Text>
    );
}
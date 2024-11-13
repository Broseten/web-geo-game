import { useEffect, useState } from "react";
import initSocket from "../../Hooks/useSocket";
import { socket } from "../../main";
import { Text } from "@chakra-ui/react";

export default function Timer() {
    const [timeSeconds, setTimeSeconds] = useState(0);

    initSocket('timer-update', (seconds: number) => setTimeSeconds(seconds));

    useEffect(() => {
        // init the state
        socket.emit('request-timer-update');
    }, []);

    return (
        <Text align="center">
            {
                new Date(timeSeconds * 1000).toISOString().slice(14, 19)
            }
        </Text>
    );
}
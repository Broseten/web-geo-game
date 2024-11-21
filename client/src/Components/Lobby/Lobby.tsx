// Authors: Vojtech Bruza and Grace Houser
import { Button, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import initSocket from "../../Hooks/useSocket";
import { socket } from "../../main";
import { useGameRoom } from "../Contexts/GameRoomContext";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import UserList from "./UserList";

export default function Lobby() {
    const { players, roomID, roomInfo, setPlayers, isFacilitator } = useGameRoom();
    const { setCurrentScreen } = useScreenSelection();

    initSocket("round-info", () => {
        setCurrentScreen("play");
    });

    initSocket("room-not-found", () => {
        console.log("Room not found");
    });

    useEffect(() => {
        socket.emit("request-room-players-info", roomID);
    }, []);

    return (
        <Flex
            direction="column"
            align="center"
            justify="top"
            w="100%"
            h="100%" // Ensure it takes full height
            px={4}
        >
            <Text
                pt={10}
                fontSize={{ base: "xl", sm: "4xl" }}
                fontWeight="bold"
                color="brand.teal"
                textAlign="center"
            >
                Welcome to the {roomInfo ? roomInfo.name : "unknown"} lobby!
            </Text>
            <Text pb={10} fontSize="md" color="brand.grey" textAlign="center">
                {isFacilitator(socket.id)
                    ? "Start the game when all players are ready."
                    : "The facilitator will start the game when everyone is ready."}
            </Text>

            {/* User List */}
            <UserList />

            {/* Start Game Button */}
            {isFacilitator(socket.id) && (
                <Button
                    mt={10}
                    colorScheme="teal"
                    onClick={() => {
                        socket.emit("progress-game");
                    }}
                >
                    Play
                </Button>
            )}
        </Flex>
    );
}

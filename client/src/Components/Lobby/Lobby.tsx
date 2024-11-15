// Authors: Vojta Bruza and Grace Houser
// This file is the lobby framework 

import { Box, Button, Center, Text } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import UserList from "./UserList";
import { socket } from "../../main";
import initSocket from "../../Hooks/useSocket";
import { useGameRoom } from "../Contexts/GameRoomContext";

export default function Lobby() {
    // TODO add the info about who is the facilitator to the room info! 
    const { roomInfo } = useGameRoom();

    const { setCurrentScreen } = useScreenSelection();

    // TODO use a different message for game start?
    initSocket('round-info', (info) => {
        // Start the game
        console.log(info);
        setCurrentScreen('play');
    });

    return (
        <Box>
            {/* Text at the top of the screen */}
            <Center>
                <Text pt='50' fontSize="4xl" fontWeight="bold" color="brand.teal">
                    Welcome to the {roomInfo ? roomInfo.name : "unknown"} lobby!
                </Text>
            </Center>

            <Center>
                <Text pb="10" pr="20" pl="20" fontSize="l" color="brand.grey" align="center">
                    The facilitator will start the game when everyone is ready.
                    {/* TODO - Show text below if user is the facilitator */}
                    {/* Start the game when everyone is ready. */}
                </Text>
            </Center>

            {/* Player cards in the room lobby */}
            <Center>
                <UserList />
            </Center>

            {/* TODO - This button should be disabled for players (only the facilitator can start the game) */}
            {/* This button leaves the lobby and goes to the game */}
            <Center>
                <Button bg="brand.teal" color='white' borderColor="brand.teal" borderWidth="2px"
                    mt="10"
                    _hover={{
                        bg: "white",
                        color: "brand.teal",
                        borderColor: "brand.teal",
                        borderWidth: "2px"
                    }}
                    onClick={() => {
                        socket.emit('progress-game');
                    }}>
                    Play
                </Button>
            </Center>

            {/* home button at the top */}
            <Button position="absolute" top="0" left="0"
                bg="none"
                _hover={{ background: "none" }}
                onClick={() => {
                    // TODO disconnect?
                    setCurrentScreen('home');
                }}>
                <Text color="brand.grey" _hover={{ textDecoration: "underline" }}>
                    NegoDesign
                </Text>
            </Button>
        </Box>
    );
}

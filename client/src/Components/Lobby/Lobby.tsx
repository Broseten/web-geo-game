// Authors: Vojta Bruza and Grace Houser
// This file is the lobby framework 

import { Box, Button, Center, Text } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import UserList from "./UserList";
import { socket } from "../../main";
import initSocket from "../../Hooks/useSocket";
import { useGameRoom } from "../Contexts/GameRoomContext";
import { useEffect, useState } from "react";
import { PlayerData, RoomPlayersInfo } from "../../data/DataTypes";

export default function Lobby() {
    const { roomID, roomInfo, facilitatorID, setFacilitatorID } = useGameRoom();
    const { setCurrentScreen } = useScreenSelection();
    // TODO better data handling about the current game
    const [players, setPlayers] = useState<PlayerData[]>([]);
    // const players: PlayerData[] = [{ id: "1", role: "Developer", color: "red", name: "Harrison" }, { id: "2", role: "Envvironmentalist", color: "green", name: "Taylor" }, { id: "3", role: "Officer", color: "blue", name: "Violet" }, { id: "4", role: "Politician", color: "yellow", name: "John" }];

    // TODO use a different message for game start?
    initSocket('round-info', (info) => {
        // Start the game
        setCurrentScreen('play');
    });

    initSocket('room-players-info', (roomUpdate: RoomPlayersInfo) => {
        setFacilitatorID(roomUpdate.facilitatorID);
        setPlayers(roomUpdate.players);
        console.log("Room update:");
        console.log(roomUpdate);
    });

    initSocket('room-not-found', () => {
        // TODO better error handling - both server and client-side
        console.log("Room not found");
    });

    useEffect(() => {
        socket.emit('request-room-players-info', roomID);
    }, []);

    function isFacilitator(): boolean {
        return socket.id === facilitatorID;
    }

    return (
        <Box>
            {/* Lobby Page Titles */}
            <Center>
                <Text pt='50' fontSize="4xl" fontWeight="bold" color="brand.teal" align="center">
                    Welcome to the {roomInfo ? roomInfo.name : "unknown"} lobby!
                </Text>
            </Center>

            <Center>
                <Text pb="10" pr="20" pl="20" fontSize="l" color="brand.grey" align="center">
                    {
                        isFacilitator() ?
                            "Start the game when all players are ready."
                            : "The facilitator will start the game when everyone is ready."
                    }
                </Text>
            </Center>

            {/* User List */}
            <Center>
                <UserList isFacilitator={isFacilitator()} players={players} />
            </Center>

            {/* Facilitator Button - leaves lobby and goes to game */}
            <Center>
                {
                    isFacilitator() ?
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

                        : <Box />
                }
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

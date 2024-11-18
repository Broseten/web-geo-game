// Authors: Vojta Bruza and Grace Houser
// This file is the lobby framework 

import { Box, Button, Center, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RoomPlayersInfo } from "../../data/DataTypes";
import initSocket from "../../Hooks/useSocket";
import { socket } from "../../main";
import { useGameRoom } from "../Contexts/GameRoomContext";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import UserList from "./UserList";

export default function Lobby() {
    const { players, roomID, roomInfo, setPlayers, isFacilitator } = useGameRoom();
    const { setCurrentScreen } = useScreenSelection();
    // const players: PlayerData[] = [{ id: "1", role: "Developer", color: "red", name: "Harrison" }, { id: "2", role: "Envvironmentalist", color: "green", name: "Taylor" }, { id: "3", role: "Officer", color: "blue", name: "Violet" }, { id: "4", role: "Politician", color: "yellow", name: "John" }];

    // TODO use a different message for game start?
    initSocket('round-info', (info) => {
        // Start the game
        setCurrentScreen('play');
    });

    // TODO add this to the game info so that we can work with the players in the context (e.g. when displaying available roles)
    initSocket('room-players-info', (roomUpdate: RoomPlayersInfo) => {
        setPlayers(roomUpdate.players);
    });

    initSocket('room-not-found', () => {
        // TODO better error handling - both server and client-side
        console.log("Room not found");
    });

    useEffect(() => {
        socket.emit('request-room-players-info', roomID);
    }, []);

    // TODO fix initialization somehow so we don't have to check if the player data are here already? idk
    const thisPlayer = players.find((p) => p.id === socket.id);

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
                        thisPlayer !== undefined && isFacilitator(socket.id) ?
                            "Start the game when all players are ready."
                            : "The facilitator will start the game when everyone is ready."
                    }
                </Text>
            </Center>

            {/* User List */}
            <Center>
                <UserList isThisFacilitator={thisPlayer !== undefined && isFacilitator(socket.id)} />
            </Center>

            {/* Facilitator Button - leaves lobby and goes to game */}
            <Center>
                {
                    thisPlayer !== undefined && isFacilitator(socket.id) ?
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

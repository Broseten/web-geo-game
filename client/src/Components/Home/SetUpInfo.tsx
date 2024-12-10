// Authors: Vojta Bruza and Grace Houser
// This file displays start button, name input field, 
// and join/create room option of the home screen design

import { Box, Button, Center, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { socket } from "../../main";
import '../../Theme/theme.css';
import { useScreenSelection } from "../Contexts/useScreenSelection";

export default function SetUpInfo() {
    const { setCurrentScreen } = useScreenSelection();
    const [isStartButtonClicked, setIsStartButtonClicked] = useState(false);
    if (socket.connected) {
        // auto disconnect if still connected
        socket.disconnect;
    }

    const lastRoomData = sessionStorage.getItem('lastRoom');

    // conditional statements for the middle display of the Home page  

    {/* Start button - inital display */ }
    if (!isStartButtonClicked) {
        return (
            <Box>
                <Button //className="dark-button"
                    bg="brand.teal"
                    color="white"
                    boxShadow='dark-lg' p='6' rounded='md'
                    _hover={{
                        background: "brand.off",
                        color: "brand.teal",
                    }}
                    mt="100px"
                    onClick={() => {
                        // TODO probably navigate only after connecting?
                        // TODO when to disconnect? What if a user goes back here and tries to connect again
                        //      - cookie with ID + custom reconnect message
                        socket.connect();
                        setIsStartButtonClicked(true);
                    }}>
                    Start
                </Button>
            </Box>
        )
    }

    // Users decides if they want to create or join a room 
    else return (
        <Center>
            <VStack bg="white" borderRadius="5px" pl="0.5cm" pr="0.5cm" pb="20px">

                <Text mt="10px" color="brand.grey">
                    Choose a room option below to begin!
                </Text>

                <HStack>
                    <Button bg='white' color="brand.teal"
                        borderColor="brand.teal" borderWidth="1px"
                        _hover={{ bg: "brand.teal", color: "white" }}
                        variant='solid' onClick={() => {
                            setCurrentScreen('create')
                        }}>
                        Create
                    </Button>

                    <Button bg='white' color="brand.teal"
                        borderColor="brand.teal" borderWidth="1px"
                        _hover={{ bg: "brand.teal", color: "white" }}
                        variant='solid'
                        onClick={() => {
                            setCurrentScreen('join') // future code?
                            // setCurrentScreen('play') // for ease
                        }}>
                        Join
                    </Button>
                </HStack>
                {
                    lastRoomData
                    &&
                    <Button mt={5} bg='white' color="brand.teal"
                        borderColor="brand.teal" borderWidth="1px"
                        _hover={{ bg: "brand.teal", color: "white" }}
                        onClick={() => {
                            // try joining room
                            console.log("Rejoining room");
                            const { lastRoomID } = JSON.parse(lastRoomData);
                            // Emit reconnect event to the server
                            socket.emit('join-room', lastRoomID);
                        }}>
                        Try rejoin
                    </Button>
                }
            </VStack>
        </Center>
    )
}
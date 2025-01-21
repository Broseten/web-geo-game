// Authors: Vojta Bruza and Grace Houser
// Start and room option buttons for the Home Screen

import { Box, Button, Center, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { socket } from "../../main";
import '../../Theme/theme.css';
import { useScreenSelection } from "../Contexts/useScreenSelection";
import { useTranslation } from "react-i18next";

export default function SetUpInfo() {
    const { t } = useTranslation();
    const { setCurrentScreen } = useScreenSelection();
    const [isStartButtonClicked, setIsStartButtonClicked] = useState(false);
    if (socket.connected) {
        // auto disconnect if still connected
        socket.disconnect;
    }

    const lastRoomData = sessionStorage.getItem('lastRoom');

    // conditional statements for the middle display of the Home page  

    {/* Start Button - inital display */ }
    if (!isStartButtonClicked) {
        return (
            <Box>
                <Button
                    boxShadow='dark-lg' p='6' pl="10" pr="10"
                    mt="20px"
                    variant="solid"
                    colorScheme="primary"
                    onClick={() => {
                        // TODO probably navigate only after connecting?
                        socket.connect();
                        setIsStartButtonClicked(true);
                    }}>
                    {t("home.start")}
                </Button>
            </Box>
        )
    }

    // Create or Join room button options - user decision 
    // Rejoin option available if user refreshed page 
    else return (
        <Center>
            <VStack pl="0.5cm" pr="0.5cm" >

                <Text mt="10px" color="gray.900"
                    textShadow="1px 1px 6px #444444"
                >
                    {t("home.choose")}
                </Text>

                <HStack gap={"40px"}>
                    {/* Create Room */}
                    <Button
                        colorScheme="primary"
                        variant='solid' onClick={() => {
                            setCurrentScreen('create')
                        }}>
                        {t("home.create")}
                    </Button>

                    {/* Join Room */}
                    <Button
                        colorScheme="primary"
                        variant='solid'
                        onClick={() => {
                            setCurrentScreen('join') // future code?
                            // setCurrentScreen('play') // for ease
                        }}>
                        {t("home.join")}
                    </Button>
                </HStack>
                {
                    /* Rejoin Room */
                    lastRoomData
                    &&
                    <Button mt={5}
                        colorScheme="secondary"
                        variant='outline'
                        onClick={() => {
                            // try joining room
                            console.log("Rejoining room");
                            const { lastRoomID } = JSON.parse(lastRoomData);
                            // Emit reconnect event to the server
                            socket.emit('join-room', lastRoomID);
                        }}>
                        {t("home.rejoin")}
                    </Button>
                }
            </VStack>
        </Center>
    )
}
import { Box, Button, Center, Image, Input, Select, Text, VStack } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import { useState } from "react";
//import {roomName} from './CreateRoom';

export default function CustomizeRoom() {
    const { setCurrentScreen } = useScreenSelection();
    const roomName = "temp";

    return (
        <Box>

            <Center>
                <Text
                    pt='150'
                    fontSize="4xl"
                    fontWeight="bold"
                    color="brand.teal"
                >Customize {roomName}!
                </Text>
            </Center>

            <Center>
                <Text
                    pb="75"
                    fontSize="l"
                    color="brand.grey"
                >Choose a map from the dropdown below
                </Text>
            </Center>


            {/* Select menu for map */}
            <Center>
                <Select
                    mb="100"
                    maxWidth="300"
                    bg="brand.teal"

                    placeholder='Select map...'>
                    <option value='ballina'>    Ballina</option>
                    <option value='dublin'>     Dublin</option>
                    <option value='option3'>    Option 3</option>
                </Select>
            </Center>


            {/* This button creates the room and goes to the lobby */}
            <Center>
                <Button bg="white" color='brand.teal' variant="solid"
                    onClick={() => {
                        // create room

                        // go to lobby
                        setCurrentScreen('lobby');
                    }}>
                    Done
                </Button>
            </Center>

            {/* home button at the top */}
            <Button position="absolute" top="0" left="0" height="20" width="20"
                bg="none"
                _hover={{ background: "none" }}
                onClick={() => {
                    setCurrentScreen('home');
                }}>
                <Image src="src/Theme/images/home.png"></Image>
            </Button>
        </Box>
    );
}

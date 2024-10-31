import { Box, Button, Center, Image, Input, Select, Text, VStack } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import { useState } from "react";
import Customizations from "./Customizations";
//import {roomName} from './CreateRoom';

export default function CustomizeRoom() {
    const { setCurrentScreen } = useScreenSelection();
    const roomName = "temp";

    return (
        <Box>

            <Center>
                <Text
                    pt='100'
                    fontSize="4xl"
                    fontWeight="bold"
                    color="brand.teal"
                >Customize {roomName}!
                </Text>
            </Center>

            {/* Going through room customizations */}
            <Center>{<Customizations />}</Center>


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

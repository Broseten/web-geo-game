// Authors: Vojta Bruza and Grace Houser
// This file displays start button, name input field, 
// and join/create room option of the home screen design

import { Box, Button, Center, HStack, Input, InputGroup, InputLeftElement, Text, VStack } from "@chakra-ui/react";
import { socket } from "../../main";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import '../../Theme/home-create.css';


export default function SetUpInfo() {

    const { setCurrentScreen } = useScreenSelection();
    const [playerName, setPlayerName] = useState('')
    const [isStartButtonClicked, setIsStartButtonClicked] = useState(false);
    const [isPlayerNameEntered, setIsPlayerNameEntered] = useState(false);
    if (socket.connected) {
        // auto disconnect if still connected
        socket.disconnect;
    }

    // conditional statements for the middle display of the Home page  

    {/* Start button - inital display */ }
    if (!isStartButtonClicked && !isPlayerNameEntered) {
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
                        socket.connect();
                        setIsStartButtonClicked(true);
                    }}>
                    Start
                </Button>

                {/*TEMPORARY - FOR ROOM BUILD */}
                <Button colorScheme='purple'
                    onClick={() => { setCurrentScreen('create') }}>
                    Create
                </Button>

                {/*TEMPORARY - FOR PLAY*/}
                <Button colorScheme='green'
                    onClick={() => { setCurrentScreen('play') }}>
                    Play
                </Button>

                {/*TEMPORARY - FOR LOBBY*/}
                <Button colorScheme='red'
                    onClick={() => { setCurrentScreen('lobby') }}>
                    Lobby
                </Button>
            </Box>
        )
    }

    {/* Player enters their name */ }
    if (isStartButtonClicked && !isPlayerNameEntered) {
        return (
            <Box bg="white" borderRadius="5px" pl="30px" pr="30px">
                <Center>
                    <Text mt="0.45cm" mb="0.25cm" color="brand.grey">
                        Please type your name below
                    </Text>
                </Center>

                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <EditIcon color='brand.teal' />
                    </InputLeftElement>
                    <Input
                        value={playerName}
                        onChange={(event) => setPlayerName(event.target.value)}

                        borderColor="brand.teal"
                        color="brand.teal"
                        placeholder='Your name...'
                        _placeholder={{ color: 'brand.teal', fontSize: "14px"}}
                        fontSize="14px"
                        _hover={{ borderWidth: "2px" }}
                        mb="50"
                    ></Input>
                </InputGroup>

                <Center>
                    <Button
                        bg="brand.teal" color="white"
                        borderWidth="1px" rounded='md'
                        _hover={{
                            bg: "white",
                            color: "brand.teal",
                            borderColor: "brand.teal",
                            borderWidth: "1px"
                        }}
                        mt="20px"
                        mb="30px"
                        onClick={() => {
                            setIsPlayerNameEntered(true);
                        }}>
                        Next
                    </Button>
                </Center>
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
                            setCurrentScreen('join') // future code
                            // setCurrentScreen('play') // for ease
                        }}>
                        Join
                    </Button>
                </HStack>
            </VStack>
        </Center>
    )
}
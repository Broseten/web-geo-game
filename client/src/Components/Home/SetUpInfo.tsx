import { Box, Button, Center, HStack, Input, InputGroup, InputLeftElement, Text, VStack } from "@chakra-ui/react";
import { socket } from "../../main";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
//import DarkButton from "../../Theme/DarkButton";



export default function SetUpInfo() {

    const { setCurrentScreen } = useScreenSelection();
    const [playerName, setPlayerName] = useState('')
    const [isStartButtonClicked, setIsStartButtonClicked] = useState(false);
    const [isPlayerNameEntered, setIsPlayerNameEntered] = useState(false);
    if (socket.connected) {
        // auto disconnect if still connected
        socket.disconnect;
    }

    // conditional statements for the middle display of the Home page section 

    {/* Start button - inital display */ }
    if (!isStartButtonClicked && !isPlayerNameEntered) {
        return (
            <Box>
                {/* <DarkButton onClick={() => {
                    // TODO probably navigate only after connecting?
                    socket.connect();
                    setIsStartButtonClicked(true);
                }}>grace testing</DarkButton> */}

                <Button
                    bg="brand.teal" color="white"
                    boxShadow='dark-lg' p='6' rounded='md'
                    _hover={{
                        background: "brand.off",
                        color: "brand.teal",
                    }}
                    variant='solid'
                    mt="20"
                    mb="200"
                    onClick={() => {
                        // TODO probably navigate only after connecting?
                        socket.connect();
                        setIsStartButtonClicked(true);
                    }}>Start
                </Button>
            </Box>
        )
    }

    {/* Player enters their name */ }
    if (isStartButtonClicked && !isPlayerNameEntered) {
        return (
            <Box>
                <Box bg="brand.off" borderRadius={"10"} pl="0.5cm" pr="0.5cm">
                    <Center><Text
                        mt="0.45cm"
                        mb="0.25cm"
                        color="brand.grey"
                    >Please type your name below</Text></Center>

                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <EditIcon color='brand.teal' />
                        </InputLeftElement>
                        <Input
                            value={playerName}
                            onChange={(event) => setPlayerName(event.target.value)}

                            borderColor="brand.teal"
                            color="brand.teal"
                            placeholder='Enter your name...'
                            _placeholder={{ color: 'brand.teal' }}
                            _hover={{ borderWidth: "2px" }}
                            mb="50"
                        ></Input>
                    </InputGroup>
                </Box>

                <Center><Button
                    bg="brand.teal" color="white"
                    boxShadow='dark-lg' p='6' rounded='md'
                    _hover={{
                        background: "brand.off",
                        color: "brand.teal",
                    }}
                    variant='solid'
                    mt="10"
                    mb="100"
                    onClick={() => {
                        setIsPlayerNameEntered(true);
                    }}>Next
                </Button></Center>
            </Box>
        )
    }

    // Users decides if they want to create or join a room 
    else return (
        <Center>
            <VStack>
                <Box mb="5" bg="white" borderRadius={"10"} pl="0.5cm" pr="0.5cm">
                    <Text color="brand.grey">Choose a room option below to begin!</Text>
                </Box>

                {/* TODO - put the button styles in the Theme folder, since it coordinates with the background photo?*/}
                <HStack mb="100">
                    <Button bg='brand.orange' color="white"
                        _hover={{ bg: "white", color: "brand.orange"}}
                        variant='solid' onClick={() => {
                        setCurrentScreen('create')
                    }}>Create</Button>
                    <Button bg='brand.red' color="white"
                        _hover={{ bg: "white", color: "brand.red"}}
                        variant='solid' onClick={() => {
                        // setCurrentScreen('join') // future code
                        setCurrentScreen('play')
                    }}>Join</Button>
                </HStack>

                <Text mb="104" opacity={"0"}>X</Text>
            </VStack>
        </Center>
    )
}
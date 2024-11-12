// Authors: Vojta Bruza and Grace Houser
// This file is the voting screen famework 

import { Box, Button, Center, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { socket } from "../../../main";
import { useScreenSelection } from "../../Contexts/useScreenSelection";
import { useEffect, useState } from "react";
import initSocket from "../../../Hooks/useSocket";
import Information from "./Information";



export default function Voting() {

    const { setCurrentScreen } = useScreenSelection();
    const [testCounter, setTestCounter] = useState(0);

    // TODO - needed variables 
    const role = 'Developer'
    const playerBudget = '$200,000'
    const playerScore = 5
    const time = '5:00.00'

    initSocket('countClient', (count: number) => setTestCounter(count));
    initSocket('init-count-client', (count: number) => setTestCounter(count));

    useEffect(() => {
        // init the state
        socket.emit('init-count');
    }, []);



    {/* Section left of the game map */ }
    return (

        <VStack align={"top"}>

            {/* Home button at the top */}
            <Button bg="none" p="0" pl="1.5"
                color="brand.yellow" fontSize="18px" fontFamily="Avenir Next" fontWeight="bold"
                _hover={{ 
                    background: "none", 
                    color: "brand.yellow", 
                    textDecoration: "underline"
                }}
                onClick={() => { setCurrentScreen('home'); }}>
                NegoDesign
            </Button>

            <hr />

            {/* Voting and Time Section */}
            <Center>
                <HStack justifyContent="center">

                    {/* Only the Facilitator has this button */}
                    <Button bg="brand.red" color="white" mr="40px"
                        onClick={() => { setCurrentScreen('results') }}>
                        End Voting
                    </Button>

                    {/* Only the players have this text */}
                    {/*
                    <Heading size="md" color="white" mr="40px" lineHeight="1" textAlign="center">
                        You are <br /> voting!
                    </Heading>
                    */}

                    <VStack>
                        <Heading size="lg" color="white">Time</Heading>

                        <Text align="center">
                            {time}
                        </Text>
                    </VStack>
                </HStack>
            </Center>

            <hr />

            {/* Another Section */}
            <Center>
                <VStack>

                    {/* TO DO - make size flexible depending on screen width*/}
                    <Box width="300px"></Box>

                    <Heading size="lg" color="white" mt="5px" lineHeight="1" textAlign="center">
                        Solution <br/>
                        Information
                    </Heading>

                    {/* Information about placed solutions */}
                    <Information />
                </VStack>
            </Center>

        </VStack>
    );
}
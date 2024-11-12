// Authors: Vojta Bruza and Grace Houser
// This file displays the left section of the game play 

import { Button, Center, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { socket } from "../../main";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import { useEffect, useState } from "react";
import initSocket from "../../Hooks/useSocket";
import Solutions from "./Solutions";


export default function Game() {

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

            {/* Status and Time Section */}
            <HStack justifyContent="center">

                {/* Status */}
                <VStack>
                    <Heading size="lg" color="white" alignSelf="center">Status</Heading>

                    <Text fontSize="14px" mb="20px" align="center">
                        Your budget is <Text as="span" fontWeight="bold">{playerBudget}</Text>
                        <br />
                        Your score is <Text as="span" fontWeight="bold">{playerScore}</Text>
                    </Text>
                </VStack>

                {/* just for spacing */}
                <Text mr="40px"></Text>

                {/* Time */}
                <VStack pr="10px">
                    <Heading size="lg" color="white" alignSelf="center">Time</Heading>

                    <Text mb="40px" align="center">
                        {time}
                    </Text>
                </VStack>
            </HStack>

            <hr />

            {/* Solutions Section */}
            <Heading size="xl" color="white" alignSelf="center">
                Solutions
            </Heading>

            <Text paddingLeft="20px" paddingRight="20px" align="center" fontSize="14px">
                Choose a pin option below to help meet your goals as a <Text as="span" fontWeight="bold">{role}</Text>.
            </Text>

            {/* accordion of solutions */}
            <Center>
                <Solutions />
            </Center>
        </VStack>
    );
}
// Authors: Vojta Bruza and Grace Houser
// This file displays the left section of the game play 

import { Box, Center, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { socket } from "../../../main";
import { useScreenSelection } from "../../Contexts/useScreenSelection";
import { useEffect, useState } from "react";
import initSocket from "../../../Hooks/useSocket";
import Solutions from "./Solutions";
import Timer from "../Timer";


export default function Game() {

    const { setCurrentScreen } = useScreenSelection();
    const [testCounter, setTestCounter] = useState(0);

    // TODO - needed variables 
    const role = 'Developer'
    const playerBudget = '€20,000'

    initSocket('countClient', (count: number) => setTestCounter(count));
    initSocket('init-count-client', (count: number) => setTestCounter(count));

    useEffect(() => {
        // init the state
        socket.emit('init-count');
    }, []);



    {/* Section left of the game map */ }
    return (
        <VStack align={"top"}>

            {/* Logo at the top */}
            <Heading bg="none" pt="5px" color="brand.yellow" textAlign="center"
                fontSize="18px" fontFamily="Avenir Next" fontWeight="bold">
                NegoDesign
            </Heading>

            <hr />

            {/* Budget and Time Section */}
            <HStack justifyContent="center">

                {/* Budget */}
                <VStack gap="0">
                    <Heading size="md" color="white">
                        {playerBudget}
                    </Heading>

                    <Text fontSize="14px" color="white">Budget</Text>
                </VStack>

                {/* just for spacing */}
                <Text mr="40px"></Text>

                {/* Time */}
                <VStack gap="0">
                    <Heading size="md" color="white">
                        <Timer />
                    </Heading>

                    <Text fontSize="14px" color="white">Time</Text>
                </VStack>
            </HStack>

            <hr />

            {/* Solutions Section */}
            <Box textAlign="center" color="white">
                <Heading size="lg">Solutions</Heading>

                <Text fontSize="14px" ml="20px" mr="20px">
                    Choose a pin option below to help meet your goals as a <Text as="span" fontWeight="bold">{role}</Text>.
                </Text>
            </Box>


            {/* accordion of solutions */}
            <Center>
                <Solutions />
            </Center>
        </VStack>
    );
}
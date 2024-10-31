import { Box, Button, Center, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
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

            {/* Home button section at the top */}
            {/* TODO - can't figure out how to stretch thes two items, so "spacing" is filler code */}
            <HStack spacing={"200"}>
                {/* TODO - ideally, the home button would be a svg image */}
                {/* TODO - fix the photo, it deforms when screen size is reduced */}

                <Button bg="none" _hover={{ background: "none" }}
                    onClick={() => { setCurrentScreen('home'); }}
                    p="0" pl="1.5">
                    <Image src="/src/Theme/images/home_yellow.png"
                        style={{ width: '45px', height: '50px' }}
                        objectFit={"contain"}
                        paddingTop="5px" pl="0" pr="0">
                    </Image>
                </Button>

                <Heading color="brand.yellow" fontSize="18px">
                    NegoDesign
                </Heading>
            </HStack>

            <hr />

            {/* Status and Time Section */}
            <HStack>

                {/* Status */}
                <VStack pr="20" pl="2" align="top">
                    <Heading size="lg" color="white" alignSelf="center">Status</Heading>

                    <Text fontSize="14px" mb="20px" align="center">
                        Your budget is <Text as="span" fontWeight="bold">{playerBudget}</Text>
                        <br />
                        Your score is <Text as="span" fontWeight="bold">{playerScore}</Text>
                    </Text>
                </VStack>

                {/* Time */}
                <VStack display="flex" justifySelf="flex-start">
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
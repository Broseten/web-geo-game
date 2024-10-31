import { Box, Button, Center, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { socket } from "../../main";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import { useEffect, useState } from "react";
import initSocket from "../../Hooks/useSocket";



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

            {/* Voting and Time Section */}
            <Center>
                <HStack alignItems="center">

                    <Heading size="lg" color="white" mr="20" style={{ textAlign: 'center' }}>
                        You are <br /> voting!
                    </Heading>


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
                    <Heading size="lg" color="white" mt="5">
                        Another Section
                    </Heading>

                    <Text align="center">
                        text goes here
                    </Text>
                </VStack>
            </Center>

        </VStack>
    );
}
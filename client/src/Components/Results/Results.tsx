// Authors: Vojta Bruza and Grace Houser
// This file is the framework of the rankings

import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import Rankings from "./Rankings";


export default function Results() {

    const { setCurrentScreen } = useScreenSelection();
    const number = "One"; // will either be "One" or "Two"


    return (

        <Box overflow="auto" h="100%">

            <Box>
                <Center>
                    <Text pt="70px"
                        fontSize="4xl" fontWeight="bold" color="brand.teal">
                        Round {number} Results!
                    </Text>
                </Center>

                <Center>
                    <Text pb="20px" align="center"
                        fontSize="lg" color="brand.grey">
                        Check out your score! The facilitator will begin the next round when ready.
                        {/* TODO - second round text is below */}
                        {/* Check out the final scores! */}
                    </Text>
                </Center>

                {/* Room customizations */}
                <Center>
                    <Box bg="brand.off" overflow="auto"
                        width="60%" height="500px"
                        borderRadius="5px"
                        padding="5"
                        mb="20px">
                        <Heading color="brand.grey" size="lg" textAlign="center" mb="10px">
                            Rankings
                        </Heading>
                        
                        {/* Rankings */}
                        <Rankings />
                    </Box>
                </Center>

                {/* Only the facilitator can see this button */}
                {/* This button starts round two */}
                <Center>
                    {/* TODO - button after round one */}
                    <Button //className="dark-button" 
                        mb="80px"
                        bg='brand.teal' color="white" variant='outline'
                        _hover={{ bg: "white", color: "brand.teal", borderColor: "brand.teal", borderWidth: "2px" }}
                        onClick={() => { setCurrentScreen('play'); }}>
                        Start Round Two
                    </Button>

                    {/* TODO - button after round two */}
                    <Button //className="dark-button" 
                        mb="80px"
                        bg='brand.teal' color="white" variant='outline'
                        _hover={{ bg: "white", color: "brand.teal", borderColor: "brand.teal", borderWidth: "2px" }}
                        onClick={() => { setCurrentScreen('end'); }}>
                        End Game
                    </Button>
                </Center>
            </Box>

            {/* home button at the top */}
            <Button position="absolute" top="0" left="0"
                bg="none"
                _hover={{ background: "none" }}
                onClick={() => {
                    setCurrentScreen('home');
                }}>
                <Text color="brand.grey" _hover={{ textDecoration: "underline" }}>
                    NegoDesign
                </Text>
            </Button>
        </Box>
    );
}
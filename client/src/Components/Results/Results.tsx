// Authors: Vojta Bruza and Grace Houser
// Results Page 

import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import Rankings from "./Rankings";


export default function Results() {

    const { setCurrentScreen } = useScreenSelection();

    // TODO - make dynamic 
    const firstRound = true; //this assumes two rounds total
    const isFacilitator = true;


    return (
        <Box overflow="auto" h="100%">

            {/* Page Title */}
            <Center>
                <Text pt="70px"
                    fontSize="4xl" fontWeight="bold" color="brand.teal">
                    {firstRound ? "Round One " : "Final "} Results!
                </Text>
            </Center>

            <Center>
                <Text pb="20px" align="center"
                    fontSize="lg" color="brand.grey">
                    {
                        firstRound && !isFacilitator
                            ? "Check out your score! The facilitator will begin the next round when ready."
                            : firstRound && isFacilitator
                                ? "Please begin the next round when ready."
                                : "Check out the final scores!"
                    }
                </Text>
            </Center>

            {/* Rankings Section */}
            <Center>
                <Box bg="brand.grey" overflow="auto"
                    width="60%" height="500px"
                    borderRadius="5px"
                    padding="5"
                    mb="20px">
                    <Heading color="white" size="lg" textAlign="center" mb="10px">
                        Rankings
                    </Heading>

                    {/* Rankings */}
                    <Rankings />
                </Box>
            </Center>

            {/* Next Button - to second round or end screen */}
            <Center>
                {firstRound && isFacilitator && (
                    <Button
                        mb="80px"
                        bg='brand.teal' color="white"
                        _hover={{ bg: "white", color: "brand.teal", borderColor: "brand.teal", borderWidth: "2px" }}
                        onClick={() => { setCurrentScreen('play'); }}>
                        Start Round Two
                    </Button>
                )}
                {!firstRound && isFacilitator && (
                    <Button
                        mb="80px"
                        bg='brand.teal' color="white"
                        _hover={{ bg: "white", color: "brand.teal", borderColor: "brand.teal", borderWidth: "2px" }}
                        onClick={() => { setCurrentScreen('end'); }}>
                        End Game
                    </Button>
                )}
            </Center>

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
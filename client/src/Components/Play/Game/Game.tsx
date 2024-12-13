// Authors: Vojta Bruza and Grace Houser
// This file displays the left section of the game play 
import { Box, Button, Center, Grid, HStack, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import initSocket from "../../../Hooks/useSocket";
import { socket } from "../../../main";
import { useScreenSelection } from "../../Contexts/useScreenSelection";
import ConfirmationModal from "../ConfirmationModal";
import Timer from "../Timer";
import Solutions from "./Solutions";

interface GameProps {
    isFacilitator: boolean;
}

export default function Game({ isFacilitator }: GameProps) {
    const { setCurrentScreen } = useScreenSelection();
    const [testCounter, setTestCounter] = useState(0);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    // TODO - needed variables
    const role = "Developer";
    const playerBudget = "€20,000";

    initSocket("countClient", (count: number) => setTestCounter(count));
    initSocket("init-count-client", (count: number) => setTestCounter(count));

    useEffect(() => {
        // init the state
        socket.emit("init-count");
    }, []);

    const handleFinishRound = () => {
        socket.emit("progress-game");
        setIsConfirmModalOpen(false);
    };

    return (
        <VStack align={"top"} w="25vw" minW="250px">
            {/* Logo */}
            <Heading
                bg="none"
                pt="5px"
                color="brand.yellow"
                textAlign="center"
                fontSize="18px"
                fontFamily="Avenir Next"
                fontWeight="bold"
            >
                NegoDesign
            </Heading>

            <hr />

            {/* End Round, Budget, and Time Section */}
            <SimpleGrid justifyContent="center"
                columns={[ 1, 1, 2, 3 ]} // base, small, medium, large
                //spacingX={4} // base, small, medium, large
                spacingY={4}
                width="100%"
            >
                {
                    /* End Round Button */
                    isFacilitator
                    &&
                    <Button
                        bg="brand.red"
                        color="white"
                        whiteSpace="normal"
                        width="90%"
                        //marginX="20"
                        
                        justifySelf="center"
                        _hover={{ color: "brand.red", background: "red.100" }}
                        onClick={() => setIsConfirmModalOpen(true)}
                    >
                        End Round
                    </Button>
                }

                {/* Budget */}
                <VStack gap="0" justifyContent="center">
                    <Heading size="md" color="white" lineHeight={0.8}>
                        {playerBudget}
                    </Heading>

                    <Text fontSize="14px" color="white">
                        Budget
                    </Text>
                </VStack>

                {/* Time */}
                <VStack gap="0" justifyContent="center">
                    <Heading size="md" color="white" lineHeight={0.8}>
                        <Timer />
                    </Heading>

                    <Text fontSize="14px" color="white">
                        Time
                    </Text>
                </VStack>
            </SimpleGrid>

            <hr />

            {/* Solutions Section */}
            <Box textAlign="center" color="white">
                <Heading size="lg">Solutions</Heading>

                {/* <Text fontSize="14px" lineHeight="1.15" ml="20px" mr="20px">
                    Choose a pin option below to help meet your goals as a{" "}
                    <Text as="span" fontWeight="bold">
                        {role}
                    </Text>
                    .
                </Text> */}
            </Box>

            {/* Solution Accordion */}
            <Center>
                <Solutions />
            </Center>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleFinishRound}
                message="Are you sure you want to finish this round before the timer runs out?"
            />
        </VStack>
    );
}
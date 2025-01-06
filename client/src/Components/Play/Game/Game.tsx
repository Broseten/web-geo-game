// Authors: Vojta Bruza and Grace Houser
// This file displays the left section of the game play 
import { Box, Button, Center, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { socket } from "../../../main";
import ConfirmationModal from "../ConfirmationModal";
import Timer from "../Timer";
import Solutions from "./Solutions";
import { useGameRoom } from "../../Contexts/GameRoomContext";
import { global_playerID } from "../../Contexts/ConnectionContext";
import { useGameMarkers } from "../../Contexts/GameMarkersContext";

interface GameProps {
    isFacilitator: boolean;
}

export default function Game({ isFacilitator }: GameProps) {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const { getPlayerData, roomInfo } = useGameRoom();
    const { getPlayerSpentBudget } = useGameMarkers();

    let localPlayer = getPlayerData(global_playerID);

    // TODO - needed variables
    const playerRole = localPlayer?.role;
    const playerRemainingBudget = roomInfo ? roomInfo.initialBudget - getPlayerSpentBudget(global_playerID) : 0;

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
            <SimpleGrid
                justifyContent="center"
                //justifyItems={isFacilitator ? "stretch" : "center"}
                columns={[1, 1, 2, 3]} // base, small, medium, large
                //spacingX={4} // base, small, medium, large
                spacingY={4}
                width="100%"
            >
                {/* Budget */}
                <VStack gap="0" justifyContent="center">
                    <Heading size="md" color="white" lineHeight={0.8}>
                        {playerRemainingBudget}
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

                <VStack gap="0" justifyContent="center">
                    <Heading size="md" color="white" lineHeight={0.8} textAlign="center">
                        {playerRole}
                    </Heading>

                    <Text fontSize="14px" color="white">
                        Role
                    </Text>
                </VStack>
            </SimpleGrid>

            {
                // TODO position button at the bottom? but first fix the layouts
                /* End Round Button */
                isFacilitator
                &&
                <Center>
                    <Button
                        bg="brand.red"
                        color="white"
                        whiteSpace="normal"
                        width="90%"
                        justifySelf="center"
                        _hover={{ color: "brand.red", background: "red.100" }}
                        onClick={() => setIsConfirmModalOpen(true)}
                    >
                        End Round
                    </Button>
                </Center>
            }

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

            <Center>
                {/* Solution Accordion */}
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
// Authors: Vojtech Bruza and Grace Houser
// This file displays the voting screen (left side)

import { Box, Button, Center, Divider, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { socket } from "../../../main";
import { useLocalGameData } from "../../Contexts/LocalGameContext";
import ConfirmationModal from "../ConfirmationModal";
import Timer from "../Timer";
import MarkerInfoCard from "./MarkerInfoCard";
import { useGameRoom } from "../../Contexts/GameRoomContext";
import { useGameMarkers } from "../../Contexts/GameMarkersContext";

interface VoteProps {
    isFacilitator: boolean;
}

// TODO Voting -- will need to enable voting buttons on the markers on the map + visualize the voting somehow?

export default function Voting({ isFacilitator }: VoteProps) {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const { getSelectedMarker } = useLocalGameData();
    const { getRemainingVotes } = useGameMarkers();
    const { roomInfo } = useGameRoom();
    const selectedMarker = getSelectedMarker();

    const handleFinishRound = () => {
        socket.emit("progress-game");
        setIsConfirmModalOpen(false);
    };

    /* Voting Section */
    return (
        <>
            <Divider />

            {/* End Voting and Time Section */}
            <Center>
                <HStack justifyContent="center">

                    {/* Votes Left - player */}
                    <VStack gap="0" mr="40px">
                        <Heading size="md" color="white">
                            {roomInfo ? roomInfo?.maxVotes - getRemainingVotes() : 0}
                        </Heading>

                        <Text fontSize="14px" color="white">Votes Left</Text>
                    </VStack>


                    {/* Time */}
                    <VStack gap="0">
                        <Heading size="md" color="white">
                            <Timer />
                        </Heading>

                        <Text fontSize="14px" color="white">Time</Text>
                    </VStack>
                </HStack>
            </Center>

            {
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
                        End Voting
                    </Button>
                </Center>
            }

            <Divider />

            {/* Solution Information Card */}
            <Center>
                <VStack w="300px">
                    <Heading size="lg" color="white" mt="5px" lineHeight="1" textAlign="center">
                        Solution <br />
                        Information
                    </Heading>
                    {
                        selectedMarker
                            // marker information
                            ? <MarkerInfoCard marker={selectedMarker} />
                            // fefault, when no solutions are selected
                            : <Box>
                                <Text align="center" color="white">
                                    Click on a solution to learn more
                                </Text>
                            </Box>
                    }
                </VStack>
            </Center>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleFinishRound}
                message="Are you sure you want to finish voting before the timer runs out?"
            />
        </>
    );
}
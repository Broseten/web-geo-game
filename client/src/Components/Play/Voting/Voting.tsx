// Authors: Vojtech Bruza and Grace Houser
// This file displays the voting screen (left side)

import { Box, Button, Center, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { socket } from "../../../main";
import Timer from "../Timer";
import MarkerInfoCard from "./MarkerInfoCard";
import { useState } from "react";
import ConfirmationModal from "../ConfirmationModal";
import { useLocalGameData } from "../../Contexts/LocalGameContext";

interface VoteProps {
    isFacilitator: boolean;
}

// TODO Voting -- will need to enable voting buttons on the markers on the map + visualize the voting somehow?

export default function Voting({ isFacilitator }: VoteProps) {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const { getSelectedMarker } = useLocalGameData();
    const selectedMarker = getSelectedMarker();

    const handleFinishRound = () => {
        socket.emit("progress-game");
        setIsConfirmModalOpen(false);
    };

    /* Voting Section */
    return (

        <VStack align={"top"} w="25vw" minW="300px">

            {/* Logo at top */}
            <Heading bg="none" pt="5px" color="brand.yellow" textAlign="center"
                fontSize="18px" fontFamily="Avenir Next" fontWeight="bold">
                NegoDesign
            </Heading>

            <hr />

            {/* End Voting and Time Section */}
            <Center>
                <HStack justifyContent="center">

                    {/* End Voting Button - only for facilitator */}
                    {
                        isFacilitator
                        &&
                        <Button bg="brand.red" color="white" mr="40px"
                            _hover={{ color: "brand.red", background: "red.100" }}
                            onClick={() => { setIsConfirmModalOpen(true) }}>
                            End Voting
                        </Button>
                    }

                    {/* Time */}
                    <VStack gap="0">
                        <Heading size="md" color="white">
                            <Timer />
                        </Heading>

                        <Text fontSize="14px" color="white">Time</Text>
                    </VStack>
                    {/* :
                    <Text size="md" fontWeight="bold" color="white" mr="40px" lineHeight="1" textAlign="center">
                        You are <br /> voting!
                    </Text> */}
                </HStack>
            </Center>

            <hr />

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
        </VStack>
    );
}
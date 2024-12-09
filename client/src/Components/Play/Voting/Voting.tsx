// Authors: Vojtech Bruza and Grace Houser
// This file is the voting screen famework 

import { Button, Center, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { socket } from "../../../main";
import Timer from "../Timer";
import Information from "./Information";
import { useState } from "react";
import ConfirmationModal from "../ConfirmationModal";


export default function Voting() {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    // TODO - needed variables 
    const isFacilitator = true;

    const handleFinishRound = () => {
        socket.emit("progress-game");
        setIsConfirmModalOpen(false);
    };

    {/* Voting Section - left of the game map */ }
    return (

        <VStack align={"top"}>

            {/* Logo at the top */}
            <Heading bg="none" pt="5px" color="brand.yellow" textAlign="center"
                fontSize="18px" fontFamily="Avenir Next" fontWeight="bold">
                NegoDesign
            </Heading>

            <hr />

            {/* Voting and Time Section */}
            <Center>
                <HStack justifyContent="center">

                    {/* End Voting Button - only for the facilitator */}
                    <Button bg="brand.red" color="white" mr="40px"
                        _hover={{ color: "brand.red", background: "red.100" }}
                        onClick={() => { setIsConfirmModalOpen(true) }}>
                        Finish Voting
                    </Button>

                    {/* Time */}
                    {
                        isFacilitator ?
                            <VStack gap="0">
                                <Heading size="md" color="white">
                                    <Timer />
                                </Heading>

                                <Text fontSize="14px" color="white">Time</Text>
                            </VStack>
                            :
                            <Text size="md" fontWeight="bold" color="white" mr="40px" lineHeight="1" textAlign="center">
                                You are <br /> voting!
                            </Text>
                    }
                </HStack>
            </Center>

            <hr />

            {/* Solution Information Section */}
            <Center>
                <VStack w="300px">
                    <Heading size="lg" color="white" mt="5px" lineHeight="1" textAlign="center">
                        Solution <br />
                        Information
                    </Heading>

                    {/* solution information */}
                    <Information />
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
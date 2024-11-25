// Authors: Vojtech Bruza and Grace Houser
// This file is the voting screen famework 

import { Button, Center, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { socket } from "../../../main";
import Timer from "../Timer";
import Information from "./Information";


export default function Voting() {
    // TODO - needed variables 
    const isFacilitator = true;

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
                        onClick={() => { socket.emit('progress-game') }}>
                        WIP Next
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

        </VStack>
    );
}
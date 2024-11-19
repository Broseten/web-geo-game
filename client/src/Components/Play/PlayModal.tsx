// Authors: Vojta Bruza and Grace Houser
// This file contains the modals that will appear during gameplay and voting

import { Box, Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import Icon from "../Lobby/Icon";


// somehow pass in variable 
export default function PlayModal() {

    const { isOpen, onOpen, onClose } = useDisclosure();

    // TODO - needed variable 
    const userColor = "default";
    // message is custom to player roles 
    const message = "As developer, you want to create an inviting space for the community while keeping the impact of the surrounding environment in mind.";

    const reminder = false;
    const timesUp_facilitator = false;
    const timesUp_player = false;

    {/* Reminder Pop up before game starts */ }
    if (reminder) {
        return (
            <Box>
                <Button onClick={onOpen}>Reminder Modal</Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader >Your Goal</ModalHeader>
                        <ModalCloseButton />

                        {/* this text would be customizable to roles */}
                        <ModalBody mb="10px"> {message} </ModalBody>

                        <Center>
                            <Icon color={userColor} />
                        </Center>

                        {/* ideally, color would match player color */}
                        <ModalFooter>
                            <Button bgColor='brand.teal' color="white" mr={3} onClick={onClose}>
                                Okay
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        )
    }

    {/* Times up - Modal for the facilitator */ }
    if (timesUp_facilitator) {
        return (
            <Box>
                <Button onClick={onOpen}>Facilitator, Time's Up</Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader >Time's Up!</ModalHeader>
                        <ModalCloseButton />

                        <ModalBody>
                            Start the voting section when teams are ready
                        </ModalBody>

                        <ModalFooter>
                            <Button bg='brand.teal' color="white" 
                                rounded='md' mr={3} 
                                _hover={{
                                    background: "gray.100",
                                    color: "brand.teal",
                                }}
                                onClick={onClose}>
                                Go to voting
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        )
    }

    {/* Times up - Modal for the player */ }
    if (timesUp_player) {
        return (
            <Box>
                <Button onClick={onOpen}>Player, Time's Up</Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader >Time's Up!</ModalHeader>

                        <ModalBody mb="20">
                            Please wait for the facilitator to start the voting section
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>
        )
    }

    // Else, show an error message 
    else return (
        <Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <Center>
                        <ModalBody pb="50" fontWeight="bold">
                            Error <br />
                            play modal did not show 
                        </ModalBody>
                    </Center>
                </ModalContent>
            </Modal>
        </Box>
    )
}
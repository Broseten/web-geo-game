// Authors: Vojta Bruza and Grace Houser
// This file contains the modals that will appear during gameplay and voting

import { Box, Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";


// somehow pass in variable 
export default function PlayModal() {

    const { isOpen, onOpen, onClose } = useDisclosure();

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
                        <ModalBody>
                            As developer, you want to create an inviting space for the community
                            while keeping the impact of the surrounding environment in mind.
                        </ModalBody>

                        <Center>
                            <Text>*role icon goes here*</Text>
                        </Center>

                        {/* ideally, color would match player color */}
                        <ModalFooter>
                            <Button bgColor='brand.red' mr={3} onClick={onClose}>
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

                        {/* ideally, color would match player color */}
                        <ModalFooter>
                            <Button bgColor='white' color="brand.grey" mr={3} onClick={onClose}>
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

    // Else show an error message 
    else return (

        <Box>
            {/*
            <Button onClick={onOpen}>Error</Button>
            */}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <Center>
                        <ModalBody pb="50" fontWeight="bold">
                            Error
                        </ModalBody>
                    </Center>
                </ModalContent>
            </Modal>
        </Box>
    )
}
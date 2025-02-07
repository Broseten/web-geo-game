// This file contains the modals that will appear during gameplay and voting
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";

// Simplified modal component
interface PlayModalProps {
    title: string;
    message: string[];
    onButtonClick?: () => void; // Optional function to be called when the button is clicked
    facilitatorButtonText?: string;
}

export default function PlayModal({ title, message, facilitatorButtonText, onButtonClick }: PlayModalProps) {
    // TODO allow reopening the info later (will need to store state in parent probably)
    // const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

    return (
        <Modal blockScrollOnMount={true} closeOnOverlayClick={false} isOpen={true} onClose={() => { }} size={'lg'} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                {/* <ModalCloseButton /> */}
                <ModalBody>
                    {message.map((msg, i) => (
                        <Text key={i}>{msg}</Text>
                    ))}
                </ModalBody>
                {/* TODO add multiple messages option (from an array) */}
                {onButtonClick && (
                    <ModalFooter>
                        <Button colorScheme="primary" variant="solid" onClick={onButtonClick}>
                            {facilitatorButtonText}
                        </Button>
                    </ModalFooter>
                )}
            </ModalContent>
        </Modal>
    );
}

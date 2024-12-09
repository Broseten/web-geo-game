import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, } from "@chakra-ui/react";

interface ConfirmationModalProps {
   isOpen: boolean;
   onClose: () => void;
   onConfirm: () => void;
   message: string;
}

export default function ConfirmationModal({ isOpen, onClose, onConfirm, message, }: ConfirmationModalProps) {
   return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader textAlign="center">Confirmation</ModalHeader>
            <ModalBody>
               <Text textAlign="center">{message}</Text>
            </ModalBody>
            <ModalFooter justifyContent="center">
               <Button variant="outline" onClick={onClose}>
                  No
               </Button>
               <Button colorScheme="red" onClick={onConfirm} mr={3}>
                  Yes
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
}

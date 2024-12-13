// Authors: Vojtech Bruza and Grace Houser
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

            {/* Yes or No Button */}
            <ModalFooter justifyContent="center" gap={10}>
               <Button colorScheme="red" onClick={onConfirm}>
                  Yes
               </Button>
               <Button variant="outline" onClick={onClose}>
                  No
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
}

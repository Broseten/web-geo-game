// Authors: Vojtech Bruza and Grace Houser
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface ConfirmationModalProps {
   isOpen: boolean;
   onClose: () => void;
   onConfirm: () => void;
   message: string;
}

export default function ConfirmationModal({ isOpen, onClose, onConfirm, message, }: ConfirmationModalProps) {
   
   const { t } = useTranslation();

   return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader textAlign="center">{t('play.modal.confirmation.confirm')}</ModalHeader>
            <ModalBody>
               <Text textAlign="center">{message}</Text>
            </ModalBody>

            {/* Yes or No Button */}
            <ModalFooter justifyContent="center" gap={10}>
               <Button colorScheme="red" onClick={onConfirm}>
                  {t('play.modal.confirmation.yes')}
               </Button>
               <Button variant="outline" onClick={onClose}>
                  {t('play.modal.confirmation.no')}
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
}

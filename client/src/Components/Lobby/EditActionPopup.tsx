// Authors: Vojtech Bruza and Grace Houser
import {
    Button,
    ButtonGroup,
    FormControl,
    FormLabel,
    Grid,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import { global_icon_colors } from "../../data/DataTypes";
import { useConnection } from "../Contexts/ConnectionContext";
import { useGameRoom } from "../Contexts/GameRoomContext";
import TextInput from "./TextInput";
import { useTranslation } from "react-i18next";

// Props Interface
interface EditActionPopupProps {
    isOpen: boolean;
    onClose: () => void;
    player: {
        name: string;
        color: string;
    };
}

// Main Component
const EditActionPopup: React.FC<EditActionPopupProps> = ({
    isOpen,
    onClose,
    player,
}) => {
    const { updatePlayer, getPlayerData, players } = useGameRoom();
    const [name, setName] = useState(player.name || "");
    const [selectedColor, setSelectedColor] = useState(player.color || "default");
    const firstFieldRef = React.useRef<HTMLInputElement>(null);
    const toast = useToast();
    const { localPlayerID } = useConnection();

    const handleSave = () => {
        if (players.find((p) => p.id !== localPlayerID && p.color === selectedColor)) {
            toast({
                title: "Color taken.",
                status: 'error',
                isClosable: true,
            });
            return;
        }
        const localPlayer = getPlayerData(localPlayerID);
        if (!localPlayer) {
            throw Error("Local player not found");
        }
        localPlayer.color = selectedColor;
        localPlayer.name = name;
        updatePlayer(localPlayer);
        onClose();
    };

    const { t } = useTranslation();

    return (

        <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstFieldRef}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t('lobby.popup.title')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    {/* Name Input */}
                    <TextInput
                        ref={firstFieldRef}
                        id="name-input"
                        label={t('lobby.popup.choose-name')}
                        placeholder={t('lobby.popup.name-placeholder')}
                        fontSize="14px"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {/* Icon Color Selection */}
                    <FormControl mt={4}>
                        <FormLabel>{t('lobby.popup.choose-color')}</FormLabel>
                        <ButtonGroup width="100%">
                            <Grid
                                gap="4px"
                                templateColumns="repeat(auto-fit, minmax(60px, 1fr))"
                                width="100%"
                            >
                                {global_icon_colors.map((color) => (
                                    <Button
                                        // is the color taken by another player?
                                        isDisabled={players.some(p => p.color === color && p.id !== localPlayerID)}
                                        key={color}
                                        bg={`var(--icon-${color})`}
                                        _hover={{ opacity: "0.8" }}
                                        onClick={() => setSelectedColor(color)}
                                        border={
                                            selectedColor === color ? "3px solid black" : "none"
                                        }
                                        height="40px"
                                    />
                                ))}
                            </Grid>
                        </ButtonGroup>
                    </FormControl>
                </ModalBody>

                {/* Save/Cancel Button */}
                <ModalFooter>
                    <Button colorScheme="primary" variant="solid" mr={3} onClick={handleSave}>
                        {t('generic.button.save')}
                    </Button>
                    <Button onClick={onClose}>{t('generic.button.cancel')}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditActionPopup;

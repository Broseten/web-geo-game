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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { socket } from "../../main";
import { useGameRoom } from "../Contexts/GameRoomContext";
import TextInput from "./TextInput";
import { global_icon_colors } from "../../data/data";

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

    const handleSave = () => {
        let localPlayer = getPlayerData(socket.id);
        if (!localPlayer) {
            throw Error("Local player not found");
        }
        localPlayer.color = selectedColor;
        localPlayer.name = name;
        updatePlayer(localPlayer);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstFieldRef}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Name and Icon Color</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    {/* Name Input */}
                    <TextInput
                        ref={firstFieldRef}
                        id="name-input"
                        label="Name"
                        placeholder="Enter your name..."
                        fontSize="14px"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {/* Icon Color Selection */}
                    <FormControl mt={4}>
                        <FormLabel>Choose Icon Color</FormLabel>
                        <ButtonGroup width="100%">
                            <Grid
                                gap="4px"
                                templateColumns="repeat(auto-fit, minmax(60px, 1fr))"
                                width="100%"
                            >
                                {global_icon_colors.map((color) => (
                                    <Button
                                        // is the color taken by another player?
                                        isDisabled={players.some(p => p.color === color && p.id !== socket.id)}
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

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSave}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditActionPopup;

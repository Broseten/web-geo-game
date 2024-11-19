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
import TextInput from "./TextInput";

// Color List
export const ICON_COLORS = ["pink", "red", "orange", "yellow", "green", "blue"];

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
    const [name, setName] = useState(player.name || "");
    const [selectedColor, setSelectedColor] = useState(player.color || "default");
    const firstFieldRef = React.useRef<HTMLInputElement>(null);

    const handleSave = () => {
        console.log("Saved Name:", name);
        console.log("Selected Color:", selectedColor);
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
                                {ICON_COLORS.map((color) => (
                                    <Button
                                        key={color}
                                        bg={`var(--icon-${color})`}
                                        _hover={{ opacity: "0.8" }}
                                        onClick={() => setSelectedColor(color)}
                                        border={
                                            selectedColor === color ? "2px solid black" : "none"
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

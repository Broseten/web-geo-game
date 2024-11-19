import { EditIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, FormControl, FormLabel, Grid, IconButton, Input, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, Stack, useDisclosure } from "@chakra-ui/react";
import React, { MutableRefObject } from "react";
import FocusLock from "react-focus-lock";

// Define prop types for Form
interface PopoverFormProps {
    firstFieldRef: React.RefObject<HTMLInputElement>;
    onCancel: () => void;
}

// Creating the text input component with forwardRef
const TextInput = React.forwardRef<HTMLInputElement, { id: string; label: string; placeholder: string; fontSize: string }>((props, ref) => {
    return (
        <FormControl>
            <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
            <Input ref={ref} {...props} />
        </FormControl>
    );
});

TextInput.displayName = "TextInput"; // Required to properly display the component name in React DevTools

// Form Inputs
const Form: React.FC<PopoverFormProps> = ({ firstFieldRef, onCancel }) => {
    console.log(firstFieldRef);
    return (
        <Stack spacing={4}>
            <FormControl>
                <FormLabel as="legend" pr="0" mr="0" fontSize="18px" fontWeight="bold" color="black">
                    Edit Name and Icon Color
                </FormLabel>

                {/* Edit Name */}
                <TextInput
                    ref={firstFieldRef}
                    fontSize="14px"
                    placeholder="Name..."
                    mb="15px"
                    id="name-input" // Add unique id for accessibility
                />

                {/* Choose Icon Color */}
                <ButtonGroup pr="0" mr="0">
                    <Grid gap="4px" templateColumns="repeat(3, 1fr)">
                        {["pink", "red", "orange", "yellow", "green", "tur", "blue", "purple", "default"].map(color => (
                            <Button key={color} bg={`var(--icon-${color})`} _hover={{ opacity: "0.25" }} />
                        ))}
                    </Grid>
                </ButtonGroup>
            </FormControl>

            {/* Save Button */}
            <ButtonGroup display="flex" justifyContent="flex-end">
                <Button color="brand.teal" borderColor="brand.teal" variant="outline">
                    Save
                </Button>
            </ButtonGroup>
        </Stack>
    );
};

// Popover Component
const EditActionPopup: React.FC = () => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const firstFieldRef = React.useRef<HTMLInputElement>(null);

    return (
        <>
            <Popover
                isOpen={isOpen}
                initialFocusRef={firstFieldRef}
                onOpen={onOpen}
                onClose={onClose}
                placement="right"
                closeOnBlur={false}
            >
                <PopoverTrigger>
                    <IconButton aria-label="Edit user details" size="md" icon={<EditIcon />} />
                </PopoverTrigger>

                <PopoverContent p={5}>
                    <FocusLock returnFocus persistentFocus={false}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <Form firstFieldRef={firstFieldRef} onCancel={onClose} />
                    </FocusLock>
                </PopoverContent>
            </Popover>
        </>
    );
};

export default EditActionPopup;

// Import necessary modules
import { Avatar, Box, Button, ButtonGroup, FormControl, FormLabel, Grid, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, Stack, Tooltip, useDisclosure } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import React from "react";
import FocusLock from "react-focus-lock";
import '../../Theme/theme.css';

// Define prop types for Form
interface FormProps {
    firstFieldRef: React.MutableRefObject<null>;
    onCancel: () => void;
}

// Create the Form component with expected props
const Form: React.FC<FormProps> = ({ firstFieldRef, onCancel }) => {
    console.log(firstFieldRef);
    return (
        <Stack spacing={4} >
            <FormControl pr="0" mr="0">
                <FormLabel as='legend' pr="0" mr="0"
                    fontSize="18px" fontWeight="bold"
                    color="white">
                    Choose Icon Color
                </FormLabel>
                <ButtonGroup pr="0" mr="0">
                    <Grid gap="6px" templateColumns="repeat(3, 1fr)">
                        <Button bg="var(--icon-pink)" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="var(--icon-red)" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="var(--icon-orange)" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="var(--icon-yellow)" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="var(--icon-green)" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="var(--icon-tur)" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="var(--icon-blue)" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="var(--icon-purple)" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="var(--icon-gray)" _hover={{ opacity: "0.25" }}></Button>
                    </Grid>
                </ButtonGroup>
            </FormControl>

            <ButtonGroup display='flex' justifyContent='flex-end'>
                <Button
                    isDisabled
                    bg='white'
                    color="brand.grey"
                    _hover={{ bg: "brand.teal", color: "white" }}
                    onClick={() => {
                        onCancel(); // Close the popover when clicking Save
                    }}>
                    Save
                </Button>
            </ButtonGroup>
        </Stack>
    )
}

// Create the PopoverForm component
const PopoverForm: React.FC = () => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const firstFieldRef = React.useRef(null);

    return (
        <Box>
            <Avatar display='inline-block'></Avatar>

            <Popover
                isOpen={isOpen}
                initialFocusRef={firstFieldRef}
                onOpen={onOpen}
                onClose={onClose}
                placement='right'
                closeOnBlur={false}
            >
                <PopoverTrigger>
                    <EditIcon mt="15px" ml="5px"></EditIcon>
                </PopoverTrigger>

                <PopoverContent p={5}>
                    <FocusLock returnFocus persistentFocus={false}>
                        <PopoverArrow />
                        <PopoverCloseButton color="white" />
                        <Form firstFieldRef={firstFieldRef} onCancel={onClose} />
                    </FocusLock>
                </PopoverContent>
            </Popover>
        </Box>
    )
}

// Main Icon component, accepting you and color props
interface IconProps {
    you: boolean;
    color: string;
}

const Icon: React.FC<IconProps> = ({ you, color }) => {
    // Determine user icon color
    const userColor = `var(--icon-${color || "gray"})`; // default color is gray

    // Returns icon WITH edit feature for yourself
    if (you) {
        return (
            <Box alignSelf="center" ml="10px">
                <PopoverForm />
            </Box>
        );
    }

    // Returns icon with NO edit feature for other players
    else return (
        <Box alignSelf="center" ml="10px" mr="21px">
            <Avatar display='inline-block' bg={userColor}></Avatar>
        </Box>
    );
};

export default Icon;

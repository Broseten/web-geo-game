// Authors: Vojta Bruza and Grace Houser
// Popover form for the user's name and icon color  

import { EditIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, FormControl, FormLabel, Grid, IconButton, Input, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, Stack, useDisclosure } from "@chakra-ui/react";
import React from "react";
import FocusLock from "react-focus-lock";


// Define prop types for Form
interface PopoverFormProps {
    firstFieldRef: React.MutableRefObject<null>;
    onCancel: () => void;
}


// Creating the text input component
const TextInput = React.forwardRef((props, ref) => {
    return (
        <FormControl>
            <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
            <Input ref={ref} id={props.id} {...props} />
        </FormControl>
    )
})


// Form Inputs
const Form = ({ firstFieldRef, onCancel }) => {

    console.log(firstFieldRef);
    return (
        <Stack spacing={4}>
            <FormControl>

                <FormLabel as='legend' pr="0" mr="0"
                    fontSize="18px" fontWeight="bold"
                    color="black">
                    Edit Name and Icon Color
                </FormLabel>

                {/* Edit Name */}
                <TextInput
                    ref={firstFieldRef}
                    fontSize="14px"
                    placeholder='Name...'
                    mb="15px"
                />

                {/* Choose Icon Color */}
                <ButtonGroup pr="0" mr="0">
                    <Grid gap="4px" templateColumns="repeat(3, 1fr)">
                        <Button bg="var(--icon-pink)" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="var(--icon-red)" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="var(--icon-orange)" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="var(--icon-yellow)" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="var(--icon-green)" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="var(--icon-tur)" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="var(--icon-blue)" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="var(--icon-purple)" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="var(--icon-default)" _hover={{ opacity: "0.25" }}></Button>
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
    )
}


// 3. Create the Popover
// Ensure you set `closeOnBlur` prop to false so it doesn't close on outside click
const EditActionPopup = () => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const firstFieldRef = React.useRef(null)

    return (
        <>
            <Popover
                isOpen={isOpen}
                initialFocusRef={firstFieldRef}
                onOpen={onOpen}
                onClose={onClose}
                placement='right'
                closeOnBlur={false}
            >
                <PopoverTrigger>
                    <IconButton aria-label='Search database' size='md'
                        icon={<EditIcon />} />
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
    )
}


// returns the Popover form
export default function EditActionPopup() {
    return (<EditActionPopup />)
}

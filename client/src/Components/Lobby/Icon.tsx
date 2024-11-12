// Authors: Vojta Bruza and Grace Houser
// This file has different icon options for 
// the lobby screen

import { Avatar, Box, Button, ButtonGroup, FormControl, FormLabel, Grid, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, Stack, useDisclosure } from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons";
import React from "react";
import FocusLock from "react-focus-lock";
import '../../Theme/theme.css'; 


// Create the form
// TODO - this throws and error and idk why 
const Form = ({ firstFieldRef, onCancel }) => {
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
                {/* TODO - disabled unless new color is clicked */}
                <Button
                    isDisabled
                    bg='white'
                    color="brand.grey"
                    _hover={{ bg: "brand.teal", color: "white" }}
                    onClick={() => {
                        // TODO - set avatar color to selected color
                    }}>
                    Save
                </Button>
            </ButtonGroup>
        </Stack>
    )
}

// Create the Popover
// Ensure you set `closeOnBlur` prop to false so it doesn't close on outside click
const PopoverForm = () => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const firstFieldRef = React.useRef(null)

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
                        {/* TODO - this throws and error and idk why  */}
                        <Form firstFieldRef={firstFieldRef} onCancel={onClose} />
                    </FocusLock>
                </PopoverContent>
            </Popover>
        </Box>
    )
}

// TODO - set "you" as type boolean to get rid of error 
export default function Icon({ you, color }) {

    const isYou = you;
    const isOther = !you;

    // determine user icon color
    // TODO - make the default gray 
    const userColor = "var(--icon-" + color + ")"; // default color is grey

    // returns icon WITH edit feature for yourself 
    if (isYou) {
        return (
            <Box alignSelf="center" ml="10px">
                <PopoverForm />
            </Box>
        )
    }

    // returns icon with NO edit feature for other players 
    if (isOther) {
        return (
            <Box alignSelf="center" ml="10px" mr="21px">
                <Avatar display='inline-block' bg={userColor}></Avatar>
            </Box>
        )
    }

    else return (
        <Box>Error</Box>
    )
}

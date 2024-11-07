import { Avatar, AvatarBadge, Box, Button, ButtonGroup, FormControl, FormLabel, Grid, HStack, IconButton, Input, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, Radio, RadioGroup, Stack, VStack, useDisclosure } from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons";
import React from "react";
import FocusLock from "react-focus-lock";


// Create the form
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
                    <Grid
                        gap="6px"
                        templateColumns="repeat(3, 1fr)"
                    >
                        <Button bg="#FF69B4" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="#e81416" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="#ffa500" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="#faeb36" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="#79c314" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="#40E0D0" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="#487de7" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="purple.400" _hover={{ opacity: "0.25" }}></Button>
                        <Button bg="gray.400" _hover={{ opacity: "0.25" }}></Button>
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
        <Box alignSelf="center" ml="10px">
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

export default function POF() {
    return (
        <PopoverForm></PopoverForm>
    )
}

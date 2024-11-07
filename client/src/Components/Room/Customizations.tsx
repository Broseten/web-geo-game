import { Box, Button, Center, Checkbox, CheckboxGroup, Grid, Image, Input, InputGroup, InputLeftElement, Select, Stack, Text, VStack } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import { useState } from "react";
//import {roomName} from './CreateRoom';

export default function Customizations() {
    const { setCurrentScreen } = useScreenSelection();

    const [roomName, setRoomName] = useState('');
    const time = 400;
    const budget = 100000;


    return (
        <VStack>

            {/* Name Room */}
            <Text fontSize="l" color="brand.grey">
                Name your room in the textbox below
            </Text>

            <Input
                value={roomName}
                onChange={(event) => setRoomName(event.target.value)}
                maxWidth="300"
                outlineColor="brand.teal"
                color="brand.teal"
                placeholder='Enter room name...'
                _placeholder={{ color: 'brand.teal' }}
                mb="100px"
            />

            {/* Pick Location */}
            <Text fontSize="l" color="brand.grey">
                Choose a map from the dropdown below
            </Text>

            <Select mb="100px" maxWidth="300" bg="brand.teal"
                placeholder='Select map...'>
                <option value='ballina'>    Ballina</option>
                <option value='cork'>       Cork</option>
                <option value='dublin'>     Dublin</option>
                <option value='galway'>     Galway</option>
                <option value='limerick'>   Limerick</option>
                <option value='waterford'>  Waterford</option>
            </Select>


            {/* Select Solutions */}
            <Text fontSize="l" color="brand.grey">
                Select solutions from the options below
            </Text>

            {/* Checkboxes for the solutions */}
            <Box mb="100px" ml="2" mr="2"
                pt="2" pb="2" pl="2" pr="2"
                bg="white" rounded="md" color="brand.grey">
                <CheckboxGroup colorScheme='orange'
                    defaultValue={['garden', 'pavillion', 'structure', 'spaces', 'mapping', 'humanplace']}>

                    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                        {/* TODO - all creator solutions go here*/}
                        <Checkbox borderColor="orange" value='garden'>       Digitally Fabricated Vegetable Garden</Checkbox>
                        <Checkbox borderColor="orange" value='pavillion'>    Small Scale Pavillion Structure</Checkbox>
                        <Checkbox borderColor="orange" value='structure'>    Temporary Structures from Recycled Material</Checkbox>
                        <Checkbox borderColor="orange" value='spaces'>       Reactivation of Open Spaces through NBS</Checkbox>
                        <Checkbox borderColor="orange" value='mapping'>      Projection Mapping on Kinetic Surfaces</Checkbox>
                        <Checkbox borderColor="orange" value='humanplace'>   AR Enriched Human-place Interaction</Checkbox>
                    </Grid>
                </CheckboxGroup>
            </Box>


            {/* Select Roles */}
            <Text fontSize="l" color="brand.grey">
                Select roles from the options below
            </Text>

            {/* TODO - make box scrollable */}
            <Box mb="100px" ml="10" mr="10"
                pt="2" pb="2" pl="2" pr="2"
                bg="white" rounded="md" color="red">
                {/* TODO - role options go here */}
                Options Go Here
            </Box>


            {/* Enter Time */}
            <Text fontSize="l" color="brand.grey">
                Time per round
            </Text>

            <Center>
                <InputGroup>
                    <Input
                        borderColor="brand.teal"
                        bg="brand.off"
                        color="brand.teal"
                        placeholder='Enter in seconds...'
                        _placeholder={{ color: 'brand.teal' }}
                        _hover={{ borderWidth: "2px" }}
                        maxWidth="300"
                        mb="100px"

                    // TODO - set time variable 
                    // value={time}
                    // onChange={(event) => setPlayerName(event.target.value)}
                    ></Input>
                </InputGroup>
            </Center>


            {/* Enter Budget */}
            <Text fontSize="l" color="brand.grey">
                Budget per team
            </Text>

            <Center>
                <InputGroup>
                    <Input
                        borderColor="brand.teal"
                        bg="brand.off"
                        color="brand.teal"
                        placeholder='Enter in euros...'
                        _placeholder={{ color: 'brand.teal' }}
                        _hover={{ borderWidth: "2px" }}
                        maxWidth="300"
                        mb="50"

                    // TODO - set time variable 
                    // value={budget}
                    // onChange={(event) => setPlayerName(event.target.value)}
                    ></Input>
                </InputGroup>
            </Center>
        </VStack >
    );
}

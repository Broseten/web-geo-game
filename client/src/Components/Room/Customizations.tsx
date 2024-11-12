// Authors: Vojta Bruza and Grace Houser
// This file displays a grid of the different customizations  
// for when the facilitator creates a room

import { Box, Center, Checkbox, CheckboxGroup, Grid, Input, InputGroup, Select, SimpleGrid, Text } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import { useState } from "react";
//import {roomName} from './CreateRoom';

export default function Customizations() {
    const { setCurrentScreen } = useScreenSelection();

    const [roomName, setRoomName] = useState('');
    const time = 400;
    const budget = 100000;


    return (
        <SimpleGrid spacing={10} minChildWidth={250}>

            {/* Name Room */}
            <Box bg="white" h="200px" p="20px">
                <Text fontSize="l" color="brand.grey" fontWeight="bold"
                    lineHeight="1.15" pb="15px">
                    Name your room in the textbox below
                </Text>

                <InputGroup>
                        <Input
                            borderColor="brand.teal"
                            color="brand.teal"
                            placeholder='Room name...'
                            _placeholder={{ color: 'brand.teal', fontSize: "14px" }}
                            fontSize="14px"
                            _hover={{ borderWidth: "2px" }}
                            maxWidth="300"
                            mb="50"

                        // TODO - set time variable 
                        // value={roomName}
                        // onChange={(event) => setRoomName(event.target.value)}
                        ></Input>
                    </InputGroup>
            </Box>



            {/* Pick Location */}
            <Box bg="white" h="200px" p="20px">
                <Text fontSize="l" color="brand.grey" fontWeight="bold"
                    lineHeight="1.15" pb="15px">
                    Choose a map from the dropdown below
                </Text>

                <Select mb="100px" minWidth="200" bg="brand.teal" fontSize="14px"
                    placeholder='Select map...'>
                    <option value='ballina'>    Ballina</option>
                    <option value='cork'>       Cork</option>
                    <option value='dublin'>     Dublin</option>
                    <option value='galway'>     Galway</option>
                    <option value='limerick'>   Limerick</option>
                    <option value='waterford'>  Waterford</option>
                </Select>
            </Box>



            {/* Select Solutions */}
            <Box bg="lightblue" p="20px" minWidth="600px">
                <Text fontSize="l" color="brand.grey" fontWeight="bold"
                    lineHeight="1.15" pb="15px">
                    Select solutions from the options below
                </Text>

                {/* Checkboxes for the solutions */}
                <Box ml="2" mr="2"
                    pt="2" pb="2" pl="2" pr="2"
                    bg="white" rounded="md" color="brand.grey"
                    minWidth="500px"
                    >
                    <CheckboxGroup colorScheme='orange'
                        defaultValue={['garden', 'pavillion', 'structure', 'spaces', 'mapping', 'humanplace']}>

                        <Grid templateColumns='repeat(2, 1fr)' gap={6} lineHeight="1.15">
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
            </Box>



            {/* Select Roles */}
            <Box bg="white" h="200px" p="20px">
                <Text fontSize="l" color="brand.grey" fontWeight="bold"
                    lineHeight="1.15" pb="15px">
                    Select roles from the options below
                </Text>

                {/* TODO - make box scrollable */}
                <Box mb="100px" ml="10" mr="10"
                    pt="2" pb="2" pl="2" pr="2"
                    bg="white" rounded="md" color="red">
                    {/* TODO - role options go here */}
                    Options Go Here
                </Box>
            </Box>


            {/* Enter Time */}
            <Box bg="white" h="200px" p="20px">
                <Text fontSize="l" color="brand.grey" fontWeight="bold"
                    lineHeight="1.15" pb="15px">
                    Time per round
                </Text>

                <Center>
                    <InputGroup>
                        <Input
                            borderColor="brand.teal"
                            color="brand.teal"
                            placeholder='Enter in seconds...'
                            _placeholder={{ color: 'brand.teal', fontSize: "14px" }}
                            fontSize="14px"
                            _hover={{ borderWidth: "2px" }}
                            maxWidth="300"
                            mb="100px"

                        // TODO - set time variable 
                        // value={time}
                        // onChange={(event) => setPlayerName(event.target.value)}
                        ></Input>
                    </InputGroup>
                </Center>
            </Box>


            {/* Enter Budget */}
            <Box bg="white" h="200px" p="20px">
                <Text fontSize="l" color="brand.grey" fontWeight="bold"
                    lineHeight="1.15" pb="15px">
                    Budget per team
                </Text>

                <Center>
                    <InputGroup>
                        <Input
                            borderColor="brand.teal"
                            color="brand.teal"
                            placeholder='Enter in euros...'
                            _placeholder={{ color: 'brand.teal', fontSize: "14px" }}
                            fontSize="14px"
                            _hover={{ borderWidth: "2px" }}
                            maxWidth="300"
                            mb="50"

                        // TODO - set time variable 
                        // value={budget}
                        // onChange={(event) => setPlayerName(event.target.value)}
                        ></Input>
                    </InputGroup>
                </Center>
            </Box>
        </SimpleGrid >
    );
}

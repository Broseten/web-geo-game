import { Box, Button, Center, Checkbox, CheckboxGroup, Grid, Image, Input, InputGroup, InputLeftElement, Select, Stack, Text, VStack } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import { useState } from "react";
import { RepeatClockIcon } from "@chakra-ui/icons";
//import {roomName} from './CreateRoom';

export default function Customizations() {
    const { setCurrentScreen } = useScreenSelection();
    const [isLocationPicked, setIsLocationPicked] = useState(false);
    const [areSolutionsSelected, setAreSolutionsSelected] = useState(false);
    const [areRolesSelected, setAreRolesSelected] = useState(false);
    const [isTimeBudgetSelected, setIsTimeBudgetSelected] = useState(false);
    const time = 400;
    const budget = 100000;


    // conditional statements for the middle display of the Customize Room page screen 

    {/* Pick Location */ }
    if (!isLocationPicked && !areSolutionsSelected && !areRolesSelected && !isTimeBudgetSelected) {
        return (
            <Box>
                <Text pb="75" fontSize="l" color="brand.grey">
                    Choose a map from the dropdown below
                </Text>


                {/* Select menu for map */}
                <Select mb="100" maxWidth="300" bg="brand.teal"

                    placeholder='Select map...'>
                    <option value='ballina'>    Ballina</option>
                    <option value='dublin'>     Dublin</option>
                    <option value='option3'>    Option 3</option>
                </Select>


                {/* Next button */}
                <Center>
                    <Button bg="white" color='brand.teal' variant="solid"
                        onClick={() => {
                            // TO DO - save location info

                            // location is picked
                            setIsLocationPicked(true);
                        }}>
                        Next
                    </Button>
                </Center>
            </Box>
        )
    }



    {/* Select Solutions */ }
    if (isLocationPicked && !areSolutionsSelected && !areRolesSelected && !isTimeBudgetSelected) {
        return (
            <Box>
                <Center>
                    <Text pb="70" fontSize="l" color="brand.grey">
                        Select solutions from the options below
                    </Text>
                </Center>


                {/* Checkboxes for the solutions */}
                <Box mb="10" ml="10" mr="10"
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


                {/* Next button */}
                <Center>
                    <Button bg="white" color='brand.teal' variant="solid"
                        onClick={() => {
                            // TODO - save solution info

                            // solutions are selected
                            setAreSolutionsSelected(true);
                        }}>
                        Next
                    </Button>
                </Center>
            </Box>
        )
    }



    {/* Select Roles */ }
    if (isLocationPicked && areSolutionsSelected && !areRolesSelected && !isTimeBudgetSelected) {
        return (
            <Box>
                <Text pb="70" fontSize="l" color="brand.grey">
                    Select roles from the options below
                </Text>


                {/* Checkboxes for the roles */}
                {/* TODO - make box scrollable */}
                <Box mb="10" ml="10" mr="10"
                    pt="2" pb="2" pl="2" pr="2"
                    bg="white" rounded="md" color="red">
                    {/* TODO - role options go here */}
                    Options Go Here
                </Box>


                {/* Next button */}
                <Center>
                    <Button bg="white" color='brand.teal' variant="solid"
                        onClick={() => {
                            // TODO - save role info

                            // roles are selected
                            setAreRolesSelected(true);
                        }}>
                        Next
                    </Button>
                </Center>
            </Box>
        )
    }



    // Select time and team budget restraint 
    else return (
        <Box>
            <Text pb="50" fontSize="l" color="brand.grey">
                Select time limit for rounds and budget for teams
            </Text>


            {/* Eneters time */}
            <Text pb="1" fontSize="l" fontWeight="bold" color="brand.grey">
                Time per round
            </Text>
            <InputGroup>
                <Input
                    borderColor="brand.teal"
                    bg="brand.off"
                    color="brand.grey"
                    placeholder='Enter in seconds...'
                    _placeholder={{ color: 'brand.teal' }}
                    _hover={{ borderWidth: "2px" }}
                    mb="50"

                // TODO - set time variable 
                // value={time}
                // onChange={(event) => setPlayerName(event.target.value)}
                ></Input>
            </InputGroup>


            {/* Eneters time */}
            <Text pb="1" fontSize="l" fontWeight="bold" color="brand.grey">
                Budget per team
            </Text>
            <InputGroup>
                <Input
                    borderColor="brand.teal"
                    bg="brand.off"
                    color="brand.grey"
                    placeholder='Enter in euros...'
                    _placeholder={{ color: 'brand.teal'}}
                    _hover={{ borderWidth: "2px" }}
                    mb="50"

                // TODO - set time variable 
                // value={budget}
                // onChange={(event) => setPlayerName(event.target.value)}
                ></Input>
            </InputGroup>


            {/* This button creates the room and goes to the lobby */}
            <Center>
                <Button
                    bg="brand.teal" color='white' variant="solid"
                    _hover={{bg: "brand.off", color: "brand.teal"}}
                    onClick={() => {
                        // create room

                        // go to lobby
                        setCurrentScreen('lobby');
                    }}>
                    Done
                </Button>
            </Center>
        </Box>
    );
}

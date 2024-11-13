// Authors: Vojta Bruza and Grace Houser
// This file displays a grid of the different customizations  
// for when the facilitator creates a room

import { Box, Button, Center, Checkbox, CheckboxGroup, Grid, Input, InputGroup, Select, Text, VStack } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import { useState } from "react";
import '../../Theme/theme.css';
import MapSelection from "./MapAreaSelection";
import { socket } from "../../main";
import initSocket from "../../Hooks/useSocket";

export default function Customizations() {
    const { setCurrentScreen } = useScreenSelection();

    const [roomName, setRoomName] = useState('');
    const time = 400;
    const budget = 100000;

    initSocket('room-assigned', (roomID: string) => {
        setCurrentScreen('lobby');
        console.log("joined room: " + roomID);
     });

    return (
        <VStack align="left">

            {/* Name Room */}
            <Box pb="20px">
                <Text className="h2" color="brand.grey">
                    Name your room in the textbox
                </Text>

                <InputGroup>
                    <Input
                        borderColor="brand.teal"
                        color="brand.teal"
                        placeholder='Room name...'
                        _placeholder={{ color: 'brand.teal', fontSize: "14px" }}
                        fontSize="14px"
                        _hover={{ borderWidth: "2px" }}

                    // TODO - set room name variable 
                    // value={roomName}
                    // onChange={(event) => setRoomName(event.target.value)}
                    ></Input>
                </InputGroup>
            </Box>



            {/* Pick Location */}
            <Box pb="20px">
                <Text className="h2" color="brand.grey">
                    Choose a map from the dropdown
                </Text>

                <Box h="400px">
                    <MapSelection />
                </Box>
                {/* TODO - insert map here
                <Select bg="brand.teal" fontSize="14px"
                    placeholder='Select map...'>
                    <option value='ballina'>    Ballina</option>
                    <option value='cork'>       Cork</option>
                    <option value='dublin'>     Dublin</option>
                    <option value='galway'>     Galway</option>
                    <option value='limerick'>   Limerick</option>
                    <option value='waterford'>  Waterford</option>
                </Select> */}
            </Box>



            {/* Select Solutions */}
            <Box pb="20px">
                <Text className="h2" color="brand.grey">
                    Select solutions from the options
                </Text>

                {/* Checkboxes for the solutions */}
                <CheckboxGroup colorScheme='orange'
                    defaultValue={['garden', 'pavillion', 'structure', 'spaces', 'mapping', 'humanplace']}>

                    <Grid color="brand.grey">
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
            <Box pb="20px">
                <Text className="h2" color="brand.grey">
                    Select roles from the options
                </Text>

                {/* Checkboxes for the roles */}
                <CheckboxGroup colorScheme='orange'
                    defaultValue={['leader', 'developer', 'elder', 'environ', 'historian', 'ngo', 'officer', 'politician', 'young', 'other']}>

                    <Grid color="brand.grey">
                        {/* TODO - all creator solutions go here*/}
                        <Checkbox borderColor="orange" value='leader'>      Community Leader</Checkbox>
                        <Checkbox borderColor="orange" value='developer'>   Developer</Checkbox>
                        <Checkbox borderColor="orange" value='elder'>       Elder</Checkbox>
                        <Checkbox borderColor="orange" value='environ'>     Environmentalist</Checkbox>
                        <Checkbox borderColor="orange" value='historian'>   Historian</Checkbox>
                        <Checkbox borderColor="orange" value='ngo'>         Non-government Organization</Checkbox>
                        <Checkbox borderColor="orange" value='officer'>     Officer</Checkbox>
                        <Checkbox borderColor="orange" value='politician'>  Politician</Checkbox>
                        <Checkbox borderColor="orange" value='young'>       Young Person</Checkbox>
                        <Checkbox borderColor="orange" value='other'>       Other</Checkbox>
                    </Grid>
                </CheckboxGroup>
            </Box>



            {/* Enter Time */}
            <Box pb="20px">
                <Text className="h2" color="brand.grey">
                    Time per round
                </Text>

                <InputGroup>
                    <Input
                        borderColor="brand.teal"
                        color="brand.teal"
                        placeholder='Enter in seconds...'
                        _placeholder={{ color: 'brand.teal', fontSize: "14px" }}
                        fontSize="14px"
                        _hover={{ borderWidth: "2px" }}

                    // TODO - set time variable 
                    // value={time}
                    // onChange={(event) => setPlayerName(event.target.value)}
                    ></Input>
                </InputGroup>
            </Box>



            {/* Enter Budget */}
            <Box pb="20px">
                <Text className="h2" color="brand.grey">
                    Budget per team
                </Text>

                <InputGroup>
                    <Input
                        borderColor="brand.teal"
                        color="brand.teal"
                        placeholder='Enter in euros...'
                        _placeholder={{ color: 'brand.teal', fontSize: "14px" }}
                        fontSize="14px"
                        _hover={{ borderWidth: "2px" }}

                    // TODO - set budget variable 
                    // value={budget}
                    // onChange={(event) => setPlayerName(event.target.value)}
                    ></Input>
                </InputGroup>
            </Box>



            {/* This button creates the room and goes to its lobby */}
            <Center>
                <Button //className="dark-button" 
                    bg='brand.teal' color="white" variant='outline'
                    _hover={{ bg: "white", color: "brand.teal", borderColor: "brand.teal", borderWidth: "2px" }}
                    onClick={() => {
                        // TODO first check if the polygon in the polygon context is null
                        //      if it is null, assign approximate rectangular location from the map visible area

                        socket.emit('create-room');
                    }}>
                    {/* TODO - make roomName appear */}
                    Create {roomName}
                </Button>
            </Center>
        </VStack >
    );
}

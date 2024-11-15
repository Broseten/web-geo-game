// Authors: Vojta Bruza and Grace Houser
// This file displays a grid of the different customizations  
// for when the facilitator creates a room

import { Box, Button, Center, Checkbox, CheckboxGroup, Grid, Input, InputGroup, Select, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import '../../Theme/theme.css';
import MapSelection from "./MapAreaSelection";
import { socket } from "../../main";
import initSocket from "../../Hooks/useSocket";
import { RoomJoined } from "../../data/DataTypes";

export default function Customizations() {
    // room input variables  
    const [roomName, setRoomName] = useState('');
    const [time, setTime] = useState<number>(0);
    const [budget, setBudget] = useState<number>(0);

    // room solution variables 
    const solutionsList = [
        'Digitally Fabricated Vegetable Garden',
        'Small Scale Pavillion Structure',
        'Temporary Structures from Recycled Material',
        'Reactivation of Open Spaces through NBS',
        'Projection Mapping on Kinetic Surfaces',
        'AR Enriched Human-place Interaction'
    ];
    const [checkedSolutions, setCheckedSolutions] = useState<boolean[]>(Array.from(solutionsList.map(() => false)));

    // room role variables 
    const [roles, setRoles] = useState<string[]>([]);


    initSocket('room-created', (roomID: string) => {
        socket.emit('join-room', roomID);
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
                        // set room name variable 
                        value={roomName}
                        onChange={(event) => setRoomName(event.target.value)}
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
            </Box>



            {/* Select Solutions */}
            <Box pb="20px">
                <Text className="h2" color="brand.grey">
                    Select solutions from the options
                </Text>

                {/* Solution Checkboxes */}
                <CheckboxGroup colorScheme='orange'>
                    {
                        solutionsList
                        &&
                        solutionsList.map((solution, index) => (
                            <Checkbox borderColor="orange" color="brand.grey" value={'solution ' + index}
                                key={index}
                                isChecked={checkedSolutions[index]}
                                onChange={(e) =>
                                    setCheckedSolutions([
                                        ...checkedSolutions.slice(0, index),
                                        e.target.checked,
                                        ...checkedSolutions.slice(index + 1)
                                    ])
                                }
                            >
                                {solution}
                            </Checkbox>
                        ))
                    }
                </CheckboxGroup>
            </Box>



            {/* Select Roles */}
            <Box pb="20px">
                <Text className="h2" color="brand.grey">
                    Select roles from the options
                </Text>

                {/* Role Checkboxes */}
                <CheckboxGroup colorScheme='orange'
                    defaultValue={['role 1', 'role 2', 'role 3', 'role 4', 'role 5', 'role 6', 'role 7', 'role 8', 'role 9', 'other']}>

                    <Grid color="brand.grey">
                        {/* TODO - all creator solutions go here*/}
                        <Checkbox borderColor="orange" value='role 1'>      Community Leader</Checkbox>
                        <Checkbox borderColor="orange" value='role 2'>      Developer</Checkbox>
                        <Checkbox borderColor="orange" value='role 3'>      Elder</Checkbox>
                        <Checkbox borderColor="orange" value='role 4'>      Environmentalist</Checkbox>
                        <Checkbox borderColor="orange" value='role 5'>      Historian</Checkbox>
                        <Checkbox borderColor="orange" value='role 6'>      Non-government Organization</Checkbox>
                        <Checkbox borderColor="orange" value='role 7'>      Officer</Checkbox>
                        <Checkbox borderColor="orange" value='role 8'>      Politician</Checkbox>
                        <Checkbox borderColor="orange" value='role 9'>      Young Person</Checkbox>
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
                        // set time variable 
                        type="number"
                        value={time}
                        onChange={(event) => setTime(Number(event.target.value))}
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
                        // set budget variable 
                        type="number"
                        value={budget}
                        onChange={(event) => setBudget(Number(event.target.value))}
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

                        // TODO send all the data
                        const roomData: RoomJoined = {
                            name: roomName,
                            polygon: undefined,
                            solutionIDs: ["solution 1", "solution 2", "solution 3"],
                            roles: ["role 1", "role 2", "role 3", "role 4"],
                            timePerRound: time,
                            initialBudget: budget,
                            budgetPerRound: budget
                        };
                        socket.emit('create-room', roomData);
                    }}>
                    {/* TODO - make roomName appear */}
                    Create {roomName}
                </Button>
            </Center>
        </VStack >
    );
}

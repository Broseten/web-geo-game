// Authors: Vojta Bruza and Grace Houser
// This file displays a grid of the different customizations  
// for when the facilitator creates a room

import { Box, Button, Center, Checkbox, CheckboxGroup, Grid, Input, InputGroup, Text, VStack } from "@chakra-ui/react";
import L from "leaflet";
import { useRef, useState } from "react";
import initSocket from "../../Hooks/useSocket";
import '../../Theme/theme.css';
import { RoomJoined } from "../../data/DataTypes";
import { socket } from "../../main";
import { usePolygon } from "../Contexts/PolygonContext";
import MapAreaSelection, { MapAreaSelectionRef } from "./MapAreaSelection";

export default function Customizations() {
    // room input variables  
    const [roomName, setRoomName] = useState('');
    const [time, setTime] = useState<number>(0);
    const [budget, setBudget] = useState<number>(0);
    const { polygon: mapPolygon } = usePolygon();
    const mapSelectionRef = useRef<MapAreaSelectionRef>(null);

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
    const rolesList = [
        'Community Leader',
        'Developer',
        'Elder',
        'Environmentalist',
        'Historian',
        'Non-government Organization',
        'Officer',
        'Politician',
        'Young Person',
        'Other'
    ];
    const [checkedRoles, setCheckedRoles] = useState<boolean[]>(Array.from(rolesList.map(() => false)));

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
                    <MapAreaSelection ref={mapSelectionRef} />
                </Box>
            </Box>



            {/* Select Solutions */}
            <Box pb="20px">
                <Text className="h2" color="brand.grey">
                    Select solutions from the options
                </Text>

                {/* Solution Checkboxes */}
                <CheckboxGroup colorScheme='orange'>
                    <VStack align="left" gap="0">
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
                    </VStack>
                </CheckboxGroup>
            </Box>



            {/* Select Roles */}
            <Box pb="20px">
                <Text className="h2" color="brand.grey">
                    Select roles from the options
                </Text>

                {/* Role Checkboxes */}
                <CheckboxGroup colorScheme='orange'>
                    <VStack align="left" gap="0">
                        {
                            rolesList
                            &&
                            rolesList.map((role, index) => (
                                <Checkbox borderColor="orange" color="brand.grey" value={'role ' + index}
                                    key={index}
                                    isChecked={checkedRoles[index]}
                                    onChange={(e) =>
                                        setCheckedRoles([
                                            ...checkedRoles.slice(0, index),
                                            e.target.checked,
                                            ...checkedRoles.slice(index + 1)
                                        ])
                                    }
                                >
                                    {role}
                                </Checkbox>
                            ))
                        }
                    </VStack>
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



            {/* Creates the room and goes into lobby */}
            <Center>
                <Button //className="dark-button" 
                    bg='brand.teal' color="white" variant='outline'
                    _hover={{ bg: "white", color: "brand.teal", borderColor: "brand.teal", borderWidth: "2px" }}
                    onClick={() => {
                        let polygon = mapPolygon;
                        // Set polygon from view bounds if userPolygon is not set
                        // first check if the polygon in the polygon context is null
                        // if it is null, assign rectangular location from the map visible area
                        if (polygon === null) {
                            const map = mapSelectionRef?.current?.getMapInstance();
                            if (map) {
                                const bounds = map.getBounds();
                                const corners = [
                                    bounds.getSouthWest(),
                                    bounds.getNorthWest(),
                                    bounds.getNorthEast(),
                                    bounds.getSouthEast(),
                                ];
                                polygon = L.polygon(corners);
                                console.log(polygon);
                            }
                        }

                        // TODO correctly set all the data
                        const roomData: RoomJoined = {
                            name: roomName,
                            polygonLatLngs: polygon?.getLatLngs(),
                            solutionIDs: ["solution 1", "solution 2", "solution 3"],
                            roles: ["role 1", "role 2", "role 3", "role 4"],
                            timePerRound: time,
                            initialBudget: budget,
                            budgetPerRound: budget
                        };
                        socket.emit('create-room', roomData);
                    }}>
                    Create {roomName}
                </Button>
            </Center>
        </VStack >
    );
}

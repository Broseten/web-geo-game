// Authors: Vojta Bruza and Grace Houser
// This file displays a grid of the different customizations  
// for when the facilitator creates a room

import { Box, Button, Center, Checkbox, CheckboxGroup, Input, InputGroup, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, VStack } from "@chakra-ui/react";
import L from "leaflet";
import { useRef, useState } from "react";
import initSocket from "../../Hooks/useSocket";
import '../../Theme/theme.css';
import { RoomJoined } from "../../data/DataTypes";
import { socket } from "../../main";
import { usePolygon } from "../Contexts/PolygonContext";
import MapAreaSelection, { MapAreaSelectionRef } from "./MapAreaSelection";
import { global_roles, global_solutions, maxPlayers as global_maxPlayers } from "../../data/data";
import RoleSelector from "./RoleSelector";
import NumSlider from "./NumSlider";

export default function Customizations() {
    // room input variables  
    const [roomName, setRoomName] = useState('');
    // TODO use a different way of setting time per round?
    const [time, setTime] = useState(0);
    // TODO default values from a file?
    const [initialBudget, setInitialBudget] = useState<number>(0);
    const [budgetPerRound, setBudgetPerRound] = useState<number>(0);
    const { polygon: mapPolygon } = usePolygon();
    const mapSelectionRef = useRef<MapAreaSelectionRef>(null);
    const [checkedSolutions, setCheckedSolutions] = useState<Record<string, boolean>>(
        () =>
            global_solutions.reduce((acc, solution) => {
                acc[solution.id] = true;
                return acc;
            }, {} as Record<string, boolean>)
    );

    // Toggle the checked state of a solution
    const toggleSolution = (id: string) => {
        setCheckedSolutions((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const roleSelectorRef = useRef<{ getSelectedRoles: () => string[] }>(null);

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
                            global_solutions?.map((solution) => (
                                <Checkbox
                                    borderColor="orange"
                                    color="brand.grey"
                                    key={solution.id}
                                    isChecked={checkedSolutions[solution.id]}
                                    onChange={() => toggleSolution(solution.id)}
                                >
                                    {solution.name}
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

                <RoleSelector ref={roleSelectorRef} />
            </Box>

            {/* Enter Time */}
            <Box pb="20px">
                <Text className="h2" pb="0" color="brand.grey">Time per round</Text>
                <Text fontSize="14px" color="brand.grey">{time} seconds</Text>

                <NumSlider value={time} onChange={setTime} min={0} max={300} />
            </Box>

            {/* Initial Budget */}
            <Box pb="20px">
                <Text className="h2" pb="0" color="brand.grey">Initial budget</Text>

                <NumberInput value={"€" + initialBudget} onChange={(valueString) => setInitialBudget(Number(valueString))}
                    defaultValue={0} min={0} max={10000} step={50}>
                    <NumberInputField />
                    <NumberInputStepper >
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Box>

            {/* Budget Per Round */}
            <Box pb="20px">
                <Text className="h2" pb="0" color="brand.grey">Budget per round</Text>

                <NumberInput value={"€" + budgetPerRound} onChange={(valueString) => setBudgetPerRound(Number(valueString))}
                    defaultValue={0} min={0} max={10000} step={50}>
                    <NumberInputField />
                    <NumberInputStepper >
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
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
                            }
                        }

                        let roles = roleSelectorRef.current?.getSelectedRoles();
                        if (!roles) {
                            roles = global_roles.slice(0, global_maxPlayers);
                        } else if (roles.length === 0 && global_roles.length > 0) {
                            roles.push(global_roles[0]);
                        }

                        // set all the data that go to the server
                        const roomData: RoomJoined = {
                            name: roomName,
                            polygonLatLngs: polygon?.getLatLngs(),
                            solutionIDs: Object.keys(checkedSolutions).filter((id) => checkedSolutions[id]),
                            roles: roles,
                            timePerRound: time,
                            initialBudget: initialBudget,
                            budgetPerRound: budgetPerRound
                        };
                        socket.emit('create-room', roomData);
                    }}>
                    Create {roomName}
                </Button>
            </Center>
        </VStack >
    );
}

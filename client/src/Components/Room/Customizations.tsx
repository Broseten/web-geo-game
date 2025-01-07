// Authors: Vojta Bruza and Grace Houser
// Displays all room customizations a facilitator can choose

// src/components/Customizations.tsx
import { Box, Button, Center, Checkbox, CheckboxGroup, Input, InputGroup, Text, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import L from "leaflet";
import initSocket from "../../Hooks/useSocket";
import { socket } from "../../main";
import { usePolygon } from "../Contexts/PolygonContext";
import MapAreaSelection, { MapAreaSelectionRef } from "./MapAreaSelection";
import { global_roles, global_solutions, maxPlayers as global_maxPlayers, global_solutions_total_price } from "../../data/data";
import RoleSelector from "./RoleSelector";
import TimeInput from "./TimeInput";
import { RoomJoined } from "../../data/DataTypes";
import NumberInputComponent from "./NumberInput";
import { useScreenSelection } from "../Contexts/useScreenSelection";

export default function Customizations() {
    const { setCurrentScreen } = useScreenSelection();
    const [loading, setLoading] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [timeForPlacement, setTimeForPlacement] = useState(300);
    const [timeForVoting, setTimeForVoting] = useState(180);
    const [initialBudget, setInitialBudget] = useState(global_solutions_total_price);
    const [totalRounds, setTotalRounds] = useState(3);
    const [maxVotes, setMaxVotes] = useState(3);
    const [maxMarkers, setMaxMarkersPerRound] = useState(2);
    const { polygon: mapPolygon } = usePolygon();
    const mapSelectionRef = useRef<MapAreaSelectionRef>(null);
    const [checkedSolutions, setCheckedSolutions] = useState<{ [uid: string]: boolean }>(
        () => // better to use lazy init
            global_solutions.reduce<{ [uid: string]: boolean }>((acc, solution) => {
                // init all solutions as true
                acc[solution.id] = true;
                return acc;
            }, {})
    );


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
            {/* Room Name */}
            <Box pb="20px">
                <Text className="h2" color="brand.grey">Name your room</Text>
                <InputGroup>
                    <Input
                        borderColor="gray.300"
                        color="brand.grey"
                        placeholder="Room name..."
                        _placeholder={{ color: 'gray.400', fontSize: "14px" }}
                        fontSize="14px"
                        _hover={{ borderWidth: "1px" }}
                        value={roomName}
                        onChange={(event) => setRoomName(event.target.value)}
                    />
                </InputGroup>
            </Box>

            {/* Map Area */}
            <Box pb="20px">
                <Text className="h2" color="brand.grey">Select area on the map</Text>
                <Text color="brand.grey">Use the button in the top right corner</Text>
                <Box h="400px">
                    <MapAreaSelection ref={mapSelectionRef} />
                </Box>
            </Box>

            {/* Solutions */}
            <Box pb="20px">
                <Text className="h2" color="brand.grey">Select solutions</Text>
                <CheckboxGroup colorScheme="orange">
                    <VStack align="left" gap="0">
                        {global_solutions?.map((solution) => (
                            <Checkbox
                                borderColor="orange"
                                color="brand.grey"
                                key={solution.id}
                                isChecked={checkedSolutions[solution.id]}
                                onChange={() => toggleSolution(solution.id)}
                            >
                                {solution.name}
                            </Checkbox>
                        ))}
                    </VStack>
                </CheckboxGroup>
            </Box>

            {/* Roles */}
            <Box pb="20px">
                <Text className="h2" color="brand.grey">Select roles</Text>
                <RoleSelector ref={roleSelectorRef} />
            </Box>

            {/* Total rounds */}
            <NumberInputComponent
                value={totalRounds}
                onChange={setTotalRounds}
                label="Total rounds"
                min={1}
            />

            {/* Max solutions per round */}
            <NumberInputComponent
                value={maxMarkers}
                onChange={setMaxMarkersPerRound}
                label="Max solutions per round per player"
                min={1}
            />

            {/* Initial budget */}
            <NumberInputComponent
                value={initialBudget}
                onChange={setInitialBudget}
                label="Initial budget"
                min={0}
                step={100}
                currencySymbol="€"
            />

            {/* Time per round - placement */}
            <Box pb="20px">
                <Text className="h2" pb="0" color="brand.grey">Time for placement</Text>
                <TimeInput
                    onChange={setTimeForPlacement}
                    initialMinutes={Math.floor(timeForPlacement / 60)}
                    initialSeconds={Math.round((timeForPlacement % 60) / 15) * 15}
                />
            </Box>

            {/* Time per round - voting */}
            <Box pb="20px">
                <Text className="h2" pb="0" color="brand.grey">Time for voting</Text>
                <TimeInput
                    onChange={setTimeForVoting}
                    initialMinutes={Math.floor(timeForVoting / 60)}
                    initialSeconds={Math.round((timeForVoting % 60) / 15) * 15}
                />
            </Box>

            {/* Max votes per round */}
            <NumberInputComponent
                value={maxVotes}
                onChange={setMaxVotes}
                label="Max votes"
                min={1}
            />

            {/* Create Room Button */}
            <Center>
                <Button
                    onClick={() => {
                        setCurrentScreen('home');
                    }}
                    variant="outline"
                >
                    Cancel
                </Button>
                <Button bg="brand.teal" color="white" variant="outline"
                    _hover={{ bg: "white", color: "brand.teal", borderColor: "brand.teal", borderWidth: "2px", }}
                    isLoading={loading}
                    onClick={() => {
                        // TODO error toasts + unfreeze the button after a while
                        setLoading(true);
                        let polygon = mapPolygon;
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

                        const selectedSolutionsIDs = Object.keys(checkedSolutions).filter((id) => checkedSolutions[id]);

                        const roomData: RoomJoined = {
                            name: roomName,
                            polygonLatLngs: polygon?.getLatLngs(),
                            solutionIDs: selectedSolutionsIDs,
                            roles: roles,
                            timeForPlacement: timeForPlacement,
                            timeForVoting: timeForVoting,
                            initialBudget: initialBudget,
                            totalRounds: totalRounds,
                            maxVotes: maxVotes,
                            maxMarkers: maxMarkers,
                        };
                        socket.emit('create-room', roomData);
                    }
                    }
                >
                    Create {roomName}
                </Button>
            </Center>
        </VStack>
    );
}

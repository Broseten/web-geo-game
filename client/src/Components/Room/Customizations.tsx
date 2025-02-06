// Authors: Vojta Bruza and Grace Houser
// Displays all room customizations a facilitator can choose

// src/components/Customizations.tsx
import { InfoIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Checkbox, CheckboxGroup, HStack, Input, InputGroup, Text, Tooltip, useToast, VStack } from "@chakra-ui/react";
import L from "leaflet";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { global_roles, global_solutions, global_solutions_total_price } from "../../data/data";
import { global_icon_colors, RoomJoined } from "../../data/DataTypes";
import { usePolygon } from "../Contexts/PolygonContext";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import MapAreaSelection, { MapAreaSelectionRef } from "./MapAreaSelection";
import NumberInputComponent from "./NumberInput";
import RoleSelector from "./RoleSelector";
import TimeInput from "./TimeInput";
import { useConnection } from "../Contexts/ConnectionContext";

const places = [
    "Garden", "Hall", "Plaza", "Meadow", "Terrace",
    "Pavilion", "Library", "Temple", "Sanctuary", "Grove",
    "Lounge", "Chamber", "Atrium", "Haven", "Workshop",
    "Gallery", "Studio", "Observatory", "Retreat", "Arena",
    "Cafe", "Arcade", "Courtyard", "Deck", "Vista",
    "Alcove", "Atrium", "Oasis", "Camp", "Harbor",
    "Park", "Tower", "Bay", "Valley", "Village",
    "Forest", "Cliffside", "Summit", "Pathway", "Overlook",
    "Lagoon", "Beach", "Canyon", "Bridge", "Cove",
    "Castle", "Chapel", "Cabin", "Fortress", "Peak",
    "Dock", "Quay", "Harbor", "Boardwalk", "Hideaway",
    "Den", "Tavern", "Parlor", "Fairground", "Bazaar",
    "Island", "Waterfall", "Stream", "Brook", "Temple",
    "Coliseum", "Shrine", "Lighthouse", "Observatory", "Grotto"
];

const placeAdjectives = [
    "Serene", "Peaceful", "Vibrant", "Lively", "Majestic",
    "Tranquil", "Enchanted", "Sunny", "Verdant", "Rustic",
    "Cozy", "Charming", "Spacious", "Breezy", "Picturesque",
    "Elegant", "Harmonious", "Idyllic", "Radiant", "Bright",
    "Welcoming", "Cheerful", "Refreshing", "Hidden", "Quiet",
    "Magical", "Dreamy", "Comfortable", "Delightful", "Inviting",
    "Relaxing", "Stunning", "Grand", "Open", "Sparkling",
    "Glistening", "Soothing", "Wondrous", "Unique", "Historic",
    "Ancient", "Modern", "Mysterious", "Warm", "Cool",
    "Natural", "Fascinating", "Colorful", "Pleasant", "Sunny",
    "Shady", "Exquisite", "Breathtaking", "Chill", "Gentle",
    "Pristine", "Golden", "Silver", "Flowing", "Sacred",
    "Uplifting", "Peaceful", "Elegant", "Lush", "Humble",
    "Radiant", "Luminous", "Delicate", "Friendly", "Inspiring",
    "Artistic", "Brilliant", "Distinctive", "Majestic", "Vivid",
    "Intimate", "Bright", "Effervescent", "Whimsical", "Graceful",
    "Eclectic", "Ethereal", "Pristine", "Joyful", "Thoughtful",
    "Fresh", "Rejuvenating", "Simple", "Subtle", "Heavenly"
];

function randomRoomName() {
    const room = places[Math.floor(Math.random() * places.length)];
    const roomAdj = placeAdjectives[Math.floor(Math.random() * placeAdjectives.length)];
    return `${roomAdj} ${room}`;
}

export default function Customizations() {
    const { t } = useTranslation();
    const { setCurrentScreen } = useScreenSelection();
    const [loading, setLoading] = useState(false);
    const [roomName, setRoomName] = useState(randomRoomName());
    const [timeForPlacement, setTimeForPlacement] = useState(300);
    const [timeForVoting, setTimeForVoting] = useState(180);
    const [initialBudget, setInitialBudget] = useState(global_solutions_total_price);
    const [totalRounds, setTotalRounds] = useState(1);
    const [maxVotes, setMaxVotes] = useState(3);
    const [maxPlayers, setMaxPlayers] = useState(4);
    const [maxMarkers, setMaxMarkersPerRound] = useState(2);
    const { polygon: mapPolygon } = usePolygon();
    const mapSelectionRef = useRef<MapAreaSelectionRef>(null);
    const [checkedSolutions, setCheckedSolutions] = useState<{ [uid: string]: boolean }>(
        () => // better to use lazy init
            global_solutions.reduce<{ [uid: string]: boolean }>((acc, solution) => {
                acc[solution.id] = solution.default;
                return acc;
            }, {})
    );
    const { socket, useSocketEvent } = useConnection();
    const toast = useToast();


    const toggleSolution = (id: string) => {
        setCheckedSolutions((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const roleSelectorRef = useRef<{ getSelectedRoles: () => string[] }>(null);

    useSocketEvent('room-created', (roomID: string) => {
        socket.emit('join-room', roomID);
    });

    return (
        <VStack align="left">
            {/* Room Name */}
            <Box pb="20px">
                <Text className="h2" color="gray.900">{t('create.name')}</Text>
                <InputGroup>
                    <Input
                        borderColor="gray.300"
                        color="gray.900"
                        placeholder="Room name..."
                        _placeholder={{ color: 'gray.400', fontSize: "14px" }}
                        fontSize="14px"
                        _hover={{ borderWidth: "1px" }}
                        value={roomName}
                        onChange={(event) => setRoomName(event.target.value)}
                    />
                </InputGroup>
                <Button
                    variant="outline"
                    onClick={() => setRoomName(randomRoomName())}
                >
                    {t('create.random_name')}
                </Button>
            </Box>

            {/* Map Area */}
            <Box pb="20px">
                <Text className="h2" color="gray.900">{t('create.map.title')}</Text>
                <Text color="gray.900">
                    {t('create.map.desc')}
                </Text>
                <Box h="400px">
                    <MapAreaSelection ref={mapSelectionRef} />
                </Box>
            </Box>

            {/* Solutions */}
            <Box pb="20px">
                <HStack alignItems="baseline">
                    <Text className="h2" color="gray.900">{t('create.solutions.title')}</Text>
                    <Tooltip label={t('create.solutions.tooltip')} fontSize='md'>
                        <InfoIcon />
                    </Tooltip>
                </HStack>
                <CheckboxGroup colorScheme="orange">
                    <VStack align="left" gap="0">
                        {global_solutions?.map((solution) => (
                            <Checkbox
                                borderColor="orange"
                                color="gray.900"
                                key={solution.id}
                                isChecked={checkedSolutions[solution.id]}
                                onChange={() => toggleSolution(solution.id)}
                            >
                                <Tooltip
                                    label={solution.description} fontSize='md'
                                    placement='auto-start' openDelay={500}
                                >
                                    {solution.name}
                                </Tooltip>
                            </Checkbox>
                        ))}
                    </VStack>
                </CheckboxGroup>
            </Box>

            {/* Roles */}
            <Box pb="20px">

                <HStack alignItems="baseline">
                    <Text className="h2" color="gray.900">{t('create.roles.title')}</Text>
                    <Tooltip label={t('create.roles.tooltip')} fontSize='md'>
                        <InfoIcon />
                    </Tooltip>
                </HStack>
                <RoleSelector ref={roleSelectorRef} />
            </Box>


            {/* Max players */}
            <NumberInputComponent
                value={maxPlayers}
                onChange={setMaxPlayers}
                label={t('create.players.title')}
                min={2}
                max={global_icon_colors.length}
                tooltip={t('create.players.tooltip')}
            />

            {/* Total rounds */}
            <NumberInputComponent
                value={totalRounds}
                onChange={setTotalRounds}
                label={t('create.rounds.title')}
                min={1}
                tooltip={t('create.rounds.tooltip')}
            />

            {/* Max solutions per round */}
            <NumberInputComponent
                value={maxMarkers}
                onChange={setMaxMarkersPerRound}
                label={t('create.solutions_limit.title')}
                min={1}
                tooltip={t('create.solutions.limit.tooltip')}
            />

            {/* Initial budget */}
            <NumberInputComponent
                value={initialBudget}
                onChange={setInitialBudget}
                label={t('create.budget.title')}
                min={0}
                step={100}
                currencySymbol="€"
            />

            {/* Time per round - placement */}
            <Box pb="20px">
                <HStack alignItems="baseline">
                    <Text className="h2" pb="0" color="gray.900">{t('create.time.placement.title')}</Text>
                    <Tooltip label={t('create.time.placement.tooltip')} fontSize='md'>
                        <InfoIcon />
                    </Tooltip>
                </HStack>
                <TimeInput
                    onChange={setTimeForPlacement}
                    initialMinutes={Math.floor(timeForPlacement / 60)}
                    initialSeconds={Math.round((timeForPlacement % 60) / 15) * 15}
                />
            </Box>

            {/* Time per round - voting */}
            <Box pb="20px">
                <HStack alignItems="baseline">
                    <Text className="h2" pb="0" color="gray.900">{t('create.time.voting.title')}</Text>
                    <Tooltip label={t('create.time.voting.tooltip')} fontSize='md'>
                        <InfoIcon />
                    </Tooltip>
                </HStack>
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
                label={t('create.votes.title')}
                min={1}
                tooltip={t('create.votes.tooltip')}
            />

            {/* Create Room Button */}
            <Center>
                <Button
                    onClick={() => {
                        setCurrentScreen('home');
                    }}
                    variant="outline"
                >
                    {t('create.cancel')}
                </Button>
                <Button bg="primary.500" color="white" variant="outline"
                    _hover={{ bg: "white", color: "primary.500", borderColor: "primary.500", borderWidth: "2px", }}
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
                            // if no roles selected, use the first ones
                            roles = global_roles.slice(0, maxPlayers);
                        } else if (roles.length === 0 && global_roles.length > 0) {
                            roles.push(global_roles[0]);
                        }

                        const selectedSolutionsIDs = Object.keys(checkedSolutions).filter((id) => checkedSolutions[id]);
                        if (selectedSolutionsIDs.length === 0) {
                            toast({
                                title: "No solutions selected.",
                                status: 'error',
                                isClosable: true,
                            });
                            setLoading(false);
                            return;
                        }

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
                            maxPlayers: maxPlayers,
                        };
                        socket.emit('create-room', roomData);
                        setTimeout(() => {
                            setLoading(false);
                        }, 5000);
                    }
                    }
                >
                    {t('create.confirm')}
                </Button>
            </Center>
        </VStack>
    );
}

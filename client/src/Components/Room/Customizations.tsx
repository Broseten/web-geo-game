// src/components/Customizations.tsx
import { Box, Button, Center, Checkbox, CheckboxGroup, Input, InputGroup, Text, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import L from "leaflet";
import initSocket from "../../Hooks/useSocket";
import { socket } from "../../main";
import { usePolygon } from "../Contexts/PolygonContext";
import MapAreaSelection, { MapAreaSelectionRef } from "./MapAreaSelection";
import { global_roles, global_solutions, maxPlayers as global_maxPlayers } from "../../data/data";
import RoleSelector from "./RoleSelector";
import TimeInput from "./TimeInput";
import { RoomJoined } from "../../data/DataTypes";
import NumberInputComponent from "./NumberInput";

export default function Customizations() {
  const [roomName, setRoomName] = useState('');
  const [time, setTime] = useState(300);
  const [initialBudget, setInitialBudget] = useState(0);
  const [totalRounds, setTotalRounds] = useState(3);
  const [maxVotes, setMaxVotes] = useState(3);
  const { polygon: mapPolygon } = usePolygon();
  const mapSelectionRef = useRef<MapAreaSelectionRef>(null);
  const [checkedSolutions, setCheckedSolutions] = useState<Record<string, boolean>>(
    () =>
      global_solutions.reduce((acc, solution) => {
        acc[solution.id] = true;
        return acc;
      }, {} as Record<string, boolean>)
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
            borderColor="brand.teal"
            color="brand.teal"
            placeholder="Room name..."
            _placeholder={{ color: 'brand.teal', fontSize: "14px" }}
            fontSize="14px"
            _hover={{ borderWidth: "2px" }}
            value={roomName}
            onChange={(event) => setRoomName(event.target.value)}
          />
        </InputGroup>
      </Box>

      {/* Map Area */}
      <Box pb="20px">
        <Text className="h2" color="brand.grey">Choose a map from the dropdown</Text>
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

      {/* Time per round */}
      <Box pb="20px">
        <Text className="h2" pb="0" color="brand.grey">Time per round</Text>
        <TimeInput
          onChange={setTime}
          initialMinutes={Math.floor(time / 60)}
          initialSeconds={Math.round((time % 60) / 15) * 15}
        />
      </Box>

      {/* Initial Budget */}
      <NumberInputComponent
        value={initialBudget}
        onChange={setInitialBudget}
        label="Initial budget"
        min={0}
        step={100}
        currencySymbol="€"
      />

      {/* Total Rounds */}
      <NumberInputComponent
        value={totalRounds}
        onChange={setTotalRounds}
        label="Total rounds"
        min={1}
      />

      {/* Max Votes */}
      <NumberInputComponent
        value={maxVotes}
        onChange={setMaxVotes}
        label="Max votes"
        min={1}
      />

      {/* Create Room Button */}
      <Center>
        <Button bg="brand.teal" color="white" variant="outline"
          _hover={{ bg: "white", color: "brand.teal", borderColor: "brand.teal", borderWidth: "2px", }}
          onClick={() => {
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

            const roomData: RoomJoined = {
              name: roomName,
              polygonLatLngs: polygon?.getLatLngs(),
              solutionIDs: Object.keys(checkedSolutions).filter((id) => checkedSolutions[id]),
              roles: roles,
              timePerRound: time,
              initialBudget: initialBudget,
              totalRounds: totalRounds,
              maxVotes: maxVotes,
            };
            socket.emit('create-room', roomData);
          }}
        >
          Create {roomName}
        </Button>
      </Center>
    </VStack>
  );
}

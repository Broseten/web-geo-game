import { CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  Flex,
  Heading,
  IconButton,
  Select,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { PlayerData } from "../../data/DataTypes";
import { global_playerID } from "../Contexts/ConnectionContext";
import { useGameRoom } from "../Contexts/GameRoomContext";
import EditActionPopup from "./EditActionPopup";
import Icon from "./Icon";

interface PlayerCardProps {
  player: PlayerData;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const { roomInfo, isFacilitator, updatePlayer } = useGameRoom();
  const [isEditing, setIsEditing] = useState(false);

  const isLocalPlayer = global_playerID === player.id;
  const isFac = player.isFacilitator;
  const isLocalPlayerFacilitator = isFacilitator(global_playerID);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleRoleChange = (selectedRole: string) => {
    // Ensure local player is updated in the context
    const updatedPlayer = { ...player, role: selectedRole };
    updatePlayer(updatedPlayer);
  };

  return (
    <Card
      variant="outline"
      bg="white"
      color="brand.grey"
      width="100%"
      mb="10px"
      p={4}
      boxShadow="sm"
    >
      <Flex align="center" justifyContent="space-between" gap={6}>
        {/* Icon */}
        <Box flex="1" textAlign="left">
          <Icon color={player.color} />
        </Box>

        {/* Player Info */}
        <Box flex="2" textAlign="left">
          <Heading size="md">{player.name}</Heading>
          <Text fontSize="12px">{isFac ? "Facilitator" : "Player"}</Text>
        </Box>

        {/* Role Dropdown */}
        <Box flex="2" textAlign="left">
          {isLocalPlayer ? (
            <Select
              maxWidth="300px"
              bg="gray.300"
              borderColor="brand.grey"
              borderWidth="2px"
              value={player.role || ""} // Default to an empty string if no role is selected
              placeholder={player.role ? undefined : "Select role..."}
              fontSize="sm"
              onChange={(e) => handleRoleChange(e.target.value)} // Handle role change
            >
              {roomInfo?.roles &&
                roomInfo.roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
            </Select>

          ) : (
            <Select
              isDisabled
              maxWidth="300px"
              bg="gray.300"
              borderColor="brand.grey"
              borderWidth="2px"
              placeholder={player.role}
            />
          )
          }
        </Box>

        {/* Action Buttons */}
        <Flex flex="1" justifyContent="flex-start" alignItems="center" gap={2}>
          {isLocalPlayer && (
            <>
              <Tooltip label="Edit name" fontSize="sm" placement="top" hasArrow>
                <IconButton
                  bg="gray.200"
                  color="black"
                  _hover={{ bg: "gray.400" }}
                  aria-label="Edit name"
                  icon={<EditIcon />}
                  onClick={handleEditClick}
                />
              </Tooltip>
              <Tooltip label="Leave room" fontSize="sm" placement="top" hasArrow>
                <IconButton
                  colorScheme="red"
                  aria-label="Leave room"
                  icon={<CloseIcon />}
                />
              </Tooltip>
            </>
          )}
          {!isFac && isLocalPlayerFacilitator && (
            <Tooltip label="Remove player" fontSize="sm" placement="top" hasArrow>
              <IconButton
                colorScheme="red"
                aria-label="Remove player"
                icon={<DeleteIcon />}
              />
            </Tooltip>
          )}
        </Flex>
      </Flex>

      {/* Edit Action Popup */}
      {isEditing && (
        <EditActionPopup
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          player={{ name: player.name, color: player.color }}
        />
      )}
    </Card>
  );
}

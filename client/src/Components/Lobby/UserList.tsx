// Authors: Vojtech Bruza and Grace Houser
// Displays active users in a list format 

import { Box, Flex } from "@chakra-ui/react";
import { useGameRoom } from "../Contexts/GameRoomContext";
import PlayerCard from "./PlayerCard";

export default function UserList() {
    const { players } = useGameRoom();

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            w="100%"
            p={4}
        >
            <Box
                maxWidth={{ base: "100%", md: "80%", lg: "70%" }} // responsive width
                width="100%" // full width for smaller screens
                mx="auto" // center horizontally
                bg="gray.50" // optional background
                borderRadius="lg"
                boxShadow="md"
                p={4}
            >
                {/* Header */}
                <Flex
                    direction="row"
                    justifyContent="space-between"
                    mb={4}
                    px={4}
                    fontWeight="bold"
                    textAlign="left"
                    fontSize="lg"
                    color="gray.900"
                >
                    <Box ml="20px" flex="1">Icon</Box>
                    <Box flex="2">User</Box>
                    <Box flex="2">Role</Box>
                    <Box flex="1">Actions</Box>
                </Flex>

                {/* Player Cards */}
                <Box overflowY="auto" maxHeight="350px" px={2}>
                    {players && players.length > 0 ? (
                        players.map((player) => (
                            <PlayerCard key={player.id} player={player} />
                        ))
                    ) : (
                        <Flex justifyContent="center" py={4} color="gray.500">
                            No players connected.
                        </Flex>
                    )}
                </Box>
            </Box>
        </Flex>
    );
}

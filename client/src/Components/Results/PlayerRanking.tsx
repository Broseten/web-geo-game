// Authors: Vojta Bruza and Grace Houser
// This file displays the cards of the players ranked

import { Card, CardBody, Center, Heading, Text, VStack } from "@chakra-ui/react";
import '../../Theme/theme.css';
import Icon from "../Lobby/Icon";
import { useGameRoom } from "../Contexts/GameRoomContext";
import { useGameMarkers } from "../Contexts/GameMarkersContext";
import { getSolution } from "../../data/data";


export default function PlayerRanking() {
    const { players } = useGameRoom();
    const { markers } = useGameMarkers();

    const playersWithVotes = players.map(player => {
        const { votes, spent } = markers.reduce((acc, marker) => {
            if (marker.ownerPlayerID === player.id) {
                acc.votes += marker.votes.length;
                acc.spent += getSolution(marker.solutionID)?.price || 0;
            }
            return acc;
        }, { votes: 0, spent: 0 });
        return { ...player, votes, spent };
    });

    return (
        <Center>
            <VStack overflow="auto" spacing="2px">

                {/* For Loop of Players - sorted by score */}
                {
                    // sort by score and then by how much they spent
                    playersWithVotes && playersWithVotes.sort((a, b) => b.votes - a.votes || a.spent - b.spent).map((player) => (

                        /* Player Card */
                        < Card
                            direction="row"
                            bg="white"
                            color="gray.900"
                            mb="5px"
                            align="center"
                            key={player.id}
                            height="100px"
                            width="100%"
                        >

                            <Icon color={player.color} />

                            <CardBody p="10px" pr="80px">
                                <Heading size='md'> {player.name} </Heading>
                                <Text fontSize="12px"> {player.role} </Text>
                            </CardBody>

                            <CardBody>
                                <Text fontWeight="bold">
                                    Score: {player.votes}
                                </Text>
                                <Text fontWeight="bold">
                                    Spent: {player.spent}
                                </Text>
                            </CardBody>
                        </Card>
                    ))
                }
            </VStack>
        </Center >
    );
}

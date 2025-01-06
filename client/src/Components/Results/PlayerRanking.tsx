// Authors: Vojta Bruza and Grace Houser
// This file displays the cards of the players ranked

import { Card, CardBody, Center, Heading, Text, VStack } from "@chakra-ui/react";
import '../../Theme/theme.css';
import Icon from "../Lobby/Icon";
import { useGameRoom } from "../Contexts/GameRoomContext";
import { useGameMarkers } from "../Contexts/GameMarkersContext";


export default function PlayerRanking() {

    const { players } = useGameRoom();
    const { markers } = useGameMarkers();

    return (
        <Center>
            <VStack overflow="auto" spacing="2px">

                {/* For Loop of Players - sorted by score */}
                {
                    // TODO - sort by score 
                    players && players.map((player) => (

                        /* Player Card */
                        < Card direction={{ base: 'column', sm: 'row' }}
                            bg="white"
                            color="brand.grey"
                            mb="5px"
                            align="center"
                            key={player.id}>

                            <Icon color={player.color} />

                            <CardBody p="10px" pr="80px">
                                <Heading size='md'> {player.name} </Heading>
                                <Text fontSize="12px"> {player.role} </Text>
                            </CardBody>

                            <CardBody>
                                <Text fontWeight="bold">
                                    Score: {markers.reduce((acc, marker) => {
                                        if (marker.ownerPlayerID === player.id) {
                                            // sum all votes for one player
                                            return acc + marker.votes.length;
                                        }
                                        else return acc;
                                    }, 0)}
                                </Text>
                            </CardBody>
                        </Card>
                    ))
                }
            </VStack>
        </Center >
    );
}

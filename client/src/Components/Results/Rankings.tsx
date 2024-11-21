// Authors: Vojta Bruza and Grace Houser
// This file displays the cards of the players ranked

import { Card, CardBody, Center, Heading, Text, VStack } from "@chakra-ui/react";
import '../../Theme/theme.css';
import Icon from "../Lobby/Icon";
import { useGameRoom } from "../Contexts/GameRoomContext";


export default function Rankings() {

    const { players } = useGameRoom();

    // TODO networking
    const score = "100";

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
                            align="center">

                            <Icon color={player.color} />

                            <CardBody p="10px" pr="80px">
                                <Heading size='md'> {player.name} </Heading>
                                <Text fontSize="12px"> {player.role} </Text>
                            </CardBody>

                            <CardBody>
                                <Text fontWeight="bold">
                                    Score: {score}
                                </Text>
                            </CardBody>
                        </Card>
                    ))
                }
            </VStack>
        </Center >
    );
}

// Authors: Vojta Bruza and Grace Houser
// User cards in the lobby

import { Box, Card, CardBody, Heading } from "@chakra-ui/react";
import '../../Theme/theme.css';
import { useGameRoom } from "../Contexts/GameRoomContext";
import FacilitatorCard from "./FacilitatorCard";
import PlayerCard from "./PlayerCard";


interface UserList {
    isThisFacilitator: boolean,
}

export default function UserList({ isThisFacilitator }: UserList) {
    const { players } = useGameRoom();

    // List view if the user is a player 
    return (
        <Box>
            {/* Header Card */}
            <Card direction={{ base: 'column', sm: 'row' }} variant='outline' mb="10px">
                <CardBody ml="-5px" pr="0px">
                    <Heading size='sm'>Icon</Heading>
                </CardBody>
                <CardBody ml="-120px">
                    <Heading size='sm'>User</Heading>
                </CardBody>
                <CardBody ml="0px">
                    <Heading size='sm'>Role</Heading>
                </CardBody>
                <CardBody ml="px">
                    <Heading size='sm' textAlign="center">Actions</Heading>
                </CardBody>
            </Card>
            {
                <Box overflow="auto" height="350px">
                    {
                        players && players.map((player) => (
                            <Card bg="none" shadow="none" key={player.id}>
                                {player.isFacilitator &&
                                    <FacilitatorCard isFac={isThisFacilitator} player={player} />}
                                {!player.isFacilitator &&
                                    <PlayerCard isUser={!isThisFacilitator} player={player} />}
                            </Card>
                        ))
                    }
                </Box>
            }
        </Box>
    );
}

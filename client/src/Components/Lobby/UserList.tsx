// Authors: Vojta Bruza and Grace Houser
// User cards in the lobby

import { Box, Card, CardBody, Heading } from "@chakra-ui/react";
import '../../Theme/theme.css';
import { PlayerData } from "../../data/DataTypes";
import FacilitatorCard from "./FacilitatorCard";
import PlayerCard from "./PlayerCard";
import { useGameRoom } from "../Contexts/GameRoomContext";


interface UserList {
    isFacilitator: boolean,
    players: PlayerData[]
}

export default function UserList({ isFacilitator, players }: UserList) {
    const { facilitatorID } = useGameRoom();

    function playerIsFacilitator(player: PlayerData) {
        return player.id === facilitatorID;
    }

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
                    <Card bg="none" shadow="none">
                        <FacilitatorCard isFac={isFacilitator} />
                    </Card>
                    {
                        players && players.map((player) => (
                            // skip facilitator
                            !playerIsFacilitator(player) &&
                            <Card bg="none" shadow="none" key={player.id}>
                                <PlayerCard isUser={!isFacilitator} player={player} />
                            </Card>
                        ))
                    }
                </Box>
            }
        </Box>
    );
}

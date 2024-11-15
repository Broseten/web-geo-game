// Authors: Vojta Bruza and Grace Houser
// User cards in the lobby

import { Box, Button, Card, CardBody, Heading } from "@chakra-ui/react";
import FacilitatorCard from "./FacilitatorCard";
import PlayerCard from "./PlayerCard";
import '../../Theme/theme.css';
import { PlayerData } from "../../data/DataTypes";
import { useState } from "react";
import { socket } from "../../main";


export default function UserList() {

    const playerName = ""
    const status = "" // this would either be "Admin" or "Player"


    // TODO - needed variables 
    // idea - fac id is always 0 
    const isFacilitator = false;
    const isYou = false;
    const userID = "0";

    // TODO - "players" comes from the server 
    // const [players, setPlayers] = useState<{ id: string; name: string }[] | undefined>(undefined);
    const players: PlayerData[] = [{ id: "1", role: "Developer", color: "red", name: "Harrison" }, { id: "2", role: "Envvironmentalist", color: "green", name: "Taylor" }, { id: "3", role: "Officer", color: "blue", name: "Violet" }, { id: "4", role: "Politician", color: "yellow", name: "John" }];


    // List view if the user is a player 
    return (
        <Box>
            {/* Header Card */}
            <Card direction={{ base: 'column', sm: 'row' }}
                variant='outline' mb="10px"
            >
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
                isFacilitator ? (

                    // result if you are the facilitator 
                    <Box overflow="auto" height="350px">
                        {/* Facilitator Card */}
                        <Card bg="none" shadow="none">
                            <FacilitatorCard you={isFacilitator} />
                        </Card>

                        {/* This would be a for loop */}
                        {
                            players
                            &&
                            players.map((player) => (
                                <Card bg="none" shadow="none">
                                    <PlayerCard you={!isFacilitator} player={player} />
                                </Card>
                            ))
                        }
                    </Box>

                ) : (

                    // result if you are the player 
                    <Box overflow="auto" height="350px">
                        {/* Facilitator Card */}
                        <Card bg="none" shadow="none">
                            <FacilitatorCard you={isFacilitator} />
                        </Card>

                        {/* For loop */}
                        {
                            players
                            &&
                            players.map((player) => (

                                // TODO - fix so you can only edit your own card 
                                <Card bg="none" shadow="none">
                                    <PlayerCard you={!isFacilitator} player={player} />
                                </Card>
                            ))
                        }
                    </Box>
                )

            }
        </Box>
    );
}

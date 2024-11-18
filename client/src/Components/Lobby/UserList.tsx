// Authors: Vojta Bruza and Grace Houser
// User Cards in lobby

import { Box, Card, CardBody, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import initSocket from "../../Hooks/useSocket";
import '../../Theme/theme.css';
import { PlayerData, RoomPlayersInfo } from "../../data/DataTypes";
import { socket } from "../../main";
import FacilitatorCard from "./FacilitatorCard";
import PlayerCard from "./PlayerCard";
import { useGameRoom } from "../Contexts/GameRoomContext";


export default function UserList() {
    const { roomID } = useGameRoom();
    //const [isFacilitator, setIsFacilitator] = useState<boolean>(false);
    const isFacilitator = false;

    //const [players, setPlayers] = useState<PlayerData[]>([]);
    const players: PlayerData[] = [{ id: "1", role: "Developer", color: "red", name: "Harrison" }, { id: "2", role: "Envvironmentalist", color: "green", name: "Taylor" }, { id: "3", role: "Officer", color: "blue", name: "Violet" }, { id: "4", role: "Politician", color: "yellow", name: "John" }];

    initSocket('room-players-info', (roomUpdate: RoomPlayersInfo) => {
        const fac = socket.id === roomUpdate.facilitatorID;
        //setIsFacilitator(fac);
        // TODO test if this works
        console.log(fac);
        //setPlayers(roomUpdate.players);
        console.log(roomUpdate);
    });

    initSocket('room-not-found', () => {
        // TODO better error handling - both server and client-side
        console.log("Room not found");
    });

    useEffect(() => {
        socket.emit('request-room-players-info', roomID);
    }, []);

    return (
        <Box>
            {/* Header Card */}
            <Card direction={{ base: 'column', sm: 'row' }} bg="#1b202b" color="white" mb="10px">
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
                            <Card bg="none" shadow="none" key={player.id}>

                                {/* TODO - need an if statement here */}
                                {/*     if it is your player id,        isUser=true */}
                                {/*     if it is NOT your player id,    isUser=false */}
                                <PlayerCard isUser={false} player={player} />
                            </Card>
                        ))
                    }
                </Box>
            }
        </Box>
    );
}

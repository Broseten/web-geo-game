// Authors: Vojta Bruza and Grace Houser
// User cards in the lobby

import { Box, Card, CardBody, Heading, IconButton, Select, Text } from "@chakra-ui/react";
import React from "react";
//import { useScreenSelection } from "../Contexts/useScreenSelection";
import Icon from "./Icon";
import '../../Theme/theme.css';
import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import FacilitatorCard from "./FacilitatorCard";
import PlayerCard from "./PlayerCard";


export default function UserListF() {

    //const { setCurrentScreen } = useScreenSelection();
    const playerName = ""
    const status = "" // this would either be "Admin" or "Player"


    // TODO - needed variables 
    // idea - fac id is always 0 
    const isFacilitator = true;
    const isYou = false;
    const userID = "0";


    // List view if the user is a facilitator 
    if (isFacilitator) {
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

                <Box overflow="auto" height="350px">
                    {/* Facilitator Card */}
                    <Card>
                        <FacilitatorCard you={isFacilitator} />
                    </Card>

                    {/* This would be a for loop */}
                    <Card>
                        <PlayerCard you={!isFacilitator} />
                    </Card>
                    <Card>
                        <PlayerCard you={!isFacilitator} />
                    </Card>
                    <Card>
                        <PlayerCard you={!isFacilitator} />
                    </Card>
                    <Card>
                        <PlayerCard you={!isFacilitator} />
                    </Card>
                    <Card>
                        <PlayerCard you={!isFacilitator} />
                    </Card>
                    <Card>
                        <PlayerCard you={!isFacilitator} />
                    </Card>

                </Box>
            </Box>
        )
    }


    // List view if the user is a player 
    else return (
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

                <Box overflow="auto" height="350px">
                    {/* Facilitator Card */}
                    <Card>
                        <FacilitatorCard you={isFacilitator} />
                    </Card>

                    {/* This would be a for loop */}
                    {/* TODO - need to indicate ONE as "you" */}
                    <Card>
                        <PlayerCard you={!isFacilitator} />
                    </Card>
                    <Card>
                        <PlayerCard you={!isFacilitator} />
                    </Card>
                    <Card>
                        <PlayerCard you={!isFacilitator} />
                    </Card>
                    <Card>
                        <PlayerCard you={!isFacilitator} />
                    </Card>
                    <Card>
                        <PlayerCard you={!isFacilitator} />
                    </Card>
                    <Card>
                        <PlayerCard you={!isFacilitator} />
                    </Card>

                </Box>
            </Box>
    );
}

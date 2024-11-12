// Authors: Vojta Bruza and Grace Houser
// Lobby user list from the facilitator's perspective 

import { Box, Card, CardBody, Heading, IconButton, Select, Text } from "@chakra-ui/react";
import React from "react";
//import { useScreenSelection } from "../Contexts/useScreenSelection";
import Icon from "./Icon";
import '../../Theme/other.css';
import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function UserListF() {

    //const { setCurrentScreen } = useScreenSelection();
    const playerName = ""
    const status = "" // this would either be "Admin" or "Player"

    return (
        <Box>

            {/* Header Card 1 */}
            <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                mb="10px"
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
                    {/* TODO - idk why an error is being thrown !*/}
                    <Heading size='sm' align="middle">Remove</Heading>
                </CardBody>
            </Card>

            {/* User List */}
            <Box overflow="auto" height="350px">
                {/* User 1 */}
                {/* TODO - what YOUR card looks like */}
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    bg="white"
                    color="brand.grey"
                    width="800px"
                    mb="5px"
                >
                    {/* TODO - make popover form NOT embedding in user list card */}
                    <Icon you={true} color={"orange"} />

                    <CardBody ml="10px">
                        <Heading size='md'>Grace Houser</Heading>
                        <Text fontSize="12px">Facilitator</Text>
                    </CardBody>
                </Card>


                {/* User 2 */}
                {/* TODO - what OTHER player's cards looks like */}
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    bg="white"
                    color="brand.grey"
                    width="800px"
                    mb="5px"
                >
                    <Icon you={false} color={"red"} />

                    <CardBody ml="10px">
                        <Heading size='md'>Harrison Kircher</Heading>
                        <Text fontSize="12px">Player</Text>
                    </CardBody>

                    <CardBody>
                        <Select isDisabled
                            maxWidth="300" bg="gray.300"
                            borderColor="brand.teal" borderWidth="2px"

                            // TODO - their role would go here (as a variable)
                            placeholder='Developer'>
                        </Select>
                    </CardBody>

                    <CardBody>
                        <IconButton
                            colorScheme='red'
                            aria-label='Search database'
                            icon={<DeleteIcon />}
                            ml="65px"
                        />
                    </CardBody>
                </Card>

                {/* User 3 */}
                {/* TODO - what OTHER player's cards looks like */}
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    bg="white"
                    color="brand.grey"
                    width="800px"
                    mb="5px"
                >
                    <Icon you={false} color={"blue"} />

                    <CardBody ml="10px">
                        <Heading size='md'>Morgan Wallen</Heading>
                        <Text fontSize="12px">Player</Text>
                    </CardBody>

                    <CardBody>
                        <Select isDisabled
                            maxWidth="300" bg="gray.300"
                            borderColor="brand.teal" borderWidth="2px"

                            // TODO - their role would go here (as a variable)
                            placeholder='Elder'>
                        </Select>
                    </CardBody>

                    <CardBody>
                        <IconButton
                            colorScheme='red'
                            aria-label='Search database'
                            icon={<DeleteIcon />}
                            ml="65px"
                        />
                    </CardBody>
                </Card>

                {/* User 4 */}
                {/* TODO - what OTHER player's cards looks like */}
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    bg="white"
                    color="brand.grey"
                    width="800px"
                    mb="5px"
                >
                    <Icon you={false} color={"green"} />

                    <CardBody ml="10px">
                        <Heading size='md'>Sabrina Carpenter</Heading>
                        <Text fontSize="12px">Player</Text>
                    </CardBody>

                    <CardBody>
                        <Select isDisabled
                            maxWidth="300" bg="gray.300"
                            borderColor="brand.teal" borderWidth="2px"

                            // TODO - their role would go here (as a variable)
                            placeholder='Officer'>
                        </Select>
                    </CardBody>

                    <CardBody>
                        <IconButton
                            colorScheme='red'
                            aria-label='Search database'
                            icon={<DeleteIcon />}
                            ml="65px"
                        />
                    </CardBody>
                </Card>

                {/* User 5 */}
                {/* TODO - what OTHER player's cards looks like */}
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    bg="white"
                    color="brand.grey"
                    width="800px"
                    mb="5px"
                >
                    <Icon you={false} color={"yellow"} />

                    <CardBody ml="10px">
                        <Heading size='md'>Harry Styles</Heading>
                        <Text fontSize="12px">Player</Text>
                    </CardBody>

                    <CardBody>
                        <Select isDisabled
                            maxWidth="300" bg="gray.300"
                            borderColor="brand.teal" borderWidth="2px"

                            // TODO - their role would go here (as a variable)
                            placeholder='Environmentalist'>
                        </Select>
                    </CardBody>

                    <CardBody>
                        <IconButton
                            colorScheme='red'
                            aria-label='Search database'
                            icon={<DeleteIcon />}
                            ml="65px"
                        />
                    </CardBody>
                </Card>

                {/* User 6 */}
                {/* TODO - what OTHER player's cards looks like */}
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    bg="white"
                    color="brand.grey"
                    width="800px"
                    mb="5px"
                >
                    <Icon you={false} color={"pink"} />

                    <CardBody ml="10px">
                        <Heading size='md'>Carrie Underwood</Heading>
                        <Text fontSize="12px">Player</Text>
                    </CardBody>

                    <CardBody>
                        <Select isDisabled
                            maxWidth="300" bg="gray.300"
                            borderColor="brand.teal" borderWidth="2px"

                            // TODO - their role would go here (as a variable)
                            placeholder='Young Person'>
                        </Select>
                    </CardBody>

                    <CardBody>
                        <IconButton
                            colorScheme='red'
                            aria-label='Search database'
                            icon={<DeleteIcon />}
                            ml="65px"
                        />
                    </CardBody>
                </Card>

                {/* User 7 */}
                {/* TODO - what OTHER player's cards looks like */}
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    bg="white"
                    color="brand.grey"
                    width="800px"
                    mb="5px"
                >
                    <Icon you={false} color={"purple"} />

                    <CardBody ml="10px">
                        <Heading size='md'>Keith Urban</Heading>
                        <Text fontSize="12px">Player</Text>
                    </CardBody>

                    <CardBody>
                        <Select isDisabled
                            maxWidth="300" bg="gray.300"
                            borderColor="brand.teal" borderWidth="2px"

                            // TODO - their role would go here (as a variable)
                            placeholder='Historian'>
                        </Select>
                    </CardBody>

                    <CardBody>
                        <IconButton
                            colorScheme='red'
                            aria-label='Search database'
                            icon={<DeleteIcon />}
                            ml="65px"
                        />
                    </CardBody>
                </Card>

            </Box>
        </Box>
    );
}

// Authors: Vojta Bruza and Grace Houser
// Lobby user list from the player's perspective 

import { Box, Card, CardBody, Heading, Select, Text } from "@chakra-ui/react";
import React from "react";
//import { useScreenSelection } from "../Contexts/useScreenSelection";
import Icon from "./Icon";
import '../../Theme/other.css'; 
import { useState } from "react";

export default function UserList() {

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

                <CardBody ml="-240px">
                    <Heading size='sm'>User</Heading>
                </CardBody>

                <CardBody ml="0px">
                    <Heading size='sm'>Role</Heading>
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
                    <Icon you={false} color={"orange"} />

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
                    <Icon you={true} color={"red"}/>

                    <CardBody ml="10px">
                        <Heading size='md'>Harrison Kircher</Heading>
                        <Text fontSize="12px">Player</Text>
                    </CardBody>

                    <CardBody>
                        <Select maxWidth="300" bg="gray.300" borderColor="brand.teal" borderWidth="2px"
                            placeholder='Select role...'>
                            <option value='Community Leader'>               Community Leader</option>
                            <option value='Developer'>                      Developer</option>
                            <option value='Elder'>                          Elder</option>
                            <option value='Environmentalist'>               Environmentalist</option>
                            <option value='Historian'>                      Historian</option>
                            <option value='Non-government Organization'>    Non-government Organization</option>
                            <option value='Officer'>                        Officer</option>
                            <option value='Politician'>                     Politician</option>
                            <option value='Young Person'>                   Young Person</option>
                            <option value='Other'>                          Other</option>
                        </Select>
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
                    <Icon you={false} color={"blue"}/>

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
                    <Icon you={false} color={"green"}/>

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
                    <Icon you={false} color={"yellow"}/>

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
                    <Icon you={false} color={"pink"}/>

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
                    <Icon you={false} color={"purple"}/>

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
                </Card>
            </Box>
        </Box>
    );
}

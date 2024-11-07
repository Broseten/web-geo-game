import { EditIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, ButtonGroup, Card, CardBody, FormControl, FormLabel, Heading, IconButton, Image, Input, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, Select, Stack, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
//import { useScreenSelection } from "../Contexts/useScreenSelection";
import FocusLock from "react-focus-lock";
import PopoverForm from "./PopoverForm";
import POF from "./PopoverForm";

export default function UserList() {

    //const { setCurrentScreen } = useScreenSelection();
    //const roomName = 'temp';

    // {/* <img src={MyIcon}></img> */}

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
                <CardBody ml="0px" pr="0px">
                    <Heading size='sm'>Icon</Heading>
                </CardBody>

                <CardBody ml="-240px">
                    <Heading size='sm'>User</Heading>
                </CardBody>

                <CardBody>
                    <Heading size='sm'>Role</Heading>
                </CardBody>
            </Card>

            {/* User List */}
            <Box overflow="auto" height="350px">
                {/* User 1 */}
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    bg="white"
                    color="brand.grey"
                    width="800px"
                    mb="5px"
                >
                    <PopoverForm></PopoverForm>

                    <CardBody ml="10px">
                        <Heading size='md'>Grace Houser</Heading>
                        <Text fontSize="12px">Admin</Text>
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


                {/* User 2 */}
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    bg="white"
                    color="brand.grey"
                    width="800px"
                    mb="5px"
                >
                    <PopoverForm></PopoverForm>

                    <CardBody ml="10px">
                        <Heading size='md'>Harrison Kircher</Heading>
                        <Text fontSize="12px">Player</Text>
                    </CardBody>

                    <CardBody>
                        <Select maxWidth="300" bg="gray.300" borderColor="brand.teal" borderWidth="2px"
                            placeholder='Select role...'>
                            <option value='Community Leader'>               Community Leader</option>
                            <option value='Other'>                          Other</option>
                        </Select>
                    </CardBody>
                </Card>

                {/* User 3 */}
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    bg="white"
                    color="brand.grey"
                    width="800px"
                    mb="5px"
                >
                    <PopoverForm></PopoverForm>

                    <CardBody ml="10px">
                        <Heading size='md'>Morgan Wallen</Heading>
                        <Text fontSize="12px">Player</Text>
                    </CardBody>

                    <CardBody>
                        <Select maxWidth="300" bg="gray.300" borderColor="brand.teal" borderWidth="2px"
                            placeholder='Select role...'>
                            <option value='Community Leader'>               Community Leader</option>
                            <option value='Other'>                          Other</option>
                        </Select>
                    </CardBody>
                </Card>

                {/* User 4 */}
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    bg="white"
                    color="brand.grey"
                    width="800px"
                    mb="5px"
                >
                    <PopoverForm></PopoverForm>

                    <CardBody ml="10px">
                        <Heading size='md'>Elton John</Heading>
                        <Text fontSize="12px">Player</Text>
                    </CardBody>

                    <CardBody>
                        <Select maxWidth="300" bg="gray.300" borderColor="brand.teal" borderWidth="2px"
                            placeholder='Select role...'>
                            <option value='Community Leader'>               Community Leader</option>
                            <option value='Other'>                          Other</option>
                        </Select>
                    </CardBody>
                </Card>

                {/* User 5 */}
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    bg="white"
                    color="brand.grey"
                    width="800px"
                    mb="5px"
                >
                    <PopoverForm></PopoverForm>

                    <CardBody ml="10px">
                        <Heading size='md'>Sabrina Carpenter</Heading>
                        <Text fontSize="12px">Player</Text>
                    </CardBody>

                    <CardBody>
                        <Select maxWidth="300" bg="gray.300" borderColor="brand.teal" borderWidth="2px"
                            placeholder='Select role...'>
                            <option value='Community Leader'>               Community Leader</option>
                            <option value='Other'>                          Other</option>
                        </Select>
                    </CardBody>
                </Card>

                {/* User 6 */}
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    bg="white"
                    color="brand.grey"
                    width="800px"
                    mb="5px"
                >
                    <PopoverForm></PopoverForm>

                    <CardBody ml="10px">
                        <Heading size='md'>Carrie Underwood</Heading>
                        <Text fontSize="12px">Player</Text>
                    </CardBody>

                    <CardBody>
                        <Select maxWidth="300" bg="gray.300" borderColor="brand.teal" borderWidth="2px"
                            placeholder='Select role...'>
                            <option value='Community Leader'>               Community Leader</option>
                            <option value='Other'>                          Other</option>
                        </Select>
                    </CardBody>
                </Card>
            </Box>

        </Box>
    );
}

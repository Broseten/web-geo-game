// Authors: Vojta Bruza and Grace Houser
// Player card options in lobby 

import { Box, Card, CardBody, HStack, Heading, IconButton, Select, Text, Tooltip } from "@chakra-ui/react";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import Icon from "./Icon";
import '../../Theme/theme.css';
import { PlayerData } from "../../data/DataTypes";


// Main Icon component, accepting you and color props
interface PlayerCardProps {
    you: boolean;
    player: PlayerData;
}

export default function PlayerCard({ you, player }: PlayerCardProps) {

    // TODO - variables needed
    const isYou = you;

    const playerName = player.name;
    const playerRole = player.role;
    const playerColor = player.color;


    // Your Player Card in Lobby 
    if (isYou) {
        return (
            <Card direction={{ base: 'column', sm: 'row' }}
                variant='outline' bg="white" color="brand.grey"
                width="800px" mb="5px"
            >
                {/* Icon */}
                <Icon you={isYou} color={"red"} />

                {/* Player Name */}
                <CardBody ml="10px">
                    <Heading size='md'>{playerName}</Heading> {/* TODO - filler player name is "Player 1", "Player 2", etc. */}
                    <Text fontSize="12px">Player</Text>
                </CardBody>

                {/* Select Role Dropdown */}
                <CardBody>
                    <Select
                        maxWidth="300" bg="gray.300"
                        borderColor="brand.grey" borderWidth="2px"

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

                {/* Action Buttons */}
                <CardBody>
                    <HStack>
                        {/* Edit Name Action Button */}
                        <Tooltip label="Edit name" fontSize="sm" placement="top" hasArrow>
                            <IconButton
                                bg="gray.200" color="black"
                                _hover={{ bg: "gray.400" }}
                                aria-label='Search database'
                                icon={<EditIcon />}
                                ml="70px" mr="5px"
                            />
                        </Tooltip>

                        {/* Leave Room Action Button */}
                        <Tooltip label="Leave room" fontSize="sm" placement="top" hasArrow>
                            <IconButton
                                colorScheme='red'
                                aria-label='Search database'
                                icon={<CloseIcon />}
                            />
                        </Tooltip>
                    </HStack>
                </CardBody>
            </Card>
        )
    }


    // Other Player Card in Lobby 
    else return (
        <Card direction={{ base: 'column', sm: 'row' }}
            variant='outline' bg="white" color="brand.grey"
            width="800px" mb="5px"
        >
            {/* Icon */}
            <Icon you={isYou} color={playerColor} />

            {/* Player Name */}
            <CardBody ml="10px">
                <Heading size='md'>{playerName}</Heading>
                <Text fontSize="12px">Player</Text>
            </CardBody>

            {/* Select Role Dropdown */}
            <CardBody>
                <Select isDisabled
                    maxWidth="300" bg="gray.300"
                    borderColor="brand.grey" borderWidth="2px"
                    placeholder={playerRole}>
                </Select>
            </CardBody>

            {/* Action Buttons */}
            <CardBody>
                <HStack>
                    {/* Edit Name Action Button */}
                    <IconButton isDisabled
                        bg="gray.200" color="black"
                        _hover={{bg: "gray.200"}}
                        aria-label='Search database'
                        icon={<EditIcon />}
                        ml="70px" mr="5px"
                    />

                    {/* Leave Room Action Button */}
                    <IconButton isDisabled
                        colorScheme='red'
                        aria-label='Search database'
                        icon={<CloseIcon />}
                    />
                </HStack>
            </CardBody>
        </Card>
    );
}

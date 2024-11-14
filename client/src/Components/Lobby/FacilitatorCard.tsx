// Authors: Vojta Bruza and Grace Houser
// Facilitator card options in lobby 

import { Box, Card, CardBody, HStack, Heading, IconButton, Select, Text, Tooltip } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Icon from "./Icon";
import '../../Theme/theme.css';


// Main Icon component, accepting you and color props
interface FacilitatorCardProps {
    you: boolean;
}

export default function FacilitatorCard({ you }: FacilitatorCardProps) {

    // TODO - variables needed
    const isYou = you;

    const userName = "Facilitator Name";  // filler facilitator name is "Facilitator"
    const userColor = "orange";


    // Your Facilitator Card in Lobby 
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
                    <Heading size='md'>{userName}</Heading> {/* filler facilitator name is "Facilitator" */}
                    <Text fontSize="12px">Player</Text>
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
                                ml="188px" mr="5px"
                            />
                        </Tooltip>

                        {/* Leave Room Action Button */}
                        <Tooltip label="Delete room" fontSize="sm" placement="top" hasArrow>
                            <IconButton
                                colorScheme='red'
                                aria-label='Search database'
                                icon={<DeleteIcon />}
                            />
                        </Tooltip>
                    </HStack>
                </CardBody>
            </Card>
        )
    }


    // Facilitator Card in Lobby, view as a player
    else return (
        <Card direction={{ base: 'column', sm: 'row' }}
            variant='outline' bg="white" color="brand.grey"
            width="800px" mb="5px"
        >
            {/* Icon */}
            <Icon you={isYou} color={userColor} />

            {/* Player Name */}
            <CardBody ml="10px">
                <Heading size='md'>{userName}</Heading>
                <Text fontSize="12px">Player</Text>
            </CardBody>
        </Card>
    );
}

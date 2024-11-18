// Authors: Vojta Bruza and Grace Houser
// Facilitator Card in lobby 

import { Box, Card, CardBody, HStack, Heading, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Icon from "./Icon";
import EditActionPopup from "./EditActionPopup";
import '../../Theme/theme.css';


// Main component, accepting "user": if the user is yourself
interface FacilitatorCardProps {
    isFac: boolean;
}

export default function FacilitatorCard({ isFac }: FacilitatorCardProps) {

    // TODO - variables needed
    const isFacilitator = isFac;
    const userName = "Facilitator";  // default facilitator name is "Facilitator"
    const userColor = "default";


    // Facilitator Card in Lobby, view as a player
    return (
        <Card direction={{ base: 'column', sm: 'row' }}
            variant='outline' bg="white" color="brand.grey"
            width="800px" mb="5px"
        >
            {/* Icon */}
            <Icon color={userColor} />

            {/* Player Name */}
            <CardBody ml="10px">
                {/* default facilitator name is "Facilitator" */}
                <Heading size='md'>{userName}</Heading> 
                <Text fontSize="12px">Facilitator</Text>
            </CardBody>

            {/* Action Buttons (shown if you are the facilitator) */}
            {
                isFacilitator ?
                    <CardBody>
                        <HStack justify="right" mr="38px">

                            {/* Edit Action Button */}
                            <Tooltip label="Edit name and color" fontSize="sm" placement="top" hasArrow>
                                <EditActionPopup />
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
                    : <Box />
            }
        </Card>
    );
}

// Import necessary modules
import { Avatar, Box } from "@chakra-ui/react";
import React from "react";
import '../../Theme/theme.css';

// Main Icon component, accepting color prop
interface FacilitatorCardProps {
    color: string;
}

export default function Icon({ color }: FacilitatorCardProps) {

    // defining the user icon's color 
    const iconColor = "var(--icon-" + color + ")";

    // TODO - make default color "default" (or gray, as defined in theme.css)

    return (
        <Box alignSelf="center" ml="10px" mr="21px">
            <Avatar display='inline-block' bg={iconColor}></Avatar>
        </Box>
    );
};

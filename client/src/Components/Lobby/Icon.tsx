// Authors: Vojtech Bruza and Grace Houser
import { Avatar, Box } from "@chakra-ui/react";
import React from "react";
import "../../Theme/theme.css";
import { ICON_COLORS } from "./EditActionPopup";

// IconProps interface
interface IconProps {
    color: string;
}

const Icon: React.FC<IconProps> = ({ color }) => {

    // Determine the CSS variable for the user's selected color
    const userColor = ICON_COLORS.includes(color)
        ? `var(--icon-${color})`
        : "var(--icon-default)";

    // Return the Icon with the appropriate background color
    return (
        <Box alignSelf="center" ml="10px" mr="21px">
            <Avatar display="inline-block" bg={userColor} />
        </Box>
    );
};

export default Icon;

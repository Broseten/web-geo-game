// Authors: Vojtech Bruza and Grace Houser
import { Avatar, Box } from "@chakra-ui/react";
import React from "react";
import "../../Theme/theme.css";
import { global_icon_colors } from "../../data/DataTypes";

// IconProps interface
interface IconProps {
    color: string;
}

export const getIconColor = (color: string | undefined, alpha = 1) => {
    if (color && global_icon_colors.includes(color)) {
        return hexToRgba(getComputedStyle(document.documentElement).getPropertyValue(`--icon-${color}`).trim(), alpha);
    }
    return hexToRgba(getComputedStyle(document.documentElement).getPropertyValue("--icon-default").trim(), alpha);
};

// Utility function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number) => {
    // Remove the '#' if it's included
    hex = hex.replace("#", "");
    // Parse the r, g, b values
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Icon: React.FC<IconProps> = ({ color }) => {

    // Determine the CSS variable for the user's selected color
    const userColor = getIconColor(color);

    // Return the Icon with the appropriate background color
    return (
        <Box alignSelf="center" ml="10px" mr="21px">
            <Avatar display="inline-block" bg={userColor} />
        </Box>
    );
};

export default Icon;

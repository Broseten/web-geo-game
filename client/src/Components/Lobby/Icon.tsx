// Authors: Vojta Bruza and Grace Houser
// Icon for User Cards in lobby 

import { Avatar, Box } from "@chakra-ui/react";
import React from "react";
import '../../Theme/theme.css';


// main Icon component, accepting color prop
interface IconProps {
    color: string;
}

const Icon: React.FC<IconProps> = ({ color }) => {

    // color options from theme.css file 
    const themeColors = ['pink', 'red', 'orange', 'yellow', 'green', 'tur', 'blue', 'purple']

    // determine icon color from user input
    var userColor = "";
    {
        themeColors.includes(color) ?
            userColor = "var(--icon-${color})"
            :
            userColor = "var(--icon-default)"
    }

    // returns icon 
    return (
        <Box alignSelf="center" ml="10px" mr="21px">
            <Avatar display='inline-block' bg={userColor}></Avatar>
        </Box>
    );
};

export default Icon;

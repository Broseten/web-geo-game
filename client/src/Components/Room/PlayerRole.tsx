import { Box, Center, HStack, Icon, Image, Text } from "@chakra-ui/react";
//import { useScreenSelection } from "../Contexts/useScreenSelection";
import MyIcon from "/src/images/role.svg";

export default function PlayerRole() {

    //const { setCurrentScreen } = useScreenSelection();
    //const roomName = 'temp';

    return (
        <Box><HStack>

            {/* Players in the lobby */}
            <Box bg="white" color="black" borderRadius={"15"}
                pt="3" pb="10" pl="5" pr="5" mr="5">
                
                <Text fontWeight="bold" fontSize="20">Players in lobby</Text>
                <Text opacity="0" fontSize="8">x</Text>

                {/* Example of player */}
                <Box bg="pink" borderRadius="20"
                    pt="1" pb="1" pl="4" pr="10" mb="2">
                    <Text color="black">Grace</Text>
                </Box>

                {/* Example of player */}
                <Box bg="brand.yellow" borderRadius="20"
                    pt="1" pb="1" pl="4" pr="10" mb="2">
                    <Text color="black">Robert</Text>
                </Box>

                {/* Example of player */}
                <Box bg="gray.300" borderRadius="20"
                    pt="1" pb="1" pl="4" pr="10" mb="2">
                    <Text color="black">Jennifer</Text>
                </Box>

                {/* Example of player */}
                <Box bg="gray.300" borderRadius="20"
                    pt="1" pb="1" pl="4" pr="10" mb="2">
                    <Text color="black">Violet</Text>
                </Box>


            </Box>

            {/* Role choices in the lobby */}
            <Box bg="white" color="black" borderRadius={"15"}
                pt="3" pb="10" pl="5" pr="5" >
                
                <Text fontWeight="bold" fontSize="20">Roles</Text>
                <Text opacity="0" fontSize="8">x</Text>

                <div>
                    {/* <img src={MyIcon}></img> */}
                </div>
                


            </Box>



        </HStack></Box>
    );
}

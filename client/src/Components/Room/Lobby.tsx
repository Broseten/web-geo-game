import { Box, Button, Center, Image, Text } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import UserList from "./UserList_Player";
import UserListF from "./UserList_Facilitator";

export default function Lobby() {

    const { setCurrentScreen } = useScreenSelection();
    const roomName = 'temp';

    return (
        <Box>
            {/* Text at the top of the screen */}
            <Center>
                <Text pt='50' fontSize="4xl" fontWeight="bold" color="brand.teal">
                    Welcome to the {roomName} lobby!
                </Text>
            </Center>

            <Center>
                <Text pb="10" pr="20" pl="20" fontSize="l" color="brand.grey" align="center">
                    The facilitator will start the game when everyone is ready.
                    {/* TODO - Show text below if user is the facilitator */}
                    {/* Start the game when everyone is ready. */} 
                </Text>
            </Center>

            {/* Player and role boxes in the lobby */}
            <Center>
                {/* TODO - User list depends on whether you are a facilitator or player */}
                {/* <UserList /> or <UserListF />*/}
                <UserListF />
            </Center>

            {/* TODO - This button should be disbaled for players (only the facilitator can start the game) */}
            {/* This button leaves the lobby and goes to the game */}
            <Center>
                <Button bg="brand.teal" color='white' borderColor="brand.teal" borderWidth="2px"
                    mt="10"
                    _hover={{ 
                        bg: "white",
                        color: "brand.teal",
                        borderColor: "brand.teal",
                        borderWidth: "2px"
                    }}
                    onClick={() => {
                        setCurrentScreen('play');
                    }}>
                    Play
                </Button>
            </Center>

            {/* home button at the top */}
            <Button position="absolute" top="0" left="0"
                bg="none"
                _hover={{ background: "none" }}
                onClick={() => {
                    setCurrentScreen('home');
                }}>
                <Text color="brand.grey" _hover={{ textDecoration: "underline" }}>
                    NegoDesign
                </Text>
            </Button>
        </Box>
    );
}

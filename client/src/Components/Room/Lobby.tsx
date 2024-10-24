import { Box, Button, Center, Image, Text } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import PlayerRole from "./PlayerRole";

export default function Lobby() {

    const { setCurrentScreen } = useScreenSelection();
    const roomName = 'temp';

    return (
        <Box>
            {/* Text at the top of the screen */}
            <Center>
                <Text pt='50' fontSize="4xl" fontWeight="bold" color="brand.teal"
                >Welcome to the {roomName} lobby!
                </Text>
            </Center>

            <Center>
                <Text pb="10" pr="20" pl="20" fontSize="l" color="brand.grey" align="center"
                >Hover over the roles on the right to learn more. Then, select a role. The facilitator will start the game when everyone is ready.
                </Text>
            </Center>

            {/* Player and role boxes in the lobby */}
            <Center><PlayerRole></PlayerRole></Center>

            {/* This button leaves the lobby and goes to the game */}
            <Center>
                <Button bg="brand.teal" color='white' variant="solid" mt="10"
                    onClick={() => {
                        setCurrentScreen('play');
                    }}>
                    Play
                </Button>
            </Center>

            {/* home button at the top */}
            <Button position="absolute" top="0" left="0" height="20" width="20"
                bg="none"
                _hover={{ background: "none" }}
                onClick={() => {
                    setCurrentScreen('home');
                }}>
                <Image src="src/Theme/images/home.png"></Image>
            </Button>
        </Box>
    );
}

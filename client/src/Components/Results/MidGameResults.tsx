// Authors: Vojta Bruza and Grace Houser
// Results Page 

import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { global_playerID } from "../Contexts/ConnectionContext";
import { useGameRoom } from "../Contexts/GameRoomContext";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import PlayerRanking from "./PlayerRanking";
import { socket } from "../../main";


export default function MidGameResults() {
    const { isFacilitator } = useGameRoom();
    const { setCurrentScreen } = useScreenSelection();

    const isFac = useMemo(() => isFacilitator(global_playerID), [global_playerID, isFacilitator]);

    return (
        <Box overflow="auto" h="100%">

            {/* Page Title */}
            <Center>
                <Text pt="70px"
                    fontSize="4xl" fontWeight="bold" color="brand.teal">
                    Results!
                </Text>
            </Center>

            <Center>
                <Text pb="20px" align="center"
                    fontSize="lg" color="brand.grey">
                    {
                        isFac ?
                            "You can click continue to progress to the next round."
                            :
                            "Check out your score! The facilitator will progress the game when ready."
                    }
                </Text>
            </Center>

            {/* Rankings Section */}
            <Center>
                <Box overflow="auto"
                    height="55vh"
                    borderRadius="5px"
                    padding="5"
                    mb="20px"
                    width="90%"
                >
                    {/* Rankings */}
                    <PlayerRanking />
                </Box>
            </Center>

            {/* Next Button - to second round or end screen */}
            <Center>
                {isFac &&
                    <Button
                        mb="80px"
                        bg='brand.teal' color="white"
                        _hover={{ bg: "white", color: "brand.teal", borderColor: "brand.teal", borderWidth: "2px" }}
                        onClick={() => {
                            socket.emit('progress-game');
                        }}>
                        Continue
                    </Button>
                }
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
// Authors: Vojta Bruza and Grace Houser
// Results Page 

import { Box, Button, Center, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { useConnection } from "../Contexts/ConnectionContext";
import { useGameRoom } from "../Contexts/GameRoomContext";
import PlayerRanking from "./PlayerRanking";
import { useTranslation } from "react-i18next";


export default function MidGameResults() {
    const { t } = useTranslation();
    const { isFacilitator } = useGameRoom();
    const { socket, localPlayerID } = useConnection();

    const isFac = useMemo(() => isFacilitator(localPlayerID), [localPlayerID, isFacilitator]);

    return (
        <Box overflow="auto" h="100%">

            {/* Page Title */}
            <Center>
                <Text pt="70px"
                    fontSize="4xl" fontWeight="bold" color="primary.500">
                    {t('results.results')}
                </Text>
            </Center>

            <Center>
                <Text pb="20px" align="center"
                    fontSize="lg" color="gray.900">
                    {
                        isFac ?
                            t('results.click-to-progress')
                            :
                            t('results.check-score')
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
                        bg='primary.500' color="white"
                        _hover={{ bg: "white", color: "primary.500", borderColor: "primary.500", borderWidth: "2px" }}
                        onClick={() => {
                            socket.emit('progress-game');
                        }}>
                        {t('generic.continue')}
                    </Button>
                }
            </Center>
        </Box>
    );
}
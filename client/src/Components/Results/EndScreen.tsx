// Authors: Vojta Bruza and Grace Houser
// This end screen displays the final results of the players 

import { Box, Center, Heading, Stack } from "@chakra-ui/react";
import '../../Theme/theme.css';
import HomeButton from "../HomeButton";
import SolutionRanking from "./SolutionRanking";
import { useTranslation } from "react-i18next";


export default function EndScreen() {

    const { t } = useTranslation();

    return (
        <Box overflow="auto" h="100%">
            <Center>
                <Stack spacing={8} mt="75px" mb="80px" align="center">
                    <Heading size="2xl" textAlign="center" color="gray.900" textShadow="0px 0px 8px #444444">
                        {t('results.thank-you')}
                    </Heading>

                    <SolutionRanking />

                    {/* <Button
                        bg="primary.500"
                        color="white"
                        variant="outline"
                        _hover={{ bg: "white", color: "primary.500" }}
                        onClick={() => setCurrentScreen('home')}
                    >
                        Play Again
                    </Button> */}
                </Stack>
            </Center>

            {/* home button at the top */}
            <HomeButton />
        </Box>

    );
}
// Authors: Vojta Bruza and Grace Houser
// Accordion of facilitator selected solutions for game play 

import { Accordion, Box, Center, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useGameRoom } from "../../Contexts/GameRoomContext";
import { useLocalGameData } from "../../Contexts/LocalGameContext";
import MarkerInfoCard from "../Voting/MarkerInfoCard";
import { SolutionAccordionItem } from "./SolutionAccordionItem";
import { SolutionInfoCard } from "./SolutionInfoCard";
import { useTranslation } from "react-i18next";


export default function Solutions() {

    const { t } = useTranslation();
    const { setSelectedSolutionID, getSelectedSolution, getSelectedMarker, setSelectedMarkerID } = useLocalGameData();
    const { getRoomSolutions } = useGameRoom();

    const selectedSolution = getSelectedSolution();
    const selectedMarker = getSelectedMarker();
    // TODO display marker info instead with a way to navigate back to the solution list

    const solutionList = getRoomSolutions();

    useEffect(() => {
        // reset selected solution on cleanup
        return () => {
            setSelectedSolutionID(null);
            setSelectedMarkerID(null);
        };
    }, []);

    // TODO better padding - width
    return (
        <>
            {
                selectedMarker
                &&
                <MarkerInfoCard marker={selectedMarker} />
            }
            {
                !selectedMarker
                &&
                !selectedSolution
                &&
                // If no solution is selected, display a list of solutions
                <Box overflow="auto" width="100%" borderRadius="lg"
                    maxH='70vh'
                >
                    <Center>

                        {/* Solution Accordion */}
                        <Accordion
                            width="300px"
                            bg="white"
                            color="gray.900"
                            borderBottom={"1px"}
                            borderColor="gray.300"
                            allowToggle
                        >
                            {
                                solutionList.map((solution) => (
                                    <SolutionAccordionItem
                                        key={solution.id}
                                        solution={solution}
                                        onClick={() => setSelectedSolutionID(solution.id)}
                                        buttonText={t('generic.button.select')}
                                    />
                                ))
                            }

                        </Accordion>
                    </Center>
                </Box>
            }
            {
                !selectedMarker
                &&
                selectedSolution
                &&
                // If a solution is selected, display it
                <VStack>
                    <SolutionInfoCard
                        key={selectedSolution.id}
                        solution={selectedSolution}
                        onClick={() => setSelectedSolutionID(null)}
                        buttonText={t('generic.button.cancel')}
                    />
                    <Text as={"b"} align="center" color={"white"}>{t('play.game.place-solution')}</Text>
                </VStack>
            }
        </>
    );
}
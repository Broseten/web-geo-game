// Authors: Vojta Bruza and Grace Houser
// Accordion of facilitator selected solutions for game play 

import { Accordion, Box, Center, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useGameRoom } from "../../Contexts/GameRoomContext";
import { useLocalGameData } from "../../Contexts/LocalGameContext";
import MarkerInfoCard from "../Voting/MarkerInfoCard";
import { SolutionAccordionItem } from "./SolutionAccordionItem";
import { SolutionInfoCard } from "./SolutionInfoCard";


export default function Solutions() {
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
                            maxWidth="300px"
                            bg="white"
                            color="brand.grey"
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
                                        buttonText={"Select"}
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
                        buttonText={"Cancel"}
                    />
                    <Text as={"b"} align="center">Click on the map to place the selected solution.</Text>
                </VStack>
            }
        </>
    );
}
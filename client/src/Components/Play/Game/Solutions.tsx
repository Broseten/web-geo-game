// Authors: Vojta Bruza and Grace Houser
// Accordion of facilitator selected solutions for game play 

import { Accordion, Box, Center, Text, VStack } from "@chakra-ui/react";
import { global_solutions } from "../../../data/data";
import { useLocalGameData } from "../../Contexts/LocalGameContext";
import { SolutionAccordionItem } from "./SolutionAccordionItem";
import { SolutionInfoCard } from "./SolutionInfoCard";
import { useEffect } from "react";
import MarkerInfoCard from "../Voting/MarkerInfoCard";


export default function Solutions() {
    const { setSelectedSolutionID, getSelectedSolution, getSelectedMarker, setSelectedMarkerID } = useLocalGameData();

    const selectedSolution = getSelectedSolution();
    const selectedMarker = getSelectedMarker();
    // TODO display marker info instead with a way to navigate back to the solution list

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
                <Box overflow="auto" width="300px" borderRadius="lg"
                    // TODO make this autofit the parent and make sure the parent is correctly scaling
                    height={{
                        // responsive height 
                        base: '300px',  // For mobile screens (sm and below)
                        md: '350px',    // For medium screens (tablet)
                        lg: '450px',    // For large screens (desktop)
                        xl: '550px',    // For extra-large screens
                    }}>
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
                                global_solutions?.map((solution) => (
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
                    <Text as={"b"}>Click on the map to place the selected solution.</Text>
                </VStack>
            }
        </>
    );
}
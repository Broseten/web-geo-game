// Authors: Vojta Bruza and Grace Houser
// accordion of solution options for the game play 

import { Accordion, Box, Center, Text, VStack } from "@chakra-ui/react";
import { global_solutions } from "../../../data/data";
import { useLocalGameData } from "../../Contexts/LocalGameContext";
import { SolutionAccordionItem } from "./SolutionAccordionItem";
import { SolutionItem } from "./SolutionItem";
import { useEffect } from "react";


export default function Solutions() {
    const { selectedSolutionID, setSelectedSolutionID, getSelectedSolution } = useLocalGameData();

    const selectedSolution = getSelectedSolution();

    useEffect(() => {
        // reset selected solution on cleanup
        return () => setSelectedSolutionID(null);
    }, []);

    // TODO better padding - width
    return (
        <>
            {
                selectedSolution === undefined
                    ?
                    // If no solution is selected, display a list of solutions
                    <Box overflow="auto" width="300px" borderRadius="lg"
                        // TODO make this autofit the parent and make sure the parent is correctly scaling
                        height={{
                            // responsive height 
                            base: '150px',  // For mobile screens (sm and below)
                            md: '300px',    // For medium screens (tablet)
                            lg: '500px',    // For large screens (desktop)
                            xl: '600px',    // For extra-large screens
                        }}>
                        <Center>

                            {/* Solution Options */}
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
                    :
                    // If a solution is selected, display it
                    <VStack>
                        <SolutionItem
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
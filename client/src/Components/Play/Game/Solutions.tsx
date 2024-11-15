// Authors: Vojta Bruza and Grace Houser
// This file displays the accordion of solution options 

import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Center, Image, Text } from "@chakra-ui/react";
import { useGameRoom } from "../../Contexts/GameRoomContext";


export default function Solutions() {

    const { setRoomStatus } = useGameRoom();

    // TODO - get Solution Data from somewhere more permanent 
    const solutions = [
        { id: "1", name: "Digitally Fabricated Vegetable Garden", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", image: "SolutionsPins_ARenriched", price: 500 },
        { id: "2", name: "Small Scale Pavillion Structure", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", image: "SolutionsPins_ARenriched", price: 800 },
        { id: "3", name: "Temporary Structures from Recycled Material", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", image: "SolutionsPins_ARenriched", price: 1000 },
        { id: "4", name: "Reactivation of Open Spaces through NBS", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", image: "SolutionsPins_ARenriched", price: 1200 },
        { id: "5", name: "Projection Mapping on Kinetic Surfaces", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", image: "SolutionsPins_ARenriched", price: 1800 },
        { id: "6", name: "AR Enriched Human-place Interaction", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", image: "SolutionsPins_ARenriched", price: 2000 }
    ];


    return (
        <Box overflow="auto" width="300px" height="400px" borderRadius="lg">
            <Center>

                {/* Solution Options */}
                <Accordion allowMultiple maxWidth="300px"
                    bg="white" color="brand.grey"
                    borderBottom={"1px"} borderColor="gray.300">

                    {/* For Loop of Solutions*/}
                    {
                        solutions && solutions.map((solution) => (
                            <AccordionItem>
                                <h2>
                                    <AccordionButton p="2">
                                        <Image height="40px" width="40px" ml="0" mr="10px"
                                            src={"/images/solution-icons/RED/" + solution.image + ".png"}>
                                        </Image>

                                        <Box flex='1' textAlign='left'>
                                            <Text lineHeight="1.15" fontSize="14px" fontWeight="bold">
                                                {solution.name}
                                            </Text>

                                            <Text as="span" fontSize="12px" fontWeight="normal" m="0">
                                                €{solution.price}
                                            </Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>

                                <AccordionPanel pb={4} fontSize="12px">
                                    {solution.description}

                                    <Button bg="brand.red" color="white" fontSize="14px"
                                        height="30px" width="80px"
                                        display="flex" justifySelf="flex-end" mt="2"
                                        _hover={{
                                            borderColor: "brand.red",
                                            borderWidth: "2px",
                                            background: "red.100",
                                            color: "brand.red"
                                        }}
                                        onClick={() => setRoomStatus({ selectSolutionID: "todo" })
                                        }
                                    >
                                        Buy
                                    </Button>
                                </AccordionPanel>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </Center>
        </Box>
    );
}
// Authors: Vojta Bruza and Grace Houser
// accordion of solution options for the game play 

import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Center, Image, Text } from "@chakra-ui/react";
import { useGameRoom } from "../../Contexts/GameRoomContext";
import { global_solutions } from "../../../data/data";


export default function Solutions() {

    const { setRoomStatus } = useGameRoom();

    return (
        <Box overflow="auto" width="300px" borderRadius="lg"
        height={{
            // responsive height 
            base: '150px',  // For mobile screens (sm and below)
            md: '300px',    // For medium screens (tablet)
            lg: '500px',    // For large screens (desktop)
            xl: '600px',    // For extra-large screens
          }}>
            <Center>

                {/* Solution Options */}
                <Accordion allowMultiple maxWidth="300px"
                    bg="white" color="brand.grey"
                    borderBottom={"1px"} borderColor="gray.300">

                    {/* For Loop of Solutions*/}
                    {
                        global_solutions?.map((solution) => (
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
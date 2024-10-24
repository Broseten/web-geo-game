import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, Text } from "@chakra-ui/react";

export default function Solutions() {

    return (
        <Box><Center>

            {/* Solution Options */}
            <Accordion allowMultiple mb="40px" maxWidth={300}
                bg="white" color="brand.grey" borderRadius="lg">

                {/* Option 1 */}
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'
                                fontSize="16px"
                                fontFamily={"bold"}>
                                Low Cost Green House <br />
                                <Text as="span" fontSize="12px" m="0">$100,000</Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} fontSize="12px">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </AccordionPanel>
                </AccordionItem>

                {/* Option 2 */}
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'
                                fontSize="16px"
                                fontFamily={"bold"}>
                                Small Scale Pavillion Structure <br />
                                <Text as="span" fontSize="12px" m="0">$150,000</Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} fontSize="12px">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Center></Box>
    );
}
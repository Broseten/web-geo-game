import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Center, HStack, Image, InputLeftElement, Text, VStack } from "@chakra-ui/react";

export default function Solutions() {

    return (
        <Box overflow="auto" width="300px" height="400px" borderRadius="lg">
            <Center>

                {/* Solution Options */}
                <Accordion allowMultiple maxWidth="300px"
                    bg="white" color="brand.grey"
                    borderBottom={"1px"} borderColor="gray.300">

                    {/* Option 1 */}
                    <AccordionItem>
                        <h2>
                            <AccordionButton p="2">
                                <Image height="40px" width="40px" ml="0" mr="10px"
                                    src="src/Theme/images/solution-icons/RED/SolutionsPins_ARenriched.png">
                                </Image>

                                <Box flex='1' textAlign='left'>

                                    <Text lineHeight="1.15" fontSize="14px" fontWeight="bold">
                                        Low Cost Green House
                                    </Text>

                                    <Text as="span" fontSize="12px" fontWeight="normal" m="0">$800</Text>
                                </Box>

                                <AccordionIcon />
                            </AccordionButton>
                        </h2>

                        <AccordionPanel pb={4} fontSize="12px">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.

                            <Button bg="brand.red" color="white" fontSize="14px"
                                height="30px" width="80px"
                                display="flex" justifySelf="flex-end" mt="2"
                                _hover={{
                                    borderColor: "brand.red",
                                    borderWidth: "2px",
                                    background: "red.100",
                                    color: "brand.red"
                                }}>
                                Buy
                            </Button>
                        </AccordionPanel>

                    </AccordionItem>

                    {/* Option 2 */}
                    <AccordionItem>
                        <h2>
                            <AccordionButton p="2">
                                <Image height="40px" width="40px" ml="0" mr="10px"
                                    src="src/Theme/images/solution-icons/RED/SolutionsPins_ARenriched.png">
                                </Image>
                                <Box flex='1' textAlign='left'>

                                    <Text lineHeight="1.15" fontSize="14px" fontWeight="bold">
                                        Small Scale Pavillion Structure
                                    </Text>

                                    <Text as="span" fontSize="12px" fontWeight="normal" m="0">$1,000</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} fontSize="12px">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.

                            <Button bg="brand.red" color="white" fontSize="14px"
                                height="30px" width="80px"
                                display="flex" justifySelf="flex-end" mt="2"
                                _hover={{
                                    borderColor: "brand.red",
                                    borderWidth: "2px",
                                    background: "red.100",
                                    color: "brand.red"
                                }}>
                                Buy
                            </Button>
                        </AccordionPanel>
                    </AccordionItem>

                    {/* Option 3 */}
                    <AccordionItem>
                        <h2>
                            <AccordionButton p="2">
                                <Image height="40px" width="40px" ml="0" mr="10px"
                                    src="src/Theme/images/solution-icons/RED/SolutionsPins_ARenriched.png">
                                </Image>
                                <Box flex='1' textAlign='left'>

                                    <Text lineHeight="1.15" fontSize="14px" fontWeight="bold">
                                        Temporary Structures from Recycled Material
                                    </Text>

                                    <Text as="span" fontSize="12px" fontWeight="normal" m="0">$1,100</Text>
                                </Box>

                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} fontSize="12px">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.

                            <Button bg="brand.red" color="white" fontSize="14px"
                                height="30px" width="80px"
                                display="flex" justifySelf="flex-end" mt="2"
                                _hover={{
                                    borderColor: "brand.red",
                                    borderWidth: "2px",
                                    background: "red.100",
                                    color: "brand.red"
                                }}>
                                Buy
                            </Button>
                        </AccordionPanel>
                    </AccordionItem>

                    {/* Option 4 */}
                    <AccordionItem>
                        <h2>
                            <AccordionButton p="2">
                                <Image height="40px" width="40px" ml="0" mr="10px"
                                    src="src/Theme/images/solution-icons/RED/SolutionsPins_ARenriched.png">
                                </Image>
                                <Box flex='1' textAlign='left'>

                                    <Text lineHeight="1.15" fontSize="14px" fontWeight="bold">
                                        AR Enriched Human-place Interaction
                                    </Text>

                                    <Text as="span" fontSize="12px" fontWeight="normal" m="0">$2,000</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} fontSize="12px">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.

                            <Button bg="brand.red" color="white" fontSize="14px"
                                height="30px" width="80px"
                                display="flex" justifySelf="flex-end" mt="2"
                                _hover={{
                                    borderColor: "brand.red",
                                    borderWidth: "2px",
                                    background: "red.100",
                                    color: "brand.red"
                                }}>
                                Buy
                            </Button>
                        </AccordionPanel>
                    </AccordionItem>

                    {/* Option 5 */}
                    <AccordionItem>
                        <h2>
                            <AccordionButton p="2">
                                <Image height="40px" width="40px" ml="0" mr="10px"
                                    src="src/Theme/images/solution-icons/RED/SolutionsPins_ARenriched.png">
                                </Image>
                                <Box flex='1' textAlign='left'>

                                    <Text lineHeight="1.15" fontSize="14px" fontWeight="bold">
                                        Digitally Fabricated Vegetable Garden
                                    </Text>

                                    <Text as="span" fontSize="12px" fontWeight="normal" m="0">$12,000</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} fontSize="12px">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.

                            <Button bg="brand.red" color="white" fontSize="14px"
                                height="30px" width="80px"
                                display="flex" justifySelf="flex-end" mt="2"
                                _hover={{
                                    borderColor: "brand.red",
                                    borderWidth: "2px",
                                    background: "red.100",
                                    color: "brand.red"
                                }}>
                                Buy
                            </Button>
                        </AccordionPanel>
                    </AccordionItem>

                    {/* Option 6 */}
                    <AccordionItem>
                        <h2>
                            <AccordionButton p="2">
                                <Image height="40px" width="40px" ml="0" mr="10px"
                                    src="src/Theme/images/solution-icons/RED/SolutionsPins_ARenriched.png">
                                </Image>
                                <Box flex='1' textAlign='left'>

                                    <Text lineHeight="1.15" fontSize="14px" fontWeight="bold">
                                        Reactivation of Open Spaces through NBS
                                    </Text>

                                    <Text as="span" fontSize="12px" fontWeight="normal" m="0">$15,000</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} fontSize="12px">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.

                            <Button bg="brand.red" color="white" fontSize="14px"
                                height="30px" width="80px"
                                display="flex" justifySelf="flex-end" mt="2"
                                _hover={{
                                    borderColor: "brand.red",
                                    borderWidth: "2px",
                                    background: "red.100",
                                    color: "brand.red"
                                }}>
                                Buy
                            </Button>
                        </AccordionPanel>
                    </AccordionItem>

                    {/* Option 7 */}
                    <AccordionItem>
                        <h2>
                            <AccordionButton p="2">
                                <Image height="40px" width="40px" ml="0" mr="10px"
                                    src="src/Theme/images/solution-icons/RED/SolutionsPins_ARenriched.png">
                                </Image>
                                <Box flex='1' textAlign='left'>

                                    <Text lineHeight="1.15" fontSize="14px" fontWeight="bold">
                                        Another Option
                                    </Text>

                                    <Text as="span" fontSize="12px" fontWeight="normal" m="0">$15,100</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} fontSize="12px">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.

                            <Button bg="brand.red" color="white" fontSize="14px"
                                height="30px" width="80px"
                                display="flex" justifySelf="flex-end" mt="2"
                                _hover={{
                                    borderColor: "brand.red",
                                    borderWidth: "2px",
                                    background: "red.100",
                                    color: "brand.red"
                                }}>
                                Buy
                            </Button>
                        </AccordionPanel>
                    </AccordionItem>

                </Accordion>

            </Center>
        </Box>
    );
}
// Authors: Vojta Bruza and Grace Houser
// This file displays the cards of the players ranked

import { Card, CardBody, Center, Heading, Text, VStack } from "@chakra-ui/react";
import '../../Theme/other.css';


export default function Rankings() {

    // TODO - needed variables 
    const playerName = "";
    const playerRole = "";
    const playerScore = "";

    // Player Rankings 
    return (
        <Center>
            <VStack overflow="auto" spacing="2px">

                {/* Player 1 */}
                <Card direction={{ base: 'column', sm: 'row' }}
                    bg="var(--icon-red)" // TODO - this would be their icon color 
                    color="brand.grey"
                    width="500px" 
                    mb="5px" 
                    align="center">

                    <CardBody p="10px" pr="80px">
                        {/* TODO - set character limit on name so name will fit on one line on results page */}
                        <Heading size='md'>Harrison Kircher</Heading>
                        <Text fontSize="12px">Developer</Text>
                    </CardBody>

                    <CardBody>
                        <Text fontWeight="bold">
                            Score: 100
                        </Text>
                    </CardBody>
                </Card>

                {/* Player 2 */}
                <Card direction={{ base: 'column', sm: 'row' }}
                    bg="var(--icon-pink)" // TODO - this would be their icon color 
                    color="brand.grey"
                    width="500px" 
                    mb="5px" 
                    align="center">

                    <CardBody p="10px" pr="80px">
                        {/* TODO - set character limit on name so name will fit on one line on results page */}
                        <Heading size='md'>Carrie Underwood</Heading>
                        <Text fontSize="12px">Young Person</Text>
                    </CardBody>

                    <CardBody>
                        <Text fontWeight="bold">
                            Score: 60
                        </Text>
                    </CardBody>
                </Card>

                {/* Player 3 */}
                <Card direction={{ base: 'column', sm: 'row' }}
                    bg="var(--icon-purple)" // TODO - this would be their icon color 
                    color="brand.grey"
                    width="500px" 
                    mb="5px" 
                    align="center">

                    <CardBody p="10px" pr="80px">
                        {/* TODO - set character limit on name so name will fit on one line on results page */}
                        <Heading size='md'>Keith Urban</Heading>
                        <Text fontSize="12px">Historian</Text>
                    </CardBody>

                    <CardBody>
                        <Text fontWeight="bold">
                            Score: 60
                        </Text>
                    </CardBody>
                </Card>

                {/* Player 4 */}
                <Card direction={{ base: 'column', sm: 'row' }}
                    bg="var(--icon-blue)" // TODO - this would be their icon color 
                    color="brand.grey"
                    width="500px" 
                    mb="5px" 
                    align="center">

                    <CardBody p="10px" pr="80px">
                        {/* TODO - set character limit on name so name will fit on one line on results page */}
                        <Heading size='md'>Morgan Wallen</Heading>
                        <Text fontSize="12px">Elder</Text>
                    </CardBody>

                    <CardBody>
                        <Text fontWeight="bold">
                            Score: 20
                        </Text>
                    </CardBody>
                </Card>

                {/* Player 5 */}
                <Card direction={{ base: 'column', sm: 'row' }}
                    bg="var(--icon-yellow)" // TODO - this would be their icon color 
                    color="brand.grey"
                    width="500px" 
                    mb="5px" 
                    align="center">

                    <CardBody p="10px" pr="80px">
                        {/* TODO - set character limit on name so name will fit on one line on results page */}
                        <Heading size='md'>Harry Styles</Heading>
                        <Text fontSize="12px">Environmentalist</Text>
                    </CardBody>

                    <CardBody>
                        <Text fontWeight="bold">
                            Score: 0
                        </Text>
                    </CardBody>
                </Card>

                {/* Player 6 */}
                <Card direction={{ base: 'column', sm: 'row' }}
                    bg="var(--icon-green)" // TODO - this would be their icon color 
                    color="brand.grey"
                    width="500px" 
                    mb="5px" 
                    align="center">

                    <CardBody p="10px" pr="80px">
                        {/* TODO - set character limit on name so name will fit on one line on results page */}
                        <Heading size='md'>Sabrina Carpenter</Heading>
                        <Text fontSize="12px">Officer</Text>
                    </CardBody>

                    <CardBody>
                        <Text fontWeight="bold">
                            Score: 0
                        </Text>
                    </CardBody>
                </Card>
                
            </VStack>
        </Center>
    );
}

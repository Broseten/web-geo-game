// Authors: Vojta Bruza and Grace Houser
// Card of the solution that was clicked on the map during voting

import { Box, Button, Card, CardBody, CardFooter, CardHeader, Image, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function Information() {

    const [isSelected, setIsSelected] = useState(true);

    {/* TODO - variables from solution pin */ }
    const solution = "Temporary Structures from Recycled Material"
    const location = "O'Connell Street"
    const price = "$1,000"
    const image = "SolutionsPins_ARenriched"
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."


    {/* shows when a solution on the map is selected (by being click) */ }
    if (isSelected) {
        return (
            
            // Solution Information Card 
            <Card
                bg="brand.yellow" color="brand.grey"
                borderColor="brand.yellow" borderWidth="10px"
                mt="10px" w="275px">

                <CardHeader bg="white" borderRadius="lg" justifyItems="center" p="2">
                    <Image height="80px" width="80px"
                        src={"images/solution-icons/RED/" + image + ".png"}>
                    </Image>
                </CardHeader>

                <CardHeader fontWeight="bold" lineHeight="1.15" textAlign="center" pb="2">
                    {solution}
                </CardHeader>

                <hr color="black"></hr>

                <CardBody pt="2" pb="2" fontWeight="bold" fontSize="12.5px">
                    Location: {location} <br />
                    Price: {price} <br />
                </CardBody>

                <CardBody pt="0" fontSize="12.5px" overflow="auto">
                    {description}
                </CardBody>

                <CardFooter pt="0" display="flex" justifyContent="flex-end" >
                    <Button bg="brand.red" color="white" fontSize="14px"
                        height="30px" width="80px"
                        mt="2"
                        _hover={{
                            borderColor: "brand.red",
                            borderWidth: "2px",
                            background: "red.100",
                            color: "brand.red"
                        }}>
                        Vote
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    return (
        <Box>
            {/* Default, when no solutions are selected */}
            <Text align="center" color="white">
                Click on a solution to learn more
            </Text>
        </Box>
    );
}
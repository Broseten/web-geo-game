// Authors: Vojta Bruza and Grace Houser
// Card of the solution that was clicked on the map during voting

import { Box, Button, Card, CardBody, CardFooter, CardHeader, Image, Text } from "@chakra-ui/react";
import { useLocalGameData } from "../../Contexts/LocalGameContext";
import { CustomLatLng } from "../../../data/DataTypes";
import { useEffect } from "react";

// helper
const coordsToString = (coords: CustomLatLng) => {
    const rounding = 10000;
    return `${Math.round(coords.lat * rounding) / rounding} lat, ${Math.round(coords.lng * rounding) / rounding} lng`;
}

export default function SolutionMarkerInfo() {
    const { getSelectedMarker, getSolution, setSelectedMarkerID } = useLocalGameData();

    useEffect(() => {
        // reset selected marker on cleanup
        return () => setSelectedMarkerID(null);
    }, []);

    const selectedMarker = getSelectedMarker();
    if (selectedMarker) {
        const selectedSolution = getSolution(selectedMarker.solutionID);
        if (!selectedSolution) {
            console.error("Solution from the marker does not exist...");
            return;
        }
        return (

            // Solution Information Card 
            <Card
                bg="brand.yellow" color="brand.grey"
                borderColor="brand.yellow" borderWidth="10px"
                mt="10px" w="275px">

                <CardHeader bg="white" borderRadius="lg" justifyItems="center" p="2">
                    <Image height="80px" width="80px"
                        src={"images/solution-icons/RED/" + selectedSolution.image + ".png"}>
                    </Image>
                </CardHeader>

                <CardHeader fontWeight="bold" lineHeight="1.15" textAlign="center" pb="2">
                    {selectedSolution.name}
                </CardHeader>

                <hr color="black"></hr>

                <CardBody pt="2" pb="2" fontWeight="bold" fontSize="12.5px">
                    Location: {
                        // TODO geocoding address from coordinates
                        coordsToString(selectedMarker.coordinates)
                    } <br />
                    Price: {selectedSolution.price} <br />
                </CardBody>

                <CardBody pt="0" fontSize="12.5px" overflow="auto">
                    {selectedSolution.description}
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
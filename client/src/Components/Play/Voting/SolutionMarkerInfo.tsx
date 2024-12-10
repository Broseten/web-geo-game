import { Box, Button, Card, CardBody, CardFooter, CardHeader, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CustomLatLng, MapMarkerData, Vote } from "../../../data/DataTypes";
import { useLocalGameData } from "../../Contexts/LocalGameContext";
import { socket } from "../../../main";
import { useGameRoom } from "../../Contexts/GameRoomContext";
import { getSolution } from "../../../data/data";
import ConfirmationModal from "../ConfirmationModal";

// helper
const coordsToString = (coords: CustomLatLng) => {
    const rounding = 10000;
    return `${Math.round(coords.lat * rounding) / rounding} lat, ${Math.round(coords.lng * rounding) / rounding} lng`;
}

export default function SolutionMarkerInfo() {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const { gameRoomState, roomInfo } = useGameRoom();
    const { getSelectedMarker, setSelectedMarkerID } = useLocalGameData();
    const [playerVotes, setPlayerVotes] = useState<number>(0);

    useEffect(() => {
        // reset selected marker on cleanup
        return () => setSelectedMarkerID(null);
    }, []);

    if (!roomInfo) {
        console.error("No room info");
        return;
    }

    const onVote = (marker: MapMarkerData) => {
        if (playerVotes >= roomInfo.maxVotes) {
            // Prevent voting if the player has already voted 3 times
            return;
        }
        setPlayerVotes(playerVotes + 1);
        const vote: Vote = {
            markerID: marker.id,
            playerID: socket.id!,
            roundIndex: gameRoomState!.round.index,
        }

        // Emit vote event to the server
        socket.emit('vote', vote);
    }

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
                        src={"images/solution-icons/RED/" + selectedSolution.image + ".png"} />
                </CardHeader>

                <CardHeader fontWeight="bold" lineHeight="1.15" textAlign="center" pb="2">
                    {selectedSolution.name}
                </CardHeader>

                <hr color="black" />

                <CardBody pt="2" pb="2" fontWeight="bold" fontSize="12.5px">
                    Location: {
                        coordsToString(selectedMarker.coordinates)
                    } <br />
                    Price: {selectedSolution.price} <br />
                    Placed in round: {selectedMarker.roundIndex + 1} <br />
                    Votes count: {selectedMarker.votes?.length || 0} <br />
                </CardBody>

                <CardBody pt="0" fontSize="12.5px" overflow="auto">
                    {selectedSolution.description}
                </CardBody>

                <CardFooter pt="0" display="flex" justifyContent="flex-end" alignItems="center" gap="2">
                    {
                        // cannot vote for own solutions
                        socket.id !== selectedMarker.ownerPlayerID
                        &&
                        <Button bg="brand.red" color="white" fontSize="14px" height="30px" width="80px" mt="2"
                            _hover={{ borderColor: "brand.red", borderWidth: "2px", background: "red.100", color: "brand.red" }}
                            onClick={() => setIsConfirmModalOpen(true)}
                            isDisabled={playerVotes >= roomInfo.maxVotes}
                        >
                            Vote
                        </Button>
                    }

                    <ConfirmationModal
                        isOpen={isConfirmModalOpen}
                        onClose={() => setIsConfirmModalOpen(false)}
                        onConfirm={() => {
                            onVote(selectedMarker);
                            setIsConfirmModalOpen(false);
                        }}
                        message={`Are you sure you want to vote for ${getSolution(selectedMarker.solutionID)?.name}?`}
                    />
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

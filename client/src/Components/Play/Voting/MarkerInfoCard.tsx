import { Box, Button, Card, CardBody, CardFooter, CardHeader, HStack, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getSolution } from "../../../data/data";
import { CustomLatLng, MapMarkerData, RoundStage, Vote } from "../../../data/DataTypes";
import { socket } from "../../../main";
import { global_playerID } from "../../Contexts/ConnectionContext";
import { useGameRoom } from "../../Contexts/GameRoomContext";
import { useLocalGameData } from "../../Contexts/LocalGameContext";
import ConfirmationModal from "../ConfirmationModal";
import { getSolutionImagePath } from "../Game/SolutionInfoCard";

// helper
export const coordsToString = (coords: CustomLatLng) => {
    const rounding = 10000;
    return `${Math.round(coords.lat * rounding) / rounding} lat, ${Math.round(coords.lng * rounding) / rounding} lng`;
}

export interface MarkerInfoProps {
    marker: MapMarkerData;
}

export default function MarkerInfoCard({ marker }: MarkerInfoProps) {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const { gameRoomState, roomInfo } = useGameRoom();
    const { setSelectedMarkerID, setSelectedSolutionID } = useLocalGameData();
    const [playerVotes, setPlayerVotes] = useState<number>(0);

    useEffect(() => {
        // reset selected marker on cleanup
        return () => setSelectedMarkerID(null);
    }, []);

    if (!roomInfo) {
        console.error("No room info");
        return;
    }

    const onVote = (votedMarker: MapMarkerData) => {
        if (playerVotes >= roomInfo.maxVotes) {
            // Prevent voting if the player has already voted 3 times
            return;
        }
        setPlayerVotes(playerVotes + 1);
        const vote: Vote = {
            markerID: votedMarker.id,
            playerID: global_playerID!,
            roundIndex: gameRoomState!.round.index,
        }

        // Emit vote event to the server
        socket.emit('vote', vote);
    }

    const selectedSolution = getSolution(marker.solutionID);
    if (!selectedSolution) {
        console.error("Solution from the marker does not exist...");
        return;
    }

    const solImg = getSolutionImagePath(selectedSolution.image);

    return (
        // Solution Information Card 
        <Card
            bg="secondary" color="gray.900"
            w="100%" maxH="80vh"
        >

            <CardHeader bg="white" borderRadius="lg" justifyItems="center" p="2">
                {solImg ?
                    <Image height="80px" width="80px" src={solImg} />
                    :
                    <Box height="80px" width="80px" backgroundColor="gray.300" borderRadius="full" />
                }
            </CardHeader>

            <CardHeader fontWeight="bold" lineHeight="1.15" textAlign="center" pb="2">
                {selectedSolution.name}
            </CardHeader>

            <hr color="black" />

            <CardBody pt="2" pb="2" fontWeight="bold" fontSize="12.5px">
                Location: {
                    coordsToString(marker.coordinates)
                } <br />
                Price: €{selectedSolution.price} <br />
                Placed in round: {marker.roundIndex + 1} <br />
                Votes count: {marker.votes?.length || 0} <br />
            </CardBody>

            <CardBody pt="0" fontSize="12.5px" overflow="auto">
                {selectedSolution.description}
            </CardBody>

            <CardFooter pt="0" display="flex" justifyContent="flex-end" alignItems="center" gap="2">
                {
                    // cannot vote for own solutions
                    global_playerID !== marker.ownerPlayerID
                    &&
                    gameRoomState?.round.stage === RoundStage.Voting
                    &&
                    <Button bg="secondary.500" color="white" fontSize="14px" height="30px" width="80px" mt="2"
                        _hover={{ borderColor: "secondary.500", borderWidth: "2px", background: "red.100", color: "secondary.500" }}
                        onClick={() => setIsConfirmModalOpen(true)}
                        isDisabled={playerVotes >= roomInfo.maxVotes}
                    >
                        Vote
                    </Button>
                }
                {
                    gameRoomState?.round.stage === RoundStage.Placing
                    &&
                    <HStack spacing="1" align="flex-end">
                        <Button variant="outline" size="sm"
                            onClick={() => setSelectedMarkerID(null)}
                            isDisabled={playerVotes >= roomInfo.maxVotes}
                        >
                            Back to List
                        </Button>

                        {
                            marker.ownerPlayerID === global_playerID
                            &&
                            marker.roundIndex === gameRoomState?.round.index
                            &&
                            <Button colorScheme="red" size="sm"
                                onClick={() => {
                                    setSelectedMarkerID(null);
                                    socket.emit("remove-marker", marker.id)
                                }}
                            >
                                Delete
                            </Button>
                        }
                    </HStack>
                }

                <ConfirmationModal
                    isOpen={isConfirmModalOpen}
                    onClose={() => setIsConfirmModalOpen(false)}
                    onConfirm={() => {
                        onVote(marker);
                        setIsConfirmModalOpen(false);
                    }}
                    message={`Are you sure you want to vote for ${getSolution(marker.solutionID)?.name}?`}
                />
            </CardFooter>

        </Card>
    )
}

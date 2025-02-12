import { Box, Button, Card, CardBody, CardFooter, CardHeader, HStack, Image, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getSolution } from "../../../data/data";
import { CustomLatLng, MapMarkerData, RoundStage, Vote } from "../../../data/DataTypes";
import { useConnection } from "../../Contexts/ConnectionContext";
import { useGameRoom } from "../../Contexts/GameRoomContext";
import { useLocalGameData } from "../../Contexts/LocalGameContext";
import ConfirmationModal from "../ConfirmationModal";
import { getSolutionImagePath } from "../Game/SolutionInfoCard";
import { useGameMarkers } from "../../Contexts/GameMarkersContext";
import { useTranslation } from "react-i18next";

// helper
export const coordsToString = (coords: CustomLatLng) => {
    const rounding = 10000;
    return `${Math.round(coords.lat * rounding) / rounding} lat, ${Math.round(coords.lng * rounding) / rounding} lng`;
}

export interface MarkerInfoProps {
    marker: MapMarkerData;
}

export default function MarkerInfoCard({ marker }: MarkerInfoProps) {
    const { t } = useTranslation();
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const { gameRoomState, roomInfo, getPlayerData } = useGameRoom();
    const { setSelectedMarkerID } = useLocalGameData();
    const { useSocketEvent, socket, localPlayerID } = useConnection();
    const toast = useToast();
    const { getRemainingVotes } = useGameMarkers();

    useSocketEvent('vote-error', (message: string) => {
        toast(
            {
                title: message,
                status: "error",
                isClosable: true,
            }
        );
    });

    useEffect(() => {
        // reset selected marker on cleanup
        return () => setSelectedMarkerID(null);
    }, []);

    if (!roomInfo) {
        console.error("No room info");
        return;
    }

    const onVote = (votedMarker: MapMarkerData) => {
        const vote: Vote = {
            markerID: votedMarker.id,
            playerID: localPlayerID!,
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

    const player = getPlayerData(marker.ownerPlayerID);

    const remainingVotes = getRemainingVotes();

    return (
        // Solution Information Card 
        <Card
            bg="secondary" color="gray.900"
            w="300px" maxH="65vh"
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
                {t('solution-info.location')}: {
                    coordsToString(marker.coordinates)
                } <br />
                {t('solution-info.price')}: €{selectedSolution.price} <br />
                {t('solution-info.placed-by')}: {player?.role} <br />
                {t('solution-info.round-placed')}: {marker.roundIndex + 1} <br />
                {t('solution-info.vote-count')}: {marker.votes?.length || 0} <br />
            </CardBody>

            <CardBody pt="0" fontSize="12.5px" overflow="auto">
                {selectedSolution.description}
            </CardBody>

            <CardFooter pt="0" display="flex" justifyContent="flex-end" alignItems="center" gap="2">
                {
                    // cannot vote for own solutions
                    localPlayerID !== marker.ownerPlayerID
                    &&
                    gameRoomState?.round.stage === RoundStage.Voting
                    &&
                    <Button fontSize="14px" height="30px" width="80px" mt="2"
                        colorScheme="secondary.500"
                        variant="custom_solid"
                        onClick={() => setIsConfirmModalOpen(true)}
                        isDisabled={remainingVotes >= roomInfo.maxVotes}
                    >
                        {t('play.generic.vote')}
                    </Button>
                }
                {
                    gameRoomState?.round.stage === RoundStage.Placing
                    &&
                    <HStack spacing="1" align="flex-end">
                        <Button variant="outline" size="sm"
                            onClick={() => setSelectedMarkerID(null)}
                            isDisabled={remainingVotes >= roomInfo.maxVotes}
                        >
                            {t('play.generic.back')}
                        </Button>

                        {
                            marker.ownerPlayerID === localPlayerID
                            &&
                            marker.roundIndex === gameRoomState?.round.index
                            &&
                            <Button colorScheme="red" size="sm"
                                onClick={() => {
                                    setSelectedMarkerID(null);
                                    socket.emit("remove-marker", marker.id)
                                }}
                            >
                                {t('play.generic.delete')}
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

                    // BUG - TRANSLATION NOT WORKING CORRECTLY
                    message={`{t('play.modal.confirmation.confirm-vote')} ${getSolution(marker.solutionID)?.name}?`}
                />
            </CardFooter>

        </Card>
    )
}

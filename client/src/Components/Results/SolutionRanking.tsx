// Authors: Vojtech Bruza and Grace Houser

import { Box, Button, Card, CardBody, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { getSolution, global_solutions } from "../../data/data";
import '../../Theme/theme.css';
import { useGameMarkers } from "../Contexts/GameMarkersContext";
import { useGameRoom } from "../Contexts/GameRoomContext";
import { getSolutionImagePath } from "../Play/Game/SolutionInfoCard";
import { getIconColor } from "../Lobby/Icon";

export default function SolutionRanking() {
   const { markers } = useGameMarkers();
   const { getPlayerData, players, roomInfo } = useGameRoom();
   const exportData = () => {
      const data = {
         markers,
         players,
         roomInfo,
         global_solutions
      };
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
      const downloadAnchorNode = document.createElement('a');
      // set timestamp for file name
      const date = new Date();
      const pad = (num: number) => num.toString().padStart(2, '0');
      const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}_${pad(date.getHours())}-${pad(date.getMinutes())}`;
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `voting-${dateStr}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
   };

   return (
      <VStack overflow="auto" spacing="2px">
         {
            markers && markers.sort((a, b) => b.votes.length - a.votes.length).map((marker) => {
               const sol = getSolution(marker.solutionID)!;
               const solImg = getSolutionImagePath(sol.image);
               return (
                  // TODO make it responsive
                  <Card
                     direction={{ base: 'column', sm: 'row' }}
                     key={marker.id}
                     maxWidth={{ base: '90%', sm: '90%', md: '800px', lg: '1000px' }} // Adjusts based on screen size
                     width="100%" // Full width by default
                     bg="white"
                     color="gray.900"
                     mb="5px"
                     align="center">

                     <Box
                        backgroundColor={getIconColor(getPlayerData(marker.ownerPlayerID)?.color) || "white"}
                        borderRadius="50%"
                        display="inline-block"
                        padding="5px"
                        width="100px"
                        height="100px"
                        m="20px"
                     >
                        {
                           solImg ?
                              <Image
                                 alt="Player" borderRadius="50%" 
                                 width="100%" height="100%"
                                 src={solImg}
                              />
                              :
                              <Box
                                 backgroundColor="gray.300"
                                 borderRadius="50%"
                                 width="100%"
                                 height="100%"
                              />
                        }
                     </Box>

                     <CardBody p="10px" pr="80px">
                        <Heading size='md'> {sol.name} </Heading>
                        <Text fontSize="12px"> Placed by: {getPlayerData(marker.ownerPlayerID)?.name}, {getPlayerData(marker.ownerPlayerID)?.role} </Text>
                        <Text fontSize="12px"> Price: {sol.price} </Text>
                        <Text fontSize="12px"> Latitude: {marker.coordinates.lat}</Text>
                        <Text fontSize="12px"> Longitude: {marker.coordinates.lng}</Text>
                     </CardBody>

                     <CardBody>
                        <Text fontWeight="bold">
                           Votes: {marker.votes.length}
                        </Text>
                     </CardBody>
                  </Card>
               )
            }
            )
         }
         <Button variant="solid" onClick={exportData}>
            Export Markers
         </Button>
      </VStack>
   );
}

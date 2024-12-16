// Authors: Vojtech Bruza and Grace Houser

import { Card, CardBody, Heading, Text, VStack } from "@chakra-ui/react";
import { getSolution } from "../../data/data";
import '../../Theme/theme.css';
import { useGameMarkers } from "../Contexts/GameMarkersContext";
import { useGameRoom } from "../Contexts/GameRoomContext";
import Icon from "../Lobby/Icon";


export default function SolutionRanking() {
   const { markers } = useGameMarkers();
   const { getPlayerData } = useGameRoom();

   return (
      <VStack overflow="auto" spacing="2px">
         {
            markers && markers.sort((a, b) => a.votes.length - b.votes.length).map((marker) => (
               // TODO make it responsive
               <Card
                  direction={{ base: 'column', sm: 'row' }}
                  key={marker.id}
                  maxWidth={{ base: '90%', sm: '90%', md: '800px', lg: '1000px'}} // Adjusts based on screen size
                  width="100%" // Full width by default
                  bg="white"
                  color="brand.grey"
                  mb="5px"
                  align="center">

                  <Icon color={getPlayerData(marker.ownerPlayerID)?.color || "white"} />

                  <CardBody p="10px" pr="80px">
                     <Heading size='md'> {getSolution(marker.solutionID)!.name} </Heading>
                     <Text fontSize="12px"> Price: {getSolution(marker.solutionID)!.price} </Text>
                  </CardBody>

                  <CardBody>
                     <Text fontWeight="bold">
                        Votes: {marker.votes.length}
                     </Text>
                  </CardBody>
               </Card>
            ))
         }
      </VStack>
   );
}

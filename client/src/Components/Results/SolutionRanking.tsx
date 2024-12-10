// Authors: Vojta Bruza and Grace Houser

import { Card, CardBody, Heading, Text, VStack } from "@chakra-ui/react";
import { getSolution } from "../../data/data";
import '../../Theme/theme.css';
import { useGameRoom } from "../Contexts/GameRoomContext";
import Icon from "../Lobby/Icon";


export default function SolutionRanking() {
   const { markers, getPlayerData } = useGameRoom();

   return (
      <VStack overflow="auto" spacing="2px">
         {
            markers && markers.sort((a, b) => a.votes.length - b.votes.length).map((marker) => (
               // TODO make it responsive
               < Card direction={{ base: 'column', sm: 'row' }} key={marker.id} width="300px"
                  bg="white" color="brand.grey" mb="5px" align="center">

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

// Authors: Vojta Bruza and Grace Houser
// This file is the join room screen where 
// players can select what room they want to join

import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import initSocket from "../../Hooks/useSocket";
import { socket } from "../../main";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import HomeButton from "../HomeButton";

export default function JoinRoom() {
   const { setCurrentScreen } = useScreenSelection();
   const [rooms, setRooms] = useState<{ id: string; name: string }[] | undefined>(undefined);

   // TODO display capacity of the room
   initSocket('room-list', (roomList: { id: string; name: string }[]) => {
      setRooms(roomList);
   });

   useEffect(() => {
      // TODO add a button to refresh or do it automatically in intervals
      //      (or actually let the server notify all clients about a change)
      socket.emit('request-room-list');
   }, []); // empty array to execute this only once on refresh

   return (
      <Box>

         {/* Header */}
         <Center>
            <Text pt='50' fontSize="4xl" fontWeight="bold" color="primary.500">
               Available Rooms
            </Text>
         </Center>

         <Center>
            <Text pb="10" pr="20" pl="20" fontSize="l" color="gray.900" align="center">
               Select a room to join
            </Text>
         </Center>


         <VStack         >

            {/* Room Options */}
            <Center>
               <Box bg="white" borderRadius="5px" overflow="auto"
                  pt="10px" pb="10px"
                  h="400px"
                  w="400px">
                  <VStack>
                     {
                        rooms
                        &&
                        rooms.map((room) => (
                           <Button
                              w="90%"
                              variant={"solid"}
                              colorScheme="secondary"
                              key={room.name}
                              onClick={() => {
                                 socket.emit('join-room', room.id);
                              }}>{room.name || "No name"}
                           </Button>))
                     }
                     {
                        !rooms || rooms.length <= 0
                        &&
                        <>
                           <Text>No Rooms Available</Text>
                        </>
                     }
                  </VStack>
               </Box>
            </Center>
            <Button
               onClick={() => {
                  setCurrentScreen('home');
               }}
               variant="outline"
            >
               Cancel
            </Button>
         </VStack>

         {/* home button at the top */}
         <HomeButton />

      </Box>
   );
}

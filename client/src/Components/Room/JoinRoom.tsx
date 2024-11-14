// Authors: Vojta Bruza and Grace Houser
// This file is the join room screen where 
// players can select what room they want to join

import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import initSocket from "../../Hooks/useSocket";
import { socket } from "../../main";
import { RoomData } from "./RoomData";
import { useState } from "react";

export default function JoinRoom() {
   const { setCurrentScreen } = useScreenSelection();
   const [rooms, setRooms] = useState<{ id: string; name: string }[] | undefined>(undefined);

   initSocket('room-list', (roomList: { id: string; name: string }[]) => {
      setRooms(roomList);
   });

   initSocket('room-info', (roomID: string) => {
      setCurrentScreen('lobby');
      console.log("joined room: " + roomID);
   });

   initSocket('room-info', (roomData: RoomData) => {
      setCurrentScreen('lobby');
      // TODO do something with the data on the frontend
      console.log(roomData);
   });

   // TODO add a button to refresh or do it automatically in intervals
   //      (or actually let the server notify all clients about a change)
   socket.emit('request-room-list');

   return (
      <Box>

         {/* Text at the top of the screen */}
         <Center>
            <Text pt='50' fontSize="4xl" fontWeight="bold" color="brand.teal">
               Available Rooms
            </Text>
         </Center>

         <Center>
            <Text pb="10" pr="20" pl="20" fontSize="l" color="brand.grey" align="center">
               Select a room to join
            </Text>
         </Center>


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
                           bg="brand.yellow" color="brand.grey" variant="outline"
                           _hover={{ bg: "brand.off", borderColor: "brand.yellow", borderWidth: "2px" }}
                           key={room.name}
                           onClick={() => {
                              socket.emit('join-room', room.id);
                           }}>{room.name}
                        </Button>))
                  }
               </VStack>
            </Box>
         </Center>


         {/* home button at the top */}
         <Button position="absolute" top="0" left="0"
            bg="none"
            _hover={{ background: "none" }}
            onClick={() => {
               setCurrentScreen('home');
            }}>
            <Text color="brand.grey" _hover={{ textDecoration: "underline" }}>
               NegoDesign
            </Text>
         </Button>
      </Box>
   );
}

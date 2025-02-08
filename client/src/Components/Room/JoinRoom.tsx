// Authors: Vojta Bruza and Grace Houser
// This file is the join room screen where 
// players can select what room they want to join

import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LocaleSwitcher from "../../i18n/LanguageSwitcher";
import { useConnection } from "../Contexts/ConnectionContext";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import HomeButton from "../HomeButton";
import { getStorage } from "../../data/data";
import { useTranslation } from "react-i18next";

export default function JoinRoom() {
   const { t } = useTranslation();
   const { setCurrentScreen } = useScreenSelection();
   const [rooms, setRooms] = useState<{ id: string; name: string }[] | undefined>(undefined);
   const { socket, useSocketEvent } = useConnection();

   // TODO display capacity of the room
   useSocketEvent('room-list', (roomList: { id: string; name: string }[]) => {
      setRooms(roomList);
   });

   useEffect(() => {
      // TODO add a button to refresh or do it automatically in intervals
      //      (or actually let the server notify all clients about a change)
      socket.emit('request-room-list');
   }, [socket]);

   let lastRoom: string | null = null;
   const lastRoomData = getStorage().getItem('lastRoom');
   if (lastRoomData) {
      const { lastRoomID } = JSON.parse(lastRoomData);
      lastRoom = lastRoomID;
   }

   return (
      <Box>

         <LocaleSwitcher />
         {/* Header */}
         <Center>
            <Text pt='50' fontSize="4xl" fontWeight="bold" color="primary.500">
               {t('join.header')}
            </Text>
         </Center>

         <Center>
            <Text pb="10" pr="20" pl="20" fontSize="l" color="gray.900" align="center">
               {t('join.message')}
            </Text>
         </Center>


         <VStack>

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
                        rooms.sort((a, b) => (b.id === lastRoom ? 1 : 0) - (a.id === lastRoom ? 1 : 0)).map((room) => (
                           <Button
                              w="90%"
                              variant={"solid"}
                              colorScheme={"secondary"}
                              key={room.name}
                              onClick={() => {
                                 socket.emit('join-room', room.id);
                              }}>{(lastRoom === room.id ? `Rejoin: ${room.name}` : room.name) || "No name"}
                           </Button>))
                     }
                     {
                        !rooms || rooms.length <= 0
                        &&
                        <>
                           <Text>{t('join.no-rooms')}</Text>
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
               {t('generic.button.cancel')}
            </Button>
         </VStack>

         {/* home button at the top */}
         <HomeButton />

      </Box >
   );
}

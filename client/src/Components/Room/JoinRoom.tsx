// Authors: Vojta Bruza and Grace Houser
// This file is the join room screen where 
// players can select what room they want to join

import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";

export default function JoinRoom() {
   const { setCurrentScreen } = useScreenSelection();

   // TODO get from server
   const rooms = ['Hufflepuff', 'Gryffindor', 'Ravenclaw', 'Slytherin', 'Poseidon', 'Aphrodite', 'Ophelia', 'Room G', 'Room R', 'Room A', 'Room C', 'Room E'];

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
                     rooms.map((room) => (
                        <Button 
                           bg="brand.yellow" color="brand.grey" variant="outline"
                           _hover={{bg: "brand.off", borderColor: "brand.yellow", borderWidth: "2px"}}
                           key={room}
                           onClick={() => {
                              // TO DO - join room lobby

                              // switch to play screen
                              setCurrentScreen('lobby');
                           }}>{room}
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

import { Box, Button, Center, Icon, Image, Input, Link, Text, VStack } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import { useState } from "react";

export default function CreateRoom() {
   const { setCurrentScreen } = useScreenSelection();
   const [roomName, setRoomName] = useState('');

   return (
      <Box>

         {/* */}
         <Center>
            <Text
               pt='150'
               fontSize="4xl"
               fontWeight="bold"
               color="brand.teal"
            >You are the Facilitator!
            </Text>
         </Center>

         <Center>
            <Text
               pb="20"
               fontSize="l"
               color="brand.grey"
            >Please name your room by typing below.
            </Text>
         </Center>


         <Center>
            <VStack>
               <Input
                  value={roomName}
                  onChange={(event) => setRoomName(event.target.value)}
                  maxWidth="500"
                  outlineColor="white"
                  placeholder='Enter room name...'
                  _placeholder={{ color: 'white' }}
                  mb="5"
               />
               <Button bg='white' color="brand.teal" variant='solid' onClick={() => {
                  // customize the room
                  setCurrentScreen('customize');
               }}>
                  Create {roomName}
               </Button>
            </VStack>
         </Center>

         {/* home button at the top */}
         <Button position="absolute" top="0" left="0" height="20" width="20"
               bg="none"
               _hover={{background: "none"}}
               onClick={() => {
                  setCurrentScreen('home');
               }}>
            <Image rounded='100' //boxShadow='dark-lg'
               src="src/Theme/images/home.png"></Image>
         </Button>
      </Box>
   );
}

import { Box, Button, Center, Image, Text } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import React from 'react';
import '../../Theme/home-create.css';
import Customizations from "./Customizations";

export default function CreateRoom() {
   const { setCurrentScreen } = useScreenSelection();
   const roomName = "temp"

   return (
      <Box
         h='calc(100vh)'
         overflow="auto"
         // background image is sourced from pexels.com 
         backgroundImage="/src/Theme/images/Dublin.jpg"
         backgroundSize="cover"
         backgroundPosition="center"
         backgroundRepeat="no-repeat"
      >
         <Center>
            <Box className="full-translucent-box">

               <Center>
                  <Text pt="70px"
                     fontSize="4xl"
                     fontWeight="bold"
                     color="brand.teal">
                     You are the Facilitator!
                  </Text>
               </Center>

               <Center>
                  <Text pb="20px"
                     fontSize="lg"
                     color="brand.grey">
                     Please create your room by customizing it below.
                  </Text>
               </Center>

               {/* Room customizations */}
               <Center>
                  <Box bg="brand.off" overflow="auto"
                     width="550px" height="500px"
                     borderRadius="5px"
                     borderColor="brand.yellow"
                     borderWidth="2px"
                     padding="5"
                     mb="20px"
                  >
                     <Customizations />
                  </Box>
               </Center>

               {/* This button creates the room and goes to the lobby */}
               <Center>
                  <Button //className="dark-button" 
                     mb="80px"
                     bg='brand.teal' color="white" variant='outline'
                     _hover={{bg: "white", color: "brand.teal", borderColor: "brand.teal", borderWidth: "2px"}}
                     onClick={() => { setCurrentScreen('lobby'); }}>
                     Create {roomName}
                  </Button>
               </Center>
            </Box>

            {/* home button at the top */}
            <Button
               position="absolute" className="home-button" bg="none"
               _hover={{ background: "none" }}
               onClick={() => {
                  setCurrentScreen('home');
               }}>
               <Image rounded='100' //boxShadow='dark-lg'
                  src="src/Theme/images/home.png"></Image>
            </Button>
         </Center>
      </Box>
   );
}

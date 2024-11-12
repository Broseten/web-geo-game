// Authors: Vojta Bruza and Grace Houser
// This file displays the general design for the 
// facilitator when they create a room 

import { Box, Button, Center, Text } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import '../../Theme/theme.css';
import Customizations from "./Customizations";

export default function CreateRoom() {
   const { setCurrentScreen } = useScreenSelection();

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
                  <Box bg="white" overflow="auto"
                     width="500px" height="520px"
                     borderRadius="5px" padding="5">
                     <Customizations />
                  </Box>
               </Center>
            </Box>

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
         </Center>
      </Box>
   );
}

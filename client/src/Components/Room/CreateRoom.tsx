// Authors: Vojta Bruza and Grace Houser
// This file displays the framework for creating a room 

import { Box, Button, Center, Text } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import '../../Theme/theme.css';
import Customizations from "./Customizations";
import { PolygonProvider } from "../Contexts/PolygonContext";
import { global_app_name } from "../../data/data";

export default function CreateRoom() {

   return (
      <Box
         h='calc(100vh)'
         overflow="auto"
         // background image is sourced from pexels.com 
         backgroundImage="/images/Dublin.jpg"
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
                     color="primary.500">
                     You are the Facilitator!
                  </Text>
               </Center>

               <Center>
                  <Text pb="20px"
                     fontSize="lg"
                     color="gray.900">
                     Please create your room by customizing it below.
                  </Text>
               </Center>

               {/* Room Customizations */}
               <Center>
                  <Box bg="white" overflow="auto"
                     width="500px" height="520px"
                     borderRadius="5px" padding="5">
                     <PolygonProvider>
                        <Customizations />
                     </PolygonProvider>
                  </Box>
               </Center>
            </Box>

            {/* home button at the top */}
            <Button position="absolute" top="0" left="0"
               bg="none"
               _hover={{ background: "none" }}
               onClick={() => {
                  // TODO back home?
               }}>
               <Text color="gray.900" _hover={{ textDecoration: "underline" }}>
                  {global_app_name}
               </Text>
            </Button>
         </Center>
      </Box>
   );
}

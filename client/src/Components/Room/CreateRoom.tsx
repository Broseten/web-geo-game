// Authors: Vojta Bruza and Grace Houser
// This file displays the framework for creating a room 

import { Box, Center, Text } from "@chakra-ui/react";
import '../../Theme/theme.css';
import { PolygonProvider } from "../Contexts/PolygonContext";
import HomeButton from "../HomeButton";
import Customizations from "./Customizations";
import { useTranslation } from "react-i18next";

export default function CreateRoom() {

   const { t } = useTranslation();

   return (
      <Box
         h='calc(100vh)'
         overflow="auto"
         backgroundImage="/images/city.jpg"
         backgroundSize="cover"
         backgroundPosition="center"
         backgroundRepeat="no-repeat"
      >
         {/* <LocaleSwitcher /> */}
         <Center>
            {/* full box */}
            <Box
               backgroundColor="rgba(256, 256, 256, 0.75)"
               overflow="auto"
               height="100vh"
               width="100%"
            >
               <Center>
                  <Text pt="70px"
                     fontSize="4xl"
                     fontWeight="bold"
                     color="primary.500">
                     {t('create.header.title')}
                  </Text>
               </Center>

               <Center>
                  <Text pb="20px"
                     fontSize="lg"
                     color="gray.900">
                     {t('create.header.message')}
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
         </Center>

         {/* home button at the top */}
         <HomeButton />
      </Box>
   );
}

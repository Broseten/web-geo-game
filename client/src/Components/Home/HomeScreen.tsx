// Authors: Vojta Bruza and Grace Houser
// This file displays the home screen  

import { Box, Center, HStack, Heading, Icon, Image, Link, Text } from "@chakra-ui/react";
import { InfoOutlineIcon } from '@chakra-ui/icons';
import SetUpInfo from "./SetUpInfo";
import '../../Theme/theme.css'; 

export default function HomeScreen() {

   return (
      <Box
         h='calc(100vh)'
         // background image is sourced from pexels.com 
         backgroundImage="/images/Dublin.jpg"
         backgroundSize="cover"
         backgroundPosition="center"
         backgroundRepeat="no-repeat"
      >
         <Center>
            <Box className="translucent-box">

               {/* Text over the white translucent box */}
               <Center>
                  <Heading mt="75px" mb="1" size="4xl"
                     color="brand.grey" textShadow="0px 0px 8px #444444">
                     NegoDesign
                  </Heading>
               </Center>
               <Center>
                  <Text mb="80px" fontSize="2xl" textAlign="center" 
                     color="brand.teal"
                     textShadow='0px 0px 10px #444444'>
                     A voting tool for collaborative urban planning
                  </Text>
               </Center>

               {/* Buttons - Start and Join/Create Room */}
               <Center>{<SetUpInfo />}</Center> 


               {/* info link */}
               <Center position="absolute" left="50%" bottom="10" transform="translateX(-50%)">
                  <Link href="https://www.heritact.eu" isExternal>
                     <HStack>
                        <Icon as={InfoOutlineIcon} color="brand.grey" />
                        <Image src="/images/HERITACT.png" height="18px" width="84px" />
                     </HStack>
                  </Link>
               </Center>
            </Box>
         </Center>
      </Box>
   );
}

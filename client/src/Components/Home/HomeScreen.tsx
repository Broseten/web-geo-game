// Authors: Vojta Bruza and Grace Houser
// This file displays the home screen design 

import { Box, Center, HStack, Heading, Icon, Image, Link, Text } from "@chakra-ui/react";
import { InfoOutlineIcon } from '@chakra-ui/icons';
import SetUpInfo from "./SetUpInfo";
import '../../Theme/home-create.css'; 

export default function HomeScreen() {

   return (
      <Box
         h='calc(100vh)'
         // background image is sourced from pexels.com 
         backgroundImage="/src/Theme/images/Dublin.jpg"
         backgroundSize="cover"
         //filter="auto" blur="5px"
         //backdropFilter="auto" backdropBlur="5px"
         backgroundPosition="center"
         backgroundRepeat="no-repeat"
      >
         <Center>
            <Box className="translucent-box">

               {/* Text over the white translucent box */}
               <Center>
                  <Heading mt="75px" mb="1" size="4xl" 
                     color="brand.grey"
                     textShadow='0px 0px 8px #444444'>
                     NegoDesign
                  </Heading>
               </Center>
               <Center>
                  <Text mb="80px" fontSize="2xl" textAlign="center" 
                     color="brand.teal"
                     textShadow='0px 0px 10px #444444'>
                     A voting tool for the HeritACT project
                  </Text>
               </Center>

               {/* Start, Player Name, Join/Create Room Options */}
               <Center>{<SetUpInfo />}</Center> 


               {/* HeritACT info link at the bottom */}
               <Center position="absolute" left="50%" bottom="10" transform="translateX(-50%)">
                  <Link href="https://www.heritact.eu" isExternal>
                     <HStack>
                        <Icon as={InfoOutlineIcon} color="brand.grey" />
                        <Image src="/src/Theme/images/HERITACT.png" height="18px" width="84px" />
                     </HStack>
                  </Link>
               </Center>
            </Box>
         </Center>
      </Box>
   );
}

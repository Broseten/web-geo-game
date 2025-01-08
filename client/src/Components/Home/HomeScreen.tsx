// Authors: Vojta Bruza and Grace Houser
// This file displays the home screen  

import { Box, Center, Heading, Text } from "@chakra-ui/react";
import '../../Theme/theme.css';
import { global_app_name } from "../../data/data";
import SetUpInfo from "./SetUpInfo";

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
                  <Heading
                     mt="80px"
                     width="90%"
                     padding="10px"
                     fontSize={{ base: "3xl", md: "6xl" }}
                     color="gray.900"
                     textShadow="0px 0px 8px #444444"
                     textAlign="center">
                     {global_app_name}
                  </Heading>
               </Center>
               <Center>
                  <Text mb="80px" fontSize="2xl" textAlign="center"
                     color="primary.700"
                     textShadow='0px 0px 10px #444444'>
                     A voting tool for collaborative urban planning
                  </Text>
               </Center>

               {/* Buttons - Start and Join/Create Room */}
               <Center>{<SetUpInfo />}</Center>


               {/* info link */}
               {/* <Center position="absolute" left="50%" bottom="10" transform="translateX(-50%)">
                  <Link href="https://www.heritact.eu" isExternal>
                     <HStack>
                        <Icon as={InfoOutlineIcon} color="gray.900" />
                        <Image src="/images/HERITACT.png" height="18px" width="84px" />
                     </HStack>
                  </Link>
               </Center> */}
            </Box>
         </Center>
      </Box>
   );
}

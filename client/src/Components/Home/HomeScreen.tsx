// Authors: Vojta Bruza and Grace Houser
// This file displays the home screen  

import { Box, Center, Heading, HStack, Image, Link, Text } from "@chakra-ui/react";
import '../../Theme/theme.css';
import { global_app_name } from "../../data/data";
import SetUpInfo from "./SetUpInfo";
import { useTranslation } from "react-i18next";
import LocaleSwitcher from "../../i18n/LanguageSwitcher";

export default function HomeScreen() {
   const { t } = useTranslation();

   return (
      <Box
         h='calc(100vh)'
         backgroundImage="/images/city.jpg"
         backgroundSize="cover"
         backgroundPosition="center"
         backgroundRepeat="no-repeat"
      >
         <LocaleSwitcher />
         <Center>
            {/* small box */}
            <Box
               backgroundColor="rgba(256, 256, 256, 0.75)"
               overflow="auto"
               height="100vh"
               width="600px"
               shadow="dark-lg"
            >
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
                  <Text mb="80px"
                     fontSize="2xl"
                     textAlign="center"
                     color="primary.700"
                     textShadow='1px 1px 8px #444444'
                     height="2em"
                     padding="20px"
                     >
                     {t("home.desc")}
                  </Text>
               </Center>

               {/* Buttons - Start and Join/Create Room */}
               <Center>{<SetUpInfo />}</Center>

               <Center position="absolute" left="50%" bottom="10" transform="translateX(-50%)">
                  <HStack>
                     {/* info link */}
                     {/* <Link href="https://score-eu-project.eu/" isExternal>
                        <Icon as={InfoOutlineIcon} color="gray.900" />
                     </Link> */}
                     {/* Logos */}
                     <Link href="https://score-eu-project.eu/" isExternal>
                        <Image src="/images/SCORE.png" height="40px" />
                     </Link>
                     <Link href="https://www.ucd.ie/sdl/" isExternal>
                        <Image src="/images/SDL_UCD.png" height="100px" />
                     </Link>
                  </HStack>
               </Center>
            </Box>
         </Center>
      </Box>
   );
}

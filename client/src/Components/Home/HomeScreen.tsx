// Authors: Vojta Bruza and Grace Houser
// This file displays the home screen  

import { Box, Button, Center, Heading, HStack, Image, Link, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import '../../Theme/theme.css';
import LocaleSwitcher from "../../i18n/LanguageSwitcher";
import SetUpInfo from "./SetUpInfo";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import { useConfig } from "../Contexts/Config";

export default function HomeScreen() {
   const { t } = useTranslation();
   const config = useConfig();
   const { setCurrentScreen } = useScreenSelection(); // Get the current screen from context
   const statement = t("about.statement");

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
               width={{ base: "100vw", md: "600px" }}
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
                     {config.app_name}
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
               <Center>
                  <Button mt={15}
                     colorScheme="primary"
                     variant='outline'
                     onClick={() => {
                        setCurrentScreen('about');
                     }}>
                     {t("home.about")}
                  </Button>
               </Center>

               <Box position="absolute" left="50%" bottom="2" transform="translateX(-50%)" width={{ base: "100%", md: "600px" }} px={{ base: 4, md: 0 }}>
                  <VStack>
                     <HStack justify="center">
                        {/* Logos */}
                        {
                           config.logos.map((logo, index) => {
                              return logo.link ? (
                                 <Link href={logo.link} isExternal key={index}>
                                    <Image src={logo.src} height={logo.height} alt={logo.alt} />
                                 </Link>
                              ) : (
                                 <Image key={index} src={logo.src} height={logo.height} alt={logo.alt} />
                              )
                           })
                        }
                     </HStack>
                     {statement && (
                        <Text color="gray.800" fontSize="2xs" textAlign="center" px={4}>
                           {statement}
                        </Text>
                     )}
                  </VStack>
               </Box>
            </Box>
         </Center>
      </Box>
   );
}

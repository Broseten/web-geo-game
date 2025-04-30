// Authors: Vojta Bruza and Grace Houser
// This file displays the home screen  

import { Box, Button, Center, Heading, HStack, Image, Link, Text } from "@chakra-ui/react";
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

               <Center position="absolute" left="50%" bottom="10" transform="translateX(-50%)">
                  <HStack>
                     {/* Logos */}
                     {
                        config.logos.map((logo, index) => {
                           return (
                              <Link href={logo.link} isExternal key={index}>
                                 <Image src={logo.src} height={logo.height} alt={logo.alt} />
                              </Link>
                           )
                        })
                     }
                  </HStack>
               </Center>
            </Box>
         </Center>
      </Box>
   );
}

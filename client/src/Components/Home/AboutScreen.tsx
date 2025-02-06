import { Box, Button, Center, OrderedList, ListItem, Text, VStack } from "@chakra-ui/react";
import HomeButton from "../HomeButton";
import { t } from "i18next";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import { global_app_name } from "../../data/data";

export default function AboutScreen() {
   const { setCurrentScreen } = useScreenSelection();

   // i18n error 'key not found is not' a problem...syntax issue. No easy fix. 
   const phase1Steps = t("about.how-to-play.desc.phase1Steps", { returnObjects: true }) as { [key: string]: string };
   const phase2Steps = t("about.how-to-play.desc.phase2Steps", { returnObjects: true }) as { [key: string]: string };

   return (
      <Box
         h="100vh"
         backgroundImage="/images/city.jpg"
         backgroundSize="cover"
         backgroundPosition="center"
         backgroundRepeat="no-repeat"
      >
         <Box
            h="100vh"
            bg="rgba(255, 255, 255, 0.9)"
            overflowY="auto"
         >
            {/* Home button at the top */}
            <HomeButton />

            <Center h="100vh">
               <Box
                  maxW="800px"
                  px={8}
                  py={10}
                  h="100vh"
               >
                  <VStack fontSize="lg" spacing={8} textAlign="justify">
                     {/* App Title */}
                     <Text fontSize="4xl" fontWeight="bold" color="primary.500">
                        {global_app_name}
                     </Text>

                     {/* Description */}
                     <Text color="gray.800">
                        {t("about.desc")}
                     </Text>

                     {/* How to Play Section */}
                     <Text fontSize="2xl" fontWeight="bold" color="primary.500">
                        {t("about.how-to-play.title")}
                     </Text>

                     <VStack align="start" spacing={4}>
                        <Text fontWeight="bold">{t("about.how-to-play.desc.beforeStartTitle")}</Text>
                        <Text color="gray.700">{t("about.how-to-play.desc.beforeStartDescription")}</Text>

                        <Text fontWeight="bold">{t("about.how-to-play.desc.phase1Title")}</Text>
                        <OrderedList spacing={1} pl={4}>
                           {Object.values(phase1Steps).map((step, index) => (
                              <ListItem key={index} color="gray.700">
                                 {step}
                              </ListItem>
                           ))}
                        </OrderedList>

                        <Text fontWeight="bold">{t("about.how-to-play.desc.phase2Title")}</Text>
                        <OrderedList spacing={1} pl={4}>
                           {Object.values(phase2Steps).map((step, index) => (
                              <ListItem key={index} color="gray.700">
                                 {step}
                              </ListItem>
                           ))}
                        </OrderedList>
                     </VStack>

                     {/* Back Button */}
                     <Center mb={50}>
                        <Button
                           colorScheme="primary"
                           variant="outline"
                           onClick={() => {
                              setCurrentScreen("home");
                           }}
                        >
                           {t("generic.button.back")}
                        </Button>
                     </Center>
                  </VStack>
               </Box>
            </Center>
         </Box>
      </Box>
   );
}

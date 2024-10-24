import { AbsoluteCenter, Box, Center, HStack, Heading, Icon, Image, Link, Text } from "@chakra-ui/react";
import { InfoOutlineIcon } from '@chakra-ui/icons';
import SetUpInfo from "./SetUpInfo";

export default function HomeScreen() {

   return (
      <Box
         h='calc(100vh)'
         backgroundImage="/src/Theme/images/Dublin.jpg"
         backgroundSize="cover"
         //filter="auto" blur="5px"
         //backdropFilter="auto" backdropBlur="5px"
         backgroundPosition="center"
         backgroundRepeat="no-repeat"
      >
         <Box>
            <Center>
               <Box height="715px" width="600px" bg="white" opacity={0.75}></Box>
            </Center>

            {/* Text over the white background box */}
            <AbsoluteCenter>
               <Center>
                  <Heading mb={1} size="4xl" color="brand.grey"
                     textShadow='0px 0px 8px #444444'>
                     NegoDesign
                  </Heading>
               </Center>
               <Center>
                  <Text mb="100" fontSize="2xl" textAlign="center" color="brand.teal"
                     textShadow='0px 0px 10px #444444'>
                     A voting tool for the HeritACT project
                  </Text>
               </Center>

               {/* Set Up Info - Start, Player Name, Join/Create Room Options */}
               <Center>{<SetUpInfo />}</Center>
            </AbsoluteCenter>

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
      </Box>
   );
}

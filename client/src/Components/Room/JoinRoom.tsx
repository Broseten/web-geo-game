import { AbsoluteCenter, Box, Button, Image } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";

export default function JoinRoom() {
   const { setCurrentScreen } = useScreenSelection();

   // TODO get from server
   const rooms = ['Room A', 'Room B'];

   return (
      <Box>
         <AbsoluteCenter>
            {
               rooms.map((room) => (
                  <Button colorScheme="green" variant="solid" key={room} onClick={() => {
                     // join room

                     // switch to play screen
                     setCurrentScreen('play');
                  }}>{room}</Button>))
            }
         </AbsoluteCenter>

         {/* home button at the top */}
         <Button position="absolute" top="0" left="0" height="20" width="20"
               bg="none"
               _hover={{background: "none"}}
               onClick={() => {
                  setCurrentScreen('home');
               }}>
            <Image src="src/Theme/images/home.png"></Image>
         </Button>
      </Box>
   );
}

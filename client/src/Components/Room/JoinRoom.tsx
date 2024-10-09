import { AbsoluteCenter, Box, Button } from "@chakra-ui/react";
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
      </Box>
   );
}

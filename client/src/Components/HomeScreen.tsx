import { AbsoluteCenter, Box, Button } from "@chakra-ui/react";
import { socket } from "../main";
import { useScreenSelection } from "./Contexts/useScreenSelection";

export default function HomeScreen() {
   const { setCurrentScreen } = useScreenSelection();
   if (socket.connected) {
      // auto disconnect if still connected
      socket.disconnect;
   }
   return (
      <Box>
         <AbsoluteCenter>
            <Button colorScheme='teal' variant='solid' onClick={() => {
               // TODO probably navigate only after connecting?
               socket.connect();
               setCurrentScreen('room');
            }}>Connect</Button>
         </AbsoluteCenter>
      </Box>
   );
}

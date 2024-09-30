import { AbsoluteCenter, Box, Button } from "@chakra-ui/react";
import { socket } from "../main";
import { useNavigate } from "react-router-dom";

export default function HomeScreen() {
   if (socket.connected) {
      // auto disconnect if still connected
      socket.disconnect;
   }
   const navigate = useNavigate();
   return (
      <Box>
         <AbsoluteCenter>
            <Button colorScheme='teal' variant='solid' onClick={() => {
               // TODO probably navigate only after connecting?
               socket.connect();
               navigate('/play');
            }}>Connect</Button>
         </AbsoluteCenter>
      </Box>
   );
}

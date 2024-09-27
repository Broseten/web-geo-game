import { AbsoluteCenter, Box, Button } from "@chakra-ui/react";
import { socket } from "../main";

export default function JoinScreen() {
   return (
      <Box>
         <AbsoluteCenter>
            <Button colorScheme='teal' variant='solid' onClick={() => socket.connect()}>Connect</Button>
         </AbsoluteCenter>
      </Box>
   );
}

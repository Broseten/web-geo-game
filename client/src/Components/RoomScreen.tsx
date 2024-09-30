import { AbsoluteCenter, Box, Button, HStack } from "@chakra-ui/react";
import { useScreenSelection } from "./Contexts/useScreenSelection";
import { useState } from "react";
import CreateRoom from "./Room/CreateRoom";

export default function RoomScreen() {
   const { setCurrentScreen } = useScreenSelection();
   const [isCreate, setCreateRoom] = useState(false);
   // TODO Room select
   return (
      <Box>
         {
            !isCreate &&
            <AbsoluteCenter>
               <HStack>

                  <Button colorScheme='green' variant='solid' onClick={() => {
                     setCreateRoom(true);
                  }}>Create</Button>
                  <Button colorScheme='purple' variant='solid' onClick={() => { setCurrentScreen('play') }}>Join</Button>
               </HStack>
            </AbsoluteCenter>
         }
         {
            isCreate &&
            <CreateRoom />
         }
      </Box>
   );
}

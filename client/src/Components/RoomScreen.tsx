import { AbsoluteCenter, Box, Button, HStack } from "@chakra-ui/react";
import { useScreenSelection } from "./Contexts/useScreenSelection";

export default function RoomScreen() {
   const { setCurrentScreen } = useScreenSelection();
   // TODO Room select
   return (
      <Box>
         <AbsoluteCenter>
            <HStack>
               <Button colorScheme='green' variant='solid' onClick={() => { setCurrentScreen('play') }}>Create</Button>
               <Button colorScheme='purple' variant='solid' onClick={() => { setCurrentScreen('play') }}>Join</Button>
            </HStack>
         </AbsoluteCenter>
      </Box>
   );
}

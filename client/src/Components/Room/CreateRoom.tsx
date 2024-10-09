import { AbsoluteCenter, Box, Button, Input } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import { useState } from "react";

export default function CreateRoom() {
   const { setCurrentScreen } = useScreenSelection();
   const [roomName, setRoomName] = useState('')

   return (
      <Box>
         <AbsoluteCenter>
            <Input
               value={roomName}
               onChange={(event) => setRoomName(event.target.value)}
               placeholder='Enter room name'
            />
            <Button colorScheme='green' variant='solid' onClick={() => {
               // create room with roomName

               // join room

               // switch to play screen
               setCurrentScreen('play');
            }}>
               Create {roomName}
            </Button>
         </AbsoluteCenter>
      </Box>
   );
}

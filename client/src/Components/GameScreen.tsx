import { Box, Button, Center, HStack, Text, VStack } from "@chakra-ui/react";
import { socket } from "../main";
import GameMap from "./Map/GameMap";
import { useEffect, useState } from "react";

interface GameScreenProps {
   isConnected: true;
}

export default function GameScreen({ isConnected }: GameScreenProps) {
   const [testCounter, setTestCounter] = useState(0);

   useEffect(() => {
      function updateCount(count: number) {
         setTestCounter(count);
      }

      socket.on('countClient', updateCount);
      socket.on('init-count-client', updateCount);

      // init the state
      socket.emit('init-count');

      return () => {
         socket.off('countClient', updateCount);
         socket.off('init-count-client', updateCount);
      };
   }, []);

   return (
      <Box>
         <Center>
            <VStack>
               <Text>{isConnected ? "connected" : "not connected"}, {`triggered ${testCounter} times`}</Text>
               <HStack>
                  <Button colorScheme='teal' variant='outline'
                     onClick={() => {
                        socket.emit("count");
                     }}>
                     Test counter
                  </Button>
                  <Button colorScheme='red' variant='outline' onClick={() => socket.disconnect()}>Disconnect</Button>
               </HStack>
            </VStack>
         </Center>
         <GameMap />
      </Box>
   );
}
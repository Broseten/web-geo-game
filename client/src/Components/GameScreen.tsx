import { Box, Button, Center, HStack, Text, VStack } from "@chakra-ui/react";
import { socket } from "../main";
import GameMap from "./Map/GameMap";
import { useEffect, useState } from "react";
import initSocket from "../Hooks/useSocket";
import { useNavigate } from "react-router-dom";

interface GameScreenProps {
   isConnected: boolean;
}

export default function GameScreen({ isConnected }: GameScreenProps) {
   const navigate = useNavigate();
   const [testCounter, setTestCounter] = useState(0);

   initSocket('countClient', (count: number) => setTestCounter(count));
   initSocket('init-count-client', (count: number) => setTestCounter(count));

   useEffect(() => {
      // init the state
      socket.emit('init-count');
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
                  {
                     isConnected
                        ? <Button colorScheme='red' variant='outline' onClick={() => socket.disconnect()}>Test Disconnect</Button>
                        : <Button colorScheme='green' variant='solid' onClick={() => socket.connect()}>Test Connect</Button>
                  }
                  <Button colorScheme='red' variant='solid' onClick={() => navigate('/')}>Leave</Button>
               </HStack>
            </VStack>
         </Center>
         <GameMap />
      </Box>
   );
}
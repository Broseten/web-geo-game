import { Box, Center, Heading } from '@chakra-ui/react'
import { socket } from './main'
import { useEffect, useState } from 'react';
import JoinScreen from './Components/JoinScreen';
import GameScreen from './Components/GameScreen';
import initSocket from './Hooks/useSocket';

function App() {
   const [isConnected, setIsConnected] = useState(socket.connected);

   initSocket('connect', () => setIsConnected(true));
   initSocket('disconnect', () => setIsConnected(false));

   // TODO use grid for the layout somewhere?
   return (
      <>
         <Box className="app" backgroundColor="gray.100" h='calc(100vh)'>
            <Center>
               <Heading mb={4}>The Game</Heading>
            </Center>
            {!isConnected && <JoinScreen />}
            {isConnected && <GameScreen isConnected={isConnected} />}
         </Box>
      </>
   )
}

export default App

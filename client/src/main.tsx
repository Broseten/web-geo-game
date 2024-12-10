//import { StrictMode } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import { io } from 'socket.io-client';
import App from './App.tsx';
import { GameRoomProvider } from './Components/Contexts/GameRoomContext.tsx';
import { ScreenProvider } from './Components/Contexts/useScreenSelection.tsx';
import customTheme from './Theme/Theme.ts';
import { GameMarkersProvider } from './Components/Contexts/GameMarkersContext.tsx';

// TODO get the server address from the server that provides the client website
const URL = 'http://localhost:1337';

// TODO ensure that the client has the same ID when reconnecting (cookie)
export const socket = io(URL, {
   autoConnect: false
});

createRoot(document.getElementById('root')!).render(
   //<StrictMode>
   <ChakraProvider theme={customTheme}>
      <ScreenProvider>
         <GameRoomProvider>
            <GameMarkersProvider>
               <App />
            </GameMarkersProvider>
         </GameRoomProvider>
      </ ScreenProvider>
   </ChakraProvider>
   //</StrictMode>,
)

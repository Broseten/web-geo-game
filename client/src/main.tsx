//import { StrictMode } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { io } from 'socket.io-client';
import App from './App.tsx';
import { ConnectionProvider } from './Components/Contexts/ConnectionContext.tsx';
import { GameMarkersProvider } from './Components/Contexts/GameMarkersContext.tsx';
import { GameRoomProvider } from './Components/Contexts/GameRoomContext.tsx';
import { ScreenProvider } from './Components/Contexts/useScreenSelection.tsx';
import "./i18n/config.ts";
import customTheme from './Theme/Theme.ts';

const protocol = window.location.protocol === 'https:' ? 'https' : 'http';
const port = process.env.NODE_ENV !== 'production' ? ':1336' : (window.location.port ? `:${window.location.port}` : '');
export const socketServerURL = `${protocol}://${window.location.hostname}${port}`;

console.log('Socket server:', socketServerURL);

export let socket = io(socketServerURL, {
   autoConnect: false
});

function main() {
   try {
      createRoot(document.getElementById('root')!).render(
         //<StrictMode>
         <React.Suspense fallback={<div>Loading...</div>}>
            <ChakraProvider theme={customTheme}>
               <ConnectionProvider>
                  <ScreenProvider>
                     <GameRoomProvider>
                        <GameMarkersProvider>
                           <App />
                        </GameMarkersProvider>
                     </GameRoomProvider>
                  </ ScreenProvider>
               </ConnectionProvider>
            </ChakraProvider>
         </React.Suspense>
         //</StrictMode>,
      )
   } catch (error) {
      console.error('Failed to initialize app:', error);
   }
}

main();
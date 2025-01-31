//import { StrictMode } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ConnectionProvider } from './Components/Contexts/ConnectionContext.tsx';
import { GameMarkersProvider } from './Components/Contexts/GameMarkersContext.tsx';
import { GameRoomProvider } from './Components/Contexts/GameRoomContext.tsx';
import { ScreenProvider } from './Components/Contexts/useScreenSelection.tsx';
import "./i18n/config.ts";
import customTheme from './Theme/Theme.ts';

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
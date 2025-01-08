//import { StrictMode } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import { io, Socket } from 'socket.io-client';
import App from './App.tsx';
import { GameRoomProvider } from './Components/Contexts/GameRoomContext.tsx';
import { ScreenProvider } from './Components/Contexts/useScreenSelection.tsx';
import customTheme from './Theme/Theme.ts';
import { GameMarkersProvider } from './Components/Contexts/GameMarkersContext.tsx';
import { ConnectionProvider } from './Components/Contexts/ConnectionContext.tsx';
import { fetchGlobalData, global_server_url } from './data/data.ts';

export let socket: Socket;

export const initSocketURL = () => {
   socket = io(global_server_url, {
      autoConnect: false
   });
}

async function main() {
   try {
      // TODO fetch this after loading the app to avoid blocking the UI
      await fetchGlobalData();
      createRoot(document.getElementById('root')!).render(
         //<StrictMode>
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
         //</StrictMode>,
      )
   } catch (error) {
      console.error('Failed to initialize app:', error);
   }
}

main();
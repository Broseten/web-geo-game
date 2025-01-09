//import { StrictMode } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import { io } from 'socket.io-client';
import App from './App.tsx';
import { ConnectionProvider } from './Components/Contexts/ConnectionContext.tsx';
import { GameMarkersProvider } from './Components/Contexts/GameMarkersContext.tsx';
import { GameRoomProvider } from './Components/Contexts/GameRoomContext.tsx';
import { ScreenProvider } from './Components/Contexts/useScreenSelection.tsx';
import { fetchGlobalData } from './data/data.ts';
import customTheme from './Theme/Theme.ts';

const protocol = window.location.protocol === 'https:' ? 'https' : 'http';
const port = process.env.NODE_ENV !== 'production' ? ':1336' : (window.location.port ? `:${window.location.port}` : '');
const socketUrl = `${protocol}://${window.location.hostname}${port}`;
console.log('Socket server:', socketUrl);
export let socket = io(socketUrl, {
   autoConnect: false
});

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
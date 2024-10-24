//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from './Theme/Theme.ts'
import { io } from 'socket.io-client';
import { ScreenProvider } from './Components/Contexts/useScreenSelection.tsx';

const URL = 'http://localhost:1337';

// TODO ensure that the client has the same ID when reconnecting (cookie)
export const socket = io(URL, {
   autoConnect: false
});

createRoot(document.getElementById('root')!).render(
   //<StrictMode>
   <ChakraProvider theme={customTheme}>
      <ScreenProvider>
         <App />
      </ ScreenProvider>
   </ChakraProvider>
   //</StrictMode>,
)

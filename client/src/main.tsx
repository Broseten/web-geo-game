//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from './Theme.ts'
import { io } from 'socket.io-client';
import { ScreenProvider } from './Components/Contexts/useScreenSelection.tsx';

const URL = 'http://localhost:1337';

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

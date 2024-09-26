//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from './Theme.ts'
import { io } from 'socket.io-client';

const URL = 'http://localhost:1337';

export const socket = io(URL, {
  autoConnect: true
});

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <ChakraProvider theme={customTheme}>
    <App />
  </ChakraProvider>
  //</StrictMode>,
)

//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from './Theme.ts'

// TODO connection etc.

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <ChakraProvider theme={customTheme}>
    <App />
  </ChakraProvider>
  //</StrictMode>,
)

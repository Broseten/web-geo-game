//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// TODO connection etc.

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <App />
  //</StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/styles/index.scss'
import App from './App.jsx'
import AuthContextProvider from "@/context/appContext.jsx";
import ContextProvider from "@/context/appContext.jsx";

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App />
  </ContextProvider>
)

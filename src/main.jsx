import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/styles/index.scss'
import App from './App.jsx'
import AuthContextProvider from "@/context/authContext.jsx";

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
)

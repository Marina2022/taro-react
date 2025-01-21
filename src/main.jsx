import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import '@/assets/styles/index.scss'
import App from './App.jsx'

import ContextProvider from "@/contexts/appContext.jsx";
import AuthContextProvider from "@/contexts/authContext.jsx";

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ContextProvider>
      <App/>
    </ContextProvider>
  </AuthContextProvider>
)

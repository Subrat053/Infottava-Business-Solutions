import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
// import { queryClient } from "./queryClient"
import App from './App2'
import './global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Toaster position="top-right" />
        <App />
    </BrowserRouter>
  </StrictMode>,
)
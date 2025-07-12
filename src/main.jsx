import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SongPlayingContextProvider } from "./context/songplaying"
import { Analytics } from "@vercel/analytics/react"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <SongPlayingContextProvider>       
            <App/>
            <Analytics />
        </SongPlayingContextProvider>       
    </StrictMode>,
)

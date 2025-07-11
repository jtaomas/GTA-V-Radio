import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SongPlayingContextProvider } from "./context/songplaying"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <SongPlayingContextProvider>       
            <App/>
        </SongPlayingContextProvider>       
    </StrictMode>,
)

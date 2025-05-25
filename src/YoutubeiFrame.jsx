import { useEffect } from "react"
import { SongContext } from "./context/songplaying"

export function YoutubeiFrame() {
    const {songs, setSongs, stationPlaying, setStationPlaying} = useContext(SongContext)
    /* stationPlaying = {name: null, song:null, artist: null}  */
    
    useEffect(() => {

    }, [stationPlaying])

    return(
        <div id="player">
            
        </div>
    )
}
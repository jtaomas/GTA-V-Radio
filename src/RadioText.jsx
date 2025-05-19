import { useContext } from "react"
import { SongContext } from "./context/songplaying"

export function RadioText() {
    const {songs, setSongs, stationPlaying, setStationPlaying} = useContext(SongContext)

    return(
        <div className="songmetadata">
            <h1 className="radio-station">{stationPlaying.name}</h1>
            <h2 className="song-name">{stationPlaying.song}</h2>
            <h3 className="artist-name">{stationPlaying.artist}</h3>
        </div>
        )
}
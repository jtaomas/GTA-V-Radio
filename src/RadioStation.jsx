import { useState } from "react"
import { useContext } from "react";
import { SongContext } from "./context/songplaying"

export function RadioStation(props) {
    const {angle, height, station} = props
    const [isPlaying, setIsPlaying] = useState({track: null, playing: false})
    const angleRad = angle * (Math.PI / 180)
    const top = 50 - (height * Math.cos(angleRad))
    const left = 50 - (height * Math.sin(angleRad))
    
    const {songs, setSongs, stationPlaying, setStationPlaying} = useContext(SongContext)
    
    const style = {
        position:"absolute",
        top:`${top}%`,
        left:`${left}%` 
    }

    return(
        <div style={style} className="radio-station">
            <img className="radioimage" src={`../radiostation/${station.filename}`}></img>
        </div>
    )
    
}


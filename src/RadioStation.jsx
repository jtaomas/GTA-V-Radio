import { useRef , useEffect, useState } from "react"
import { useContext } from "react";
import { SongContext } from "./context/songplaying"

export function RadioStation(props) {
    const {anglelocation, height, station} = props
    const angleRad = anglelocation * (Math.PI / 180)
    const top = 50 - (height * Math.cos(angleRad))
    const left = 45 - (height * Math.sin(angleRad))
    
    const {songs, setSongs, stationPlaying, setStationPlaying, qDown, setqDown, angle, setAngle} = useContext(SongContext)

    const position = {
        position:"absolute",
        top:`${top}%`,
        left:`${left}%` 
    }

    const outline = {
        height: "5.5rem",
        width: "5.5rem",
        borderRadius: "1000px",
        border: "0.3rem solid rgb(167, 227, 167)",
    }

    return(
        <div onClick={() => setStationPlaying(station)} style={{...position, ...((stationPlaying.name === station.name) && outline)}} className="radio-station">
            <img className="radioimage" src={`../radiostation/${station.filename}`}></img>
        </div>
    )
    
}


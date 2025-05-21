import { useState } from "react";
import { RadioStation } from "./RadioStation";
import { useContext } from "react";
import stationsData from "./data/radiostations.json"
import { SongContext } from "./context/songplaying"

export function RadioWheel() {
    const [wheelVisible, setwheelVisible] = useState(false)
    const radiostations = stationsData.stationdata
    const angleStep = 360 / stationsData.stationdata.length
    const height = 45

    const {songs, setSongs, stationPlaying, setStationPlaying} = useContext(SongContext)

    return(
        <>
            <div className="radiowheel">
                {radiostations.map((stationdata, i) => {
                return <RadioStation key={stationdata.name} angle={angleStep*i} height={height} station={stationdata}></RadioStation>
                })}
            </div>

            <div className="songmetadata">
                <h1 className="radio-name">{}</h1>
                <h2 className="song-name">{}</h2>
                <h3 className="artist-name">{}</h3>
            </div>
        </>

    )
}
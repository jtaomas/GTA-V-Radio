import { useState } from "react"

export function RadioStation({station}) {
    const [isPlaying, setIsPlaying] = useState({track: null, playing: false})
    
    /* {
        "name": "Blaine County Talk Radio",
        "filename": "blaine-county-talk-radio.png",
        "link": "https://www.youtube.com/watch?v=aaXui87cF5Y&t=3588s",
        "seconds": 5079
      } */

    return(
        <div className="radio-station">
            <img className="radioimage" src={`../public/radiostation/${station.filename}`}></img>
        </div>
    )
    
}


import { createContext } from "react";
import { useState } from "react";
import stationsData from "../data/radiostations.json"
import { useEffect } from "react"

export const SongContext = createContext()

export function SongPlayingContextProvider({children}) {
    const [songs, setSongs] = useState(stationsData.stationdata)
    const [stationPlaying, setStationPlaying] = useState({"name": "None", "filename": "none.png", "link": null, "seconds": 0, "location": null, "playing": false, "timestamps": null})
    const [qDown, setqDown] = useState(false)
    const [angle, setAngle] = useState(0)
    
    const handleKeyDown = (e) => {
        if (e.key === 'q' || e.key === 'Q') setqDown(true)
    };

    const handleKeyUp = (e) => {
        if (e.key === 'q' || e.key === 'Q') setqDown(false)
	};

    useEffect(() => {
        setSongs(songs.map((song) => {
            var randomtime = (Math.floor(Math.random() * song.seconds))
            var newsong = {...song, location: randomtime}
            return (song.location === null) ? newsong : {...song}
                }
            )
        )

        }, [])

    useEffect(() => {
		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("keyup", handleKeyUp)
		
		return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
			}
	}, [],)


    return(<SongContext.Provider value={{songs, setSongs, stationPlaying, setStationPlaying, qDown, setqDown, angle, setAngle}}>
            {children}
        </SongContext.Provider>)
}

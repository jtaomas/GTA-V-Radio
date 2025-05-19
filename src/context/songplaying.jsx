import { createContext } from "react";
import { useState } from "react";
import stationsData from "../data/radiostations.json"
import { useEffect } from "react"

export const SongContext = createContext()

export function SongPlayingContextProvider({children}) {
    const [songs, setSongs] = useState(stationsData.stationdata)
    const [stationPlaying, setStationPlaying] = useState({name: null, song:null, artist: null})
    useEffect(() => {
        setSongs(songs.map((song) => {
            return (song.location === null) ? {...song, location: (Math.floor(Math.random() * song.seconds))} : {...song}
        }))

        console.log(songs)
    }, [])

    return(<SongContext.Provider value={{songs, setSongs, stationPlaying, setStationPlaying}}>
            {children}
        </SongContext.Provider>)
}

import { useState, useRef } from "react";
import { RadioStation } from "./RadioStation";
import { useContext } from "react";
import { useEffect } from "react";
import { SongContext } from "./context/songplaying"
import { YoutubeiFrame } from "./YoutubeiFrame";
import stationsData from "./data/radiostations.json"

export function RadioWheel() {
    const [mouseCoord, setMouseCoord] = useState({x:null,y:null})
    const songIntervalID = useRef(null)
    const {songs, setSongs, stationPlaying, setStationPlaying, qDown, setqDown, angle, setAngle} = useContext(SongContext)

    const radiostations = songs
    const angleStep = 360 / songs.length
    const height = 45

    let songname = null
    let artistname = null

    stationPlaying?.timestamps?.forEach(timestamp => {
        if (timestamp.start <= stationPlaying.location && stationPlaying.location <= timestamp.end ) {
                    songname = timestamp.song
                    artistname = timestamp.artist
                }
            })

    const handleMouseMove = (e) => {
        setMouseCoord({x : e.clientX, y : e.clientY})
    }

    useEffect(() => {
        console.log(stationPlaying)
    }, [stationPlaying])

    useEffect(() => {
        if (qDown === true) {
            window.addEventListener("mousemove", handleMouseMove)

            return () => {
                window.removeEventListener("mousemove", handleMouseMove)
            } 
        }
    }, [qDown])

    useEffect(() => {
        if (mouseCoord.x === null) return;

        const height = window.innerHeight - mouseCoord.y - window.innerHeight/2 
        const width = mouseCoord.x - window.innerWidth/2

        let nonStateAngle = (180 / Math.PI) * Math.atan2(width, height)

        if (nonStateAngle < 0) {
            nonStateAngle += 360;
        }

        setAngle(nonStateAngle)
    }, [mouseCoord])

    useEffect(() => {
        let radioNumber = 0

        for (let i = (-angleStep/2); i < (-angleStep/2 + 360); i += angleStep) {
            if (i <= angle && angle < i + angleStep) {
                break
            }
            else {
                radioNumber += 1
            }

        setStationPlaying(songs[26-radioNumber]) 
        }
    }, [angle])

    useEffect(() => {
        if (stationPlaying && stationPlaying?.name !== "None") {
            songIntervalID.current = setInterval(() => {

                setStationPlaying(prev => ((prev?.location == prev?.seconds) ?  {...prev, location: 1} : {...prev, location: prev.location + 1}))
            }, 1000)
        }

        return function () {
            setSongs(prevSongs => prevSongs.map((song) => {
                if (song.name === stationPlaying.name) {
                    return stationPlaying
                }
                else {
                    return song
                }
            }))
            clearInterval(songIntervalID.current)
        }
    }, [stationPlaying])

    return(
        <> 
            {qDown ? <style>{`body {cursor: none}`}</style> : <style>{`body { cursor: url('data:image/x-icon;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGgYDuhoGA/8aBgP/GgYD/xoGA/8aBgP/GgYD/xoGA/8aBgP/GgYDugAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoGAwYaBgPe6urq/+bm5v/i4uL/39/f/9vb2//Y2Nj/1dXV/9PT0/8aBgPhAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGgYDYxoGA4fu7u7/6urq/+bm5v/i4uL/39/f/9vb2//Y2Nj/1dXV/xoGA94aBgMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoGAwYaBgPex8LC//Hx8f/u7u7/6urq/+bm5v/i4uL/39/f/9vb2//Y2Nj/GgYDhxoGA4cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGgYDYxoGA7T4+Pj/7u7u//Hx8f/u7u7/7u7u/+Li4v/i4uL/4uLi/9vb2/+wrKv/GgYD1QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoGAwYaBgPezcnI//v7+//u7u7/7u7u/+7u7v/u7u7/4uLi/+Li4v/i4uL/39/f/9vb2/8aBgPeGgYDMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGgYDYxoGA7T//////f39///////u7u7/7u7u/+7u7v/u7u7/4uLi/+Li4v/i4uL/39/f/xoGA4caBgOHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaBgPez8rK/v///////////////+7u7v/u7u7/7u7u/+7u7v/u7u7/4uLi/+bm5v/i4uL/tbGw/xoGA9UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGgYDYxoGA7T/////z8rK/v//////////////////////////7u7u/+7u7v/u7u7/7u7u/+bm5v/i4uL/GgYD/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoGAzYaBgO66Obl//////+Ge3r/////////////////////////////////7u7u/+7u7v/u7u7/6urq/+bm5v8aBgP/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGgYDuujm5f///////////xoGA////////////////////////f39//v7+//4+Pj/9fX1//Hx8f/u7u7/6urq/xoGA/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaBgP/6Obl/+jm5f8aBgO6GgYD/////////////////////////////f39//v7+//4+Pj/GgYD//Hx8f/u7u7/GgYD/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoGA7oaBgP/GgYDuhoGAzYaBgP///////////8aBgP///////////8aBgP//f39//v7+/8aBgP/9fX1/8O/v/8aBgO6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoGA////////////xoGA////////////xoGA////////f39/xoGA//JxcT/GgYDuhoGAxoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGgYD/8/Kyv//////GgYD////////////GgYD///////Pysr/GgYD/xoGA7oaBgMaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaBgM2GgYDuhoGA/8aBgP///////////8aBgP/GgYD/xoGA7oaBgM2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoGA////////////xoGA/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGgYD////////////GgYD/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaBgP///////////8aBgP/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoGA////////////xoGA/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGgYD////////////GgYD/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaBgM2GgYD/xoGA7oaBgM2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////gB///4Af//+AH///AA///wAP//4AD//+AAf//AAH//wAB//4AAf/8AAH//AAB//xAAf//wAP//8AH///gH///+H////h////4f///+H////h////8///8='), auto; }`}</style>}

            <div className="radiowheel">
                {radiostations.map((stationdata, i) => {
                    if (stationPlaying == stationdata) {
                        return <RadioStation key={stationdata.name} anglelocation={angleStep*i} height={height} station={stationdata}></RadioStation>
                    }
                    else {
                        return <RadioStation key={stationdata.name} anglelocation={angleStep*i} height={height} station={stationdata}></RadioStation>
                    }
                })}
            </div>

            <YoutubeiFrame station={stationPlaying}></YoutubeiFrame>

            <div className="songmetadata">
                <h1 className="metadatatext">{stationPlaying?.name}</h1>
                <h2 className="metadatatext">{songname}</h2>
                <h3 className="metadatatext">{artistname}</h3>
                <div className="instructions">
                    <h2 className="metadatatext">Hold</h2>
                    {qDown ? <img id='qlogo' src="./main/qlogooppositecolor.png"></img> : <img id='qlogo' src="./main/qlogo.png"></img>}
                    <h2 className="metadatatext">to select radio</h2>
                </div>

            </div>
        </>

        )
    }

    /* stationPlaying = {name: null, song:null, artist: null} 
    songs = [
        {
            "name": "Blaine County Talk Radio",
            "filename": "blaine-county-talk-radio.png",
            "link": "https://www.youtube.com/watch?v=aaXui87cF5Y&t=3588s",
            "seconds": 5079,
            "location": null
        },
        {
            "name": "Blonded Los Santos",
            "filename": "blonded-los-santos.webp",
            "link": "https://youtu.be/-tVumJBaTWY?si=hP515TI0qg5CteXU",
            "seconds": 6139,
            "location": null
        },
        {
            "name": "Channel X",
            "filename": "channel-x.png",
            "link": "https://www.youtube.com/watch?v=S1-sjuvgo6s",
            "seconds": 6263,
            "location": null
        },
        {
            "name": "East Los FM",
            "filename": "east-los-fm.png",
            "link": "https://youtu.be/iX2liYJZuJU?si=Fdx9XyuQFzozERhM",
            "seconds": 2465,
            "location": null
        },
        {
            "name": "FlyLo FM",
            "filename": "fly-lo-fm.png",
            "link": "https://www.youtube.com/watch?v=YAzCJINGWGM",
            "seconds": 3870,
            "location": null
        },
        {
            "name": "iFruit Radio",
            "filename": "ifruit-radio.webp",
            "link": "https://youtu.be/fpvJaphZ2_g?si=98insbOs6XHfjknH",
            "seconds": 5201,
            "location": null
        },
        {
            "name": "Kult FM",
            "filename": "kult-fm.webp",
            "link": "https://youtu.be/FY9EiOllRhE?si=V0EmyMvvYCkXTniF",
            "seconds": 8406,
            "location": null
        },
        {
            "name": "Los Santos Rock Radio",
            "filename": "los-santos-rock-radio.png",
            "link": "https://www.youtube.com/watch?v=fZPV-9GlM-c",
            "seconds": 17240,
            "location": null
        },
        {
            "name": "Los Santos Underground Radio",
            "filename": "los-santos-underground-radio.png",
            "link": "https://www.youtube.com/watch?v=I2Xjuz-mnN0",
            "seconds": 16734,
            "location": null
        },
        {
            "name": "Motomami Los Santos",
            "filename": "motomami.svg",
            "link": "https://youtu.be/30uA_Hppzpc",
            "seconds": 11759,
            "location": null
        },
        {
            "name": "The Music Locker",
            "filename": "music-locker-radio.png",
            "link": "https://www.youtube.com/watch?v=dBvMBYbUZFc",
            "seconds": 27245,
            "location": null
        },
        {
            "name": "Non-Stop Pop FM",
            "filename": "non-stop-pop-fm.png",
            "link": "https://www.youtube.com/watch?v=Fjp0wu3lEHk",
            "seconds": 13878,
            "location": null
        },
        {
            "name": "Radio Los Santos",
            "filename": "radio-los-santos.png",
            "link": "https://www.youtube.com/watch?v=C3_FSXZtRe8",
            "seconds": 21384,
            "location": null
        },
        {
            "name": "None",
            "filename": "none.png",
            "link": null,
            "seconds": 0,
            "location": null
        },
        {
            "name": "Radio Mirror Park",
            "filename": "radio-mirror-park.webp",
            "link": "https://www.youtube.com/watch?v=SDWHIACuuaQ",
            "seconds": 12773,
            "location": null
        },
        {
            "name": "Rebel Radio",
            "filename": "rebel-radio.webp",
            "link": "https://youtu.be/N12WWl_f3QM?si=H0rzjb_3-THwvPZ9",
            "seconds": 3457,
            "location": null
        },
        {
            "name": "Soulwax FM",
            "filename": "soulwax-fm.jpg",
            "link": "https://youtu.be/sFwcLC5HC9I?si=e6gAJ6OgsUjr1oGj",
            "seconds": 2566,
            "location": null
        },
        {
            "name": "Space 103.2",
            "filename": "space.png",
            "link": "https://youtu.be/lCZc9y9KpY4?si=eEQaYVsi0opQtd-z",
            "seconds": 5653,
            "location": null
        },
        {
            "name": "Still Slipping Los Santos",
            "filename": "still-slipping-los-santos.png",
            "link": "https://youtu.be/P3qixldzDow?si=1eAXSkGFVya4YnRU",
            "seconds": 4364,
            "location": null
        },
        {
            "name": "The Blue Ark",
            "filename": "the-blue-ark.png",
            "link": "https://youtu.be/osmrXqRuwJA?si=Lp4TtHzfj30LDILX",
            "seconds": 4790,
            "location": null
        },
        {
            "name": "The Lab",
            "filename": "the-lab.webp",
            "link": "https://youtu.be/4J6JK7ich6E?si=zh7FT23Qien--43T",
            "seconds": 3299,
            "location": null
        },
        {
            "name": "The Lowdown 91.1",
            "filename": "the-lowdown.webp",
            "link": "https://www.youtube.com/watch?v=oaNdiTLKlMA",
            "seconds": 4372,
            "location": null
        },
        {
            "name": "Vinewood Boulevard Radio",
            "filename": "vinewood-boulevard-radio.webp",
            "link": "https://youtu.be/5fnGyUc2eFs?si=8gMR5ZjrNyjHfvCt",
            "seconds": 5730,
            "location": null
        },
        {
            "name": "WCTR",
            "filename": "wctr.png",
            "link": "https://www.youtube.com/watch?v=IhCFJnaYvnI",
            "seconds": 5815,
            "location": null
        },
        {
            "name": "West Coast Classics",
            "filename": "west-coast-classics.webp",
            "link": "https://www.youtube.com/watch?v=wnmg6CfHQ18",
            "seconds": 7292,
            "location": null
        },
        {
            "name": "Worldwide FM",
            "filename": "worldwide-fm.png",
            "link": "https://youtu.be/fYi-ZoglsY?si=t36_NeqCJOFDkfAC",
            "seconds": 6960,
            "location": null
        }
    ]
    */
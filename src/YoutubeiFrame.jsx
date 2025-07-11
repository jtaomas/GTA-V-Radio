import { useEffect, useRef } from "react";

export function YoutubeiFrame({ station }) {
    const playerRef = useRef(null);

    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
        }

        window.onYouTubeIframeAPIReady = () => {
            createPlayer();
        };

        if (window.YT && window.YT.Player) {
            createPlayer();
        }

        function createPlayer() {
            if (station.name !== "None") {
                const videoId = getYouTubeVideoId(station.link);
            playerRef.current = new window.YT.Player("player", {
                height: "900",
                width: "900",
                videoId: videoId,
                playerVars: {
                autoplay: 1,
                controls: 0,
                start: station.location},
                events: { onReady: (event) => {
                    event.target.seekTo(station.location, true);
                    event.target.playVideo(); },
                },
            });
            }
        }

    return () => {
        if (playerRef.current) {
            playerRef.current.destroy();
            playerRef.current = null;
        }
    };
  }, [station.name]);

  useEffect(() => {
    const checker = setInterval(() => {
        if (window.YT && playerRef.current) {
            const currentTime = playerRef.current.getCurrentTime()
            const perceivedTime = station.location

            console.log(currentTime, perceivedTime)

            if (Math.abs(currentTime-perceivedTime) >= 2) {
                playerRef.current.seekTo(station.location, true)
            }
            if (currentTime === station.seconds || perceivedTime === station.seconds) {
                playerRef.current.seekTo(0)
            }
        }

    }, 1000)
    
    return () => {
        clearInterval(checker)
    }
  }
  , [station.name, station.location])

  return <div id="player"></div>;
}

function getYouTubeVideoId(url) {
    const link = new URL(url)
    if (link.hostname === 'youtu.be') {
        return link.pathname.slice(1)
        
    }
    else if (link.hostname === 'www.youtube.com' || link.hostname === 'youtube.com')
        console.log(link.searchParams.get("v"))
        return link.searchParams.get("v")
}

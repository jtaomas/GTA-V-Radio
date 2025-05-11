import { useState } from "react";
import { RadioStation } from "./RadioStation";
import stationsData from "./data/radiostations.json"

export function RadioWheel() {
    const [wheelVisible, setwheelVisible] = useState(false)
    const radiostations = stationsData.stationdata
    
    return(
        <div className="radiowheel">
          	{radiostations.map((stationdata) => {
				return <RadioStation key={stationdata.name} station={stationdata} ></RadioStation>
			})}
        </div>
    )
}
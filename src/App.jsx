import { RadioWheel } from "././RadioWheel"
import { VolumeSlider } from "./VolumeSlider"
import {SongPlayingContextProvider} from "./context/songplaying"


function App() {

  	return (
		<SongPlayingContextProvider>        
			<div className='app'>
				<RadioWheel></RadioWheel>
			</div>
		</SongPlayingContextProvider>
  		)
}

export default App

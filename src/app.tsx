import { CSSProperties } from "react"
import { getWelcomeMessage } from "./welcome"

import BigMouthGif from './image.gif'

const containerStyles: CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'center',
  width: '100%',
}

const App = () => {
  return (
    <div style={containerStyles}>
      <img src={BigMouthGif} />
      <h1>{getWelcomeMessage("We're awesome!!")}</h1>
    </div>
  )
}

export default App
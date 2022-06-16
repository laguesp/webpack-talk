import { getWelcomeMessage } from "../utils/welcome"

import type { CSSProperties } from "react"

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
      <h1>{getWelcomeMessage("We're awesome!!")}</h1>
    </div>
  )
}

export default App
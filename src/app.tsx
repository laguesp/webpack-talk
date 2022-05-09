import { getWelcomeMessage } from "./welcome"

const App = (props: any) => {
  return (
    <h1>{getWelcomeMessage("We're awesome!!")}</h1>
  )
}

export default App
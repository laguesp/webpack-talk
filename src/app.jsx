import { getWelcomeMessage } from "./welcome"
import styled, {createGlobalStyle} from 'styled-components'

const App = (props) => {
  return (
    <>
      <Styles />
      <H1>{getWelcomeMessage("We're awesome!!")}</H1>
    </>
  )
}

const Styles = createGlobalStyle`
  h1 {
    color: blue;
  }
`

const H1 = styled.h1`
  background: teal;
`

export default App
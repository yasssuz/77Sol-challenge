import styled from "styled-components";

import InitialAnimation from "../components/InitialAnimation";
import InputArea from "../components/InputArea";

function App() {
  return (
    <PageContiner>
      <InitialAnimation />
      <InputArea />
    </PageContiner>
  );
}

const PageContiner = styled.main`
  background: ${props => props.theme.colors.veryLightGray};
  min-height: 100vh;
  display: grid;
  place-content: center;
  grid-template-columns: repeat(2, auto);
`;

export default App;

import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const theme = {
  colors: {
    white: "#fff",
    veryLightGray: "#f7f7f7",
    lightGray: "#acacac",
    gray: "#4E4B66",
    blue: "#063ef9",
  },
};

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, input, select, label, button {
    font-family: "Roboto", sans-serif;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

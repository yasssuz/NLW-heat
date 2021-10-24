import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { AuthProvider } from "./contexts/authContext";
import App from "./pages/App";

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
  }

  body {
    color: #e1e1e6;
    background: #121214;
  }
`;

const theme = {
  colors: {
    dark: "#121214",
    darkGray: "#17171a",
    yellow: "#ffcd1e",
    gray: "#e1e1e6",
  },
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

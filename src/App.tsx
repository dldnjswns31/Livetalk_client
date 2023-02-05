import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Router from "./Router";
import GlobalStyles from "./styles/GlobalStyles";
import theme from "./styles/theme";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

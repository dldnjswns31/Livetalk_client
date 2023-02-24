import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import authAPI from "./api/auth";
import { useAppDispatch } from "./hooks";
import { IUser, saveUserData } from "./redux/slice/userSlice";
import Router from "./Router";
import GlobalStyles from "./styles/GlobalStyles";
import theme from "./styles/theme";
import { removeToken } from "./utils/token";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async function fn() {
      try {
        const {
          data: { uid, email, nickname },
        } = await authAPI.verify();

        dispatch(saveUserData({ uid, email, nickname }));
      } catch (err) {
        removeToken();
      }
    })();
  }, []);
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

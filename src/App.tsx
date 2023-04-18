import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#002F86",
    },
    secondary: {
      main: "#0AB2FA",
    },
  },
  typography: {
    fontFamily: "century_gothicregular",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;

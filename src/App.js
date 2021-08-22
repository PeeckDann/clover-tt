import { ThemeProvider, createTheme } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import Header from "./components/Header";
import Board from "./pages/Board";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Board />
    </ThemeProvider>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: blue[900],
      contrastText: "#fff",
    },
    secondary: {
      main: "#fff",
      contrastText: blue[900],
    },
  },
});

export default App;

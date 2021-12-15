import { createMuiTheme } from "@material-ui/core";
import { colors } from "../../shared/colors";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: colors.brandBlue,
    },
    secondary: {
      main: colors.brandRed,
    },
    background: {
      default: "#f3f0ee",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Fira Sans",
    h1: {
      fontSize: "2rem",
      fontWeight: 400,
    },
    h2: {
      fontFamily: "Fira Sans",
      fontSize: "1.8rem",
    },
    h5: {
      fontFamily: "Fira Sans",
    },
    h4: {
      fontFamily: "Fira Sans",
    },
    h6: {
      fontFamily: "Fira Sans",
    },
    subtitle1: {
      fontFamily: "Fira Sans",
    },
    subtitle2: {
      fontFamily: "Fira Sans",
    },
    body1: {
      fontFamily: "Ubuntu",
      fontSize: ".75rem",
    },
    body2: {
      fontFamily: "Ubuntu",
    },
    button: {
      fontFamily: "Ubuntu",
    },
    caption: {
      fontFamily: "Ubuntu",
    },
    overline: {
      fontFamily: "Ubuntu",
    },
  },
});

export default theme;

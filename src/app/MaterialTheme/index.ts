import { createTheme } from "@mui/material/styles";
import shadow from "./shadow";
import typography from "./typography";

const light = {
  palette: {
    type: "light",
    background: {
      default: "#f0f4f8",
      paper: "#ffffff",
    },
    primary: {
      contrastText: "#ffffff",
      main: "#1f3b4d",
    },
    secondary: {
      contrastText: "#1f3b4d",
      main: "#f5a623",
    },
    text: {
      primary: "#1f3b4d",
      secondary: "#f5a623",
      dark: "#000000",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          height: "100%",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: { height: "100%" },
        body: { background: "#f4f6f8", height: "100%", minHeight: "100%" },
      },
    },
  },
  shadow,
  typography,
};

let theme = createTheme(light);
theme = createTheme(theme, {
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          [theme.breakpoints.up("lg")]: {
            maxWidth: "1300px",
          },
        },
      },
    },
  },
});

export default theme;

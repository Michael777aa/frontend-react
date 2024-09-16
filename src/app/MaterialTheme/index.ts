import { createTheme } from "@mui/material/styles";
import { common } from "@mui/material/colors";
import shadow from "./shadow";
import typography from "./typography";
import { maxWidth } from "@mui/system";

/**
 * LIGHT THEME (DEFAULT)
 */
const light = {
  palette: {
    type: "light",
    background: {
      default: "#f0f4f8", // Softer and more modern light grey for background
      paper: "#ffffff", // Keep paper background clean and white
    },
    primary: {
      contrastText: "#ffffff", // White text for better readability on primary color
      main: "#1f3b4d", // A deep, elegant blue as primary color
    },
    secondary: {
      contrastText: "#1f3b4d", // Dark blue for contrast on secondary color
      main: "#f5a623", // A vibrant, warm orange for accents and secondary actions
    },
    text: {
      primary: "#1f3b4d", // Dark blue for better readability in primary text
      secondary: "#f5a623", // Secondary text with an eye-catching color
      dark: "#000000", // Standard black for extra dark text
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

// A custom theme for this app
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

import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1565C0",
    },
    secondary: {
      main: "#455A64",
    },
    background: {
      default: "#F5F7FA",
      paper: "#FFFFFF",
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: [
      "Inter",
      "Roboto",
      "Arial",
      "sans-serif",
    ].join(","),
  },
});
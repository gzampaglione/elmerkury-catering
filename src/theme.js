import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    success: { main: "#34a853" },
    warning: { main: "#fbbc05" },
    error: { main: "#ea4335" },
    info: { main: "#4285F4" },
    grey: { 50: "#f8f9fa", 100: "#f1f3f4", 200: "#e9ecef" },
  },
  typography: { fontFamily: "Roboto, sans-serif" },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", borderRadius: "4px" } },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
          borderRadius: "8px",
        },
      },
    },
  },
});

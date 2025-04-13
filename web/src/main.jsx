import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { itIT } from "@mui/x-date-pickers/locales";
import "@fontsource/inter";
import App from "./App.jsx";
import "./style.css";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="it"
      localeText={
        itIT.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </LocalizationProvider>
  </React.StrictMode>,
);

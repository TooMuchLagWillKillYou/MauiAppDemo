import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../style.css";

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

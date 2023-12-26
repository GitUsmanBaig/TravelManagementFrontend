import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     mode: "dark",
//     // primary: {
//     //   main: "#1976d2",
//     // },
//     // secondary: {
//     //   main: "#dc004e",
//     // },
//   },
//   typography: {
//     fontFamily: "Roboto, sans-serif",
//   },
// });

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <>
          <App />
        </>
        <ReactQueryDevtools />
      </QueryClientProvider>
  </React.StrictMode>
);

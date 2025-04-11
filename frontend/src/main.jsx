import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Correct import for React 18+
import "./index.css";
import App from "./App"; 
import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

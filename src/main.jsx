import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App2.jsx";
import { ThemeProvider } from "./components/ThemeContext";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root1")).render(
  <StrictMode>
    <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: "#28a745",
                color: "white",
              },
            },
            error: {
              style: {
                background: "#dc3545",
                color: "white",
              },
            },
          }}
        />
    </BrowserRouter>
  </StrictMode>
);

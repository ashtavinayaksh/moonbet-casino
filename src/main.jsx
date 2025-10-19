// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./theme/moonbet-theme.css"; // Add this line

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

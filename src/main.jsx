// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./theme/moonbet-theme.css";

// 👇 Import the AuthProvider
import { AuthProvider } from "./store/useAuthStore.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* ✅ Wrap the entire app inside AuthProvider */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);

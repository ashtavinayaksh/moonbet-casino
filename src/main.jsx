import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./theme/moonbet-theme.css";
import { AuthProvider } from "./store/useAuthStore";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { WalletSocketProvider } from "./context/WalletSocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <WalletSocketProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      </WalletSocketProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);

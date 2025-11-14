import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const WalletSocketContext = createContext(null);

export function WalletSocketProvider({ children }) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("https://api.moonbet.games", {
        transports: ["websocket"],
        path: "/wallet-service/socket.io",   // ✅ IMPORTANT FIX
        withCredentials: false,
      });

      socketRef.current.on("connect", () => {
        console.log("🔗 Wallet socket connected:", socketRef.current.id);
      });

      socketRef.current.on("disconnect", () => {
        console.log("❌ Wallet socket disconnected");
      });
    }

    return () => {};
  }, []);

  return (
    <WalletSocketContext.Provider value={socketRef.current}>
      {children}
    </WalletSocketContext.Provider>
  );
}

export const useWalletSocket = () => useContext(WalletSocketContext);

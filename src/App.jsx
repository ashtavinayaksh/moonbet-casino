// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Homepage from "./pages/Homepage";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";
import Bets from "./pages/Bets";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import GamePage from "./pages/GamePage";
import { ToastContainer } from "react-toastify";
import "./styles/toastify-custom.css";
import AuthTest from "./pages/AuthTest";
import "react-toastify/dist/ReactToastify.css";
import AffiliateProgram from "./pages/AffiliateProgram";
import Leaderboard from "./pages/Leaderboard";
import TidioChatButton from "./components/TidioChatButton";
import Blackjack from "./pages/Blackjack";
import Casino from "./pages/Casino";
import ProvidersPage from "./pages/ProvidersPage";
import AffiliateLandingPage from "./pages/Affiliatelandingpage";
import BettingRules from "./pages/Bettingrules";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditions from "./pages/Termsandconditions";
import ResponsibleGamblingPage from "./pages/ResponsibleGamblingPage";
import ProvablyFairPage from "./pages/ProvablyFairPage";
import ContactUsPage from "./pages/Contactuspage.jsx";
import ProductShowcase from "./components/Productshowcase.jsx";
import { useLoader } from "./context/LoaderContext";
import GlobalLoader from "./components/GlobalLoader";

// Placeholder pages
const HoneypotPage = () => (
  <div className="min-h-screen p-8 text-white">
    <h1>Honeypot Game</h1>
  </div>
);
const CoinflipPage = () => (
  <div className="min-h-screen p-8 text-white">
    <h1>Coinflip Game</h1>
  </div>
);
const PumpDumpPage = () => (
  <div className="min-h-screen p-8 text-white">
    <h1>Pump.Dump Game</h1>
  </div>
);
const FuturesPage = () => (
  <div className="min-h-screen p-8 text-white">
    <h1>Futures Game</h1>
  </div>
);
const ChatPage = () => (
  <div className="min-h-screen p-8 text-white">
    <h1>Chat</h1>
  </div>
);

//
// 🔐 PRIVATE ROUTE WRAPPER
//
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    // redirect to home with ?modal=auth to open login popup
    return <Navigate to="/?modal=auth&tab=login" replace />;
  }
  return children;
};

//
// 🔓 AUTH MODAL HANDLER
//
const AuthModalHandler = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const modalParam = searchParams.get("modal");
    const tabParam = searchParams.get("tab");
    if (modalParam === "auth" && !isLoggedIn) {
      setIsAuthModalOpen(true);
      setDefaultTab(tabParam === "register" ? "register" : "login");
    } else {
      setIsAuthModalOpen(false);
    }
  }, [searchParams, isLoggedIn]);

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
    searchParams.delete("modal");
    searchParams.delete("tab");
    setSearchParams(searchParams);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    handleCloseAuthModal();
  };

  return (
    <>
      {children}
      {!isLoggedIn && (
        <LoginSignup
          isOpen={isAuthModalOpen}
          onClose={handleCloseAuthModal}
          defaultTab={defaultTab}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

//
// 🧭 APP ROUTES
//
function App() {
  const location = useLocation();
const { loading, setLoading } = useLoader();

useEffect(() => {
  setLoading(true);

  const timer = setTimeout(() => {
    setLoading(false);
  }, 600); // small delay for smoothness

  return () => clearTimeout(timer);
}, [location]);

  return (
      <AuthModalHandler>
      <>
      {loading && <GlobalLoader />}
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* ✅ PUBLIC ROUTES */}
            <Route index element={<Homepage />} />
            <Route path="game/honeypot" element={<HoneypotPage />} />
            <Route path="game/coinflip" element={<CoinflipPage />} />
            <Route path="game/pumpdump" element={<PumpDumpPage />} />
            <Route path="game/futures" element={<FuturesPage />} />
            <Route path="game/:gameId" element={<GamePage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="authtest" element={<AuthTest />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="blackjack" element={<Blackjack />} />
            <Route path="casino" element={<Casino />} />
            <Route path="casino/:category" element={<Casino />} />
            <Route path="providers" element={<ProvidersPage />} />
            <Route
              path="affiliate-program"
              element={<AffiliateLandingPage />}
            />
            <Route path="betting-rules" element={<BettingRules />} />
            <Route path="privacy" element={<PrivacyPolicyPage />} />
            <Route path="contact" element={<ContactUsPage />} />
            <Route path="product-data" element={<ProductShowcase />} />
            <Route
              path="terms-and-condition"
              element={<TermsAndConditions />}
            />
            <Route
              path="responsible-gambling"
              element={<ResponsibleGamblingPage />}
            />
            <Route path="provably-fair" element={<ProvablyFairPage />} />

            {/* 🔒 PRIVATE ROUTES (require login) */}
            <Route
              path="settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route
              path="transactions"
              element={
                <PrivateRoute>
                  <Transactions />
                </PrivateRoute>
              }
            />
            <Route
              path="bets"
              element={
                <PrivateRoute>
                  <Bets />
                </PrivateRoute>
              }
            />
            <Route
              path="bet-history"
              element={
                <PrivateRoute>
                  <Bets />
                </PrivateRoute>
              }
            />
            <Route
              path="affiliate"
              element={
                <PrivateRoute>
                  <AffiliateProgram />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>

      {/* ✅ Toast + Tidio Global */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        closeButton
      />
      <TidioChatButton />
    </>
    </AuthModalHandler>
  );
}

export default App;

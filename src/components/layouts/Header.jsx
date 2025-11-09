// Enhanced Header.jsx with Sidebar Toggle and Futuristic Casino UI
import React, { useState, useEffect, useRef, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import WalletSettingsModal from "../WalletSettingsModal";
import WalletModal from "../WalletModal";
import LoginTrigger from "../LoginSignup/LoginTrigger";
import axios from "axios";
import { toast } from "react-toastify";

// 3D Rotating Coin Component
const RotatingCoin = () => {
  const meshRef = useRef();

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0.8, 0.8, 0.15, 32]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.9}
          roughness={0.1}
          emissive="#FFA500"
          emissiveIntensity={0.3}
        />
      </mesh>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </Float>
  );
};

const Header = ({
  onMobileSidebarToggle,
  isMobileSidebarOpen,
  onCloseMobileSidebar,
  onDesktopSidebarToggle,
  isDesktopSidebarCollapsed = true,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    isDesktopSidebarCollapsed
  );
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const [walletSettingsOpen, setWalletSettingsOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [walletBalance, setWalletBalance] = useState("0.00");
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const location = useLocation();
  const walletDropdownRef = useRef(null);

  const [hasToken, setHasToken] = useState(!!localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;
  const userName = user.username;
  console.log("selectedCurrency are:", selectedCurrency);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setHasToken(!!token);
    };

    // Watch for login/logout actions — custom event
    window.addEventListener("tokenChanged", checkToken);

    // Optional: also handle cross-tab changes
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("tokenChanged", checkToken);
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        // Replace with dynamic user ID if available in localStorage later
        const response = await axios.get(
          `/wallet-service/api/wallet/${userId}/balance`
        );

        if (response.data && response.data.totalUsd) {
          setWalletBalance(response.data.totalUsd.toFixed(2));
        } else {
          setWalletBalance("0.00");
        }
      } catch (error) {
        console.error("Failed to fetch wallet balance:", error);
        setWalletBalance("0.00");
      }
    };

    if (hasToken) {
      fetchWalletBalance();
    }
  }, [hasToken]);

  // Currencies with neon colors
  // const currencies = [
  //   {
  //     symbol: "BTC",
  //     name: "Bitcoin",
  //     balance: "0.00000",
  //     icon: "₿",
  //     color: "bg-orange-400",
  //   },
  //   {
  //     symbol: "ETH",
  //     name: "Ethereum",
  //     balance: "0.00000",
  //     icon: "Ξ",
  //     color: "bg-blue-500",
  //   },
  //   {
  //     symbol: "LTC",
  //     name: "Litecoin",
  //     balance: "0.00000",
  //     icon: "Ł",
  //     color: "bg-blue-800",
  //   },
  //   {
  //     symbol: "USDT",
  //     name: "Tether",
  //     balance: "0.00000",
  //     icon: "₮",
  //     color: "bg-green-500",
  //   },
  //   {
  //     symbol: "SOL",
  //     name: "Solana",
  //     balance: "0.00000",
  //     icon: "◎",
  //     color: "bg-purple-500",
  //   },
  //   {
  //     symbol: "DOGE",
  //     name: "Dogecoin",
  //     balance: "0.00000",
  //     icon: "Ð",
  //     color: "bg-yellow-500",
  //   },
  //   {
  //     symbol: "BCH",
  //     name: "Bitcoin Cash",
  //     balance: "0.00000",
  //     icon: "฿",
  //     color: "bg-green-400",
  //   },
  //   {
  //     symbol: "XRP",
  //     name: "Ripple",
  //     balance: "0.00000",
  //     icon: "✕",
  //     color: "bg-gray-600",
  //   },
  //   {
  //     symbol: "TRX",
  //     name: "Tron",
  //     balance: "0.00000",
  //     icon: "⟠",
  //     color: "bg-red-500",
  //   },
  // ];
  //   const [currencies, setCurrencies] = useState([]);
  // const [selectedCurrency, setSelectedCurrency] = useState(null);
  // const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const [coinsRes, balanceRes] = await Promise.all([
          axios.get("/wallet-service/api/wallet/coins"),
          axios.get(`/wallet-service/api/wallet/${userId}/balance`),
        ]);

        const coins = coinsRes.data || [];
        const walletBalances = balanceRes.data?.balances || [];

        // 🪙 merge coins and balances
        const colorMap = {
          BTC: "bg-orange-400",
          ETH: "bg-blue-500",
          USDT: "bg-green-500",
          SOL: "bg-purple-500",
          BNB: "bg-yellow-400",
          XRP: "bg-gray-500",
          ADA: "bg-blue-400",
          DOGE: "bg-yellow-500",
          TRX: "bg-red-500",
          LTC: "bg-blue-800",
          DOT: "bg-pink-500",
          MATIC: "bg-indigo-500",
          AVAX: "bg-red-400",
          XLM: "bg-cyan-400",
          BCH: "bg-green-400",
        };

        const merged = coins.map((coin) => {
          const match = walletBalances.find(
            (b) => b.currency.toUpperCase() === coin.symbol.toUpperCase()
          );
          return {
            ...coin,
            color: colorMap[coin.symbol] || "bg-gray-700",
            balance: match ? match.amount.toFixed(5) : "0.00000",
            iconPath: `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/${coin.symbol.toLowerCase()}.svg`,
          };
        });

        setCurrencies(merged);

        // 🪙 Determine preferred or default currency
        const preferred = localStorage.getItem("preferredCurrency");
        let initialCurrency =
          merged.find((c) => c.symbol === preferred) ||
          merged.find((c) => c.symbol === "BTC") ||
          merged[0];

        setSelectedCurrency(initialCurrency);
        localStorage.setItem("preferredCurrency", initialCurrency.symbol);

        // 🧮 Show its balance directly (no USD conversion)
        setWalletBalance(
          `${initialCurrency.balance} ${initialCurrency.symbol}`
        );
      } catch (err) {
        console.error("Error fetching wallet or coins:", err);
        setWalletBalance("0.00000 BTC");
      }
    };

    if (hasToken) fetchWalletData();
    // window.addEventListener("currencyChanged", fetchWalletData);
    // return () => window.removeEventListener("currencyChanged", fetchWalletData);
  }, [hasToken]);

  // 👇 whenever a currency is selected from dropdown
  const handleCurrencySelect = async (currency) => {
    try {
      setSelectedCurrency(currency);
      localStorage.setItem("preferredCurrency", currency.symbol);

      let gameCurrency = localStorage.getItem("gameCurrency") || "USD";
      localStorage.setItem("gameCurrency", gameCurrency);

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user.id;
      if (!userId) {
        console.error("❌ No user ID found in localStorage");
        setWalletBalance("0.00");
        return;
      }

      setWalletBalance("Updating...");

      const res = await axios.put(
        `/wallet-service/api/games/convert/${userId}`,
        {
          preferredCurrency: currency.symbol,
          gameCurrency: gameCurrency,
        }
      );

      if (res.data?.success && res.data.data) {
        const { balances, betCurrency, preferredCurrency, rate } =
          res.data.data;
        const match = balances.find(
          (b) => b.currency.toUpperCase() === betCurrency.toUpperCase()
        );

        const amount = match ? Number(match.amount).toFixed(2) : "0.00";

        // ✅ Store in localStorage to persist across reloads
        localStorage.setItem("convertedValue", amount);
        localStorage.setItem("preferredCurrency", preferredCurrency);
        localStorage.setItem("gameCurrency", betCurrency);
        localStorage.setItem("conversionRate", rate);

        setWalletBalance(`${amount} ${betCurrency}`);

        // ✅ Notify GamePage that currency changed
        window.dispatchEvent(new Event("preferredCurrencyUpdated"));
        console.log(
          `💱 Converted ${preferredCurrency} → ${betCurrency} @ rate ${rate}`
        );
      } else {
        console.warn("⚠️ Conversion API failed:", res.data?.message);
        setWalletBalance("0.00");
      }
    } catch (err) {
      console.error("❌ Currency conversion failed:", err.message);
      setWalletBalance("0.00");
    } finally {
      setWalletDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Restore currency & converted value on reload
    const preferred = localStorage.getItem("preferredCurrency");
    const gameCurrency = localStorage.getItem("gameCurrency");
    const convertedValue = localStorage.getItem("convertedValue");

    if (preferred && gameCurrency && convertedValue) {
      const currencyObj = currencies.find(
        (c) => c.symbol.toUpperCase() === preferred.toUpperCase()
      );
      if (currencyObj) setSelectedCurrency(currencyObj);

      setWalletBalance(`${convertedValue} ${gameCurrency}`);
    }
  }, [currencies]);

  // Enhanced menu items with gradient colors
  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: "/icons/home.svg",
      path: "/",
      className:
        "rounded-lg bg-[rgba(255,255,255,0.15)] shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px]",
    },
    {
      id: "favourites",
      label: "Favourites",
      icon: "/icons/favourites.svg",
      className:
        "rounded-lg bg-[rgba(255,255,255,0.15)] shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px]",
    },
    {
      id: "recommended",
      label: "Recommended",
      icon: "/icons/recommended.svg",
      className:
        "rounded-lg bg-[rgba(255,255,255,0.15)] shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px]",
    },
  ];
  const gamesItems = [
    {
      id: "casino",
      label: "Casino",
      icon: "/icons/casino.svg",
      className:
        "rounded-lg bg-[rgba(255,255,255,0.15)] shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px]",
      submenu: [
        { path: "/casino/slots", label: "Slots", icon: "/icons/slots.svg" },
        {
          path: "/casino/roulette",
          label: "Blackjack",
          icon: "/icons/blackjack.svg",
        },
        { path: "#", label: "Roulette", icon: "/icons/roulette.svg" },
        { path: "#", label: "Bacarrat", icon: "/icons/bacarrat-menu.svg" },
        { path: "#", label: "Game Shows", icon: "/icons/game-shows.svg" },
        { path: "#", label: "Live Casino", icon: "/icons/live-casino.svg" },
      ],
    },
    {
      id: "originals",
      label: "Originals",
      icon: "/icons/originals.svg",
      className:
        "rounded-lg bg-[rgba(255,255,255,0.15)] shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px]",
      submenu: [
        { path: "/game/dice", label: "Dices", icon: "/icons/dices.svg" },
        {
          path: "/game/honeypot",
          label: "HoneyPot",
          icon: "/icons/honeyPot.svg",
        },
        {
          path: "/game/blackjack",
          label: "Blackjack",
          icon: "/icons/blackjack.svg",
        },
        { path: "/game/67", label: "67", icon: "/icons/67.svg" },
        {
          path: "/game/bacarrat",
          label: "Bacarrat",
          icon: "/icons/bacarrat-menu.svg",
        },
        { path: "/game/mines", label: "Mines", icon: "/icons/mines.svg" },
      ],
    },
    {
      id: "leaderboard",
      label: "Leaderboard",
      icon: "/icons/leaderboard.svg",
      className:
        "rounded-lg bg-[rgba(255,255,255,0.15)] shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px]",
      path: "/leaderboard",
    },
  ];

  const accountItems = [
    { path: "/providers", label: "Providers", icon: "/icons/providers.svg" },
    { path: "/affiliate", label: "Affiliates", icon: "/icons/affiliates.svg" },
    { path: "#", label: "Rewards", icon: "/icons/rewards.svg" },
    { path: "#", label: "Live Support", icon: "/icons/live-support.svg" },
    // {
    //   path: "/bet-history",
    //   label: "Language: English",
    //   icon: "/icons/language.svg",
    // },
    // { path: "/settings", label: "Settings", icon: ":gear:" },
  ];

  // Toggle desktop sidebar collapse
  const toggleDesktopSidebar = () => {
    const newCollapsedState = !sidebarCollapsed;
    setSidebarCollapsed(newCollapsedState);
    setActiveSubmenu(null);

    // Notify parent component (Layout) about sidebar state change
    if (onDesktopSidebarToggle) {
      onDesktopSidebarToggle(newCollapsedState);
    }
  };

  const toggleSidebar = () => {
    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
    }
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setActiveSubmenu(null);
  };

  const toggleSubmenu = (menuId) => {
    if (!sidebarCollapsed) {
      setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
    }
  };

  const closeMobileSidebar = () => {
    if (onCloseMobileSidebar) {
      onCloseMobileSidebar();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("tokenChanged"));
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("kycStatus");
    window.dispatchEvent(new Event("tokenChanged"));
    // setIsLoggedIn(false);
    // setDropdownOpen(false);
    toast.info("You have been logged out successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  // Handle click outside for wallet dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        walletDropdownRef.current &&
        !walletDropdownRef.current.contains(event.target)
      ) {
        setWalletDropdownOpen(false);
      }
    };

    if (walletDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [walletDropdownOpen]);

  // Close sidebar when route changes
  useEffect(() => {
    if (!sidebarCollapsed) {
      closeSidebar();
    }
    closeMobileSidebar();
  }, [location.pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if ((sidebarOpen && !sidebarCollapsed) || isMobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen, sidebarCollapsed, isMobileSidebarOpen]);

  return (
    <>
      {/* DESKTOP HEADER */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 h-16  bg-[rgba(0,0,0,0.7)]  shadow-[2px_2px_4px_rgba(0,0,0,0.25)]  backdrop-blur-[21.5px]  border-b border-white/10 z-50"
      >
        <div className="h-full px-4 lg:px-4 flex items-center justify-between">
          {/* Left Section - Logo & Hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop Sidebar Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDesktopSidebar}
              className="provider_btn hidden lg:flex items-center justify-center w-10 h-10 rounded-lg  from-[rgba(30,30,30,0.15)] to-[rgba(75,75,75,0.15)] shadow-[1px_2px_1px_0_rgba(0,0,0,0.40)] backdrop-blur-[1.5px] hover:from-[rgba(40,40,40,0.20)] hover:to-[rgba(85,85,85,0.20)] transition-all duration-300 group"
            >
              <motion.div
                animate={{ rotate: sidebarCollapsed ? 0 : 180 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-1"
              >
                <span
                  className={`block h-0.5 bg-[#7D7D7D] transition-all duration-300 ${
                    sidebarCollapsed ? "w-5" : "w-5"
                  }`}
                ></span>
                <span
                  className={`flex justify-end items-end h-0.5 bg-[#7D7D7D] transition-all duration-300 self-end ${
                    sidebarCollapsed ? "w-3" : "w-3"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 bg-[#7D7D7D] transition-all duration-300 ${
                    sidebarCollapsed ? "w-5" : "w-5"
                  }`}
                ></span>
              </motion.div>
            </motion.button>

            {/* Logo with 3D Coin */}
            <Link to="/" className="flex items-center gap-2">
              <span className="flex items-center gap-2 text-xl font-bold text-white tracking-wider">
                <img
                  src="/icons/logo.svg"
                  alt="Moonbet Logo"
                  className="w-30 h-30 object-contain hidden md:block md:mx-4"
                />
                <img
                  src="/home-assets/mobile-logo.svg"
                  alt="Moonbet Logo mobile"
                  className="w-30 h-30 object-contain block md:hidden"
                />
              </span>
            </Link>
          </div>

          {/* Right Section - Balance, Coins, and Profile */}
          {/* Center Section - Balance and Coins */}
          {hasToken && (
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              {/* Balance Display with Dropdown */}
              <div
                className="relative flex justify-center sm:justify-start"
                ref={walletDropdownRef}
              >
                {/* Wallet Button */}
                <button
                  onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
                  className="wallet-btn relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-[8px]  border-[rgba(255,255,255,0.4)] bg-[linear-gradient(180deg,rgba(75,75,75,0.3)_0%,rgba(244,116,251,0.3)_100%)] shadow-[1px_2px_1px_rgba(0,0,0,0.4)] backdrop-blur-[1.5px]  text-white transition-all duration-300 max-w-[150px] sm:max-w-none"
                >
                  {/* Coin logo */}
                  <img
                    src={
                      selectedCurrency
                        ? selectedCurrency.iconPath
                        : "/icons/default-coin.svg"
                    }
                    alt={selectedCurrency?.name || "Currency"}
                    className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                  />

                  {/* Balance text */}
                  <span className="text-white text-xs sm:text-sm font-semibold tracking-wide truncate">
                    {selectedCurrency
                      ? `${selectedCurrency.icon || ""} ${walletBalance}`
                      : walletBalance}
                  </span>

                  {/* Dropdown arrow */}
                  <svg
                    className={`w-3 sm:w-4 h-3 sm:h-4 text-white/70 transition-transform duration-200 ${
                      walletDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Wallet Dropdown */}
                {walletDropdownOpen && (
                  <div
                    className="walletbtnnn absolute left-[80%] sm:left-1/2 md:left-1/2 -translate-x-1/2 mt-10 w-[90vw] sm:w-80 bg-[#1A1D24]/95
                 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                    style={{
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    <div className="p-3 sm:p-4 border-b border-white/10">
                      <div className="relative">
                        <svg
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search Currencies"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 
  rounded-lg focus:outline-none focus:border-green-500/50 
  text-xs sm:text-sm text-white placeholder-gray-400"
                        />
                      </div>
                    </div>

                    <div className="max-h-60 sm:max-h-80 overflow-y-auto wallet-scrollbar">
                      {currencies
                        .filter(
                          (currency) =>
                            currency.name
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                            currency.symbol
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                        )
                        .map((currency) => (
                          <div
                            key={currency.symbol}
                            onClick={() => {
                              handleCurrencySelect(currency);
                              setWalletDropdownOpen(false);
                            }}
                            className={`flex items-center justify-between p-2 sm:p-3 cursor-pointer transition-all rounded-lg
        ${
          selectedCurrency?.symbol === currency.symbol
            ? "bg-gradient-to-r from-green-500/20 to-emerald-500/10 border border-green-500/30 shadow-inner"
            : "hover:bg-white/5 border border-transparent"
        }`}
                          >
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div
                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${currency.color} flex items-center justify-center`}
                              >
                                <img
                                  src={currency.iconPath}
                                  alt={currency.name}
                                  className="w-5 h-5 object-contain"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/icons/default-coin.svg";
                                  }}
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-white font-medium text-xs sm:text-sm">
                                  {currency.name}
                                </span>
                                <span className="text-gray-400 text-[11px] sm:text-xs">
                                  {currency.symbol}
                                </span>
                              </div>
                            </div>
                            <span className="text-gray-400 font-mono text-xs sm:text-sm">
                              {currency.balance}
                            </span>
                          </div>
                        ))}
                    </div>

                    <div className="p-2 sm:p-3 border-t border-white/10">
                      <button
                        onClick={() => {
                          setWalletDropdownOpen(false);
                          setWalletSettingsOpen(true);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 
                     bg-white/5 hover:bg-white/10 rounded-lg transition-all text-xs sm:text-sm"
                      >
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-gray-300">Wallet Settings</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Coins/Chips Display - Wallet Button */}

              <button
                onClick={() => setWalletModalOpen(true)}
                className="wallet-btn2 relative flex items-center gap-2 px-3 py-1.5 rounded-[8px]  border-[rgba(255,255,255,0.40)] transition-all hover:scale-[1.02] backdrop-blur-[1.5px] shadow-[1px_2px_1px_rgba(0,0,0,0.40)]"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(240, 119, 48, 0.60) 0%, rgba(240, 119, 48, 0.00) 100%)",
                }}
              >
                <span className="text-xl">
                  <img
                    src="/icons/wallet.svg" // 👈 your image path
                    alt="Wallet Icon"
                    className="w-6 h-6 object-contain"
                  />
                </span>
              </button>
            </div>
          )}

          {/* Right Section - Profile and Actions */}
          <div className="flex items-center gap-2">
            {/* 🧍 User Avatar / Leaderboard Link */}
            <Link
              to="/leaderboard"
              className="view_btn w-10 h-10 flex items-center justify-center rounded-full overflow-hidden hover:opacity-80 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
              >
                <path
                  d="M11.9648 15.5293C12.992 15.5293 13.8251 16.3615 13.8252 17.3887V17.4033H14.9229C15.2544 17.4033 15.5224 17.6714 15.5225 18.0029C15.5225 18.3346 15.2545 18.6035 14.9229 18.6035H3.08008C2.7486 18.6033 2.48047 18.3344 2.48047 18.0029C2.48053 17.6715 2.74864 17.4035 3.08008 17.4033H4.17773V17.3887C4.17782 16.3615 5.01091 15.5293 6.03809 15.5293H11.9648ZM13.5 0C14.1659 2.94004e-05 14.7 0.540356 14.7002 1.2002V1.28418H16.2061C17.196 1.28426 18.0059 2.09499 18.0059 3.08496V3.69043C18.0059 5.64638 16.548 7.27294 14.6641 7.54297C14.4119 9.81074 12.8337 11.671 10.7158 12.3369L11.4844 14.3281H6.52148L7.29004 12.3369C5.17821 11.677 3.59399 9.81074 3.3418 7.54297C1.45184 7.27294 0 5.64638 0 3.69043V3.08496C0 2.09499 0.803849 1.28426 1.7998 1.28418H3.2998V1.2002C3.29996 0.540338 3.84007 0 4.5 0H13.5ZM9.5459 3.67871C9.3239 3.22871 8.68196 3.22871 8.45996 3.67871L7.87793 4.85449L6.57617 5.04004C6.08421 5.11203 5.88023 5.7241 6.24609 6.07812L7.18164 6.99609L6.95996 8.28613C6.87596 8.7841 7.39793 9.16261 7.83594 8.92871L9 8.31641L10.1582 8.92871C10.6081 9.16239 11.124 8.78403 11.04 8.28613L10.8242 6.99609L11.7598 6.07812C12.1196 5.7301 11.9218 5.1189 11.4238 5.04688L10.1279 4.85449L9.5459 3.67871ZM1.7998 2.48438C1.46984 2.48445 1.2002 2.75502 1.2002 3.08496V3.69043C1.2002 4.97434 2.09989 6.04229 3.2998 6.31836V2.48438H1.7998ZM14.7002 2.48438V6.31836C15.906 6.04225 16.8057 4.96834 16.8057 3.69043V3.08496C16.8057 2.75501 16.536 2.48445 16.2061 2.48438H14.7002Z"
                  fill="#7D7D7D"
                />
              </svg>
            </Link>
            {/* ✅ Show Login & Register only when NOT logged in */}
            {!hasToken && (
              <>
                <LoginTrigger
                  buttonText={
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-[150px] h-[36px] 
              bg-gradient-to-r from-[#F07730] to-[#EFD28E]
              text-black font-[600] text-[16px] 
              font-['Neue_Plack',sans-serif]
              rounded-lg shadow-md 
              transition-all duration-300
              hover:from-[#F07730]/90 hover:to-[#EFD28E]/90
              flex items-center justify-center"
                    >
                      LOGIN
                    </motion.button>
                  }
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                />

                <LoginTrigger
                  buttonText={
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-[129px] h-[36px]
              bg-transparent 
              border-2
              bg-[linear-gradient(#1A1D24,#1A1D24)_padding-box,linear-gradient(90deg,#F07730,#EFD28E)_border-box]
              text-white font-[600] text-[16px]
              font-['Neue_Plack',sans-serif]
              rounded-lg shadow-md
              flex items-center justify-center
              transition-all duration-300
              hover:shadow-lg hover:shadow-[#F07730]/30"
                    >
                      Register
                    </motion.button>
                  }
                  defaultTab="register"
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                />
              </>
            )}

            {/* ✅ Profile & Wallet shown only when logged in */}
            {hasToken && (
              <LoginTrigger
                buttonText={
                  <div className="view_btn w-10 h-10 flex items-center justify-center rounded-full overflow-hidden hover:opacity-80 transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                    >
                      <path
                        d="M20.1612 1.52601C20.2324 1.17783 21.0307 1.18575 20.9991 1.62888L20.9833 12.5726C20.8173 13.2373 20.3667 13.6883 19.7107 13.8703C19.5289 15.4055 18.7542 16.7428 17.6555 17.7873C17.782 19.2591 17.5449 20.7468 15.8375 21H5.25351C3.52245 20.7863 3.2458 19.275 3.38807 17.7873C2.28936 16.7349 1.51473 15.3976 1.33293 13.8703C0.613629 13.6646 0.107747 13.1503 0.0445116 12.3827C-0.0108193 11.7259 -0.0187237 10.5152 0.0445116 9.85844C0.107747 9.20166 0.629437 8.58444 1.29341 8.45783C1.39616 7.68235 1.52263 6.9227 1.77558 6.18679C3.36436 1.51809 8.56546 -1.0299 13.2765 0.394443C16.8098 1.47062 19.434 4.74662 19.7423 8.43409L20.1612 8.57653V1.52601ZM4.20223 15.5875C5.48274 16.8694 9.78274 17.2176 11.5454 17.1305C13.4346 17.0356 17.4105 16.4896 17.6476 14.1157C17.8373 12.2482 17.5132 10.0879 17.6476 8.18879C17.3947 6.36879 15.7506 5.97314 14.2408 5.56957C13.9642 5.49835 13.2449 5.26888 13.0077 5.27679C12.9287 5.27679 12.9129 5.29261 12.8496 5.33218C12.5888 5.48253 11.9881 6.33714 11.7509 6.38461H9.30057L8.13862 5.29261C6.44708 5.71201 3.64102 5.97314 3.44341 8.1967C3.30903 9.72392 3.41179 11.8842 3.49874 13.443C3.54616 14.353 3.49874 14.899 4.19432 15.6033L4.20223 15.5875Z"
                        fill="#CED5E3"
                      />
                    </svg>
                  </div>
                }
                className="p-2 rounded-lg hover:opacity-80 transition-colors"
              />
            )}
          </div>
        </div>
      </motion.header>

      {/* DESKTOP SIDEBAR - Collapsible */}
      <div className="hidden lg:block">
        {/* Backdrop for mobile/tablet */}
        {sidebarOpen && !sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Desktop Sidebar with Glassmorphism */}
        <motion.aside
          initial={false}
          animate={{
            width: sidebarCollapsed ? 65 : 256,
            x: 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`fixed left-0 top-16 bottom-0 
              bg-[rgba(0,0,0,0.7)] 
            shadow-[2px_2px_4px_rgba(0,0,0,0.25)] 
            backdrop-blur-[21.5px]  border-r border-white/10 
              z-[99999] px-2`}
        >
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#3a3a3a] scrollbar-track-transparent pr-1">
            {/* Main Menu */}

            <div className="py-3">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <div key={item.id}>
                    {item.submenu ? (
                      <>
                        <motion.button
                          whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.01 }}
                          onClick={() => toggleSubmenu(item.id)}
                          className={`w-full flex items-center ${
                            sidebarCollapsed
                              ? "justify-center"
                              : "justify-between"
                          } px-3 py-2 rounded-lg transition-all duration-200 group relative
                      ${
                        activeSubmenu === item.id
                          ? "bg-gradient-to-b from-white/30 via-white/5  backdrop-blur-[2px]"
                          : "hover:bg-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)]"
                      }`}
                        >
                          <div
                            className={`flex items-center ${
                              sidebarCollapsed ? "" : "gap-3"
                            } relative z-10`}
                          >
                            <span className="text-lg flex items-center justify-center">
                              {typeof item.icon === "string" &&
                              item.icon.startsWith("/") ? (
                                <img
                                  src={item.icon}
                                  alt={item.label}
                                  className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert"
                                />
                              ) : (
                                item.icon
                              )}
                            </span>
                            <AnimatePresence>
                              {!sidebarCollapsed && (
                                <motion.span
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  className=" text-base font-normal leading-24"
                                  style={{
                                    textShadow:
                                      "0 0 10px rgba(255, 255, 255, 0.25)",
                                  }}
                                >
                                  {item.label}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>

                          {!sidebarCollapsed && (
                            <motion.svg
                              animate={{
                                rotate: activeSubmenu === item.id ? 180 : 0,
                              }}
                              className="w-4 h-4 text-[#A8A8A8] "
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </motion.svg>
                          )}

                          {/* Tooltip for collapsed state */}
                          {sidebarCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1B23] border border-gray-800 rounded text-xs text-[#A8A8A8] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                              {item.label}
                            </div>
                          )}
                        </motion.button>

                        {/* Submenu */}
                        <AnimatePresence>
                          {activeSubmenu === item.id && !sidebarCollapsed && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center gap-3 relative  mt-1 overflow-hidden"
                            >
                              <div className="space-y-0.5">
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.path}
                                    to={subItem.path}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all
                                ${
                                  location.pathname === subItem.path
                                    ? "text-white bg-gradient-to-b from-white/30 via-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px]"
                                    : "text-[#A8A8A8] hover:text-white/90 hover:bg-white/5"
                                }`}
                                    onClick={closeSidebar}
                                  >
                                    <span className="opacity-60 text-sm">
                                      {subItem.icon}
                                    </span>
                                    <span
                                      className="text-sm font-['Neue_Plak']"
                                      style={{
                                        textShadow:
                                          "0 0 10px rgba(255, 255, 255, 0.25)",
                                      }}
                                    >
                                      {subItem.label}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <motion.div
                        whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.01 }}
                        className="relative group"
                      >
                        <Link
                          to={item.path}
                          className={`flex items-center ${
                            sidebarCollapsed ? "justify-center" : "gap-3"
                          } px-3 py-2 rounded-lg transition-all duration-200
                      ${
                        location.pathname === item.path
                          ? "bg-gradient-to-b from-white/30 via-white/5 to-white/30 backdrop-blur-[2px] text-white"
                          : "text-[#A8A8A8] hover:text-white/90 hover:bg-white/5"
                      }`}
                          onClick={closeSidebar}
                        >
                          <span className="text-lg flex items-center justify-center test">
                            {typeof item.icon === "string" &&
                            item.icon.startsWith("/") ? (
                              <img
                                src={item.icon}
                                alt={item.label}
                                className={`w-5 h-5 object-contain transition-all duration-300
                                ${
                                  location.pathname === item.path
                                    ? "opacity-100 brightness-0 invert" // 👈 stays white when active
                                    : "opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert"
                                }`}
                              />
                            ) : (
                              item.icon
                            )}
                          </span>
                          <AnimatePresence>
                            {!sidebarCollapsed && (
                              <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className=" text-base font-normal font-['Neue_Plak'] leading-6"
                                style={{
                                  textShadow:
                                    "0 0 10px rgba(255, 255, 255, 0.25)",
                                }}
                              >
                                {item.label}
                              </motion.span>
                            )}
                          </AnimatePresence>

                          {/* Active indicator bar */}
                          {location.pathname === item.path && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6  rounded-r"
                            />
                          )}

                          {/* Tooltip for collapsed state */}
                          {sidebarCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1B23] border border-gray-800 rounded text-xs text-[#A8A8A8] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                              {item.label}
                            </div>
                          )}
                        </Link>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Game Menu */}
            <div className="py-3 relative customborder">
              <div className="space-y-1">
                {gamesItems.map((item) => (
                  <div key={item.id}>
                    {item.submenu ? (
                      <>
                        <motion.button
                          whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.01 }}
                          onClick={() => toggleSubmenu(item.id)}
                          className={`w-full flex items-center rounded-[8px]  backdrop-blur-[2px] hover:text-white/90 ${
                            sidebarCollapsed
                              ? "justify-center "
                              : "justify-between bg-white/10 shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)]"
                          } px-3 py-2 rounded-lg transition-all duration-200 group relative 
                      ${
                        activeSubmenu === item.id
                          ? "bg-gradient-to-b from-white/30 via-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px] "
                          : "hover:bg-white/5 "
                      }`}
                        >
                          <div
                            className={`flex items-center ${
                              sidebarCollapsed ? "" : "gap-3"
                            } relative z-10`}
                          >
                            <span className="text-[#A8A8A8] text-lg flex items-center justify-center">
                              {typeof item.icon === "string" &&
                              item.icon.startsWith("/") ? (
                                <img
                                  src={item.icon}
                                  alt={item.label}
                                  className={`w-5 h-5 object-contain transition-all duration-300
                                  ${
                                    location.pathname === item.path
                                      ? "opacity-100 brightness-0 invert" // 👈 stays white when active
                                      : "opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert"
                                  }`}
                                />
                              ) : (
                                item.icon
                              )}
                            </span>
                            <AnimatePresence>
                              {!sidebarCollapsed && (
                                <motion.span
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  className="text-[#A8A8A8] text-base font-normal font-['Neue_Plak'] leading-6 group-hover:text-white"
                                  style={{
                                    textShadow:
                                      "0 0 10px rgba(255, 255, 255, 0.25)",
                                  }}
                                >
                                  {item.label}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>

                          {!sidebarCollapsed && (
                            <motion.svg
                              animate={{
                                rotate: activeSubmenu === item.id ? 180 : 0,
                              }}
                              className="w-4 h-4 text-[#A8A8A8]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </motion.svg>
                          )}

                          {/* Tooltip for collapsed state */}
                          {sidebarCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1B23] border border-gray-800 rounded text-xs text-[#A8A8A8] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                              {item.label}
                            </div>
                          )}
                        </motion.button>

                        {/* Submenu */}
                        <AnimatePresence>
                          {activeSubmenu === item.id && !sidebarCollapsed && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-2.5 overflow-hidden"
                            >
                              <div className="space-y-1.5">
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.path}
                                    to={subItem.path}
                                    className={`group flex items-center gap-4 px-3 py-1.5 rounded-[8px]  backdrop-blur-[2px] transition-all
                                ${
                                  location.pathname === subItem.path
                                    ? "text-white bg-gradient-to-b from-white/30 via-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px]"
                                    : "text-[#A8A8A8] hover:text-white/90 hover:bg-white/5"
                                }`}
                                    onClick={closeSidebar}
                                  >
                                    {/* <span className="opacity-60 text-sm">
                                    {subItem.icon}
                                  </span> */}
                                    <span className="text-lg flex items-center justify-center submenu">
                                      {typeof item.icon === "string" &&
                                      item.icon.startsWith("/") ? (
                                        <img
                                          src={subItem.icon}
                                          alt={subItem.label}
                                          className="w-5 h-5 object-contain opacity-70 transition-all duration-300
                 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert"
                                        />
                                      ) : (
                                        item.icon
                                      )}
                                    </span>
                                    <span
                                      className="text-sm font-['Neue_Plak']"
                                      style={{
                                        textShadow:
                                          "0 0 10px rgba(255, 255, 255, 0.25)",
                                      }}
                                    >
                                      {subItem.label}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <motion.div
                        whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.01 }}
                        className="relative group"
                      >
                        <Link
                          to={item.path}
                          className={`flex items-center gap-3 px-3 py-2 rounded-[8px] transition-all duration-200 
                        ${
                          // ✅ Collapsed + Active
                          sidebarCollapsed && location.pathname === item.path
                            ? "wallet-btn2 relative flex items-center gap-2 px-3 py-1.5 rounded-[8px] border border-[rgba(255,255,255,0.40)] transition-all shadow-[1px_2px_1px_rgba(0,0,0,0.40)] bg-[linear-gradient(0deg,rgba(240,119,48,0.6)_0%,rgba(240,119,48,0)_100%)]"
                            : // ✅ Expanded + Active
                            !sidebarCollapsed && location.pathname === item.path
                            ? "bg-gradient-to-b from-white/30 via-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px] text-white"
                            : // ✅ Collapsed + Inactive
                            sidebarCollapsed
                            ? "justify-center text-[##000] hover:text-white/90 hover:bg-white/5"
                            : // ✅ Expanded + Inactive
                              "gap-3 bg-white/10 text-[#A8A8A8] hover:text-white/90 hover:bg-white/5 shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)] backdrop-blur-[2px]"
                        }`}
                          onClick={closeSidebar}
                        >
                          <span className="text-lg flex items-center justify-center">
                            {typeof item.icon === "string" &&
                            item.icon.startsWith("/") ? (
                              <img
                                src={item.icon}
                                alt={item.label}
                                className={`w-5 h-5 object-contain transition-all duration-300
                                ${
                                  location.pathname === item.path
                                    ? "opacity-100 brightness-0 invert" // stays white when active
                                    : "opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert"
                                }`}
                              />
                            ) : (
                              item.icon
                            )}
                          </span>
                          <AnimatePresence>
                            {!sidebarCollapsed && (
                              <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className=" text-base font-normal font-['Neue_Plak'] leading-6"
                                style={{
                                  textShadow:
                                    "0 0 10px rgba(255, 255, 255, 0.25)",
                                }}
                              >
                                {item.label}
                              </motion.span>
                            )}
                          </AnimatePresence>

                          {/* Active indicator bar */}
                          {location.pathname === item.path && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 "
                            />
                          )}

                          {/* Tooltip for collapsed state */}
                          {sidebarCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1B23] border border-gray-800 rounded text-xs text-[#A8A8A8] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                              {item.label}
                            </div>
                          )}
                        </Link>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Account Menu */}
            <div className="py-2 mt-1 relative customborder">
              <div className="space-y-1">
                {accountItems.map((item) => (
                  <motion.div
                    key={item.path}
                    whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.01 }}
                    className="relative group"
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center ${
                        sidebarCollapsed ? "justify-center" : "gap-3"
                      } px-3 py-2 rounded-lg transition-all duration-200
                  ${
                    location.pathname === item.path
                      ? "bg-gradient-to-b from-white/30 via-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px] text-white"
                      : "text-[#A8A8A8] hover:text-white/90 hover:bg-white/5"
                  }`}
                      onClick={closeSidebar}
                    >
                      <span className="text-lg flex items-center justify-center">
                        {typeof item.icon === "string" &&
                        item.icon.startsWith("/") ? (
                          <img
                            src={item.icon}
                            alt={item.label}
                            className={`w-5 h-5 object-contain transition-all duration-300
                              ${
                                location.pathname === item.path
                                  ? "opacity-100 brightness-0 invert" // 👈 stays white when active
                                  : "opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert"
                              }`}
                          />
                        ) : (
                          item.icon
                        )}
                      </span>
                      <AnimatePresence>
                        {!sidebarCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className=" text-base font-normal font-['Neue_Plak'] leading-6"
                            style={{
                              textShadow: "0 0 10px rgba(255, 255, 255, 0.25)",
                            }}
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* Tooltip for collapsed state */}
                      {sidebarCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1B23] border border-gray-800 rounded text-xs text-[#A8A8A8] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                          {item.label}
                        </div>
                      )}
                    </Link>
                  </motion.div>
                ))}

                {/* Logout Button */}
                {hasToken && (
                  <motion.button
                    whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center ${
                      sidebarCollapsed ? "justify-center" : "gap-3"
                    } px-3 py-2 rounded-lg text-[#A8A8A8] hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group relative`}
                  >
                    <img
                      src="/icons/logout.svg"
                      alt="Logout"
                      className="w-7 h-7 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                    <AnimatePresence>
                      {!sidebarCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className=" text-base font-normal font-['Neue_Plak'] leading-6"
                          style={{
                            textShadow: "0 0 10px rgba(255, 255, 255, 0.25)",
                          }}
                          onClick={handleLogout}
                        >
                          Logout
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Tooltip for collapsed state */}
                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1B23] border border-gray-800 rounded text-xs text-[#A8A8A8] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                        Logout
                      </div>
                    )}
                  </motion.button>
                )}
              </div>
            </div>

            {/* Social Links - Only show when expanded */}
            {hasToken && (
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="relative customborder left-0 right-0 p-3"
                  >
                    {/* User Profile */}
                    <div className="flex flex-col items-center justify-center gap-2 p-4 mb-3">
                      {/* Profile Icon */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[linear-gradient(180deg,#1B1B1B_0%,#0F172A_100%)] shadow-[0px_2px_4px_rgba(0,0,0,0.25)] flex items-center justify-center">
                        <span className="text-lg sm:text-xl text-white font-semibold">
                          {userName ? userName.charAt(0).toUpperCase() : ""}
                        </span>
                      </div>

                      {/* Username */}
                      <p
                        className="text-[#C3C3C3] text-center font-[400] text-[16px] 
               leading-[24px] tracking-[0.3px] 
               font-['Neue_Plack',sans-serif] not-italic"
                      >
                        {userName}
                      </p>
                    </div>

                    {/* Language Selector */}
                    {/* <button className="w-full flex items-center gap-3 px-2 py-2 text-[#A8A8A8] hover:text-white/90 hover:bg-white/5 rounded-lg transition-all duration-200 mb-3">
                          <span className="text-lg">🌐</span>
                          <span
                            className="text-sm font-['Neue_Plak']"
                            style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.25)" }}
                          >
                            Language: English
                          </span>
                        </button> */}

                    {/* Social Links */}
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 border border-gray-800 rounded-lg hover:bg-white/10 transition-all duration-200"
                      >
                        <img
                          src="/icons/twitter.svg"
                          alt="Twitter"
                          className="w-4 h-4 object-contain"
                        />
                        <span
                          className="text-[#C3C3C3] text-[14px] leading-[24px] 
             font-[400] font-['Neue_Plack',sans-serif] 
             not-italic tracking-[0.3px] text-center"
                        >
                          Twitter
                        </span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 border border-gray-800 rounded-lg hover:bg-white/10 transition-all duration-200"
                      >
                        <img
                          src="/icons/telegram.svg"
                          alt="Telegram"
                          className="w-4 h-4 object-contain"
                        />
                        <span
                          className="text-[#C3C3C3] text-[14px] leading-[24px] 
             font-[400] font-['Neue_Plack',sans-serif] 
             not-italic tracking-[0.3px] text-center"
                        >
                          Telegram
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </motion.aside>
      </div>

      {/* MOBILE SIDEBAR - Keep existing mobile sidebar code */}
      <div className="lg:hidden">
        {/* Mobile Backdrop */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={closeMobileSidebar}
            />
          )}
        </AnimatePresence>

        {/* Mobile Sidebar */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: isMobileSidebarOpen ? 0 : "-100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed left-0 top-16 bottom-0 w-64 bg-gradient-to-b from-[#0A0B0D]/95 to-[#141519]/95 backdrop-blur-xl border-r border-white/10 z-50"
        >
          <div className="overflow-y-auto h-full custom-scrollbar pb-20">
            {/* Main Menu */}
            <div className="p-4">
              <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3">
                Main Menu
              </h3>
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <div key={item.id}>
                    {item.submenu ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          onClick={() => toggleSubmenu(item.id)}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 hover:bg-white/10 relative overflow-hidden group test"
                        >
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                          ></div>
                          <div className="flex items-center gap-3 relative z-10">
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-white font-medium">
                              {item.label}
                            </span>
                          </div>
                          <motion.svg
                            animate={{
                              rotate: activeSubmenu === item.id ? 180 : 0,
                            }}
                            className="w-4 h-4 text-gray-400 relative z-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </motion.svg>
                        </motion.button>

                        {/* Mobile Submenu */}
                        <AnimatePresence>
                          {activeSubmenu === item.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 mr-0 mt-1 overflow-hidden"
                            >
                              <div className="p-2 space-y-1 bg-black/40 backdrop-blur-md rounded-xl">
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.path}
                                    to={subItem.path}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-white/10 ${
                                      location.pathname === subItem.path
                                        ? "bg-white/10 border-l-2 border-purple-500"
                                        : ""
                                    }`}
                                    onClick={closeMobileSidebar}
                                  >
                                    <span className="text-lg opacity-70">
                                      {subItem.icon}
                                    </span>
                                    <span className="text-gray-300 text-sm">
                                      {subItem.label}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 hover:bg-white/10 relative overflow-hidden group ${
                          location.pathname === item.path
                            ? "bg-gradient-to-b from-white/30 via-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px] text-white"
                            : "text-[rgb(168,168,168)]"
                        }`}
                        onClick={closeMobileSidebar}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                        ></div>
                        <span className="text-lg flex items-center justify-center">
                          {typeof item.icon === "string" &&
                          item.icon.startsWith("/") ? (
                            <img
                              src={item.icon}
                              alt={item.label}
                              className={`w-5 h-5 object-contain transition-all duration-300 ${
                                location.pathname === item.path
                                  ? "opacity-100 brightness-0 invert"
                                  : "opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert"
                              }`}
                            />
                          ) : (
                            <span
                              className={
                                location.pathname === item.path
                                  ? "brightness-0 invert"
                                  : "group-hover:brightness-0 group-hover:invert"
                              }
                            >
                              {item.icon}
                            </span>
                          )}
                        </span>

                        <span
                          className={`font-normal font-['Neue_Plak'] font-medium relative z-10 transition-colors duration-300 ${
                            location.pathname === item.path
                              ? "text-white"
                              : "text-[rgb(168,168,168)] group-hover:text-white"
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Games Menu */}
            <div className="p-4 relative customborder mobile-game">
              <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3">
                Games
              </h3>
              <div className="space-y-1">
                {gamesItems.map((item) => (
                  <div key={item.id}>
                    {item.submenu ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          onClick={() => {
                            // Use a different state for mobile
                            setActiveSubmenu(
                              activeSubmenu === item.id ? null : item.id
                            );
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[8px] bg-white/10 shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)] backdrop-blur-[2px]  transition-all duration-300 hover:bg-white/10 relative overflow-hidden group
                            ${
                              activeSubmenu === item.id
                                ? "bg-gradient-to-b from-white/30 via-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px] text-white"
                                : "text-[rgb(168,168,168)] hover:text-white"
                            }`}
                        >
                          <div className="flex items-center gap-3 relative z-10">
                            <span className="text-lg flex items-center justify-center">
                              {typeof item.icon === "string" &&
                              item.icon.startsWith("/") ? (
                                <img
                                  src={item.icon}
                                  alt={item.label}
                                  className={`w-5 h-5 object-contain transition-all duration-300
                                    ${
                                      activeSubmenu === item.id
                                        ? "opacity-100 brightness-0 invert"
                                        : "opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert"
                                    }`}
                                />
                              ) : (
                                <span
                                  className={`transition-all duration-300 ${
                                    activeSubmenu === item.id
                                      ? "brightness-0 invert"
                                      : "group-hover:brightness-0 group-hover:invert"
                                  }`}
                                >
                                  {item.icon}
                                </span>
                              )}
                            </span>
                            <span
                              className={`font-medium relative z-10 transition-colors duration-300 ${
                                activeSubmenu === item.id
                                  ? "text-white"
                                  : "text-[rgb(168,168,168)] group-hover:text-white"
                              }`}
                            >
                              {item.label}
                            </span>
                          </div>

                          <motion.svg
                            animate={{
                              rotate: activeSubmenu === item.id ? 180 : 0,
                            }}
                            className="w-4 h-4 text-current"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </motion.svg>
                        </motion.button>

                        {/* Submenu for Mobile */}
                        <AnimatePresence>
                          {activeSubmenu === item.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-2 overflow-hidden"
                            >
                              <div className="space-y-1.5">
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.path}
                                    to={subItem.path}
                                    className={`group flex items-center gap-4 px-3 py-2 rounded-[8px] bg-white/10 shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)] backdrop-blur-[2px]  transition-all duration-300 hover:bg-white/10 relative overflow-hidden
                                      ${
                                        location.pathname === subItem.path
                                          ? "bg-gradient-to-b from-white/30 via-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px] text-white"
                                          : "text-[rgb(168,168,168)] hover:text-white"
                                      }`}
                                    onClick={closeMobileSidebar}
                                  >
                                    <span className="text-lg flex items-center justify-center">
                                      {typeof subItem.icon === "string" &&
                                      subItem.icon.startsWith("/") ? (
                                        <img
                                          src={subItem.icon}
                                          alt={subItem.label}
                                          className={`w-5 h-5 object-contain transition-all duration-300
                                            ${
                                              location.pathname === subItem.path
                                                ? "opacity-100 brightness-0 invert"
                                                : "opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert"
                                            }`}
                                        />
                                      ) : (
                                        <span
                                          className={`transition-all duration-300 ${
                                            location.pathname === subItem.path
                                              ? "brightness-0 invert"
                                              : "group-hover:brightness-0 group-hover:invert"
                                          }`}
                                        >
                                          {subItem.icon}
                                        </span>
                                      )}
                                    </span>
                                    <span
                                      className={`font-medium transition-colors duration-300 ${
                                        location.pathname === subItem.path
                                          ? "text-white"
                                          : "text-[rgb(168,168,168)] group-hover:text-white"
                                      }`}
                                    >
                                      {subItem.label}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="relative group"
                      >
                        <Link
                          to={item.path}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-[8px] bg-white/10 shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)] backdrop-blur-[2px]  transition-all duration-300 hover:bg-white/10 relative overflow-hidden group ${
                            location.pathname === item.path
                              ? "bg-gradient-to-b from-white/30 via-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px] text-white"
                              : "text-[rgb(168,168,168)]"
                          }`}
                          onClick={closeMobileSidebar}
                        >
                          <span className="text-lg flex items-center justify-center">
                            {typeof item.icon === "string" &&
                            item.icon.startsWith("/") ? (
                              <img
                                src={item.icon}
                                alt={item.label}
                                className={`w-5 h-5 object-contain transition-all duration-300 ${
                                  location.pathname === item.path
                                    ? "opacity-100 brightness-0 invert"
                                    : "opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert"
                                }`}
                              />
                            ) : (
                              <span
                                className={`transition-all duration-300 ${
                                  location.pathname === item.path
                                    ? "brightness-0 invert"
                                    : "group-hover:brightness-0 group-hover:invert"
                                }`}
                              >
                                {item.icon}
                              </span>
                            )}
                          </span>

                          <span
                            className={`font-medium relative z-10 transition-colors duration-300 ${
                              location.pathname === item.path
                                ? "text-white"
                                : "text-[rgb(168,168,168)] group-hover:text-white"
                            }`}
                          >
                            {item.label}
                          </span>

                          {/* Active indicator bar */}
                          {location.pathname === item.path && (
                            <motion.div
                              layoutId="activeIndicatorMobile"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-purple-500 rounded-r"
                            />
                          )}
                        </Link>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Account Menu */}
            <div className="p-4 relative customborder">
              <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3">
                Account
              </h3>
              <div className="space-y-1">
                {accountItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 hover:bg-white/10 relative overflow-hidden group ${
                      location.pathname === item.path
                        ? "bg-gradient-to-b from-white/30 via-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px] text-white"
                        : "text-[rgb(168,168,168)]"
                    }`}
                    onClick={closeMobileSidebar}
                  >
                    <span className="text-lg flex items-center justify-center">
                      {typeof item.icon === "string" &&
                      item.icon.startsWith("/") ? (
                        <img
                          src={item.icon}
                          alt={item.label}
                          className={`w-5 h-5 object-contain transition-all duration-300 ${
                            location.pathname === item.path
                              ? "opacity-100 brightness-0 invert"
                              : "opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert"
                          }`}
                        />
                      ) : (
                        <span
                          className={`transition-all duration-300 ${
                            location.pathname === item.path
                              ? "brightness-0 invert"
                              : "group-hover:brightness-0 group-hover:invert"
                          }`}
                        >
                          {item.icon}
                        </span>
                      )}
                    </span>

                    <span
                      className={`font-medium relative z-10 transition-colors duration-300 ${
                        location.pathname === item.path
                          ? "text-white"
                          : "text-[rgb(168,168,168)] group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                ))}

                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl rounded-[8px] bg-white/10 shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)] backdrop-blur-[2px] hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300">
                  <span className="text-xl">🚪</span>
                  <span className="text-[rgb(168,168,168)] font-medium">
                    Logout
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Wallet Settings Modal */}
      <WalletSettingsModal
        isOpen={walletSettingsOpen}
        onClose={() => setWalletSettingsOpen(false)}
      />

      {/* Wallet Modal */}
      <WalletModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #9333ea, #f43f5e);
        }
      `}</style>
    </>
  );
};

export default Header;

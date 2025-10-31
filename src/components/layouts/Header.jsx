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
  console.log("selectedCurrency are:",selectedCurrency)

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
    setWalletBalance(`${initialCurrency.balance} ${initialCurrency.symbol}`);
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
      const { balances, betCurrency, preferredCurrency, rate } = res.data.data;
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
        { path: "/casino/slots", label: "Slots", icon: "🎰" },
        { path: "/casino/blackjack", label: "Live casino", icon: "♠️" },
        { path: "/casino/roulette", label: "Games", icon: "🎯" },
      ],
    },
    {
      id: "originals",
      label: "Originals",
      icon: "/icons/originals.svg",
      className:
        "rounded-lg bg-[rgba(255,255,255,0.15)] shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px]",
      submenu: [
        { path: "/game/honeypot", label: "HoneyPot", icon: "🍯" },
        { path: "/game/blackjack", label: "Blackjack", icon: "🪙" },
        { path: "/game/67", label: "67", icon: "📈" },
        { path: "/game/mines", label: "Mines", icon: "💣" },
        { path: "/game/dice", label: "Dices", icon: "🎲" },
        { path: "/game/bacarrat", label: "Bacarrat", icon: "🎱" },
      ],
    },
  ];

  const accountItems = [
    { path: "#", label: "Rewards", icon: "/icons/rewards.svg" },
    { path: "#", label: "Live Support", icon: "/icons/live-support.svg" },
    {
      path: "/bet-history",
      label: "Language: English",
      icon: "/icons/language.svg",
    },
    // { path: "/transactions", label: "Transactions", icon: "💸" },
    // { path: "/bonuses", label: "My Bonuses", icon: "🎁" },
    // { path: "/settings", label: "Settings", icon: "⚙️" },
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
        className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-[#0A0B0D]/95 via-[#141519]/95 to-[#0A0B0D]/95 backdrop-blur-xl border-b border-white/10 z-50"
      >
        <div className="h-full px-4 lg:px-6 flex items-center justify-between">
          {/* Left Section - Logo & Hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop Sidebar Toggle Button */}
            <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={toggleDesktopSidebar}
                          className="hidden lg:flex items-center justify-center w-10 h-10 
                rounded-lg border-[0.5px] border-white/20 
                bg-gradient-to-b from-[rgba(30,30,30,0.15)] to-[rgba(75,75,75,0.15)]
                shadow-[1px_2px_1px_0_rgba(0,0,0,0.40)] backdrop-blur-[1.5px]
                hover:from-[rgba(40,40,40,0.20)] hover:to-[rgba(85,85,85,0.20)]
                transition-all duration-300 group"
                        >
                          <motion.div
                            animate={{ rotate: sidebarCollapsed ? 0 : 180 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-1"
                          >
                            <span
                              className={`block h-0.5 bg-white/70 transition-all duration-300 ${
                                sidebarCollapsed ? "w-5" : "w-5"
                              }`}
                            ></span>
                            <span
                              className={`block h-0.5 bg-white/70 transition-all duration-300 ${
                                sidebarCollapsed ? "w-5" : "w-3"
                              }`}
                            ></span>
                            <span
                              className={`block h-0.5 bg-white/70 transition-all duration-300 ${
                                sidebarCollapsed ? "w-5" : "w-4"
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
                  className="wallet-btn relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 
               rounded-xl backdrop-blur-[2px] bg-[#000]/80 text-white 
               transition-all duration-300 max-w-[150px] sm:max-w-none"
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
                className="wallet-btn2 relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#000]/80 transition-all hover:scale-[1.02]"
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
            {/* Search - Desktop only */}
            {/* <button className="hidden lg:block p-2 hover:bg-white/10 rounded-lg transition-colors">
              <img
                src="/icons/search.svg" // 👈 replace with your image path
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </button> */}
            {/* gift - Desktop only */}
            {/* <button className="hidden lg:block p-2 hover:bg-white/10 rounded-lg transition-colors relative">
              <img
                src="/icons/gift.svg" // 👈 replace with your image path
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </button> */}

            {/* win - Desktop only */}
            {/* <button className="hidden lg:block p-2 hover:bg-white/10 rounded-lg transition-colors">
              <img
                src="/icons/win.svg" // 👈 replace with your image path
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </button> */}

            {/* Profile Avatar */}
            {/* Trigger Button */}
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
            {/* Register Button */}
            {!hasToken && (
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
                    width: sidebarCollapsed ? 80 : 256,
                    x: 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`fixed left-0 top-16 bottom-0 bg-gradient-to-b from-[#0A0B0D]/95 to-[#141519]/95 backdrop-blur-xl border-r border-white/10 z-40 overflow-hidden`}
                >
                     {/* Main Menu */}
          <div className="p-3">
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
                          ? "bg-gradient-to-b from-white/30 via-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px]"
                          : "hover:bg-white/5"
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
                            className="ml-8 mt-1 overflow-hidden"
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
          <div className="p-3 border-t border-gray-800">
            <div className="space-y-1">
              {gamesItems.map((item) => (
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
                          ? "bg-gradient-to-b from-white/30 via-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px]"
                          : "hover:bg-white/5"
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
                                className="text-[#A8A8A8] text-base font-normal font-['Neue_Plak'] leading-6"
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
                            className="ml-8 mt-1 overflow-hidden"
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
                              className="w-5 h-5 object-contain opacity-70"
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
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-purple-500 rounded-r"
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
          <div className="p-3 border-t border-gray-800">
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
                          className="w-5 h-5 object-contain opacity-70 transition-all duration-300
                 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert"
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
                    src="/icons/login.svg"
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
                        className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-800 bg-[#0A0B0D]/95"
                      >
                        {/* User Profile */}
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
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 hover:bg-white/10 relative overflow-hidden group"
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
                            ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                            : ""
                        }`}
                        onClick={closeMobileSidebar}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                        ></div>
                        <span className="text-xl relative z-10">
                          {item.icon}
                        </span>
                        <span className="text-white font-medium relative z-10">
                          {item.label}
                        </span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Account Menu */}
            <div className="p-4 border-t border-white/10">
              <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3">
                Account
              </h3>
              <div className="space-y-1">
                {accountItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-white/10 ${
                      location.pathname === item.path
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                        : ""
                    }`}
                    onClick={closeMobileSidebar}
                  >
                    <span className="text-xl opacity-80">{item.icon}</span>
                    <span className="text-white font-medium">{item.label}</span>
                  </Link>
                ))}

                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300">
                  <span className="text-xl">🚪</span>
                  <span className="text-red-400 font-medium">Logout</span>
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

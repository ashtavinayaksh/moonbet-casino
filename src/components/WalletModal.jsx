// src/components/WalletModal.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "qrcode";
import WithdrawalConfirmationPopup from "./WithdrawalConfirmationPopup";
import { toast } from "react-toastify";

const WalletModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositTab, setDepositTab] = useState("crypto");
  const [qrCodeData, setQrCodeData] = useState("");
  const [hideZeroBalances, setHideZeroBalances] = useState(false);
  const [displayCryptoInFiat, setDisplayCryptoInFiat] = useState(true);
  const [selectedFiatCurrency, setSelectedFiatCurrency] = useState("USD");
  const [buyAmount, setBuyAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [coinList, setCoinList] = useState([]);
  const [walletBalance, setWalletBalance] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showCoinDropdown, setShowCoinDropdown] = useState(false);
  const [depositCoinList, setDepositCoinList] = useState([]);
  const [selectedDepositCoin, setSelectedDepositCoin] = useState(null);
  const [depositAddress, setDepositAddress] = useState("");
  const [showDepositDropdown, setShowDepositDropdown] = useState(false);
  const [otpRequestId, setOtpRequestId] = useState(null);

  const walletAddress = "Ar64QrBWTHWncHKXv2ojJ2np1zAGTEhZUA8wfdhTg7n";

  // Withdraw states
  const [withdrawCoinList, setWithdrawCoinList] = useState([]);
  const [selectedWithdrawCoin, setSelectedWithdrawCoin] = useState(null);
  const [showWithdrawDropdown, setShowWithdrawDropdown] = useState(false);
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const [showWithdrawConfirmation, setShowWithdrawConfirmation] =
    useState(false);

  const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
  const emailId = JSON.parse(localStorage.getItem("user") || "{}").email;
  useEffect(() => {
    if (isOpen) {
      fetch(`http://98.81.197.98/wallet-service/api/wallet/${userId}/balance`)
        .then((res) => res.json())
        .then((data) => {
          setWalletBalance(data);
        })
        .catch((err) => console.error("Error fetching wallet balance:", err));
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      fetch("http://98.81.197.98/wallet-service/api/wallet/coins")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setCoinList(data);
            setSelectedCoin(data[0]);
          }
        })
        .catch((err) => console.error("Error fetching coins:", err));
    }
  }, [isOpen]);

  useEffect(() => {
    if (showDepositModal) {
      fetch("http://98.81.197.98/wallet-service/api/wallet/coins")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setDepositCoinList(data);
            setSelectedDepositCoin(data[0]);
          }
        })
        .catch((err) => console.error("Error fetching deposit coins:", err));
    }
  }, [showDepositModal]);

  // Fetch withdraw coins
  useEffect(() => {
    if (showWithdrawModal) {
      fetch("http://98.81.197.98/wallet-service/api/wallet/coins")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setWithdrawCoinList(data);
            setSelectedWithdrawCoin(data[0]);
          }
        })
        .catch((err) => console.error("Error fetching withdraw coins:", err));
    }
  }, [showWithdrawModal]);

  useEffect(() => {
    const userId = "68eb94c22a7983ea19b0bd6a";
    if (selectedDepositCoin?.symbol) {
      const currency = selectedDepositCoin.symbol.toUpperCase();
      fetch(
        `http://98.81.197.98/wallet-service/api/wallet/${userId}/deposit-address?currency=${currency}`
      )
        .then((res) => res.json())
        .then(async (data) => {
          setDepositAddress(data.payAddress || "");
          if (data.payAddress) {
            const qr = await QRCode.toDataURL(data.payAddress, {
              width: 256,
              margin: 2,
              color: { dark: "#000000", light: "#FFFFFF" },
            });
            setQrCodeData(qr);
          }
        })
        .catch((err) => console.error("Error fetching deposit address:", err));
    }
  }, [selectedDepositCoin]);

  useEffect(() => {
    if (walletAddress) {
      QRCode.toDataURL(walletAddress, {
        width: 256,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
        .then(setQrCodeData)
        .catch(console.error);
    }
  }, [walletAddress]);

  const cryptoCurrencies = [
    {
      symbol: "SOL",
      name: "Solana",
      icon: "◎",
      balance: "0.10009677",
      value: "$19.58",
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      icon: "₿",
      balance: "0.00000000",
      value: "$0.00",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      icon: "Ξ",
      balance: "0.00000000",
      value: "$0.00",
    },
    {
      symbol: "USDT",
      name: "Tether",
      icon: "₮",
      balance: "0.00000000",
      value: "$0.00",
    },
  ];

  const fiatCurrencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "JPY", symbol: "¥" },
    { code: "INR", symbol: "₹" },
    { code: "CAD", symbol: "$" },
    { code: "CNY", symbol: "¥" },
    { code: "IDR", symbol: "Rp" },
    { code: "KRW", symbol: "₩" },
    { code: "PHP", symbol: "₱" },
    { code: "RUB", symbol: "₽" },
    { code: "DKK", symbol: "Kr" },
    { code: "MXN", symbol: "$" },
    { code: "PLN", symbol: "zł" },
    { code: "TRY", symbol: "₺" },
    { code: "VND", symbol: "đ" },
    { code: "ARS", symbol: "ARS" },
    { code: "PEN", symbol: "S/" },
    { code: "CLP", symbol: "CLP" },
    { code: "NGN", symbol: "₦" },
    { code: "CRC", symbol: "₡" },
    { code: "MAD", symbol: "MAD" },
    { code: "MYR", symbol: "RM" },
    { code: "QAR", symbol: "ر.ق" },
    { code: "SAR", symbol: "﷼" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const copyToClipboard = () => {
    if (depositAddress) {
      navigator.clipboard.writeText(depositAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

const handleWithdraw = async () => {
  if (!withdrawAddress || !withdrawAmount || !selectedWithdrawCoin) {
    toast.error("Please fill all fields");
    return;
  }

  const userId =
    JSON.parse(localStorage.getItem("user") || "{}").id ||
    "68eb94c22a7983ea19b0bd6a";

  const payload = {
    currency: selectedWithdrawCoin.symbol.toUpperCase(),
    amount: parseFloat(withdrawAmount),
    address: withdrawAddress,
  };

  try {
    console.log("📤 Sending withdraw OTP payload:", payload);

    const res = await fetch(
      `http://localhost:4001/api/wallet/${userId}/withdrawOtp`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to send withdrawal OTP");

    // ✅ Save requestId for verification
    setOtpRequestId(data.requestId);

    toast.success("OTP sent to your registered email. Please verify to continue.");

    // ✅ Open OTP confirmation modal
    setShowWithdrawConfirmation(true);
  } catch (err) {
    console.error("❌ Withdraw OTP error:", err);
    toast.error(err.message || "Failed to send OTP. Please try again.");
  }
};


  const handleConfirmWithdraw = async (otpCode) => {
  if (!otpCode || !otpRequestId) {
    toast.error("Missing OTP or request ID");
    return;
  }

  try {
    // Step 1: Verify OTP
    const verifyResponse = await fetch("http://98.81.197.98/wallet-service/api/wallet/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestId: otpRequestId,
        otp: otpCode,
      }),
    });

    const verifyData = await verifyResponse.json();
    if (!verifyResponse.ok) {
      throw new Error(verifyData.message || "OTP verification failed");
    }

    toast.success("✅ OTP verified successfully. Processing withdrawal...");

    // Step 2: Proceed with actual withdrawal
    const userId =
      JSON.parse(localStorage.getItem("user") || "{}").id ||
      "68eb94c22a7983ea19b0bd6a";

    const withdrawData = {
      currency: selectedWithdrawCoin.symbol.toUpperCase(),
      address: withdrawAddress,
      amount: parseFloat(withdrawAmount),
    };

    const response = await fetch(
      `http://98.81.197.98/wallet-service/api/wallet/${userId}/withdraw`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(withdrawData),
      }
    );

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Withdrawal failed");

    toast.success("💸 Withdrawal request submitted successfully!");
    setShowWithdrawConfirmation(false);
    setShowWithdrawModal(false);
    setWithdrawAddress("");
    setWithdrawAmount("");
  } catch (err) {
    console.error("❌ Withdrawal verification error:", err);
    toast.error(err.message || "Failed to verify OTP or withdraw funds.");
  }
};


  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const renderDepositModal = () => (
    <AnimatePresence>
      {showDepositModal && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[102]"
            onClick={() => setShowDepositModal(false)}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 flex items-center justify-center z-[103] p-4"
          >
            <div className="bg-[#1A1D24] rounded-xl w-full max-w-lg shadow-2xl border border-white/10">
              <div className="flex items-center gap-3 p-6 border-b border-white/10">
                <button
                  onClick={() => setShowDepositModal(false)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-white">Deposit</h2>
                <button
                  onClick={() => setShowDepositModal(false)}
                  className="ml-auto p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex gap-2 p-6">
                <button
                  onClick={() => setDepositTab("crypto")}
                  className={`flex-1 py-3 px-4 rounded-full font-medium transition-all ${
                    depositTab === "crypto"
                      ? "bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-black"
                      : "bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  Crypto
                </button>
                <button
                  onClick={() => setDepositTab("local")}
                  className={`flex-1 py-3 px-4 rounded-full font-medium transition-all ${
                    depositTab === "local"
                      ? "bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-black"
                      : "bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  Local Currency
                </button>
              </div>

              <div className="px-6 pb-6">
                <div className="mb-4 relative">
                  <label className="text-gray-400 text-sm mb-2 block">
                    Currency
                  </label>

                  <div
                    onClick={() => setShowDepositDropdown(!showDepositDropdown)}
                    className="bg-[#0F1116] rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-all border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center text-black font-bold">
                        {selectedDepositCoin?.symbol?.charAt(0) || "◎"}
                      </div>
                      <div>
                        <div className="text-white font-bold">
                          {selectedDepositCoin?.symbol || "SOL"}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {selectedDepositCoin?.name || "Solana"}
                        </div>
                      </div>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        showDepositDropdown ? "rotate-180" : ""
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
                  </div>

                  <AnimatePresence>
                    {showDepositDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 right-0 mt-2 bg-[#0F1116] border border-white/10 rounded-lg shadow-lg z-[999] max-h-60 overflow-y-auto"
                      >
                        {depositCoinList.map((coin) => (
                          <div
                            key={coin.symbol}
                            onClick={() => {
                              setSelectedDepositCoin(coin);
                              setShowDepositDropdown(false);
                            }}
                            className="flex items-center justify-between px-4 py-3 hover:bg-white/5 cursor-pointer transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center text-black font-bold">
                                {coin.symbol.charAt(0)}
                              </div>
                              <div>
                                <div className="text-white font-bold">
                                  {coin.symbol}
                                </div>
                                <div className="text-gray-400 text-xs">
                                  {coin.name}
                                </div>
                              </div>
                            </div>
                            <span className="text-gray-400 text-sm">
                              {coin.network}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mb-6">
                  <label className="text-gray-400 text-sm mb-2 block">
                    Address
                  </label>
                  <div className="bg-[#0F1116] rounded-lg p-4 flex items-center gap-3 border border-white/10">
                    <span className="text-white text-sm font-mono flex-1 truncate">
                      {depositAddress || "Fetching address..."}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={copyToClipboard}
                      className={`p-2 rounded-lg transition-all ${
                        copied
                          ? "bg-green-500/20 text-green-400"
                          : "hover:bg-white/5 text-gray-400"
                      }`}
                    >
                      {copied ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                    </motion.button>
                  </div>
                </div>

                <div className="flex justify-center mb-6">
                  <div className="bg-white p-4 rounded-xl">
                    {qrCodeData && (
                      <img
                        src={qrCodeData}
                        alt="QR Code"
                        className="w-48 h-48"
                      />
                    )}
                  </div>
                </div>

                <div className="text-center text-gray-400 mb-4">Or</div>

                <button className="w-full bg-[#0F1116] hover:bg-white/5 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-all border border-white/10">
                  <span>Deposit Directly From Your Wallet</span>
                  <div className="flex gap-2">
                    <span className="text-xl">🦊</span>
                    <span className="text-xl">👻</span>
                    <span className="text-xl">🔵</span>
                    <span className="text-xl">◎</span>
                    <span className="text-sm bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-black px-2 py-1 rounded font-bold">
                      +300
                    </span>
                  </div>
                </button>

                <div className="mt-4 flex justify-between text-sm">
                  <span className="text-gray-400">Credited</span>
                  <span className="text-white">2 Confirmations</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  const renderWithdrawModal = () => (
    <AnimatePresence>
      {showWithdrawModal && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[102]"
            onClick={() => setShowWithdrawModal(false)}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 flex items-center justify-center z-[103] p-4"
          >
            <div className="bg-[#1A1D24] rounded-xl w-full max-w-lg shadow-2xl border border-white/10">
              <div className="flex items-center gap-3 p-6 border-b border-white/10">
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-white">Withdraw</h2>
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="ml-auto p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="px-6 pb-6 pt-6">
                <div className="mb-4 relative">
                  <label className="text-gray-400 text-sm mb-2 block">
                    Currency
                  </label>
                  <div
                    onClick={() =>
                      setShowWithdrawDropdown(!showWithdrawDropdown)
                    }
                    className="bg-[#0F1116] rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-all border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center text-black font-bold">
                        {selectedWithdrawCoin?.symbol?.charAt(0) || "◎"}
                      </div>
                      <div>
                        <div className="text-white font-bold">
                          {selectedWithdrawCoin?.symbol || "SOL"}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {selectedWithdrawCoin?.name || "Solana"}
                        </div>
                      </div>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        showWithdrawDropdown ? "rotate-180" : ""
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
                  </div>

                  <AnimatePresence>
                    {showWithdrawDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 right-0 mt-2 bg-[#0F1116] border border-white/10 rounded-lg shadow-lg z-[999] max-h-60 overflow-y-auto"
                      >
                        {withdrawCoinList.map((coin) => (
                          <div
                            key={coin.symbol}
                            onClick={() => {
                              setSelectedWithdrawCoin(coin);
                              setShowWithdrawDropdown(false);
                            }}
                            className="flex items-center justify-between px-4 py-3 hover:bg-white/5 cursor-pointer transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center text-black font-bold">
                                {coin.symbol.charAt(0)}
                              </div>
                              <div>
                                <div className="text-white font-bold">
                                  {coin.symbol}
                                </div>
                                <div className="text-gray-400 text-xs">
                                  {coin.name}
                                </div>
                              </div>
                            </div>
                            <span className="text-gray-400 text-sm">
                              {coin.network}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mb-4">
                  <label className="text-gray-400 text-sm mb-2 block">
                    Withdrawal Address
                  </label>
                  <input
                    type="text"
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                    placeholder="Enter wallet address"
                    className="w-full bg-[#0F1116] rounded-lg p-4 text-white font-mono text-sm border border-white/10 focus:border-[#F07730] focus:outline-none transition-all"
                  />
                </div>

                <div className="mb-6">
                  <label className="text-gray-400 text-sm mb-2 block">
                    Amount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-[#0F1116] rounded-lg p-4 pr-20 text-white text-lg font-bold border border-white/10 focus:border-[#F07730] focus:outline-none transition-all"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                      {selectedWithdrawCoin?.symbol || "SOL"}
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-gray-400">Available Balance:</span>
                    <span className="text-white font-bold">
                      {walletBalance?.balances
                        ?.find(
                          (b) => b.currency === selectedWithdrawCoin?.symbol
                        )
                        ?.amount.toFixed(8) || "0.00000000"}
                    </span>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-6">
                  <div className="flex gap-3">
                    <svg
                      className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-orange-200 text-sm">
                      Please double-check the withdrawal address. Transactions
                      cannot be reversed once confirmed.
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWithdraw}
                  className="w-full bg-gradient-to-r from-[#F07730] to-[#EFD28E] hover:from-[#F07730]/90 hover:to-[#EFD28E]/90 text-black py-4 px-6 rounded-lg font-bold transition-all"
                >
                  Confirm Withdrawal
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 flex items-center justify-center z-[101] p-4"
          >
            <div className="bg-[#1A1D24] rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl border border-white/10">
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-[#F07730]/10 to-[#EFD28E]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white">Wallet</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex gap-4 p-6 border-b border-white/10 bg-[#0F1116]">
                {["overview", "buycrypto", "settings"].map((tab) => (
                  <motion.button
                    key={tab}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-black"
                        : "bg-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab === "overview"
                      ? "Overview"
                      : tab === "buycrypto"
                      ? "Buy Crypto"
                      : "Settings"}
                  </motion.button>
                ))}
              </div>

              <div
                className="overflow-y-auto"
                style={{ maxHeight: "calc(90vh - 200px)" }}
              >
                {activeTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6"
                  >
                    <div className="mb-6">
                      <h3 className="text-gray-400 text-sm mb-2">Balance</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-bold text-white">
                          ${walletBalance?.totalUsd?.toFixed(2) || "0.00"}
                        </span>
                        <div className="w-8 h-8 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center text-black font-bold text-sm">
                          $
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between text-gray-400 text-sm mb-4 pb-2 border-b border-white/10">
                        <span>Currency</span>
                        <span>Value</span>
                      </div>
                      {walletBalance?.balances &&
                      walletBalance.balances.length > 0 ? (
                        walletBalance.balances.map((coin, index) => (
                          <motion.div
                            key={coin.currency}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between py-4 border-b border-white/5 hover:bg-white/5 transition-all px-2 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center text-black font-bold">
                                {coin.currency.charAt(0)}
                              </div>
                              <div>
                                <div className="text-white font-bold">
                                  {coin.currency}
                                </div>
                                <div className="text-gray-400 text-sm">
                                  Crypto Asset
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-bold">
                                {coin.amount.toFixed(8)}
                              </div>
                              <div className="text-gray-400 text-sm">
                                ${coin.usdValue.toFixed(2)} USD
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-gray-400 text-center py-6">
                          No balances found.
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowWithdrawModal(true)}
                        className="bg-white/5 hover:bg-white/10 text-white py-4 px-6 rounded-lg font-bold transition-all border border-white/10"
                      >
                        Withdraw
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowDepositModal(true)}
                        className="bg-gradient-to-r from-[#F07730] to-[#EFD28E] hover:from-[#F07730]/90 hover:to-[#EFD28E]/90 text-black py-4 px-6 rounded-lg font-bold transition-all"
                      >
                        Deposit
                      </motion.button>
                    </div>

                    <div className="bg-gradient-to-r from-[#F07730]/10 to-[#EFD28E]/10 border border-[#F07730]/30 rounded-lg p-4">
                      <p className="text-gray-300 mb-4">
                        Improve your account security with Two-Factor
                        Authentication
                      </p>
                      <button className="w-full bg-gradient-to-r from-[#F07730] to-[#EFD28E] hover:from-[#F07730]/90 hover:to-[#EFD28E]/90 text-black py-3 px-4 rounded-lg font-medium transition-all">
                        Enable 2FA
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === "buycrypto" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6"
                  >
                    <div className="mb-4 relative">
                      <label className="text-gray-400 text-sm mb-2 block">
                        Buy
                      </label>

                      <div
                        onClick={() => setShowCoinDropdown(!showCoinDropdown)}
                        className="bg-[#0F1116] rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-all border border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center text-black font-bold">
                            {selectedCoin?.symbol?.charAt(0) || "◎"}
                          </div>
                          <div>
                            <div className="text-white font-bold">
                              {selectedCoin?.symbol || "SOL"}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {selectedCoin?.name || "Solana"}
                            </div>
                          </div>
                        </div>
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            showCoinDropdown ? "rotate-180" : ""
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
                      </div>

                      <AnimatePresence>
                        {showCoinDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 right-0 mt-2 bg-[#0F1116] border border-white/10 rounded-lg shadow-lg z-[999] max-h-60 overflow-y-auto"
                          >
                            {coinList.map((coin) => (
                              <div
                                key={coin.symbol}
                                onClick={() => {
                                  setSelectedCoin(coin);
                                  setShowCoinDropdown(false);
                                }}
                                className="flex items-center justify-between px-4 py-3 hover:bg-white/5 cursor-pointer transition-all"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center text-black font-bold">
                                    {coin.symbol.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="text-white font-bold">
                                      {coin.symbol}
                                    </div>
                                    <div className="text-gray-400 text-xs">
                                      {coin.name}
                                    </div>
                                  </div>
                                </div>
                                <span className="text-gray-400 text-sm">
                                  {coin.network}
                                </span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="mb-6">
                      <label className="text-gray-400 text-sm mb-2 block">
                        Amount *
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={buyAmount}
                          onChange={(e) => setBuyAmount(e.target.value)}
                          placeholder="0"
                          className="flex-1 bg-[#0F1116] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F07730] border border-white/10"
                        />
                        <div className="bg-[#0F1116] rounded-lg px-4 py-3 flex items-center gap-2 min-w-[120px] border border-white/10">
                          <div className="w-6 h-6 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center text-black text-xs font-bold">
                            ₹
                          </div>
                          <span className="text-white font-medium">INR</span>
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
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#F07730] to-[#EFD28E] hover:from-[#F07730]/90 hover:to-[#EFD28E]/90 text-black py-4 px-6 rounded-lg font-bold transition-all"
                    >
                      Buy {selectedCoin?.symbol || "SOL"}
                    </motion.button>
                  </motion.div>
                )}

                {activeTab === "settings" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6"
                  >
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">
                            Hide Zero Balances
                          </h4>
                          <p className="text-gray-400 text-sm">
                            Your zero balances won't appear in your wallet
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={hideZeroBalances}
                            onChange={(e) =>
                              setHideZeroBalances(e.target.checked)
                            }
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#F07730] peer-checked:to-[#EFD28E]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">
                            Display Crypto in Fiat
                          </h4>
                          <p className="text-gray-400 text-sm">
                            All bets & transactions will be settled in the
                            crypto equivalent
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={displayCryptoInFiat}
                            onChange={(e) =>
                              setDisplayCryptoInFiat(e.target.checked)
                            }
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#F07730] peer-checked:to-[#EFD28E]"></div>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3 mb-6">
                      {fiatCurrencies.map((currency) => (
                        <motion.button
                          key={currency.code}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedFiatCurrency(currency.code)}
                          className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
                            selectedFiatCurrency === currency.code
                              ? "bg-gradient-to-r from-[#F07730]/20 to-[#EFD28E]/20 border-2 border-[#F07730]"
                              : "bg-white/5 border-2 border-transparent hover:bg-white/10"
                          }`}
                        >
                          <div className="relative">
                            <div
                              className={`w-5 h-5 rounded-full border-2 ${
                                selectedFiatCurrency === currency.code
                                  ? "border-[#F07730]"
                                  : "border-gray-500"
                              }`}
                            >
                              {selectedFiatCurrency === currency.code && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#F07730] to-[#EFD28E]"></div>
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="text-white text-sm font-medium">
                            {currency.code}
                          </span>
                          <div className="w-5 h-5 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center text-black text-xs">
                            {currency.symbol}
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-[#F07730]/10 to-[#EFD28E]/10 border border-[#F07730]/30 rounded-lg p-4">
                      <p className="text-gray-300 mb-4">
                        Improve your account security with Two-Factor
                        Authentication
                      </p>
                      <button className="w-full bg-gradient-to-r from-[#F07730] to-[#EFD28E] hover:from-[#F07730]/90 hover:to-[#EFD28E]/90 text-black py-3 px-4 rounded-lg font-medium transition-all">
                        Enable 2FA
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
          <WithdrawalConfirmationPopup
            isOpen={showWithdrawConfirmation}
            onClose={() => setShowWithdrawConfirmation(false)}
            onConfirm={handleConfirmWithdraw}
            withdrawalData={{
              amount: withdrawAmount,
              currency: selectedWithdrawCoin?.symbol?.toUpperCase() || "SOL",
              address: withdrawAddress,
            }}
            userEmail={emailId} // Pass actual user email
          />

          {renderDepositModal()}
          {renderWithdrawModal()}
        </>
      )}
    </AnimatePresence>
  );
};

export default WalletModal;

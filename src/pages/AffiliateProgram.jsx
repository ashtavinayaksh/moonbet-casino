import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";

const AffiliateProgram = () => {
  const [referralCode, setReferralCode] = useState("");
  const [isCodeSet, setIsCodeSet] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Date");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState({ referrer: 0, referee: 0 });
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;
  const { token, isLoggedIn } = useAuthStore();

  // Mock data - replace with actual data from your backend
  const [stats, setStats] = useState({
    totalReferrals: 0,
    totalWagered: 0.0,
    totalEarnings: 0.0,
    pendingIncome: 0.0,
  });

  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
  const fetchReferralStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No auth token found");
        return;
      }

      const { data } = await axios.get(
        `/referral-service/api/referral/stats/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.success && data.data) {
        const info = data.data;

        // ✅ Get referral code if exists
        const code = info.asReferrer?.code || "";
        if (code) {
          setReferralCode(code);
          setIsCodeSet(true);

          const frontendUrl = window.origin;
          setGeneratedLink(`${frontendUrl}/register?ref=${code}`);

          // ✅ Stats update with backend totals
          setStats({
            totalReferrals: info.totals?.totalReferrals || 0,
            totalWagered: 0,
            totalEarnings: info.totals?.totalPointsOverall || 0, // 💰 comes from backend now
            pendingIncome: 0,
          });

          // ✅ Combine referrals list
          setReferrals(info.asReferrer?.recentReferrals || []);
        } else {
          setIsCodeSet(false);
          setReferrals([]);
        }
      }
    } catch (error) {
      console.error("❌ Failed to fetch referral stats:", error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchReferralStats();
}, []);


  // Generate random referral code
  const generateReferralCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const handleGenerateCode = async () => {
  try {
    setLoading(true);

    if (!isLoggedIn || !token) {
      alert("You must be logged in to generate a referral code.");
      return;
    }

    // ✅ Get user info from state or localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const payload = { userId: user.id };

    const { data } = await axios.post(
      "/referral-service/api/referral/generate-code",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (data?.success) {
      const info = data.data;

      // ✅ Update UI state
      setReferralCode(info.code);
      setGeneratedLink(info.shareLink);
      setPoints({
        referrer: info.points?.referrerPoints || 0,
        referee: info.points?.refereePoints || 0,
      });
      setIsCodeSet(true);

      // Optional: cache locally for reload persistence
      localStorage.setItem(
        "referralData",
        JSON.stringify({
          referralCode: info.code,
          referralLink: info.shareLink,
          points: {
            referrer: info.points?.referrerPoints || 0,
            referee: info.points?.refereePoints || 0,
          },
        })
      );

      console.log(`🎁 Referral code generated: ${info.code}`);
    } else {
      alert(data?.message || "Failed to generate referral code.");
    }
  } catch (error) {
    console.error("Referral API error:", error);
    alert(
      error.response?.data?.message ||
        "Error generating referral code. Please try again."
    );
  } finally {
    setLoading(false);
  }
};


  // Handle copying the link
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Handle claiming pending income
  const handleClaim = () => {
    console.log("Claiming pending income...");
  };

  // Glass card styles
  const glassCardStyle = {
    borderRadius: "32px",
    border: "1px solid rgba(255, 255, 255, 0.40)",
    background:
      "linear-gradient(0deg, rgba(30, 30, 30, 0.15) 0%, rgba(75, 75, 75, 0.15) 100%)",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
  };

  // Typography styles
  const titleStyle = {
    color: "#C1C1C1",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 800,
    lineHeight: "normal",
  };

  const subHeadingStyle = {
    color: "#C1C1C1",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  };

  const h2Style = {
    color: "#E5EAF2",
    textAlign: "center",
    fontFamily: "Neuropolitical, sans-serif",
    fontSize: "26px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "34px",
    textTransform: "uppercase",
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background gradient effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#13151A]/30 via-transparent to-[#1A1D24]/30 pointer-events-none" />
      {loading && (
  <div className="text-center text-gray-400 text-lg py-10">
    Loading referral info...
  </div>
)}


      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section with Affiliate Program */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {/* Main Glass Card */}
          <div className="p-8 lg:p-12 ">
            <div className="grid lg:grid-cols-2 gap-8 items-center ">
              {/* Left Content */}
              <div className="space-y-6">
                {/* Title with icon */}
                <div className="flex items-center gap-4">
                  <svg
                    className="w-8 h-8 text-[#F07730]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <h1 style={{ ...h2Style, textAlign: "left" }}>
                    Affiliate Program
                  </h1>
                </div>

                <p style={subHeadingStyle}>
                  Share Moonbet with your friends and earn as they play
                </p>

                {/* Referral Code Section - Modified */}
                <AnimatePresence mode="wait">
                  {!isCodeSet ? (
                    <motion.div
                      key="generate"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <button
                        onClick={handleGenerateCode}
                        className="w-full sm:w-auto px-8 py-3.5
                                 bg-gradient-to-r from-[#F07730] to-[#EFD28E]
                                 text-[#000] font-[600] text-[16px] 
                                 font-['Neue_Plack',sans-serif]
                                 rounded-lg shadow-md 
                                 transition-all duration-300
                                 hover:from-[#F07730]/90 hover:to-[#EFD28E]/90
                                 hover:scale-[1.02] active:scale-[0.98]
                                 flex items-center justify-center gap-2"
                        style={{
                          fontFamily: "Avenir, -apple-system, sans-serif",
                        }}
                      >
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
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Generate Referral Code
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="display"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="space-y-4"
                    >
                      {/* Display the referral code */}
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <div
                          style={{
                            ...subHeadingStyle,
                            background: "rgba(0, 0, 0, 0.5)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: "12px",
                            padding: "14px 20px",
                          }}
                          className="flex items-center gap-3"
                        >
                          <span className="text-gray-400">Code:</span>
                          <span className="text-[#F07730] font-bold text-xl">
                            {referralCode}
                          </span>
                        </div>
                      </div>

                      {/* Display the link with copy button */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div
                          style={{
                            ...subHeadingStyle,
                            background: "rgba(0, 0, 0, 0.5)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: "12px",
                            padding: "14px 20px",
                          }}
                          className="flex-1 flex items-center overflow-hidden"
                        >
                          <span className="truncate text-sm">
                            {generatedLink}
                          </span>
                        </div>
                        <button
                          onClick={handleCopy}
                          className="px-8 py-3.5 bg-gradient-to-r from-[#F07730] to-[#F07730] text-white font-bold 
                                   rounded-xl hover:shadow-lg hover:shadow-[#F07730]/25 transition-all duration-200
                                   hover:scale-[1.02] active:scale-[0.98] min-w-[100px]
                                   flex items-center justify-center gap-2"
                          style={{
                            fontFamily: "Avenir, -apple-system, sans-serif",
                          }}
                        >
                          {copied ? (
                            <>
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
                              Copied!
                            </>
                          ) : (
                            <>
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
                              Copy
                            </>
                          )}
                        </button>
                      </div>

                      {/* Generate New Code Button */}
                      <button
                        onClick={handleGenerateCode}
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1"
                        style={{
                          fontFamily: "Avenir, -apple-system, sans-serif",
                        }}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Generate new code
                      </button>
                      {points.referrer > 0 && (
  <div className="text-gray-400 text-sm mt-2">
    <p>You earn <span className="text-[#F07730] font-bold">{points.referrer}</span> points per referral.</p>
    <p>Your friend earns <span className="text-[#10B981] font-bold">{points.referee}</span> points when they join.</p>
  </div>
)}

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Side - Visual Element */}
              <div className="hidden lg:flex justify-center items-center">
                <div className="relative w-64 h-64">
                  {/* Animated circles */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 rounded-full border border-[#10B981]/20" />
                    <div className="absolute inset-6 rounded-full border border-[#059669]/20" />
                    <div className="absolute inset-12 rounded-full border border-[#10B981]/10" />
                  </motion.div>

                  {/* Center megaphone icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 blur-2xl bg-gradient-to-br from-[#10B981]/30 to-[#059669]/30" />
                      <svg
                        viewBox="0 0 200 200"
                        className="w-32 h-32 relative z-10"
                        fill="none"
                      >
                        <path
                          d="M50 80 L120 60 L120 140 L50 120 Z"
                          fill="url(#megaphoneGradient)"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="2"
                        />
                        <rect
                          x="30"
                          y="80"
                          width="30"
                          height="40"
                          fill="url(#handleGradient)"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="2"
                        />
                        <path
                          d="M130 70 Q150 70 150 100 Q150 130 130 130"
                          stroke="rgba(16, 185, 129, 0.6)"
                          strokeWidth="3"
                          fill="none"
                          className="animate-pulse"
                        />
                        <path
                          d="M140 60 Q170 60 170 100 Q170 140 140 140"
                          stroke="rgba(16, 185, 129, 0.4)"
                          strokeWidth="3"
                          fill="none"
                          className="animate-pulse"
                          style={{ animationDelay: "0.5s" }}
                        />
                        <defs>
                          <linearGradient
                            id="megaphoneGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#10B981" />
                            <stop offset="100%" stopColor="#059669" />
                          </linearGradient>
                          <linearGradient
                            id="handleGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#34D399" />
                            <stop offset="100%" stopColor="#10B981" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  {/* Floating coins */}
                  <motion.div
                    className="absolute top-0 right-0"
                    animate={{ y: [-10, 10, -10] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div
                      className="w-12 h-12 bg-gradient-to-br from-[#F07730] to-[#EFD28E] rounded-full 
                                  flex items-center justify-center text-white font-bold shadow-lg shadow-[#F07730]/30"
                    >
                      $
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-0 left-0"
                    animate={{ y: [10, -10, 10] }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div
                      className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full 
                                  flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/30"
                    >
                      $
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {/* Total Referrals Card */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <div className="p-6 wallet-btn3">
              <p
                style={{
                  ...subHeadingStyle,
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
              >
                Total Referrals
              </p>
              <div className="flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-[#F07730]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span style={titleStyle}>{stats.totalReferrals}</span>
              </div>
            </div>
          </motion.div>

          {/* Total Wagered Card */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <div className="p-6 wallet-btn3">
              <p
                style={{
                  ...subHeadingStyle,
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
              >
                Total Wagered
              </p>
              <div className="flex items-center gap-3">
                <span style={titleStyle}>
                  $ {stats.totalWagered.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Total Earnings Card */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <div className="p-6 wallet-btn3">
              <p
                style={{
                  ...subHeadingStyle,
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
              >
                Total Earnings
              </p>
              <div className="flex items-center gap-3">
                <span style={titleStyle}>
                  $ {stats.totalEarnings.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Pending Income Card with Claim */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <div className="p-6 wallet-btn3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p
                    style={{
                      ...subHeadingStyle,
                      fontSize: "14px",
                      marginBottom: "8px",
                    }}
                  >
                    Pending Income
                  </p>
                  <div className="flex items-center gap-3">
                    <span style={titleStyle}>
                      $ {stats.pendingIncome.toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleClaim}
                  disabled={stats.pendingIncome === 0}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    stats.pendingIncome > 0
                      ? "bg-gradient-to-r from-[#10B981] to-[#059669] text-white hover:shadow-lg hover:shadow-green-500/25"
                      : "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                  }`}
                  style={{ fontFamily: "Avenir, -apple-system, sans-serif" }}
                >
                  Claim
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Referrals Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="overflow-hidden wallet-btn3">
            {/* Table Header */}
            <div className="p-6 border-b border-white/20">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="wallet-btn3" style={titleStyle}>
                  Your Referrals
                </h2>

                <div className="flex gap-3 w-full sm:w-auto">
                  {/* Search Input */}
                  <div className="relative flex-1 sm:flex-initial">
                    <svg
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
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
                      placeholder="Search Users"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        ...subHeadingStyle,
                        fontSize: "14px",
                        background: "rgba(0, 0, 0, 0.3)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "8px",
                        padding: "10px 12px 10px 44px",
                      }}
                      className="w-full sm:w-64 focus:outline-none focus:border-[#10B981]/50 transition-all duration-200"
                    />
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                      style={{
                        ...subHeadingStyle,
                        fontSize: "14px",
                        background: "rgba(0, 0, 0, 0.3)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "8px",
                        padding: "10px 16px",
                      }}
                      className="flex items-center gap-2 hover:border-white/30 transition-all duration-200"
                    >
                      <span style={{ color: "#6B7280" }}>Sort By:</span>
                      <span>{sortBy}</span>
                      <svg
                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                          showSortDropdown ? "rotate-180" : ""
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

                    <AnimatePresence>
                      {showSortDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          style={{
                            ...glassCardStyle,
                            borderRadius: "12px",
                          }}
                          className="absolute right-0 mt-2 py-2 w-48 z-10"
                        >
                          {["Date", "Username", "Wagered", "Earnings"].map(
                            (option) => (
                              <button
                                key={option}
                                onClick={() => {
                                  setSortBy(option);
                                  setShowSortDropdown(false);
                                }}
                                style={subHeadingStyle}
                                className="block w-full px-4 py-2 text-left hover:bg-white/10 transition-all duration-200"
                              >
                                {option}
                              </button>
                            )
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Table Content */}
            <div className="p-16 text-center">
            {(!referrals || referrals.length === 0) ? (
  <>
    <p style={h2Style}>Share Referral for Earning</p>
    {/* <p
      style={{
        ...subHeadingStyle,
        fontSize: "14px",
        marginTop: "12px",
        color: "#6B7280",
      }}
    >
      Share your referral link to start earning commissions.
    </p> */}
  </>
) : (
  <div className="overflow-x-auto">
    <table className="min-w-full border-collapse border border-white/10">
      <thead>
        <tr className="bg-[#111827] text-gray-300 text-sm uppercase tracking-wider">
          <th className="px-4 py-3 text-left border-b border-white/10">#</th>
          <th className="px-4 py-3 text-left border-b border-white/10">Referee ID</th>
          <th className="px-4 py-3 text-left border-b border-white/10">Points Earned</th>
          <th className="px-4 py-3 text-left border-b border-white/10">Referred Date</th>
        </tr>
      </thead>
      <tbody>
        {referrals.map((ref, idx) => (
          <motion.tr
  key={idx}
  initial={{ opacity: 0, y: 5 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: idx * 0.05 }}
  className={`text-gray-200 hover:bg-white/5 ${idx % 2 === 0 ? "bg-black/30" : "bg-black/20"}`}
>

            <td className="px-4 py-3 border-b border-white/10">{idx + 1}</td>
            <td className="px-4 py-3 border-b border-white/10">
              {"Player_8ec0"}
              {/* {ref.referee?.id || ref.referee?._id || "N/A"} */}
            </td>
            <td className="px-4 py-3 border-b border-white/10 text-[#10B981] font-semibold">
              +{ref.pointsEarned}
            </td>
            <td className="px-4 py-3 border-b border-white/10 text-gray-400">
              {new Date(ref.referredAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </div>
)}

            </div>
          </div>
        </motion.div>
      </div>

      {/* Add custom styles */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default AffiliateProgram;

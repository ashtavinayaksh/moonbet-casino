// src/components/sections/GameBetsSection.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const GameBetsSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [bets, setBets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id || "68f90703350b2308ed5e5be9";

  useEffect(() => {
    loadBets();
  }, [activeTab]);

  const loadBets = async () => {
    setIsLoading(true);
    setShowAll(false);

    try {
      if (activeTab === "all") {
        // 🌍 Load global bets (unchanged)
        const res = await axios.get("/wallet-service/api/games/bets");
        if (res.data?.success && Array.isArray(res.data.data)) {
          setBets(res.data.data);
        } else {
          setBets([]);
        }
      } else if (activeTab === "my" && token) {
        // 👤 Load user-specific bets
        const res = await axios.get(
          `/wallet-service/api/games/bets/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data?.success && Array.isArray(res.data.data)) {
          // Transform server format → UI format
          const formatted = res.data.data.map((b) => ({
            game: b.game || "football",
            user: "You",
            betAmount: b.amount,
            multiplier: "-", // if not provided
            payout: b.payout,
            color: b.type === "win" || b.type === "refund" ? "green" : "red",
            time: new Date(b.createdAt).toLocaleString(),
          }));
          setBets(formatted);
        } else {
          setBets([]);
        }
      }
    } catch (err) {
      console.error("Error fetching bets:", err);
      setBets([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const displayedBets = showAll ? bets : bets.slice(0, 6);

  return (
    <section className="w-full py-12 sm:py-16 md:py-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="24"
                viewBox="0 0 30 24"
                fill="none"
              >
                <path
                  d="M27.5088 14.6025C27.5088 16.0687 26.3206 17.2577 24.8545 17.2578H23.8955V22.1289C23.8955 23.1044 23.106 23.8953 22.1299 23.8955H1.76562C0.790898 23.8953 0 23.102 0 22.1289V10.6162C0.000145517 9.64086 0.789657 8.85081 1.76562 8.85059H22.1299C23.1045 8.85079 23.8954 9.64322 23.8955 10.6162V15.4883H24.8545C25.3429 15.4882 25.7393 15.0912 25.7393 14.6025V7.44824C26.0023 7.49701 26.2736 7.52246 26.5508 7.52246C26.8797 7.52245 27.2003 7.48706 27.5088 7.41895V14.6025ZM3.98145 12.3906C3.24994 12.3907 2.65532 12.988 2.65527 13.7207V19.0244C2.65527 19.7577 3.24702 20.3555 3.98145 20.3555H6.63867C7.37021 20.3555 7.96484 19.7572 7.96484 19.0244V13.7207C7.9648 12.9875 7.37307 12.3906 6.63867 12.3906H3.98145ZM10.6191 12.3906C9.88764 12.3907 9.29302 12.988 9.29297 13.7207V19.0244C9.29297 19.7577 9.88471 20.3555 10.6191 20.3555H13.2764C14.0079 20.3555 14.6025 19.7572 14.6025 19.0244V13.7207C14.6025 12.9875 14.0108 12.3906 13.2764 12.3906H10.6191ZM17.2568 12.3906C16.5253 12.3907 15.9307 12.988 15.9307 13.7207V19.0244C15.9307 19.7577 16.5224 20.3555 17.2568 20.3555H19.9141C20.6456 20.3555 21.2402 19.7572 21.2402 19.0244V13.7207C21.2402 12.9875 20.6485 12.3906 19.9141 12.3906H17.2568ZM6.19531 18.585H4.4248V14.1602H6.19531V18.585ZM12.833 18.585H11.0625V14.1602H12.833V18.585ZM19.4707 18.585H17.7002V14.1602H19.4707V18.585ZM26.5508 0C28.2615 0.000116253 29.6484 1.38699 29.6484 3.09766C29.6484 4.80827 28.2614 6.1952 26.5508 6.19531C24.8401 6.19531 23.4532 4.8084 23.4531 3.09766C23.4531 1.38686 24.84 0 26.5508 0Z"
                  fill="#CED5E3"
                />
              </svg>
            </span>
            <h3
              className="text-[#CED5E3] font-[400] text-[18px] leading-[44px] 
             font-['Neuropolitical'] not-italic uppercase"
            >
              SLOTS
            </h3>
          </div>
          <p className="text-sm sm:text-base text-gray-400">
            Watch real-time bets from players around the world
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 sm:mb-6 border-b border-white/10 overflow-x-auto scrollbar-hide">
          <button
            className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold text-sm sm:text-base transition-all relative whitespace-nowrap ${
              activeTab === "all"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("all")}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              All Bets
            </span>
            {activeTab === "all" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F07730] to-[#EFD28E]"
              />
            )}
          </button>

          {/* 👇 Show "My Bets" only if logged in */}
          {token && (
            <button
              className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold text-sm sm:text-base transition-all relative whitespace-nowrap ${
                activeTab === "my"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => handleTabClick("my")}
            >
              My Bets
              {activeTab === "my" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F07730] to-[#EFD28E]"
                />
              )}
            </button>
          )}
        </div>

        {/* Bets Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 lg:gap-4 p-3 lg:p-4 border-b border-white/10 bg-black/3">
            {["Game", "User", "Bet Amount", "Multiplier", "Payout", "Time"].map(
              (h) => (
                <div
                  key={h}
                  className={`text-gray-400 text-xs lg:text-sm font-medium 
        ${
          ["User", "Bet Amount", "Multiplier", "Time"].includes(h)
            ? "hidden md:block"
            : ""
        }`}
                >
                  {h}
                </div>
              )
            )}
          </div>

          {/* Table Body */}
          {/* Table Body */}
<div className="divide-y divide-transparent">
  <AnimatePresence mode="popLayout">
    {isLoading ? (
      <div className="p-8 text-center text-gray-400">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#F07730]"></div>
      </div>
    ) : displayedBets.length === 0 ? (
      <div className="p-8 text-center text-gray-400">No bets to display</div>
    ) : (
      displayedBets.map((bet, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          style={{borderRadius: "8px"}}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`grid md:grid-cols-6 grid-cols-2 gap-2 lg:gap-4 p-3 lg:p-4 transition-all duration-300 
  ${index % 2 === 0
    ? "bg-gradient-to-b from-[#FFFFFF30] via-[#FFFFFF05] to-[#FFFFFF30]" // Custom gradient for the even index
    : "bg-gradient-to-r from-[#0A0A0A] via-[#161616] to-[#0A0A0A]"} // Custom gradient for the odd index
  hover:bg-[#222]/50 
  border-radius: 8px; 
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);`}

        >
          <div className="text-white text-xs lg:text-sm font-medium">{bet.game}</div>
          <div className="hidden md:block text-gray-300 text-xs lg:text-sm truncate">{bet.user}</div>
          <div className="hidden md:block text-white text-xs lg:text-sm">{bet.betAmount}</div>
          <div className="hidden md:block text-gray-400 text-xs lg:text-sm">{bet.multiplier}</div>
          <div
            className={`text-xs lg:text-sm font-semibold ${
              bet.color === "green" ? "text-green-400" : "text-red-400"
            }`}
          >
            {bet.payout}
          </div>
          <div className="hidden md:block text-gray-500 text-xs lg:text-sm">{bet.time}</div>
        </motion.div>
      ))
    )}
  </AnimatePresence>
</div>

        </motion.div>

        {/* View More / Show Less Button */}
        {bets.length > 10 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center mt-6 sm:mt-8"
          >
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base border border-white/20 rounded-full text-white font-semibold hover:bg-white/10 transition-colors"
            >
              {showAll ? "Show Less Bets" : "View More Bets"}
            </button>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default GameBetsSection;

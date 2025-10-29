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
          <h2 className="text-2xl sm:text-3xl md:text-2xl font-bold text-white mb-2">
            Live Casino Bets
          </h2>
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
          <div className="hidden md:grid grid-cols-6 gap-2 lg:gap-4 p-3 lg:p-4 border-b border-white/10 bg-black/30">
            {["Game", "User", "Bet Amount", "Multiplier", "Payout", "Time"].map(
              (h) => (
                <div
                  key={h}
                  className="text-gray-400 text-xs lg:text-sm font-medium"
                >
                  {h}
                </div>
              )
            )}
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/5">
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                <div className="p-8 text-center text-gray-400">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#F07730]"></div>
                </div>
              ) : displayedBets.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  No bets to display
                </div>
              ) : (
                displayedBets.map((bet, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="grid md:grid-cols-6 grid-cols-2 gap-2 lg:gap-4 p-3 lg:p-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="text-white text-xs lg:text-sm">{bet.game}</div>
                    <div className="text-gray-300 text-xs lg:text-sm truncate">{bet.user}</div>
                    <div className="text-white text-xs lg:text-sm">{bet.betAmount}</div>
                    <div className="text-cyan-400 text-xs lg:text-sm">{bet.multiplier}</div>
                    <div
                      className={`text-xs lg:text-sm ${
                        bet.color === "green" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {bet.payout}
                    </div>
                    <div className="text-gray-500 text-xs lg:text-sm">{bet.time}</div>
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

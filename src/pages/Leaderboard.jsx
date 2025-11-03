import React, { useState } from "react";
import { motion } from "framer-motion";

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [currentPage, setCurrentPage] = useState(1);

  // Tab options
  const tabs = [
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "alltime", label: "All Time" },
  ];

  // Top 3 winners data
  const topWinners = [
    {
      rank: 2,
      name: "Jolie Joie",
      points: "50,000",
      prize: "Prize",
      avatar: "/avatars/avatar2.jpg", // Replace with actual avatar
      icon: "🦊",
      earned: "2,000 points",
      position: "left",
    },
    {
      rank: 1,
      name: "Jolie Joie",
      points: "100,000",
      prize: "Prize",
      avatar: "/avatars/avatar1.jpg",
      icon: "🦆",
      earned: "5,000 points",
      endsIn: "IGd 12h 10m 20s",
      position: "center",
      isWinner: true,
    },
    {
      rank: 3,
      name: "Jolie Joie",
      points: "100,000",
      prize: "Prize",
      avatar: "/avatars/avatar3.jpg",
      icon: "🦢",
      earned: "2,000 points",
      position: "right",
    },
  ];

  // Leaderboard data
  const leaderboardData = [
    {
      rank: 4,
      username: "Henrietta.O'Connell",
      points: 1000,
      avatar: "/avatars/avatar4.jpg",
    },
    {
      rank: 5,
      username: "Henrietta.O'Connell",
      points: 1000,
      avatar: "/avatars/avatar5.jpg",
    },
    {
      rank: 6,
      username: "Henrietta.O'Connell",
      points: 1000,
      avatar: "/avatars/avatar6.jpg",
    },
    {
      rank: 7,
      username: "Henrietta.O'Connell",
      points: 1000,
      avatar: "/avatars/avatar7.jpg",
    },
    {
      rank: 8,
      username: "Henrietta.O'Connell",
      points: 1000,
      avatar: "/avatars/avatar8.jpg",
    },
    {
      rank: 9,
      username: "Henrietta.O'Connell",
      points: 1000,
      avatar: "/avatars/avatar9.jpg",
    },
    {
      rank: 10,
      username: "Henrietta.O'Connell",
      points: 1000,
      avatar: "/avatars/avatar10.jpg",
    },
  ];

  const totalPages = 11;

  // Podium card component
  const PodiumCard = ({ winner, index }) => {
    const heightMap = {
      left: "h-[280px]",
      center: "h-[320px]",
      right: "h-[280px]",
    };

    const delayMap = {
      left: 0.2,
      center: 0,
      right: 0.4,
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delayMap[winner.position] }}
        className={`relative ${winner.position === "center" ? "z-20" : "z-10"}`}
      >
        {/* Crown for winner */}
        {winner.isWinner && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2"
          >
            <span className="text-4xl">👑</span>
          </motion.div>
        )}

        {/* Avatar Container */}
        <div className="flex justify-center mb-4">
          <div
            className="relative w-24 h-24 rounded-full p-1"
            style={{
              background: winner.isWinner
                ? "linear-gradient(90deg, #F07730 0%, #EFD28E 100%)"
                : "linear-gradient(90deg, #7F0577 0%, #F474FB 100%)",
            }}
          >
            <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden">
              <img
                src={winner.avatar}
                alt={winner.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${winner.name}&background=random`;
                }}
              />
            </div>
            {/* Rank Badge */}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
              style={{
                background:
                  winner.rank === 1
                    ? "linear-gradient(90deg, #F07730 0%, #EFD28E 100%)"
                    : winner.rank === 2
                    ? "linear-gradient(90deg, #C0C0C0 0%, #808080 100%)"
                    : "linear-gradient(90deg, #CD7F32 0%, #8B4513 100%)",
              }}
            >
              {winner.rank}
            </div>
          </div>
        </div>

        {/* Podium */}
        <div
          className={`relative ${
            heightMap[winner.position]
          } rounded-t-2xl overflow-hidden`}
          style={{
            background: "linear-gradient(180deg, #11324F 0%, #000 82.23%)",
            border: "1px solid rgba(255, 255, 255, 0.07)",
          }}
        >
          {/* Glass overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(157deg, rgba(255, 255, 255, 0.40) 2.12%, rgba(255, 255, 255, 0.00) 39%, rgba(255, 255, 255, 0.00) 54.33%, rgba(255, 255, 255, 0.10) 93.02%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 p-6 text-center text-white">
            <h3 className="text-2xl font-['Neue_Plak'] mb-2">{winner.name}</h3>

            {/* Icon */}
            <div className="text-3xl mb-3">{winner.icon}</div>

            {/* Earned Points */}
            <p className="text-sm text-gray-400 mb-3">Earn {winner.earned}</p>

            {/* Points */}
            <div className="mb-3">
              <span className="text-3xl font-['Neue_Plak'] font-bold">
                💎 {winner.points}
              </span>
            </div>

            {/* Prize Label */}
            <p className="text-sm text-gray-400">{winner.prize}</p>

            {/* Trophy Icon */}
            <div className="mt-4">
              <span className="text-2xl">🏆</span>
            </div>

            {/* Ends In (for winner) */}
            {winner.endsIn && (
              <div className="mt-4 text-xs text-gray-400">
                <p>Ends in</p>
                <p className="text-white">{winner.endsIn}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Starfield effect */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Purple glow orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container max-w-7xl mx-auto px-4 py-8">
        {/* Header Tabs */}
        <div className="flex justify-center mb-12">
          <div
            className="inline-flex gap-2 p-1 rounded-full"
            style={{
              background:
                "linear-gradient(0deg, rgba(30, 30, 30, 0.15) 0%, rgba(75, 75, 75, 0.15) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.40)",
              backdropFilter: "blur(10px)",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
          {topWinners.map((winner, index) => (
            <PodiumCard key={winner.rank} winner={winner} index={index} />
          ))}
        </div>

        {/* Ranking Info */}
        <div className="text-center mb-8">
          <p className="text-gray-400">
            You earned <span className="text-[#F07730]">💜 5</span> today and we
            ranked - out of <span className="text-white">23148 users</span>
          </p>
        </div>

        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(0deg, rgba(30, 30, 30, 0.15) 0%, rgba(75, 75, 75, 0.15) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.40)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Table Header */}
          <div className="grid grid-cols-3 px-6 py-4 border-b border-white/10">
            <div className="text-gray-400 text-sm">Rank</div>
            <div className="text-gray-400 text-sm">User name</div>
            <div className="text-gray-400 text-sm text-right">Points</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/5">
            {leaderboardData.map((user, index) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                className="grid grid-cols-3 px-6 py-4 hover:bg-white/5 transition-colors items-center"
              >
                <div className="text-white font-medium">{user.rank}</div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${user.username}&background=random`;
                      }}
                    />
                  </div>
                  <span className="text-white">{user.username}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#F474FB] font-medium">
                    💜 {user.points}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg font-medium transition-all ${
                currentPage === page
                  ? "bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-black"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {page}
            </button>
          ))}

          <span className="text-gray-400">...</span>

          {[10, 11].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className="w-10 h-10 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 font-medium transition-all"
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

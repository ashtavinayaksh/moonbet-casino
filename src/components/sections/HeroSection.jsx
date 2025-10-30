// src/components/sections/HeroSection.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  // Recent wins data with game cards
  const initialWinsData = [
    {
      id: 1,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
    },
    {
      id: 2,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
    },
    {
      id: 3,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
    },
    {
      id: 4,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
    },
    {
      id: 5,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
    },
    {
      id: 6,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
    },
    {
      id: 7,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
    },
    {
      id: 8,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
    },
    {
      id: 9,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
    },
    {
      id: 10,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
    },
    {
      id: 11,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
    },
    {
      id: 12,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
    },
    {
      id: 13,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
    },
    {
      id: 14,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
    },
    {
      id: 15,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
    },
    {
      id: 16,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
    },
    {
      id: 17,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
    },
    {
      id: 18,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
    },
  ];

  const [recentWinsData, setRecentWinsData] = useState(initialWinsData);
  const [isPaused, setIsPaused] = useState(false);

  // Generate new winner data
  const generateNewWinner = () => {
    const randomAmount = (Math.random() * 10 + 0.1).toFixed(2);
    const randomUsername = `${Math.random()
      .toString(36)
      .substring(2, 4)}...${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;

    return {
      id: Date.now(),
      gameImage: "/games/golden.svg",
      amount: `$${randomAmount}`,
      username: randomUsername,
      icon: "/icons/moon.svg",
    };
  };

  // Auto update winners with push/pop animation
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setRecentWinsData((prevData) => {
        const newWinner = generateNewWinner();
        const newData = [newWinner, ...prevData.slice(0, -1)];
        return newData;
      });
    }, 6000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  // Mobile data (first 7)
  const mobileWinsData = recentWinsData.slice(0, 7);

  // Animation variants for cards
  const cardVariants = {
    enter: {
      x: -100,
      opacity: 0,
      scale: 0.8,
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: {
      x: 100,
      opacity: 0,
      scale: 0.8,
    },
  };

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Recent Wins Section - Dark background strip */}
      <div
        className="absolute top-0 left-0 right-0 z-20"
        style={{
          background:
            "linear-gradient(0deg, rgb(30 30 30 / 55%) 0%, rgb(75 75 75 / 35%) 100%)",
        }}
      >
        <div className="relative px-2 sm:px-3 md:px-4 py-2 sm:py-3">
          {/* Recent Wins Label positioned above cards */}
          <motion.div
            className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="flex items-center gap-2 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-md whitespace-nowrap"
              style={{
                background: "linear-gradient(90deg, #7F0577 0%, #F474FB 100%)",
                border: "1.5px solid #222223",
                zIndex: 1,
                borderRadius: "8px",
              }}
            >
              <motion.span
                className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5"
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span
                  className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-white"
                  style={{
                    opacity: 0.8,
                    boxShadow: "0 0 8px 0 #FFF",
                  }}
                ></span>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50"></span>
              </motion.span>
              Recent Wins
            </span>
          </motion.div>

          {/* Cards Container */}
          <div
            className="overflow-hidden translate-y-[-30%]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Mobile View - Show 7 cards */}
            <div className="sm:hidden flex gap-1.5">
              <AnimatePresence mode="popLayout">
                {mobileWinsData.map((win, index) => (
                  <motion.div
                    key={win.id}
                    layout
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={cardVariants}
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="flex flex-col items-center cursor-pointer flex-shrink-0"
                  >
                    {/* Game Card */}
                    <div className="relative">
                      <motion.div
                        className="relative w-[50px] h-[60px] xs:w-[60px] xs:h-[70px] rounded-lg overflow-hidden"
                        style={{
                          backdropFilter: "blur(10px)",
                        }}
                        whileHover={{
                          boxShadow: "0 8px 16px rgba(147, 51, 234, 0.3)",
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={win.gameImage}
                            alt="Game"
                            className="w-8 h-8 xs:w-10 xs:h-10 object-contain"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Win Amount */}
                    <motion.div className="mt-0.5">
                      <span className="text-white text-[10px] xs:text-[11px] font-semibold">
                        {win.amount}
                      </span>
                    </motion.div>

                    {/* Username with Icon */}
                    <motion.div className="flex items-center gap-1">
                      <img src={win.icon} alt="icon" className="w-3 h-3" />
                      <span className="text-gray-400 text-[8px] xs:text-[9px]">
                        {win.username}
                      </span>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Desktop View - Show all cards */}
            <div className="hidden sm:flex gap-1.5 md:gap-2">
              <AnimatePresence mode="popLayout">
                {recentWinsData.map((win, index) => (
                  <motion.div
                    key={win.id}
                    layout
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={cardVariants}
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="flex flex-col items-center cursor-pointer flex-shrink-0"
                  >
                    {/* Game Card */}
                    <div className="relative">
                      <motion.div className="relative w-[60px] h-[70px] md:w-[70px] md:h-[80px] lg:w-[75px] lg:h-[85px] rounded-lg overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={win.gameImage}
                            alt="Game"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Win Amount */}
                    <motion.div className="mt-1">
                      <span className="text-[#D3D3D3] text-[11px] md:text-xs font-semibold">
                        {win.amount}
                      </span>
                    </motion.div>

                    {/* Username with Icon */}
                    <motion.div className="flex items-center gap-1">
                      <img
                        src={win.icon}
                        alt="icon"
                        className="w-3 h-3 md:w-4 md:h-4"
                      />
                      <span className="text-gray-400 text-[9px] md:text-[10px]">
                        {win.username}
                      </span>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Content - Main Banner */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center pt-24 sm:pt-28 md:pt-32">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/home-assets/home-banner.png')" }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Foreground content */}
        <div className="relative container mx-auto px-4 z-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Add your hero content here */}
          </motion.div>
        </div>
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

// src/components/sections/HeroSection.jsx
import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const HeroSection = () => {
  const scrollRef = useRef(null);
  const controls = useAnimation();

  // Recent wins data with game cards
  const recentWinsData = [
    {
      id: 1,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
    },
    {
      id: 2,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
    },
    {
      id: 3,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
    },
    {
      id: 4,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
    },
    {
      id: 5,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
    },
    {
      id: 6,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
    },
    {
      id: 7,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
    },
    {
      id: 8,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
    },
    {
      id: 9,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
    },
    {
      id: 10,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
    },
    {
      id: 11,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
    },
    {
      id: 12,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
    },
    {
      id: 13,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
    },
    {
      id: 14,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
    },
    {
      id: 15,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
    },
    {
      id: 16,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
    },
    {
      id: 17,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
    },
    {
      id: 18,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
    },
  ];

  // Duplicate data for seamless loop
  const duplicatedData = [...recentWinsData, ...recentWinsData];
  const mobileWinsData = recentWinsData.slice(0, 7);
  const duplicatedMobileData = [...mobileWinsData, ...mobileWinsData];

  // Auto-scroll animation
  useEffect(() => {
    const animateScroll = async () => {
      await controls.start({
        x: [0, -1920], // Adjust based on total width
        transition: {
          x: {
            duration: 40,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          },
        },
      });
    };
    animateScroll();
  }, [controls]);

  // Pause on hover
  const handleMouseEnter = () => {
    controls.stop();
  };

  const handleMouseLeave = () => {
    controls.start({
      x: [null, -1920],
      transition: {
        x: {
          duration: 40,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        },
      },
    });
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

          {/* Cards Container - Scrollable */}
          <div
            className="overflow-x-hidden translate-y-[-33%]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Mobile View - Show 7 cards with auto-scroll */}
            <motion.div
              className="sm:hidden flex gap-1.5"
              animate={controls}
              initial={{ x: 0 }}
            >
              {duplicatedMobileData.map((win, index) => (
                <motion.div
                  key={`mobile-${index}`}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: (index % 7) * 0.05,
                    type: "spring",
                    stiffness: 100,
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

                  {/* Username */}
                  <motion.div>
                    <span className="text-gray-400 text-[8px] xs:text-[9px]">
                      {win.username}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Desktop View - Show all cards with auto-scroll */}
            <motion.div
              className="hidden sm:flex gap-1.5 md:gap-2"
              animate={controls}
              initial={{ x: 0 }}
            >
              {duplicatedData.map((win, index) => (
                <motion.div
                  key={`desktop-${index}`}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: (index % 18) * 0.03,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="flex flex-col items-center cursor-pointer"
                >
                  {/* Game Card */}
                  <div className="relative">
                    <motion.div className="relative w-[60px] h-[70px] md:w-[70px] md:h-[80px] lg:w-[75px] lg:h-[85px] rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={win.gameImage}
                          alt="Game"
                          className="md:w-120 md:h-170 object-contain"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Win Amount */}
                  <motion.div className="amount-space">
                    <span className="text-white text-[11px] md:text-xs font-semibold">
                      {win.amount}
                    </span>
                  </motion.div>

                  {/* Username */}
                  <motion.div>
                    <span className="text-gray-400 text-[9px] md:text-[10px]">
                      {win.username}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
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

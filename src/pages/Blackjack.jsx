import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const Blackjack = () => {
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [balance, setBalance] = useState(1000);
  const [betAmount, setBetAmount] = useState(90);
  const [betPlaced, setBetPlaced] = useState(false);
  const [deckShuffle, setDeckShuffle] = useState(0);
  const balanceControls = useAnimation();

  const cardFlipRef = useRef(null);
  const chipClickRef = useRef(null);

  const playSound = (ref) => {
    if (!ref.current) return;
    try {
      ref.current.currentTime = 0;
      ref.current.play();
    } catch (_) {}
  };

  const animateBalance = async (newBalance) => {
    await balanceControls.start({
      scale: [1, 1.15, 1],
      transition: { duration: 0.4, ease: "easeInOut" },
    });
    setBalance(newBalance);
  };

  const handleBetNow = async () => {
    if (betPlaced || betAmount <= 0 || balance < betAmount) return;

    setBetPlaced(true);
    playSound(chipClickRef);
    animateBalance(balance - betAmount);

    setPlayerCards([]);
    setDealerCards([]);
    setDeckShuffle((s) => s + 1);

    // Deal sequence
    setTimeout(() => {
      playSound(cardFlipRef);
      setDealerCards([{ rank: "A", suit: "♥" }]);
    }, 350);

    setTimeout(() => {
      playSound(cardFlipRef);
      setDealerCards((prev) => [...prev, { back: true }]);
    }, 700);

    setTimeout(() => {
      playSound(cardFlipRef);
      setPlayerCards([{ dim: true }]);
    }, 1050);

    setTimeout(() => {
      playSound(cardFlipRef);
      setPlayerCards((prev) => [...prev, { rank: "A", suit: "♥" }]);
    }, 1400);

    setTimeout(() => {
      playSound(cardFlipRef);
      setPlayerCards((prev) => [...prev, { rank: "K", suit: "♠" }]);
    }, 1750);

    setTimeout(() => setBetPlaced(false), 2600);
  };

  const cardFlight = {
    initial: { x: 220, y: -80, scale: 0.6, rotate: 10, opacity: 0 },
    animate: (i) => ({
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: { duration: 0.45, delay: i * 0.16, ease: "easeOut" },
    }),
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-start items-center text-white font-sans overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="https://res.cloudinary.com/dyp5px1nj/video/upload/v1759992388/blackjack-video_cterrc.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1.5px]" />

      {/* Sounds */}
      <audio ref={cardFlipRef} src="/sounds/card-flip.mp3" preload="auto" />
      <audio ref={chipClickRef} src="/sounds/chip-click.mp3" preload="auto" />

      {/* ==================== TABLE ==================== */}
      <div className="relative w-full max-w-[1366px] h-[500px] sm:h-[501px] rounded-[24px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col p-4 md:p-6 bg-transparent mt-5">
        {/* Header */}
        <div className="flex items-center gap-2 text-[#d5dde8] mb-2 relative z-10 text-sm sm:text-base">
          <span className="text-lg sm:text-xl">🂡</span>
          <span className="font-semibold">Blackjack</span>
        </div>

        {/* Decorative center orbit */}
        <img
          src="/games/full-circle.svg"
          alt="Table Orbit"
          className="absolute top-1/2 left-1/2 w-[95%] sm:w-[78%] md:w-[70%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-80"
        />

        {/* Deck */}
        <motion.div
          key={deckShuffle}
          className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 w-[60px] sm:w-[78px] h-[90px] sm:h-[110px] z-10"
          initial={{ rotateY: 180, opacity: 0 }}
          animate={{
            rotateY: 0,
            opacity: 1,
            y: [0, -6, 0],
            rotateZ: [0, -4, 4, 0],
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-[12px] bg-gradient-to-br from-[#dcdcdc] to-[#f6f6f6] border border-white/40 shadow-[0_10px_20px_rgba(0,0,0,0.45)]"
              style={{ top: i * 3 }}
            />
          ))}
          <div className="absolute inset-0 rounded-[12px] bg-[conic-gradient(from_210deg,#fefefe,#f5dfff,#b2e3ff,#fefefe)] border-2 border-white shadow-[0_14px_26px_rgba(0,0,0,0.55)]" />
        </motion.div>

        {/* Table Content */}
        <div className="relative flex-1 flex flex-col items-center justify-center">
          {/* Dealer Cards */}
          <div className="absolute top-[22%] md:top-[-16%] left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="flex gap-2 sm:gap-3">
              <AnimatePresence>
                {dealerCards.map((card, i) => (
                  <motion.img
                    key={i}
                    src={
                      card.back
                        ? "/games/back_card.svg"
                        : card.rank === "A" && card.suit === "♥"
                        ? "/games/A_heart_card.svg"
                        : card.rank === "K"
                        ? "/games/king_card.svg"
                        : "/games/faded_card.svg"
                    }
                    alt="Dealer Card"
                    className="w-[60px] sm:w-[78px] h-[86px] sm:h-[112px] rounded-[12px] sm:rounded-[14px] shadow-[0_12px_26px_rgba(0,0,0,0.55)]"
                    variants={cardFlight}
                    initial="initial"
                    animate="animate"
                    custom={i}
                  />
                ))}
              </AnimatePresence>
            </div>
            {dealerCards.length > 0 && (
              <motion.div
                className="mt-2 bg-[#214a3a] text-[#baf6d3] text-[10px] sm:text-xs font-semibold rounded-full px-2 sm:px-3 py-0.5 sm:py-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                09
              </motion.div>
            )}
          </div>

          {/* Logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[28px] sm:text-[32px] font-extrabold tracking-[0.28em] text-white/20">
            <img src="/icons/logo.svg" alt="Moonbet" className="mx-auto" />
          </div>

          {/* Player Cards */}
          <div className="absolute bottom-[22%]  md:bottom-[-9%] left-1/2 -translate-x-1/2 flex flex-col items-center">
            {playerCards.length > 0 && (
              <div className="flex gap-2 mb-1 sm:mb-2">
                <span className="bg-[#22262f] text-[#d1d5e5] text-[10px] sm:text-xs font-semibold rounded-full px-2 sm:px-3 py-0.5 sm:py-1">
                  16
                </span>
              </div>
            )}
            <div className="flex gap-2 sm:gap-3">
              <AnimatePresence>
                {playerCards.map((card, i) => (
                  <motion.img
                    key={i}
                    src={
                      card.back
                        ? "/games/back_card.svg"
                        : card.dim
                        ? "/games/faded_card.svg"
                        : card.rank === "A" && card.suit === "♥"
                        ? "/games/A_heart_card.svg"
                        : card.rank === "K"
                        ? "/games/king_card.svg"
                        : "/games/faded_card.svg"
                    }
                    alt="Player Card"
                    className="w-[60px] sm:w-[78px] h-[86px] sm:h-[112px] rounded-[12px] sm:rounded-[14px] shadow-[0_12px_26px_rgba(0,0,0,0.55)]"
                    variants={cardFlight}
                    initial="initial"
                    animate="animate"
                    custom={i}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== CONTROLS ==================== */}
      <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center space-y-4 w-full max-w-[900px] z-10 px-2">
        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          <button className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-[8px] border border-[#F07730] bg-[rgba(30,30,30,0.15)] text-[#baf6d3] text-xs sm:text-sm font-medium w-[110px] sm:w-[124px] h-[36px] sm:h-[38px] justify-center">
            Double
          </button>
          <button className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-[8px] border border-white/10 bg-black/40 text-[#d2d8e8] text-xs sm:text-sm hover:bg-white/10 w-[110px] sm:w-[124px] h-[36px] sm:h-[38px] justify-center">
            Stand
          </button>
          <button className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-[8px] border border-white/10 bg-black/40 text-[#d2d8e8] text-xs sm:text-sm hover:bg-white/10 w-[110px] sm:w-[124px] h-[36px] sm:h-[38px] justify-center">
            Hit
          </button>
          <button className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-[8px] border border-white/10 bg-black/40 text-[#d2d8e8] text-xs sm:text-sm hover:bg-white/10 w-[110px] sm:w-[124px] h-[36px] sm:h-[38px] justify-center">
            Split
          </button>
        </div>

        {/* Chips + Bet Controls */}
        <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-3 sm:gap-4">
          {/* Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              className="w-8 sm:w-9 h-8 sm:h-9 flex items-center justify-center rounded-full border-2 border-black/60 bg-[radial-gradient(circle,#3b3f4a_0,#161922_70%)] text-white/90 text-sm"
              onClick={() => playSound(chipClickRef)}
            >
              ⟳
            </button>

            {[1, 5, 25, 100, 500].map((value) => (
              <motion.button
                key={value}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center rounded-full ${
                  betAmount === value ? "ring-2 ring-white" : ""
                }`}
                onClick={() => {
                  playSound(chipClickRef);
                  setBetAmount(value);
                }}
              >
                <img
                  src={`/chips/chip-${value}.svg`}
                  alt={`Chip ${value}`}
                  className="w-full h-full object-contain pointer-events-none"
                />
                <span className="absolute text-[10px] sm:text-[11px] font-bold text-white">
                  {value}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Bet Controls */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 rounded-[10px] border border-[rgba(255,255,255,0.2)] bg-[linear-gradient(0deg,rgba(30,30,30,0.15)_0%,rgba(75,75,75,0.15)_100%)] px-2 sm:px-3 py-2 backdrop-blur-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-md border border-[rgba(255,255,255,0.1)] text-white/90">
              <img src="/chips/icon.svg" className="w-4 sm:w-5" alt="∞" />
              <span className="text-xs sm:text-sm font-semibold text-white">
                ${betAmount}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setBetAmount((v) => Math.max(1, Math.floor(v / 2)))
                }
                className="w-10 sm:w-12 h-8 flex items-center justify-center rounded-md border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] text-white/80 text-xs font-medium hover:bg-[rgba(255,255,255,0.1)]"
              >
                1/2
              </button>
              <button
                onClick={() => setBetAmount((v) => v * 2)}
                className="w-10 sm:w-12 h-8 flex items-center justify-center rounded-md border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] text-white/80 text-xs font-medium hover:bg-[rgba(255,255,255,0.1)]"
              >
                2x
              </button>
              <button
                onClick={() => setBetAmount(balance)}
                className="w-10 sm:w-12 h-8 flex items-center justify-center rounded-md border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] text-white/80 text-xs font-medium hover:bg-[rgba(255,255,255,0.1)]"
              >
                Max
              </button>
            </div>
          </div>
        </div>

        {/* Bet Now */}
        <div className="flex items-center justify-center w-full max-w-sm mt-4">
          <motion.button
            whileHover={{ scale: betPlaced ? 1 : 1.03 }}
            whileTap={{ scale: betPlaced ? 1 : 0.97 }}
            disabled={betPlaced}
            onClick={handleBetNow}
            className={`px-8 sm:px-10 py-2.5 sm:py-3 rounded-full font-bold text-[#111] text-[14px] sm:text-[15px] ${
              betPlaced
                ? "bg-gradient-to-r from-[#999] to-[#555] cursor-not-allowed"
                : "bg-gradient-to-r from-[#f07730] to-[#efd28e]"
            } shadow-[0_14px_32px_rgba(0,0,0,0.7)]`}
          >
            {betPlaced ? "Dealing..." : "BET NOW"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Blackjack;

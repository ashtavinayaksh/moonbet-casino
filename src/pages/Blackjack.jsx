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

  const renderCard = (card, index) => {
    const isRed = card.suit === "♥" || card.suit === "♦";
    let baseColor = "bg-white text-black";
    if (card.back)
      baseColor =
        "bg-[conic-gradient(from_210deg,#fefefe,#f5dfff,#b2e3ff,#fefefe)] border-2 border-white";
    if (card.dim) baseColor = "bg-[#e0e3eb] text-[#888f9f]";
    if (!card.back && !card.dim && isRed) baseColor = "bg-white text-[#e05959]";
    if (!card.back && !card.dim && !isRed)
      baseColor = "bg-white text-[#22252c]";

    return (
      <motion.div
        key={index}
        custom={index}
        variants={cardFlight}
        initial="initial"
        animate="animate"
        className={`relative w-[78px] h-[112px] rounded-[14px] shadow-[0_12px_26px_rgba(0,0,0,0.55)] flex flex-col items-center justify-center ${baseColor}`}
      >
        {!card.back && (
          <>
            <span className="absolute top-2 left-3 text-[16px] font-bold">
              {card.rank}
              {card.suit}
            </span>
            <span className="text-[34px]">{card.suit}</span>
          </>
        )}
      </motion.div>
    );
  };

  const chipOptions = [
    { value: 1, color: "bg-[radial-gradient(circle,#d1d5de_0,#838a99_70%)]" },
    { value: 5, color: "bg-[radial-gradient(circle,#90c3ff_0,#2764c5_70%)]" },
    { value: 25, color: "bg-[radial-gradient(circle,#b7f6c0_0,#2f8d45_70%)]" },
    { value: 100, color: "bg-[radial-gradient(circle,#ffd6a0_0,#d46a1f_70%)]" },
    { value: 500, color: "bg-[radial-gradient(circle,#ffc0c0_0,#bb2b2b_70%)]" },
  ];

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
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1.5px] " />

      {/* Sounds */}
      <audio ref={cardFlipRef} src="/sounds/card-flip.mp3" preload="auto" />
      <audio ref={chipClickRef} src="/sounds/chip-click.mp3" preload="auto" />

      {/* ==================== TABLE ==================== */}
      <div
        className="relative w-[1366px] h-[501px] rounded-[24px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden p-5 md:p-6 bg-transparent mt-5"
        style={{ maxWidth: "90vw" }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 text-[#d5dde8] mb-2 relative z-10">
          <span className="text-xl">🂡</span>
          <span className="font-semibold">Blackjack</span>
        </div>

        {/* Decorative center orbit */}
        <img
          src="/games/full-circle.svg"
          alt="Table Orbit"
          className="absolute top-1/2 left-1/2 w-[78%] md:w-[70%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-80 z-0"
        />

        {/* Deck */}
        <motion.div
          key={deckShuffle}
          className="absolute right-10 top-1/2 -translate-y-1/2 w-[78px] h-[110px] z-10"
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
        <div className="relative flex-1 flex flex-col items-center justify-center z-10">
          {/* Dealer */}
          <div className="flex flex-col items-center mb-4">
            <div className="flex gap-2">
              <AnimatePresence>
                {dealerCards.map((c, i) => renderCard(c, i))}
              </AnimatePresence>
            </div>
            {dealerCards.length > 0 && (
              <motion.div
                className="mt-2 bg-[#214a3a] text-[#baf6d3] text-xs font-semibold rounded-full px-3 py-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                09
              </motion.div>
            )}
          </div>

          {/* Logo */}
          <div className="text-[32px] font-extrabold tracking-[0.28em] text-white/20 mb-2">
            <img src="/icons/logo.svg" alt="Moonbet" className="mx-auto" />
          </div>

          {/* Player */}
          <div className="flex flex-col items-center mt-1">
            {playerCards.length > 0 && (
              <div className="flex gap-2 mb-2">
                <span className="bg-[#22262f] text-[#d1d5e5] text-xs font-semibold rounded-full px-3 py-1">
                  16
                </span>
              </div>
            )}
            <div className="flex gap-2">
              <AnimatePresence>
                {playerCards.map((c, i) => renderCard(c, i))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== CONTROLS ==================== */}
      <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center space-y-4 w-full max-w-[900px] z-10">
        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-3">
          <button className="bj-action-btn flex items-center gap-2 px-4 py-2 rounded-full border border-green-600/70 bg-green-900/20 text-[#baf6d3] text-sm font-medium">
            <span className="text-black text-xs px-2 py-0.5 rounded-full font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="15"
                viewBox="0 0 21 15"
                fill="none"
              >
                <path
                  d="M12.8351 14.7002C12.1915 14.7002 11.6154 14.3014 11.3879 13.6992C11.1606 13.0972 11.329 12.4177 11.8117 11.9922C11.8275 11.9783 13.4328 10.5581 15.007 8.85352C17.8398 5.78611 17.8732 4.75431 17.8732 4.71191C17.873 3.83555 17.1146 3.09511 16.218 3.09473C15.3279 3.09533 14.5463 3.85083 14.5461 4.71191C14.5461 5.56649 13.8529 6.25977 12.9982 6.25977C10.401 6.03714 11.5652 2.52471 12.8781 1.36914C13.7834 0.486495 14.9697 0.000641823 16.218 0C17.4688 0.000541687 18.654 0.488424 19.5549 1.37402C21.9671 4.10338 21.4073 6.46798 17.2639 10.9727C17.0635 11.1892 16.8631 11.4007 16.6662 11.6055H19.4201C21.4695 11.6808 21.471 14.624 19.4201 14.7002H12.8351ZM2.76971 14.1016C2.24273 14.7801 1.26734 14.8964 0.597839 14.375C-0.0768166 13.8508 -0.19866 12.8789 0.325378 12.2041L2.6828 9.16797L0.325378 6.13281C-0.198776 5.45805 -0.0765991 4.48619 0.597839 3.96191C1.27299 3.4378 2.24552 3.55946 2.76971 4.23438L4.64178 6.64551L6.51483 4.23438C7.03903 3.55931 8.01179 3.43772 8.68671 3.96191C9.36114 4.48619 9.48332 5.45805 8.95917 6.13281L6.60175 9.16797L8.95917 12.2041C9.48312 12.8789 9.36128 13.8508 8.68671 14.375C8.01713 14.8963 7.04181 14.7801 6.51483 14.1016L4.64178 11.6904L2.76971 14.1016Z"
                  fill="url(#paint0_linear_93_19429)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_93_19429"
                    x1="10.4922"
                    y1="0"
                    x2="10.4922"
                    y2="14.7002"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#94FBAB" />
                    <stop offset="1" stop-color="#05B79C" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            Double
          </button>
          <button className="bj-action-btn flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 text-[#d2d8e8] text-sm hover:bg-white/10">
            <span className="text-black text-xs px-2 py-0.5 rounded-full font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="22"
                viewBox="0 0 18 22"
                fill="none"
              >
                <path
                  d="M10.5934 21.834C8.76569 21.8338 7.06727 20.9269 6.05438 19.4062L5.99579 19.3232C5.70132 18.8816 5.3998 18.4266 5.06219 17.9951L0.185242 11.7373C-0.0610275 11.4225 -0.0614166 10.9828 0.182312 10.668C0.426003 10.3507 0.778952 10.1557 1.17743 10.1201C1.57602 10.082 1.95989 10.209 2.25946 10.4756L4.93036 12.8672C5.08005 12.9988 5.29274 13.0312 5.47528 12.9502C5.65797 12.869 5.77787 12.6867 5.77802 12.4863V3.38672C5.77816 2.75478 6.2906 2.2394 6.92255 2.23926C7.55715 2.23926 8.06986 2.75469 8.07001 3.38672V9.96484C8.07001 10.244 8.29867 10.4725 8.57782 10.4727C8.85962 10.4727 9.08563 10.2441 9.08563 9.96484V1.14746C9.08581 0.515549 9.60117 0.000148773 10.2331 0C10.8652 0 11.3804 0.515459 11.3806 1.14746V9.49512C11.3806 9.7743 11.6067 10.0028 11.8884 10.0029C12.1676 10.0029 12.3962 9.77439 12.3962 9.49512V2.91699C12.3964 2.28509 12.9092 1.76969 13.5436 1.76953C14.1757 1.76953 14.689 2.28499 14.6891 2.91699V11.0469C14.6894 11.3285 14.9178 11.5547 15.197 11.5547C15.4785 11.5545 15.7046 11.3284 15.7048 11.0469V5.6543C15.7048 5.02214 16.2201 4.50684 16.8522 4.50684C17.4843 4.50699 17.9997 5.02224 17.9997 5.6543V15.6748C17.9996 19.0716 15.2373 21.8339 11.8405 21.834H10.5934Z"
                  fill="url(#paint0_linear_93_19424)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_93_19424"
                    x1="-2.90121"
                    y1="-2.41317"
                    x2="22.1452"
                    y2="22.3871"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.24469" stop-color="#00C0FF" />
                    <stop offset="0.821263" stop-color="#5558FF" />
                    <stop offset="0.894694" stop-color="#5558FF" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            Stand
          </button>
          <button className="bj-action-btn flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 text-[#d2d8e8] text-sm hover:bg-white/10">
            <span className="text-black text-xs px-2 py-0.5 rounded-full font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
              >
                <path
                  d="M16.4119 2.83052V14.28C16.4119 15.1223 15.7722 16.3549 14.6959 16.3549H13.5885V12.9386C13.5885 11.9871 12.8244 11.2228 11.8884 11.2228C10.937 11.2228 10.1724 11.9871 10.1724 12.9386V16.6823H5.68013C4.71271 16.6823 3.93298 15.9023 3.93298 14.9351V2.83052C3.93298 1.86337 4.71271 1.08337 5.68013 1.08337H14.6648C15.6319 1.08337 16.4119 1.86337 16.4119 2.83052Z"
                  fill="#9E2A9C"
                />
                <path
                  d="M11.8842 11.2225C12.8296 11.2225 13.5958 11.989 13.5958 12.9342V16.3578H14.7027C15.7671 16.3578 16.4119 15.1222 16.4119 14.2856V7.29272L21.5995 14.8552C22.0071 15.4532 22.1566 16.1901 22.0147 16.8997L20.2911 24.9167H12.883L12.1888 22.1027C11.9871 21.6989 11.7214 21.3306 11.4023 21.0112C10.6148 20.2237 10.1725 19.1558 10.1725 18.0421V12.9345C10.1725 11.989 10.9389 11.2225 11.8842 11.2225Z"
                  fill="#DED5E4"
                />
                <path
                  d="M8.02553 9.18725C7.86276 9.18725 7.69972 9.12523 7.57595 9.00091C7.32759 8.75256 7.32759 8.34875 7.57568 8.10039L11.8689 3.80687C12.1173 3.55852 12.5208 3.55852 12.7684 3.80687C13.0167 4.05523 13.0167 4.45904 12.7686 4.70739L8.47566 9.00091C8.35134 9.12523 8.1883 9.18725 8.02553 9.18725Z"
                  fill="#DFABE1"
                />
                <path
                  d="M12.3188 9.18725C12.156 9.18725 11.993 9.12523 11.8689 9.00091L7.57568 4.70739C7.32759 4.45904 7.32759 4.05523 7.57595 3.80687C7.82349 3.55852 8.22703 3.55852 8.47539 3.80687L12.7686 8.10039C13.0167 8.34875 13.0167 8.75256 12.7684 9.00091C12.6446 9.12523 12.4816 9.18725 12.3188 9.18725Z"
                  fill="#DFABE1"
                />
              </svg>
            </span>
            Hit
          </button>
          <button className="bj-action-btn flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 text-[#d2d8e8] text-sm hover:bg-white/10">
            <span className="text-black text-xs px-2 py-0.5 rounded-full font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <g clip-path="url(#clip0_93_19405)">
                  <path
                    d="M17.4536 18.1768L8.38859 21.8439L8.29421 21.8822C7.20075 22.3358 5.9466 21.8179 5.49299 20.724L0.164486 7.8898C-0.289614 6.79634 0.228793 5.5422 1.32225 5.08858L9.45807 1.71076C10.552 1.25666 11.8062 1.77507 12.2598 2.86798L12.9043 4.24972L16.6882 12.36L17.4536 18.1768Z"
                    fill="url(#paint0_linear_93_19405)"
                  />
                  <path
                    d="M17.4536 18.1768L8.38863 21.8439L8.0294 21.7357C6.89615 21.3939 6.25426 20.1984 6.59615 19.0646L10.6097 5.76052C10.9138 4.75227 11.8935 4.13284 12.9043 4.24968L16.6883 12.36L17.4536 18.1768Z"
                    fill="#E2AE2B"
                  />
                  <path
                    d="M24.9082 8.624L20.8947 21.9286C20.5528 23.0618 19.3568 23.7037 18.2235 23.3618L11.1893 21.2397L9.7897 20.8172C8.65596 20.4754 8.01455 19.2799 8.35645 18.1461L12.37 4.84203C12.7119 3.70878 13.9074 3.06688 15.0406 3.40878L23.4749 5.95335C23.552 5.97684 23.627 6.00389 23.6994 6.03548C24.6908 6.45804 25.2266 7.5678 24.9082 8.624Z"
                    fill="url(#paint1_linear_93_19405)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_93_19405"
                    x1="8.72678"
                    y1="1.54626"
                    x2="8.72678"
                    y2="22.0465"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FFDA01" />
                    <stop offset="1" stop-color="#FFB901" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_93_19405"
                    x1="16.6323"
                    y1="23.4537"
                    x2="16.6323"
                    y2="3.31689"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FD6402" />
                    <stop offset="1" stop-color="#FEA701" />
                  </linearGradient>
                  <clipPath id="clip0_93_19405">
                    <rect width="25" height="25" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            Split
          </button>
        </div>

        <div className="flex w-full justify-center gap-4 align-center">
          {/* 🎲 Chips Section */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {/* Rebet Button */}
            <button
              className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-black/60 
             bg-[radial-gradient(circle,#3b3f4a_0,#161922_70%)] text-white/90 text-sm"
              onClick={() => playSound(chipClickRef)}
            >
              ⟳
            </button>

            {/* Helper: Chip Button Component */}
            {[
              { value: 1, label: "1", svg: "/chips/chip-1.svg" },
              { value: 5, label: "5", svg: "/chips/chip-5.svg" },
              { value: 25, label: "25", svg: "/chips/chip-25.svg" },
              { value: 100, label: "100", svg: "/chips/chip-100.svg" },
              { value: 500, label: "500", svg: "/chips/chip-500.svg" },
            ].map((chip) => (
              <motion.button
                key={chip.value}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all 
        ${betAmount === chip.value ? "ring-2 ring-white" : ""}`}
                onClick={() => {
                  playSound(chipClickRef);
                  setBetAmount(chip.value);
                }}
              >
                {/* SVG Background */}
                <div className="absolute inset-0 pointer-events-none">
                  <img
                    src={chip.svg}
                    alt={`Chip ${chip.value}`}
                    className="w-full h-full object-contain"
                    draggable="false"
                  />
                </div>

                {/* Number Overlay */}
                <span className="relative z-10 text-white text-[11px] font-bold tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
                  {chip.label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Balance + Bet Now */}
          {/* 💰 Bet Amount Controls */}
          <div className="flex items-center justify-center gap-3 mt-4 rounded-[10px] border border-[rgba(255,255,255,0.2)] bg-[linear-gradient(0deg,rgba(30,30,30,0.15)_0%,rgba(75,75,75,0.15)_100%)] px-3 py-2 backdrop-blur-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            {/* Bet Amount Pill */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-md  border-[rgba(255,255,255,0.1)] text-white/90">
              <span className="text-lg font-medium">
                <img src="/chips/icon.svg"></img>
              </span>
              <span className="text-sm font-semibold text-white">
                ${betAmount}
              </span>
            </div>

            {/* Small Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setBetAmount((v) => Math.max(1, Math.floor(v / 2)))
                }
                className="w-12 h-8 flex items-center justify-center rounded-md border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] text-white/80 text-xs font-medium hover:bg-[rgba(255,255,255,0.1)] transition-all"
              >
                1/2
              </button>
              <button
                onClick={() => setBetAmount((v) => v * 2)}
                className="w-12 h-8 flex items-center justify-center rounded-md border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] text-white/80 text-xs font-medium hover:bg-[rgba(255,255,255,0.1)] transition-all"
              >
                2x
              </button>
              <button
                onClick={() => setBetAmount(balance)}
                className="w-12 h-8 flex items-center justify-center rounded-md border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] text-white/80 text-xs font-medium hover:bg-[rgba(255,255,255,0.1)] transition-all"
              >
                Max
              </button>
            </div>
          </div>
        </div>

        {/* Balance + Bet Now */}
        <div className="flex items-center justify-center w-full max-w-sm mt-4">
          <motion.button
            whileHover={{ scale: betPlaced ? 1 : 1.03 }}
            whileTap={{ scale: betPlaced ? 1 : 0.97 }}
            disabled={betPlaced}
            onClick={handleBetNow}
            className={`px-10 py-3 rounded-full font-bold text-[#111] text-[15px] ${
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

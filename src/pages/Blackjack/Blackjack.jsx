import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import "./Blackjack.css";

const Blackjack = () => {
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [balance, setBalance] = useState(1000);
  const [betAmount, setBetAmount] = useState(90);
  const [betPlaced, setBetPlaced] = useState(false);
  const [deckShuffle, setDeckShuffle] = useState(0);

  const balanceControls = useAnimation();

  // sound refs
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
    if (betPlaced) return;
    if (betAmount <= 0 || balance < betAmount) return;

    setBetPlaced(true);
    playSound(chipClickRef);
    animateBalance(balance - betAmount);

    setPlayerCards([]);
    setDealerCards([]);
    setDeckShuffle((s) => s + 1);

    // Deal sequence to match screenshot:
    // dealer: A♥ + back card
    // player: grey card + A♥ + K♠
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
      setPlayerCards([{ dim: true }]); // grey card
    }, 1050);

    setTimeout(() => {
      playSound(cardFlipRef);
      setPlayerCards((prev) => [
        ...prev,
        { rank: "A", suit: "♥" },
      ]);
    }, 1400);

    setTimeout(() => {
      playSound(cardFlipRef);
      setPlayerCards((prev) => [
        ...prev,
        { rank: "K", suit: "♠" },
      ]);
    }, 1750);

    setTimeout(() => setBetPlaced(false), 2600);
  };

  // card animation – flies in from deck area
  const cardFlight = {
    initial: { x: 220, y: -80, scale: 0.6, rotate: 10, opacity: 0 },
    animate: (i) => ({
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.45,
        delay: i * 0.16,
        ease: "easeOut",
      },
    }),
  };

  const renderCard = (card, index) => {
    const isRed = card.suit === "♥" || card.suit === "♦";

    const classNames = [
      "card",
      card.back && "card--back",
      card.dim && "card--dim",
      !card.back && !card.dim && (isRed ? "card--red" : "card--black"),
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <motion.div
        key={index}
        custom={index}
        variants={cardFlight}
        initial="initial"
        animate="animate"
        className={classNames}
      >
        {!card.back && (
          <>
            <span className="card-corner">
              {card.rank}
              {card.suit}
            </span>
            <span className="card-suit">{card.suit}</span>
          </>
        )}
      </motion.div>
    );
  };

  const chipOptions = [
    { value: 1, color: "chip--grey" },
    { value: 5, color: "chip--blue" },
    { value: 25, color: "chip--green" },
    { value: 100, color: "chip--orange" },
    { value: 500, color: "chip--red" },
  ];

  return (
    <div className="blackjack-page">
      {/* audio */}
      <audio ref={cardFlipRef} src="/sounds/card-flip.mp3" preload="auto" />
      <audio ref={chipClickRef} src="/sounds/chip-click.mp3" preload="auto" />

      <div className="blackjack-table">
        {/* header */}
        <div className="blackjack-header">
          <span className="blackjack-header-icon">🂡</span>
          <span className="blackjack-header-text">Blackjack</span>
        </div>

        {/* deck stack on right */}
        <motion.div
          key={deckShuffle}
          className="deck-stack"
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
            <div key={i} className="deck-layer" style={{ top: i * 3 }} />
          ))}
          <div className="deck-top" />
        </motion.div>

        {/* central table area */}
        <div className="table-center">
          <div className="table-orbits" />

          {/* dealer */}
          <div className="dealer-section">
            <div className="cards-row">
              <AnimatePresence>
                {dealerCards.map((c, i) => renderCard(c, i))}
              </AnimatePresence>
            </div>
            {dealerCards.length > 0 && (
              <motion.div
                className="points-badge points-badge--dealer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                09
              </motion.div>
            )}
          </div>

          {/* logo */}
          <div className="table-logo">MOONBET</div>

          {/* player */}
          <div className="player-section">
            {playerCards.length > 0 && (
              <div className="player-points-row">
                <span className="points-badge points-badge--neutral">16</span>
                <span className="points-badge points-badge--danger">16</span>
              </div>
            )}
            <div className="cards-row">
              <AnimatePresence>
                {playerCards.map((c, i) => renderCard(c, i))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* bottom controls */}
        <div className="controls-area">
          {/* actions */}
          <div className="actions-row">
            <button className="action-btn action-btn--primary">
              <span className="action-badge">x2</span> Double
            </button>
            <button className="action-btn">
              <span className="action-icon">✋</span> Stand
            </button>
            <button className="action-btn">
              <span className="action-icon">⚔</span> Hit
            </button>
            <button className="action-btn">
              <span className="action-icon">🂠</span> Split
            </button>
          </div>

          {/* chips */}
          <div className="chips-row">
            <button className="chip chip--rebet">
              <span className="chip-rebet-icon">⟳</span>
            </button>

            {chipOptions.map((chip) => (
              <motion.button
                key={chip.value}
                className={`chip ${chip.color} ${
                  betAmount === chip.value ? "chip--active" : ""
                }`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playSound(chipClickRef);
                  setBetAmount(chip.value);
                }}
              >
                {chip.value}
              </motion.button>
            ))}

            <div className="bet-quick">
              <div className="bet-amount-pill">
                <span className="bet-infinity">∞</span>
                <span className="bet-amount-text">${betAmount}</span>
              </div>

              <div className="bet-quick-buttons">
                <button
                  className="bet-small-btn"
                  onClick={() => setBetAmount((v) => Math.max(1, Math.floor(v / 2)))}
                >
                  1/2
                </button>
                <button
                  className="bet-small-btn"
                  onClick={() => setBetAmount((v) => v * 2)}
                >
                  2x
                </button>
                <button
                  className="bet-small-btn"
                  onClick={() => setBetAmount(balance)}
                >
                  Max
                </button>
              </div>
            </div>
          </div>

          {/* balance + bet now */}
          <div className="bottom-row">
            <motion.div
              animate={balanceControls}
              className="balance-label"
            >
              Balance: <span>${balance.toFixed(2)}</span>
            </motion.div>

            <motion.button
              whileHover={{ scale: betPlaced ? 1 : 1.03 }}
              whileTap={{ scale: betPlaced ? 1 : 0.97 }}
              disabled={betPlaced}
              onClick={handleBetNow}
              className={`bet-now-btn ${betPlaced ? "bet-now-btn--disabled" : ""}`}
            >
              {betPlaced ? "Dealing..." : "BET NOW"}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blackjack;

import React from "react";
import { motion } from "framer-motion";

const CasinoGameCards = () => {
  const gameCards = [
    {
      id: 1,
      title: "CASINO",
      description: "Dive into our in-house games, live casino and slots",
      img: "/rewards/rewards1.png",
      background:
        "linear-gradient(95deg, rgba(220, 31, 255, 0.10) 0.58%, rgba(220, 31, 255, 0.30) 99.42%)",
      borderGradient: "from-purple-500/50 to-purple-700/50",
      glowColor: "purple",
      colSpan: "col-span-2",
      rowSpan: "row-span-1",
    },
    {
      id: 2,
      title: "SLOTS",
      description: "Dive into our in-house games, live casino and slots",
      //   img: "/rewards/rewards2.png",
      background:
        "linear-gradient(107deg, rgba(10, 43, 188, 0.10) 0%, rgba(10, 43, 188, 0.30) 100%)",
      borderGradient: "from-blue-500/50 to-blue-700/50",
      glowColor: "blue",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
    },
    {
      id: 3,
      title: "GAME SHOWS",
      description: "Dive into our in-house games, live casino and slots",
      //   img: "/rewards/rewards3.png",
      background:
        "linear-gradient(107deg, rgba(240, 119, 48, 0.10) 0%, rgba(240, 119, 48, 0.30) 100%)",
      borderGradient: "from-orange-500/50 to-orange-700/50",
      glowColor: "orange",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
    },
    {
      id: 4,
      title: "GAME SHOWS",
      description: "Dive into our in-house games, live casino and slots",
      img: "/rewards/rewards2.png",

      background:
        "linear-gradient(97deg, rgba(240, 119, 48, 0.10) 1.02%, rgba(240, 119, 48, 0.30) 98.68%)",
      borderGradient: "from-amber-500/50 to-yellow-700/50",
      glowColor: "yellow",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
    },
    {
      id: 5,
      title: "LIVE CASINO",
      description: "Dive into our in-house games, live casino and slots",
      img: "/rewards/rewards1.png",
      background:
        "linear-gradient(157deg, rgba(255, 255, 255, 0.40) 2.12%, rgba(255, 255, 255, 0.00) 39%, rgba(255, 255, 255, 0.00) 54.33%, rgba(255, 255, 255, 0.10) 93.02%)",
      borderGradient: "from-cyan-500/50 to-teal-700/50",
      glowColor: "cyan",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
    },
  ];

  const GameCard = ({ card, delay }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        className={`${card.colSpan} ${card.rowSpan} relative group cursor-pointer`}
      >
        <div
          className="relative h-full overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl"
          style={{ background: card.background }}
        >
          {/* Glass overlay effect */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

          {/* Content Container */}
          <div className="relative z-10 h-full p-6 flex">
            {/* Left side - Text Content */}
            <div className="flex-1 flex flex-col justify-center">
              <h3
                className="text-xl md:text-xl text-[#E5EAF2] mb-3 uppercase tracking-wider"
                style={{
                  fontFamily: "Neue Plak",
                  fontsize: "20px",
                  fontStyle: "normal",
                  fontWeight: "400",
                }}
              >
                {card.title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xs">
                {card.description}
              </p>
            </div>

            {/* Right side - Image */}
            {card.img && (
              <div className="relative w-32 md:w-40 lg:w-48 flex items-center justify-center">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-auto object-contain filter drop-shadow-2xl"
                />

                <div className="absolute inset-0 blur-2xl opacity-30">
                  <img
                    src={card.img}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Animated gradient border on hover */}
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
          />

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.3 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 rounded-2xl blur-xl"
              style={{
                background: `radial-gradient(circle at center, ${
                  card.glowColor === "purple"
                    ? "rgba(220, 31, 255, 0.4)"
                    : card.glowColor === "blue"
                    ? "rgba(10, 43, 188, 0.4)"
                    : card.glowColor === "orange"
                    ? "rgba(240, 119, 48, 0.4)"
                    : card.glowColor === "yellow"
                    ? "rgba(255, 204, 0, 0.4)"
                    : card.glowColor === "cyan"
                    ? "rgba(0, 255, 255, 0.4)"
                    : "rgba(255, 255, 255, 0.4)"
                } 0%, transparent 70%)`,
              }}
            />
          </motion.div>

          {/* Shine effect on hover */}
          <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none" />
        </div>
      </motion.div>
    );
  };

  return (
    <section className="w-full py-8 px-4 md:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-4 auto-rows-[200px]">
          {/* First Row */}
          {/* CASINO - spans 2 columns */}
          <GameCard card={gameCards[0]} delay={0.1} />

          {/* SLOTS - spans 1 column */}
          <GameCard card={gameCards[1]} delay={0.2} />

          {/* GAME SHOWS - spans 1 column, 2 rows */}
          <GameCard card={gameCards[2]} delay={0.3} />

          {/* Second Row */}
          {/* GAME SHOWS - spans 1 column */}
          <div className="col-start-1 col-span-2">
            <GameCard card={gameCards[3]} delay={0.4} />
          </div>

          {/* LIVE CASINO - spans 1 column */}
          <div className="col-span-2">
            <GameCard card={gameCards[4]} delay={0.5} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasinoGameCards;

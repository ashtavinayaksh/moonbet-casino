import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GamesYouLike = ({ provider, excludeGame }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (!provider) return;

    const fetchGames = async () => {
      try {
        const res = await axios.get(
          `/wallet-service/api/games?provider=${provider}`
        );

        let list = res.data?.data || [];

        // remove current game
        list = list.filter((g) => g.name !== excludeGame);

        setGames(list);
      } catch (err) {
        console.error("❌ GamesYouLike error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [provider, excludeGame]);

  const handlePlay = (name) => {
    const slug = encodeURIComponent(name);
    navigate(`/game/${slug}`);
  };

  const checkScroll = () => {
    if (!scrollRef.current) return;

    const el = scrollRef.current;
    const tolerance = 5;

    setCanScrollLeft(el.scrollLeft > tolerance);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - tolerance);
  };

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.6;

    el.scrollTo({
      left: direction === "left" ? el.scrollLeft - amount : el.scrollLeft + amount,
      behavior: "smooth",
    });

    setTimeout(checkScroll, 400);
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const handler = () => checkScroll();

    el.addEventListener("scroll", handler);
    window.addEventListener("resize", handler);

    setTimeout(handler, 200);

    return () => {
      el.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [games]);

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-8">
        Loading similar games...
      </div>
    );
  }

  if (games.length === 0) return null;

  return (
    <motion.section
      className="w-full relative bg-[#080808] pb-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-5">

        {/* ------------------ MATCHED HEADER ------------------ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 100,
          }}
          className="flex justify-between items-center mb-1"
        >
          <div className="flex items-center gap-3">
            <motion.span
              className="text-2xl"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M15.3408 7.59087C15.2884 7.52329 15.2248 7.53657 15.1915 7.55036C15.1636 7.562 15.0996 7.59919 15.1084 7.69239C15.1191 7.80431 15.125 7.91841 15.1262 8.03157C15.1309 8.50102 14.9478 8.96094 14.6239 9.2934C14.3019 9.62371 13.8785 9.80168 13.4277 9.79652C12.8119 9.78844 12.3011 9.45809 11.9506 8.84118C11.6608 8.33106 11.7881 7.67313 11.923 6.97654C12.0019 6.5688 12.0836 6.14716 12.0836 5.74588C12.0836 2.62132 10.0412 0.818669 8.82376 0.0222265C8.79858 0.00578122 8.77461 0 8.75338 0C8.71885 0 8.69151 0.0153124 8.67803 0.0246874C8.6519 0.0428905 8.61008 0.0843747 8.62352 0.157812C9.08886 2.69929 7.7009 4.22783 6.23143 5.84611C4.71676 7.51419 3 9.40485 3 12.8147C3 16.7767 6.13405 20 9.98634 20C13.1582 20 15.9547 17.7256 16.787 14.4692C17.3545 12.2487 16.7598 9.42031 15.3408 7.59087ZM10.1606 18.4663C9.19601 18.5115 8.27862 18.1557 7.57792 17.4667C6.88473 16.7849 6.48715 15.8336 6.48715 14.8565C6.48715 13.0228 7.16883 11.6768 9.00231 9.88973C9.03231 9.86047 9.06304 9.85121 9.08981 9.85121C9.11408 9.85121 9.13512 9.85883 9.14959 9.86598C9.18009 9.88109 9.23023 9.91852 9.22347 9.99945C9.15791 10.784 9.15905 11.4352 9.22681 11.9351C9.4 13.2118 10.3088 14.0697 11.4882 14.0697C12.0665 14.0697 12.6174 13.8458 13.0393 13.4394C13.0883 13.3922 13.143 13.3982 13.1639 13.4028C13.1917 13.409 13.2289 13.4265 13.2483 13.4748C13.4233 13.9092 13.5127 14.3703 13.5141 14.8453C13.5196 16.7564 12.0153 18.3808 10.1606 18.4663Z"
                  fill="#CED5E3"
                />
              </svg>
            </motion.span>

            <motion.h3
              className="text-[#CED5E3] font-[400] text-[14px] md:text-[18px] font-['Neuropolitical'] uppercase"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              GAMES YOU LIKE
            </motion.h3>
          </div>

          {/* ------- Right Controls ------- */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Left */}
            <motion.button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`view_btn w-8 h-8 flex items-center justify-center rounded-md transition-all ${
                canScrollLeft
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-white/5 text-gray-600 cursor-not-allowed"
              }`}
              whileHover={canScrollLeft ? { scale: 1.1 } : {}}
              whileTap={canScrollLeft ? { scale: 0.9 } : {}}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </motion.button>

            {/* Right */}
            <motion.button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`view_btn w-8 h-8 flex items-center justify-center rounded-md transition-all ${
                canScrollRight
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-white/5 text-gray-600 cursor-not-allowed"
              }`}
              whileHover={canScrollRight ? { scale: 1.1 } : {}}
              whileTap={canScrollRight ? { scale: 0.9 } : {}}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ------------------ CARDS ------------------ */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        >
          {games.map((game, index) => (
            <motion.div
              key={game.uuid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="min-w-[160px] sm:min-w-[200px] bg-[#111] rounded-xl overflow-hidden cursor-pointer border border-white/10"
              onClick={() => handlePlay(game.name)}
            >
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-[120px] sm:h-[150px] object-cover"
              />
              <div className="p-2">
                <div className="text-white text-sm font-semibold truncate">
                  {game.name}
                </div>
                <div className="text-gray-400 text-xs truncate">
                  {game.provider}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default GamesYouLike;

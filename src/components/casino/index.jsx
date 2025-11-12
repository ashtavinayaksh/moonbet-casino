import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const GameGrid = ({ type = "all", filter = "", searchTerm = "" }) => {
  const [games, setGames] = useState([]);
  const [visibleCount, setVisibleCount] = useState(48);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (type && type !== "all") params.append("type", type);
        if (filter) params.append("sortBy", filter);
        if (searchTerm) params.append("name", searchTerm);

        const query = params.toString() ? `?${params.toString()}` : "";
        const { data } = await axios.get(`/wallet-service/api/games${query}`);

        if (data?.success) setGames(data.data || []);
        else setGames([]);
      } catch (err) {
        console.error("❌ Error fetching games:", err);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [type, filter, searchTerm]);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 48);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.02 },
    }),
  };

  return (
    <section className="w-full bg-black py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-[#CED5E3] font-['Neuropolitical'] text-xl mb-6 uppercase">
          {type === "all" ? "ALL" : type.toUpperCase()} GAMES
        </h2>

        {loading ? (
          <p className="text-gray-400 text-center py-8">Loading games...</p>
        ) : games.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No games found.</p>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4"
              initial="hidden"
              animate="visible"
            >
              {games.slice(0, visibleCount).map((game, i) => (
                <motion.div
                  key={game.uuid || i}
                  variants={cardVariants}
                  custom={i}
                  className="relative rounded-xl overflow-hidden border border-white/10 hover:border-[#F07730]/50 cursor-pointer group transition-all"
                >
                  <div className="relative aspect-[18/12] overflow-hidden rounded-xl">
                    <motion.img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                      <motion.button
                        className="px-4 py-2 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full text-white font-semibold text-sm"
                        whileTap={{ scale: 0.9 }}
                      >
                        PLAY NOW
                      </motion.button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm font-semibold text-white truncate">
                      {game.name}
                    </div>
                    <div className="text-xs text-gray-400">{game.provider}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {visibleCount < games.length && (
              <div className="flex justify-center mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLoadMore}
                  className="px-6 py-2 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full text-white font-semibold text-sm shadow-md"
                >
                  LOAD MORE
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default GameGrid;

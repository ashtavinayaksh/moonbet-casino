import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GamesYouLike = ({ provider, excludeGame }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

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

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-8">
        Loading similar games...
      </div>
    );
  }

  if (games.length === 0) return null;

  return (
    <section className="w-full bg-[#080808] py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <h2 className="text-[#CED5E3] text-xl font-['Neuropolitical'] mb-4">
          Games You Like
        </h2>

        {/* Horizontal scroll */}
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
    </section>
  );
};

export default GamesYouLike;

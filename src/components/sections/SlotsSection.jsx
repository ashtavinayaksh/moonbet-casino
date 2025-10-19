// src/components/sections/SlotsSection.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import MoonBetButton from "../ui-elements/MoonBetButton";

const SlotsSection = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch games from API
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("http://localhost:4001/api/games");
        const data = await res.json();

        if (data?.games?.items) {
          setGames(data.games.items);
        } else {
          console.warn("Invalid games API response:", data);
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // ✅ Scroll button logic
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollPosition();
      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);

      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full relative">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-10"
        >
          <div className="flex items-center gap-3">
            <svg
              className="w-8 h-8 text-[#F07730]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h4v2H7zm6 0h4v2h-4zm0-4h4v2h-4zm-6 0h4v2H7z" />
            </svg>
            <h2 className="text-2xl md:text-3xl lg:text-2xl font-bold text-white uppercase">
              SLOTS
            </h2>
          </div>

          <button className="hidden md:flex items-center">
            <MoonBetButton onClick={() => console.log("To the Casino clicked")}>
              To the Casino
            </MoonBetButton>
          </button>
        </motion.div>

        {/* Games Section */}
        {loading ? (
          <p className="text-center text-gray-400 py-10">Loading games...</p>
        ) : (
          <div className="relative">
            {/* Scroll Buttons */}
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/80 border border-white/10 rounded-full items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                ←
              </button>
            )}

            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/80 border border-white/10 rounded-full items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                →
              </button>
            )}

            {/* Slots Grid */}
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide pb-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className="grid grid-flow-col auto-cols-[160px] sm:auto-cols-[180px] md:auto-cols-[200px] gap-4 md:gap-6">
                {games.map((game, index) => (
                  <motion.div
                    key={game.uuid}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#F07730]/50 transition-all duration-300">
                      {/* Game Image */}
                      <div className="aspect-[4/5] relative overflow-hidden bg-gray-800">
                        <img
                          src={game.image}
                          alt={game.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Game Info */}
                      <div className="p-3">
                        <h3 className="text-white font-semibold text-sm truncate">
                          {game.name}
                        </h3>
                        <p className="text-gray-400 text-xs mt-1">
                          {game.provider}
                        </p>
                      </div>

                      {/* Hover Play Button */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 px-6 py-2 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full text-white font-semibold">
                          PLAY NOW
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex md:hidden justify-center mt-8"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full text-white font-semibold">
            VIEW ALL SLOTS
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SlotsSection;

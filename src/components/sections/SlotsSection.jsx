// src/components/sections/SlotsSection.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MoonBetButton from "../ui-elements/MoonBetButton";
import api from "../../api/axios";
import axios from "axios";

const SlotsSection = () => {
  const scrollContainerRef = useRef(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const navigate = useNavigate();

  // Check scroll position
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
    const fetchGames = async () => {
      try {
        const { data } = await axios.get("/wallet-service/api/games");

        if (data?.games?.items) {
          setGames(data.games.items);
        } else {
          setGames([]); // fallback if API returns no games
        }
      } catch (error) {
        console.error("❌ Error fetching games:", error);
        toast.error(
          error.response?.data?.message || "Failed to load games list"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Add scroll position check after games are loaded
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && games.length > 0) {
      checkScrollPosition();
      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);

      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, [games]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
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

  const handlePlayNow = (gameName) => {
    // Replace spaces with dashes for clean URLs
    const gameSlug = encodeURIComponent(gameName);
    navigate(`/game/${gameSlug}`);
  };

  return (
    <section className="w-full relative">
      <div className="container max-w-7xl mx-auto px-4">
        {/* ... header code unchanged ... */}
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-10"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="24"
                viewBox="0 0 30 24"
                fill="none"
              >
                <path
                  d="M6.19531 18.585H4.4248V14.1602H6.19531V18.585Z"
                  fill="#CED5E3"
                />
                <path
                  d="M12.833 18.585H11.0625V14.1602H12.833V18.585Z"
                  fill="#CED5E3"
                />
                <path
                  d="M19.4707 18.585H17.7002V14.1602H19.4707V18.585Z"
                  fill="#CED5E3"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M27.5088 14.6025C27.5088 16.0687 26.3206 17.2577 24.8545 17.2578H23.8955V22.1289C23.8955 23.1044 23.106 23.8953 22.1299 23.8955H1.76562C0.790898 23.8953 0 23.102 0 22.1289V10.6162C0.000107031 9.64083 0.789633 8.84983 1.76562 8.84961H22.1299C23.1046 8.84981 23.8954 9.64319 23.8955 10.6162V15.4873H24.8545C25.3429 15.4872 25.7393 15.0912 25.7393 14.6025V7.44824C26.0023 7.49701 26.2736 7.52246 26.5508 7.52246C26.8797 7.52245 27.2003 7.48706 27.5088 7.41895V14.6025ZM3.98145 12.3906C3.24992 12.3907 2.65528 12.988 2.65527 13.7207V19.0244C2.65527 19.7577 3.24702 20.3555 3.98145 20.3555H6.63867C7.37021 20.3555 7.96484 19.7572 7.96484 19.0244V13.7207C7.96483 12.9874 7.37309 12.3906 6.63867 12.3906H3.98145ZM10.6191 12.3906C9.88761 12.3907 9.29298 12.988 9.29297 13.7207V19.0244C9.29297 19.7577 9.88471 20.3555 10.6191 20.3555H13.2764C14.0079 20.3555 14.6025 19.7572 14.6025 19.0244V13.7207C14.6025 12.9874 14.0108 12.3906 13.2764 12.3906H10.6191ZM17.2568 12.3906C16.5253 12.3907 15.9307 12.988 15.9307 13.7207V19.0244C15.9307 19.7577 16.5224 20.3555 17.2568 20.3555H19.9141C20.6456 20.3555 21.2402 19.7572 21.2402 19.0244V13.7207C21.2402 12.9874 20.6485 12.3906 19.9141 12.3906H17.2568Z"
                  fill="#CED5E3"
                />
                <path
                  d="M26.5508 0C28.2615 0.000116479 29.6484 1.38699 29.6484 3.09766C29.6483 4.80823 28.2614 6.1952 26.5508 6.19531C24.8401 6.19531 23.4532 4.80836 23.4531 3.09766C23.4531 1.38686 24.84 0 26.5508 0Z"
                  fill="#CED5E3"
                />
              </svg>
            </span>
            <h3
              className="text-[#CED5E3] font-[400] text-[18px] leading-[44px] 
                     font-['Neuropolitical'] not-italic uppercase"
            >
              SLOTS
            </h3>
          </div>

          <button className="hidden md:flex items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-[176px] h-[44px] 
                                     bg-gradient-to-r from-[#424242] to-[#6B6B6B]
                                     text-[#fff] font-[600] text-[16px] 
                                     font-['Neue_Plack',sans-serif]
                                     rounded-lg shadow-md 
                                     transition-all duration-300
                                     hover:from-[#F07730]/90 hover:to-[#EFD28E]/90
                                     flex items-center justify-center"
            >
              To The Casino
            </motion.button>
          </button>
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-400 py-10">Loading games...</p>
        ) : (
          <div className="relative">
            {/* Scroll Buttons - Desktop Only */}
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/80 border border-white/10 rounded-full items-center justify-center text-white hover:bg-white/10 transition-colors z-20"
              >
                ←
              </button>
            )}

            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/80 border border-white/10 rounded-full items-center justify-center text-white hover:bg-white/10 transition-colors z-30"
              >
                →
              </button>
            )}

            <div
              ref={scrollContainerRef}
              className="grid grid-flow-col auto-cols-[145px] gap-3 overflow-x-auto scrollbar-hide"
            >
              {games.map((game, index) => (
                <motion.div
                  key={game.uuid}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="relative rounded-xl overflow-hidden border border-white/10 hover:border-[#F07730]/50 transition-all duration-300">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="p-3">
                      <p className="text-[#A8A8A8] font-semibold text-sm truncate">
                        {game.name}
                      </p>
                      <p className="text-gray-400 text-[9px] md:text-[10px] mt-1">
                        {game.provider}
                      </p>
                    </div>

                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={() => handlePlayNow(game.name)}
                        className="px-6 py-2 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full text-white font-semibold"
                      >
                        PLAY NOW
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SlotsSection;

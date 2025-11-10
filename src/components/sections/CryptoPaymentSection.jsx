// CryptoPaymentSection.jsx - Responsive Bitcoin and Solana Payment Icons
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const CryptoPaymentSection = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Alternating Bitcoin and Solana pattern
  const cryptoIcons = [
    { id: 1, type: "bitcoin", logo: "/crypto-assets/interacLogo.webp" },
    { id: 2, type: "solana", logo: "/crypto-assets/sol.svg" },
    { id: 3, type: "bitcoin", logo: "/crypto-assets/btc.svg" },
    { id: 4, type: "solana", logo: "/crypto-assets/bnb.svg" },
    { id: 5, type: "bitcoin", logo: "/crypto-assets/link.svg" },
    { id: 6, type: "solana", logo: "/crypto-assets/ltc.svg" },
    { id: 7, type: "bitcoin", logo: "/crypto-assets/ton.svg" },
    { id: 8, type: "solana", logo: "/crypto-assets/trx.svg" },
    { id: 9, type: "bitcoin", logo: "/crypto-assets/xrp.svg" },
    { id: 10, type: "solana", logo: "/crypto-assets/ada.svg" },
    { id: 11, type: "bitcoin", logo: "/crypto-assets/eth.svg" },
  ];

  // Check scroll position for mobile
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && window.innerWidth < 640) {
      checkScrollPosition();
      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);

      return () => {
        container?.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const newPosition =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({ left: newPosition, behavior: "smooth" });
  };

  return (
    <section className="w-full py-8 sm:py-12 bg-black relative customborder">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Desktop Version - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden sm:flex items-center justify-center"
        >
          <div className="flex items-center justify-center gap-6 lg:gap-10">
            {cryptoIcons.map((crypto, index) => (
              <motion.div
                key={crypto.id}
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 10,
                  transition: { duration: 0.2 },
                }}
                className="flex-shrink-0"
              >
                {crypto.type === "bitcoin" ? (
                  <div className="w-12 h-12 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                    <img
                      src={crypto.logo}
                      alt="Bitcoin"
                      className="w-full h-full object-contain" // ✅ FULL WIDTH IMAGE FIX
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML =
                          '<span class="text-white font-bold text-xl">₿</span>';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                    <img
                      src={crypto.logo}
                      alt="Solana"
                      className="w-full h-full object-contain" // ✅ FULL WIDTH IMAGE FIX
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML =
                          '<span class="text-white font-bold text-lg">SOL</span>';
                      }}
                    />
                  </div>
                )}
              </motion.div>
            ))}

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <span className="text-sm font-medium whitespace-nowrap">
                & More...
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile Version - Horizontal Scroll */}
        <div className="sm:hidden relative">
          {/* Mobile Navigation Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitScrollbar: { display: "none" },
            }}
          >
            {cryptoIcons.map((crypto, index) => (
              <motion.div
                key={crypto.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                className="flex-shrink-0"
              >
                {crypto.type === "bitcoin" ? (
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                    <img
                      src={crypto.logo}
                      alt="Bitcoin"
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML =
                          '<span class="text-white font-bold text-sm">₿</span>';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg">
                    <img
                      src={crypto.logo}
                      alt="Solana"
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML =
                          '<span class="text-white font-bold text-sm">SOL</span>';
                      }}
                    />
                  </div>
                )}
              </motion.div>
            ))}

            <button className="text-gray-400 text-sm whitespace-nowrap px-2 flex-shrink-0">
              & More...
            </button>
          </div>
        </div>

        {/* Extra Small Screen (xs) - Grid Layout */}
        <div className="hidden">
          <div className="grid grid-cols-6 gap-2 max-w-xs mx-auto">
            {cryptoIcons.slice(0, 6).map((crypto, index) => (
              <motion.div
                key={crypto.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                className="flex-shrink-0"
              >
                {crypto.type === "bitcoin" ? (
                  <div className="w-10 h-10 rounded-full bg-[#F7931A] flex items-center justify-center">
                    <img
                      src={crypto.logo}
                      alt="Bitcoin"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                    <img
                      src={crypto.logo}
                      alt="Solana"
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-2">
            <button className="text-gray-400 text-xs">& More...</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoPaymentSection;

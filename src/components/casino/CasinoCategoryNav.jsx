import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CasinoCategoryNav = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("trending");
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showFilterLeftArrow, setShowFilterLeftArrow] = useState(false);
  const [showFilterRightArrow, setShowFilterRightArrow] = useState(true);
  const categoriesRef = useRef(null);
  const filtersRef = useRef(null);

  // --- SVG Icon Components ---
  const ChevronLeft = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );

  const ChevronRight = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );

  const TrendingUpIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  );

  const FilterIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  );

  const TrophyIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
      />
    </svg>
  );

  const ZapIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );

  const SparklesIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  );

  const FlameIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
      />
    </svg>
  );

  const SnowflakeIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 2v20m8-10H4m14.14-6.14L5.86 18.14M18.14 18.14L5.86 5.86"
      />
    </svg>
  );

  const ClockIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const PlayIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  // --- Categories ---
  // --- Categories ---
  const categories = [
    {
      id: "favorites",
      label: "For You",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 34 34"
          fill="none"
        >
          <path
            d="M25.5165 15.8291C25.5161 15.8287 25.5157 15.8283 25.5152 15.8279L18.1719 8.4856C17.8589 8.17249 17.4428 8 17.0001 8C16.5575 8 16.1413 8.17235 15.8282 8.48546L8.48869 15.8241C8.48621 15.8265 8.48374 15.8291 8.48127 15.8316C7.8385 16.478 7.8396 17.5268 8.48443 18.1716C8.77903 18.4663 9.16812 18.637 9.58413 18.6548C9.60103 18.6565 9.61806 18.6573 9.63523 18.6573H9.9279V24.0608C9.9279 25.13 10.798 26 11.8676 26H14.7405C15.0317 26 15.2679 25.7639 15.2679 25.4727V21.2363C15.2679 20.7484 15.6649 20.3515 16.1528 20.3515H17.8474C18.3354 20.3515 18.7323 20.7484 18.7323 21.2363V25.4727C18.7323 25.7639 18.9684 26 19.2597 26H22.1326C23.2023 26 24.0723 25.13 24.0723 24.0608V18.6573H24.3437C24.7862 18.6573 25.2024 18.4849 25.5157 18.1718C26.1612 17.526 26.1614 16.4754 25.5165 15.8291Z"
            fill="#7C7D96"
          />
        </svg>
      ),
    },
    {
      id: "live",
      label: "Live Dealer",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM4 20v-1c0-2.21 3.58-4 8-4s8 1.79 8 4v1H4z"
            fill="#7C7D96"
          />
        </svg>
      ),
    },
    {
      id: "crash",
      label: "Crash",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4 18L14 8l6 6"
            stroke="#7C7D96"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "slots",
      label: "Slots",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            ry="2"
            stroke="#7C7D96"
            strokeWidth="2"
          />
          <path
            d="M7 10h2v4H7v-4zM11 10h2v4h-2v-4zM15 10h2v4h-2v-4z"
            fill="#7C7D96"
          />
        </svg>
      ),
    },
    {
      id: "roulette",
      label: "Roulette",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="12" cy="12" r="10" stroke="#7C7D96" strokeWidth="2" />
          <circle cx="12" cy="12" r="3" fill="#7C7D96" />
        </svg>
      ),
    },
    {
      id: "blackjack",
      label: "Blackjack",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect
            x="5"
            y="3"
            width="14"
            height="18"
            rx="2"
            ry="2"
            stroke="#7C7D96"
            strokeWidth="2"
          />
          <path d="M9 8h6v8H9z" fill="#7C7D96" />
        </svg>
      ),
    },
    {
      id: "baccarat",
      label: "Baccarat",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2L3 7v10l9 5 9-5V7l-9-5z"
            stroke="#7C7D96"
            strokeWidth="2"
          />
          <path d="M12 2v20" stroke="#7C7D96" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: "gameshows",
      label: "Game Shows",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM7 12h10"
            stroke="#7C7D96"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      id: "all",
      label: "All",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" fill="#7C7D96" />
        </svg>
      ),
    },
    {
      id: "Arcade",
      label: "Arcade",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" fill="#7C7D96" />
        </svg>
      ),
    },
  ];

  const filters = [
    { id: "studios", label: "Studios", IconComponent: FilterIcon },
    { id: "filters", label: "Filters", IconComponent: FilterIcon },
    { id: "highroller", label: "High roller", IconComponent: TrophyIcon },
    { id: "featurebuy", label: "Feature buy", IconComponent: ZapIcon },
    { id: "trending", label: "Trending", IconComponent: TrendingUpIcon },
    { id: "new", label: "New", IconComponent: SparklesIcon },
    { id: "hot", label: "Hot", IconComponent: FlameIcon },
    { id: "cold", label: "Cold", IconComponent: SnowflakeIcon },
    { id: "highrtp", label: "High RTP", IconComponent: ClockIcon },
    { id: "autoplay", label: "Auto play", IconComponent: PlayIcon },
  ];

  // --- Scroll Handlers ---
  const handleCategoryScroll = () => {
    const container = categoriesRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const handleFilterScroll = () => {
    const container = filtersRef.current;
    if (container) {
      setShowFilterLeftArrow(container.scrollLeft > 0);
      setShowFilterRightArrow(
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const scrollCategories = (direction) => {
    const container = categoriesRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollFilters = (direction) => {
    const container = filtersRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const categoriesContainer = categoriesRef.current;
    const filtersContainer = filtersRef.current;

    if (categoriesContainer) {
      categoriesContainer.addEventListener("scroll", handleCategoryScroll);
      handleCategoryScroll();
    }
    if (filtersContainer) {
      filtersContainer.addEventListener("scroll", handleFilterScroll);
      handleFilterScroll();
    }

    return () => {
      if (categoriesContainer) {
        categoriesContainer.removeEventListener("scroll", handleCategoryScroll);
      }
      if (filtersContainer) {
        filtersContainer.removeEventListener("scroll", handleFilterScroll);
      }
    };
  }, []);

  return (
    <section className="relative w-full mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        {/* --- Categories Row --- */}
        <div className="relative flex items-center w-full">
          {/* Left Arrow */}
          <AnimatePresence>
            {showLeftArrow && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => scrollCategories("left")}
                className="absolute left-0 z-20 flex-shrink-0"
              >
                <div className="p-1.5 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                  <ChevronLeft className="w-5 h-5 text-white" />
                </div>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Categories */}
          {/* Categories */}
          <div
            ref={categoriesRef}
            className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide scroll-smooth w-full px-0"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`group view_btn relative flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl transition-all flex-shrink-0 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-[#FFBF9A]/20 to-[#F07730]/20 border border-[#F07730]/40"
                    : "bg-white/5 hover:bg-[linear-gradient(0deg,rgba(240,119,48,0.6)_0%,rgba(240,119,48,0)_100%)]"
                }`}
              >
                {/* SVG ICON */}
                <span
                  className={`flex items-center justify-center w-5 h-5 transition-all duration-300
        group-hover:[&>svg_path]:fill-[#E1E1E1]
        group-hover:[&>svg]:stroke-[#E1E1E1]`}
                >
                  {selectedCategory === category.id ? (
                    // ✅ Active gradient icon
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                    >
                      <defs>
                        <linearGradient
                          id={`gradient-${category.id}`}
                          x1="0"
                          y1="9"
                          x2="19"
                          y2="9"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FFBF9A" />
                          <stop offset="1" stopColor="#F07730" />
                        </linearGradient>
                      </defs>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 11.0826L1.50788 11.1131L3.6168 8.96536L5.28872 10.6697C5.72581 10.0967 6.26313 9.6166 6.88753 9.24862L6.99724 9.18497L7.08325 9.27711L6.71316 7.68072C6.41094 7.75925 6.09688 7.79971 5.77631 7.79971C4.73402 7.79971 3.76173 7.37276 3.03841 6.5999L2.9524 6.50777L2.84269 6.5713C1.31272 7.47306 0.306496 9.04847 0.0108933 11.0113L0 11.0826ZM5.7763 7.01097C3.88059 7.01097 2.33824 5.43872 2.33824 3.50609C2.33824 1.57214 3.88059 0 5.7763 0C7.41736 0 8.79347 1.17794 9.13367 2.74781C7.69568 3.2535 6.47709 4.97501 6.46406 6.94026C6.24177 6.9865 6.01182 7.01097 5.7763 7.01097Z"
                        fill={`url(#gradient-${category.id})`}
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.2141 18H18.9888C19.1192 15.0711 18.1211 12.565 15.4398 10.9865L15.3029 10.9057L15.1916 11.0226C14.2739 12.0031 13.0404 12.5449 11.7177 12.5449C10.3953 12.5449 9.16189 12.0031 8.24413 11.0226L8.13499 10.9057L7.99591 10.9865C7.42817 11.321 6.93601 11.6974 6.51368 12.1105L8.3126 13.9441H5.49752C5.62486 15.3375 6.13305 16.4856 7.34173 17.3652L8.2141 18ZM11.7177 11.5442C9.31262 11.5442 7.35587 9.54954 7.35587 7.09767C7.35587 4.64409 9.31262 2.64966 11.7177 2.64966C14.1231 2.64966 16.08 4.64409 16.08 7.0956C16.08 9.54745 14.1231 11.5442 11.7177 11.5442Z"
                        fill={`url(#gradient-${category.id})`}
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.36832 10.437L0.348586 13.377H2.07298C2.50481 16.3196 4.66104 17.5791 6.81726 17.9999C5.30739 16.9493 4.61901 15.4781 4.61901 13.377H6.38545L3.36832 10.437Z"
                        fill={`url(#gradient-${category.id})`}
                      />
                    </svg>
                  ) : (
                    // ✅ Normal inactive SVG (from your category.icon)
                    category.icon
                  )}
                </span>

                {/* Label */}
                <span
                  className={`text-sm font-medium ${
                    selectedCategory === category.id
                      ? "text-[#F07730]"
                      : "text-gray-300"
                  }`}
                >
                  {category.label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Right Arrow */}
          <AnimatePresence>
            {showRightArrow && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => scrollCategories("right")}
                className="absolute right-0 z-20 flex-shrink-0"
              >
                <div className="p-1.5 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                  <ChevronRight className="w-5 h-5 text-white" />
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        {/* --- Filters Row --- */}
        <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-3 w-full">
          {/* Search + Static Filters */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 flex-shrink-0 w-full sm:w-auto">
            {/* Search Bar */}
            <div className="relative w-full sm:w-64 lg:w-72">
              <input
                type="text"
                placeholder="Search for a casino game"
                className="w-full px-4 py-2.5 pl-10 bg-white/5 rounded-xl border border-white/10 text-sm text-gray-300 placeholder-gray-500 focus:border-[#F07730]/50 focus:bg-white/10 focus:outline-none transition-all"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Studios */}
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all w-full sm:w-auto">
              <span className="text-sm text-gray-300">Studios</span>
              <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
            </button>

            {/* Filters */}
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all w-full sm:w-auto">
              <FilterIcon className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">Filters</span>
            </button>
          </div>

          {/* Scrollable Filter Pills */}
          <div className="flex items-center gap-2 flex-1 overflow-hidden w-full mt-2 sm:mt-0">
            <AnimatePresence>
              {showFilterLeftArrow && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => scrollFilters("left")}
                  className="p-2 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all flex-shrink-0"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Filter Buttons */}
            <div
              ref={filtersRef}
              className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth flex-1"
            >
              {filters.map((filter) => {
                const IconComponent = filter.IconComponent;
                return (
                  <motion.button
                    key={filter.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all flex-shrink-0 ${
                      selectedFilter === filter.id
                        ? "bg-gradient-to-r from-[#F07730]/30 to-[#EFD28E]/30 border border-[#F07730]/50"
                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <IconComponent className="w-4 h-4 text-gray-400" />
                    <span
                      className={`text-sm font-medium ${
                        selectedFilter === filter.id
                          ? "text-[#F07730]"
                          : "text-gray-300"
                      }`}
                    >
                      {filter.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {showFilterRightArrow && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => scrollFilters("right")}
                  className="p-2 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all flex-shrink-0"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default CasinoCategoryNav;

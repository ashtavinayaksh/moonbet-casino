import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CasinoCategoryNav = ({
  selectedCategory,
  setSelectedCategory,
  selectedFilter,
  setSelectedFilter,
  searchTerm,
  setSearchTerm,
}) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showFilterLeftArrow, setShowFilterLeftArrow] = useState(false);
  const [showFilterRightArrow, setShowFilterRightArrow] = useState(true);
  const categoriesRef = useRef(null);
  const filtersRef = useRef(null);
  const navigate = useNavigate();

  // const [selectedCategory, setSelectedCategory] = useState("all");
  // const [selectedFilter, setSelectedFilter] = useState("trending");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  const { category } = useParams();

  // when URL changes (e.g. /casino/slots)
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("all");
    }
  }, [category]);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        // category from URL (or all)
        const activeCategory = category || selectedCategory;

        if (activeCategory && activeCategory !== "all") {
          params.append("type", activeCategory);
        }

        if (selectedFilter) {
          params.append("sortBy", selectedFilter);
        }

        if (searchTerm) {
          params.append("name", searchTerm);
        }

        const query = params.toString() ? `?${params.toString()}` : "";
        const res = await fetch(`http://localhost:4001/api/games${query}`);
        const data = await res.json();

        if (data.success) setGames(data.data || []);
        else setGames([]);
      } catch (err) {
        console.error("Error fetching games:", err);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [category, selectedFilter, searchTerm]);

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
      id: "recent",
      label: "Recent Games",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M18 9C18 11.387 17.0518 13.6761 15.364 15.364C13.6761 17.0518 11.3869 18 9 18C6.61305 18 4.32387 17.0518 2.63604 15.364C0.948212 13.6761 0 11.387 0 9C0 8.82951 0.0677294 8.66599 0.188288 8.54543C0.308848 8.42487 0.472361 8.35715 0.642857 8.35715C0.813354 8.35715 0.976867 8.42487 1.09743 8.54543C1.21798 8.66599 1.28571 8.82951 1.28571 9C1.28314 10.7216 1.85567 12.3948 2.91244 13.7539C3.9692 15.113 5.44965 16.0802 7.11879 16.502C8.78794 16.9237 10.5501 16.7759 12.1257 16.082C13.7013 15.388 14.9999 14.1877 15.8155 12.6716C16.6311 11.1554 16.9169 9.41025 16.6275 7.71313C16.3382 6.01601 15.4903 4.46415 14.2184 3.30387C12.9465 2.14359 11.3235 1.44138 9.60704 1.30868C7.89055 1.17599 6.17892 1.62042 4.74382 2.57143H5.14286C5.31335 2.57143 5.47687 2.63916 5.59743 2.75972C5.71799 2.88028 5.78571 3.04379 5.78571 3.21429C5.78571 3.38479 5.71799 3.5483 5.59743 3.66886C5.47687 3.78942 5.31335 3.85715 5.14286 3.85715H3.21429C3.12985 3.85719 3.04624 3.8406 2.96822 3.80831C2.8902 3.77602 2.81931 3.72867 2.75961 3.66897C2.69991 3.60926 2.65255 3.53837 2.62026 3.46036C2.58798 3.38234 2.57138 3.29872 2.57143 3.21429V1.28572C2.57143 1.11522 2.63916 0.951709 2.75972 0.83115C2.88028 0.710591 3.04379 0.642862 3.21429 0.642862C3.38478 0.642862 3.5483 0.710591 3.66885 0.83115C3.78941 0.951709 3.85714 1.11522 3.85714 1.28572V1.6161C5.20636 0.67571 6.7875 0.123091 8.42876 0.0182905C10.07 -0.0865101 11.7086 0.260516 13.1665 1.02166C14.6243 1.7828 15.8457 2.92895 16.6979 4.33555C17.55 5.74215 18.0004 7.3554 18 9ZM14.7857 9C14.7857 10.1443 14.4464 11.2629 13.8106 12.2144C13.1749 13.1658 12.2713 13.9074 11.2141 14.3453C10.1569 14.7832 8.99358 14.8978 7.87126 14.6745C6.74894 14.4513 5.71803 13.9003 4.90888 13.0911C4.09974 12.282 3.5487 11.2511 3.32546 10.1287C3.10221 9.00642 3.21679 7.84311 3.6547 6.78591C4.0926 5.72871 4.83417 4.8251 5.78563 4.18936C6.73709 3.55362 7.85569 3.21429 9 3.21429C10.534 3.21596 12.0046 3.82607 13.0893 4.91074C14.1739 5.9954 14.784 7.46605 14.7857 9ZM11.2852 9.75086L9.64286 8.65597V5.78572C9.64286 5.61522 9.57513 5.45171 9.45457 5.33115C9.33401 5.21059 9.1705 5.14286 9 5.14286C8.8295 5.14286 8.66599 5.21059 8.54543 5.33115C8.42487 5.45171 8.35714 5.61522 8.35714 5.78572V9C8.35717 9.10583 8.3833 9.21001 8.43324 9.30331C8.48318 9.39661 8.55537 9.47615 8.64341 9.53486L10.572 10.8206C10.7139 10.9132 10.8865 10.946 11.0525 10.912C11.2184 10.878 11.3643 10.7798 11.4582 10.6388C11.5522 10.4979 11.5868 10.3255 11.5543 10.1593C11.5219 9.99297 11.4252 9.8462 11.2852 9.75086Z"
            fill="#7D7D7D"
          />
        </svg>
      ),
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
        >
          <path
            d="M12.5109 0C13.9778 7.87092e-05 15.3565 0.572114 16.3938 1.60938C18.535 3.75068 18.5351 7.23458 16.3938 9.37598L10.3723 15.3984C10.0069 15.7637 9.51949 15.9648 9.0002 15.9648C8.48091 15.9648 7.99346 15.7636 7.62813 15.3984L1.60567 9.37598C-0.53533 7.23467 -0.535116 3.75066 1.60567 1.60938C2.64293 0.572084 4.02253 4.57993e-05 5.48946 0C6.78681 0 8.01593 0.44767 9.0002 1.26855C9.98454 0.44767 11.2135 0 12.5109 0Z"
            fill="#7D7D7D"
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
    <section className="relative w-full mt-10 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        {/* --- Categories Row --- */}
        <div className="relative flex items-center w-full">
          {/* Left Arrow (Matches Filter Row Style) */}
          <AnimatePresence>
            {showLeftArrow && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => scrollCategories("left")}
                className="absolute left-0 z-20 flex-shrink-0 p-2 transition-all rounded-[8px]"
                style={{
                  borderRadius: "60px",
                  border: "1px solid rgba(255, 255, 255, 0.40)",
                  background: "rgba(0, 0, 0, 0.80)",
                }}
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Categories */}
          <div className="relative w-full">
            <div
              className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(to left, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0))",
              }}
            ></div>
            <div
              ref={categoriesRef}
              className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide scroll-smooth w-full pr-8" // ✅ padding-right keeps arrow clear
            >
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    navigate(
                      `/casino/${category.id === "all" ? "" : category.id}`
                    );
                  }}
                  className={`group view_btn relative flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 transition-all flex-shrink-0
    rounded-[8px]  border-[rgba(255,255,255,0.40)] bg-[rgba(255,255,255,0.10)]
    ${
      selectedCategory === category.id
        ? "bg-gradient-to-r from-[#FFBF9A]/10 to-[#F07730]/10"
        : "hover:bg-[linear-gradient(0deg,rgba(240,119,48,0.6)_0%,rgba(240,119,48,0)_100%)]"
    }`}
                >
                  {/* SVG ICON */}
                  <span className="flex items-center justify-center w-5 h-5 transition-all duration-200 group-hover:[&>svg_path]:fill-[#E1E1E1] group-hover:[&>svg]:stroke-[#E1E1E1]">
                    {selectedCategory === category.id ? (
                      // ✅ Active Gradient Fill SVG
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="18"
                        viewBox="0 0 19 18"
                        fill="none"
                      >
                        <defs>
                          <linearGradient
                            id={`grad-${category.id}`}
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
                          fill={`url(#grad-${category.id})`}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.2141 18H18.9888C19.1192 15.0711 18.1211 12.565 15.4398 10.9865L15.3029 10.9057L15.1916 11.0226C14.2739 12.0031 13.0404 12.5449 11.7177 12.5449C10.3953 12.5449 9.16189 12.0031 8.24413 11.0226L8.13499 10.9057L7.99591 10.9865C7.42817 11.321 6.93601 11.6974 6.51368 12.1105L8.3126 13.9441H5.49752C5.62486 15.3375 6.13305 16.4856 7.34173 17.3652L8.2141 18ZM11.7177 11.5442C9.31262 11.5442 7.35587 9.54954 7.35587 7.09767C7.35587 4.64409 9.31262 2.64966 11.7177 2.64966C14.1231 2.64966 16.08 4.64409 16.08 7.0956C16.08 9.54745 14.1231 11.5442 11.7177 11.5442Z"
                          fill={`url(#grad-${category.id})`}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.36832 10.437L0.348586 13.377H2.07298C2.50481 16.3196 4.66104 17.5791 6.81726 17.9999C5.30739 16.9493 4.61901 15.4781 4.61901 13.377H6.38545L3.36832 10.437Z"
                          fill={`url(#grad-${category.id})`}
                        />
                      </svg>
                    ) : (
                      // Default inactive gray SVG
                      category.icon
                    )}
                  </span>

                  {/* Label */}
                  <span
                    className={`text-sm font-medium ${
                      selectedCategory === category.id
                        ? "text-[#F07730]"
                        : "text-[#7D7D7D]"
                    }`}
                  >
                    {category.label}
                  </span>
                </motion.button>
              ))}
            </div>
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
            <div className="crypto_btn relative w-full sm:w-64 lg:w-72">
              <input
                type="text"
                placeholder="Search for a casino game"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 text-sm text-gray-300 placeholder-gray-500 focus:border-[#F07730]/50 focus:bg-white/10 focus:outline-none transition-all
                   rounded-[8px]"
                style={{
                  borderRadius: " 60px",

                  background: "rgba(0, 0, 0, 0.80)",
                }}
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
            <button
              className="crypto_btn flex items-center justify-center gap-2 px-4 py-2.5 transition-all w-full sm:w-auto
                 rounded-[8px]"
              style={{
                borderRadius: " 60px",
                background: "rgba(0, 0, 0, 0.80)",
              }}
            >
              <span className="text-sm text-gray-300">Studios</span>
              <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
            </button>

            {/* Filters */}
            <button
              className="crypto_btn flex items-center justify-center gap-2 px-4 py-2.5 transition-all w-full sm:w-auto
                 rounded-[8px]"
              style={{
                borderRadius: " 60px",
                background: "rgba(0, 0, 0, 0.80)",
              }}
            >
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
                  className="p-2 transition-all flex-shrink-0
                     rounded-[8px] "
                  style={{
                    borderRadius: " 60px",
                    border: "1px solid rgba(255, 255, 255, 0.40)",
                    background: "rgba(0, 0, 0, 0.80)",
                  }}
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
                    className={`crypto_btn flex items-center gap-2 px-4 py-2.5 transition-all flex-shrink-0 
              rounded-[60px] ] 
              ${
                selectedFilter === filter.id
                  ? "bg-gradient-to-r from-[#F07730]/30 to-[#EFD28E]/30"
                  : "bg-[rgba(0,0,0,0.80)] hover:bg-[rgba(0,0,0,0.70)]"
              }`}
                  >
                    <IconComponent className="w-4 h-4 text-gray-400" />
                    <span
                      className={`text-sm font-medium ${
                        selectedFilter === filter.id
                          ? "text-[#F07730]"
                          : "cryptp-para text-[#7D7D7D;]"
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
                  className="p-2 transition-all flex-shrink-0
                     rounded-[8px] border border-[rgba(255,255,255,0.40)] bg-[rgba(255,255,255,0.10)]
                     hover:bg-[rgba(255,255,255,0.15)]"
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

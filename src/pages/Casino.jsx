// src/pages/Casino.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import HeroSection from "../components/sections/HeroSection";
import HomeRewardsSection from "../components/sections/HomeRewardsSection";
import CasinoCategoryNav from "../components/casino/CasinoCategoryNav";
import GameGrid from "../components/casino"; // your grid component
import ProvidersSection from "../components/sections/ProvidersSection";
import HomeFAQSection from "../components/sections/HomeFAQSection";
import CryptoPaymentSection from "../components/sections/CryptoPaymentSection";
import TrustBadgesFinal from "../components/sections/TrustBadges";

const Casino = () => {
  const { category } = useParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [filter, setFilter] = useState("trending");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setActiveCategory(category || "all");
  }, [category]);

  return (
    <div className="min-h-screen bg-black">
      <HomeRewardsSection />
      <HeroSection />

      {/* pass handlers & state */}
      <CasinoCategoryNav
        selectedCategory={activeCategory}
        setSelectedCategory={setActiveCategory}
        selectedFilter={filter}
        setSelectedFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* dynamic data grid */}
      <GameGrid type={activeCategory} filter={filter} searchTerm={searchTerm} />
      <ProvidersSection />
      <HomeFAQSection />
      <CryptoPaymentSection />
      <TrustBadgesFinal />
    </div>
  );
};

export default Casino;

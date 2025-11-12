// src/pages/Casino.jsx
import React from "react";

import SlotsSection from "../components/casino/SlotsSection";
import LiveCasino from "../components/casino/LiveCasino";
import TrandingSection from "../components/casino/TrandingSection";
import HeroSection from "../components/sections/HeroSection";
import HomeRewardsSection from "../components/sections/HomeRewardsSection";
import CasinoCategoryNav from "../components/casino/Casinocategorynav";

const Casino = () => {
  return (
    <div className="min-h-screen bg-black">
      <HomeRewardsSection />
      <HeroSection />
      <CasinoCategoryNav />
      <TrandingSection />
      <SlotsSection />
      <LiveCasino />
    </div>
  );
};

// IMPORTANT: Default export
export default Casino;

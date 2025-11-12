// src/pages/Casino.jsx
import React from "react";

import SlotsSection from "../components/casino/SlotsSection";
import LiveCasino from "../components/casino/LiveCasino";
import TrandingSection from "../components/casino/TrandingSection";
import HeroSection from "../components/sections/HeroSection";
import HomeRewardsSection from "../components/sections/HomeRewardsSection";
import ProvidersSection from "../components/sections/ProvidersSection";
import CasinoCategoryNav from "../components/casino/Casinocategorynav";
import TrustBadges from "../components/sections/TrustBadges";
import GameBetsSection from "../components/sections/GameBetsSection";
import HomeFAQSection from "../components/sections/HomeFAQSection";
import CryptoPaymentSection from "../components/sections/CryptoPaymentSection";

const Casino = () => {
  return (
    <div className="min-h-screen bg-black">
      <HomeRewardsSection />
      <HeroSection />
      <CasinoCategoryNav />
      <TrandingSection />
      <SlotsSection />
      <LiveCasino />
      <ProvidersSection />
      <GameBetsSection />
      <HomeFAQSection />
      <CryptoPaymentSection />
      <TrustBadges />
    </div>
  );
};

// IMPORTANT: Default export
export default Casino;

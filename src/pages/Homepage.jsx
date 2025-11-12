// src/pages/Homepage.jsx
import React from "react";
import HeroSection from "../components/sections/HeroSection";
import HomeRewardsSection from "../components/sections/HomeRewardsSection";
import HomeFAQSection from "../components/sections/HomeFAQSection";
// import SlotsSection from "../components/sections/SlotsSection";
import GameBetsSection from "../components/sections/GameBetsSection";

// import LiveCasino from "../components/sections/LiveCasino";
import ProvidersSection from "../components/sections/ProvidersSection";
import CryptoPaymentSection from "../components/sections/CryptoPaymentSection";
// import VipMoonSection from "../components/sections/VipMoonSection";
import TrustBadges from "../components/sections/TrustBadges";
import CircularWheel from "../components/circular/CircularWheel";
import SlotsSection from "../components/casino/SlotsSection";
import LiveCasino from "../components/casino/LiveCasino";
import TrandingSection from "../components/casino/TrandingSection";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-black">
      <HomeRewardsSection />
      <HeroSection />
      {/* <RecommendedSection />
      <SlotsSection />
      <LiveCasino /> */}
      <TrandingSection />
      <SlotsSection />
      <LiveCasino />
      <CircularWheel />
      <ProvidersSection />
      <GameBetsSection />
      <HomeFAQSection />
      <CryptoPaymentSection />
      <TrustBadges />
    </div>
  );
};

// IMPORTANT: Default export
export default Homepage;

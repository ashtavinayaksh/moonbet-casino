// src/pages/Homepage.jsx
import React from "react";
import HeroSection from "../components/sections/HeroSection";
import HomeRewardsSection from "../components/sections/HomeRewardsSection";
import HomeGamesSection from "../components/sections/HomeGamesSection";
import HomeFAQSection from "../components/sections/HomeFAQSection";
import SlotsSection from "../components/sections/SlotsSection";
import GameBetsSection from "../components/sections/GameBetsSection";
import CasinoWheel from "../components/sections/CasinoWheel";
import SpinningWheel from "../components/sections/SpinningWheel";
import CasinoWheel2 from "../components/sections/CasinoWheel2";
import RecommendedSection from "../components/sections/RecommendedSection";
import LiveCasino from "../components/sections/LiveCasino";
import ProvidersSection from "../components/sections/ProvidersSection";
import CryptoPaymentSection from "../components/sections/CryptoPaymentSection";
import VipMoonSection from "../components/sections/VipMoonSection";
import TrustBadges from "../components/sections/TrustBadges";
import CircularWheel from "../components/circular/CircularWheel";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <CircularWheel />
      {/* <VipMoonSection /> */}
      <HomeRewardsSection />
      {/* <HomeGamesSection /> */}
      <RecommendedSection />
      {/* <CasinoWheel2 /> */}
      <SlotsSection />
      <LiveCasino />
      <ProvidersSection />
      <GameBetsSection />
      <HomeFAQSection />
      <CryptoPaymentSection />
      {/* <TrustBadges /> */}
    </div>
  );
};

// IMPORTANT: Default export
export default Homepage;

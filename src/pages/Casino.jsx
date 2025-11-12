// src/pages/Casino.jsx
import React from "react";

import SlotsSection from "../components/sections/SlotsSection";
import RecommendedSection from "../components/sections/RecommendedSection";
import LiveCasino from "../components/sections/LiveCasino";

const Casino = () => {
  return (
    <div className="min-h-screen bg-black">
      <RecommendedSection />
      <SlotsSection />
      <LiveCasino />
    </div>
  );
};

// IMPORTANT: Default export
export default Casino;

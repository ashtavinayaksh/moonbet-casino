// src/pages/Casino.jsx
import React from "react";

import SlotsSection from "../components/casino/SlotsSection";
import LiveCasino from "../components/casino/LiveCasino";
import TrandingSection from "../components/casino/TrandingSection";

const Casino = () => {
  return (
    <div className="min-h-screen bg-black">
      <TrandingSection />
      <SlotsSection />
      <LiveCasino />
    </div>
  );
};

// IMPORTANT: Default export
export default Casino;

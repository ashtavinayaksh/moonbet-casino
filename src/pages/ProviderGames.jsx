// src/pages/ProviderGames.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

// Sections used in Casino.jsx

import GameGrid from "../components/casino";

const ProviderGames = () => {
  const { providerName } = useParams();

  // clean “pragmatic-play” → “pragmatic play”
  const cleanName = providerName.replace(/-/g, " ");

  // use fixed category “provider”
  const [activeCategory, setActiveCategory] = useState("provider");

  // provider always filters through “searchTerm”
  const [filter, setFilter] = useState("trending");
  const [searchTerm, setSearchTerm] = useState(cleanName);

  useEffect(() => {
    setSearchTerm(cleanName);
  }, [cleanName]);

  return (
    <>
      <Helmet>
        <title>{cleanName} Games – Moonbet Casino</title>
        <meta
          name="description"
          content={`Play ${cleanName} games on Moonbet. Discover crypto-friendly, provably fair games from ${cleanName}.`}
        />
      </Helmet>

      <div className="min-h-screen bg-[#080808]">
        {/* SAME layout as Casino.jsx */}

        {/* ONLY change is here → filter by provider */}
        <GameGrid type="provider" filter={filter} searchTerm={searchTerm} />
      </div>
    </>
  );
};

export default ProviderGames;

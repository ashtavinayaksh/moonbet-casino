import React, { useState } from "react";
import { motion } from "framer-motion";

const BettingRules = () => {
  const [activeSection, setActiveSection] = useState("claims");

  // Custom Icons
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

  const Shield = ({ className }) => (
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
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );

  const Clock = ({ className }) => (
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

  const DollarSign = ({ className }) => (
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
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const AlertCircle = ({ className }) => (
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
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const CheckCircle = ({ className }) => (
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
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  // Navigation sections
  const sections = [
    {
      id: "claims",
      label: "1. Claims and Protests",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      id: "general",
      label: "2. General Principles",
      icon: <Shield className="w-5 h-5" />,
    },
    { id: "games", label: "3. Eligible Games", icon: "🎮" },
    {
      id: "limits",
      label: "4. Stake Limits",
      icon: <DollarSign className="w-5 h-5" />,
    },
    { id: "settlement", label: "5. Settlement & Payouts", icon: "💰" },
    { id: "volatility", label: "6. Payout Structures", icon: "📊" },
    {
      id: "fairness",
      label: "7. Smart Contract & Fairness",
      icon: <Shield className="w-5 h-5" />,
    },
    { id: "promos", label: "8. Promotional Conditions", icon: "🎁" },
    { id: "fraud", label: "9. Fraud Prevention", icon: "🔒" },
    { id: "responsible", label: "10. Responsible Gaming", icon: "❤️" },
    { id: "glossary", label: "11. Glossary", icon: "📖" },
  ];

  // Glossary terms
  const glossaryTerms = [
    { term: "Stake", definition: "The crypto amount wagered per game round." },
    {
      term: "RTP (Return to Player)",
      definition: "Percentage of average stake returned over time.",
    },
    {
      term: "Volatility",
      definition:
        "Measure of payout variance; higher volatility means bigger swings.",
    },
    {
      term: "Provable RNG",
      definition:
        "Blockchain-based random number generation verifiable on-chain.",
    },
    {
      term: "Wagering Requirement",
      definition:
        "Multiplier on bonus funds before conversion to withdrawable balance.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Hero Section */}
      <section className="relative py-16 px-4 border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F07730]/10 via-transparent to-[#EFD28E]/10" />
        <div className="container max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-2xl md:text-2xl font-bold mb-6 ">
              Betting Rules
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Moonbet's Betting Rules ensure every on-chain casino wager is
              transparent, provably fair, and protected by secure crypto
              protocols. This detailed guide outlines claim procedures, general
              principles, game-specific rules, payout mechanics, and responsible
              gaming measures.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <div className="sticky top-0 z-40 bg-[#080808]/95 backdrop-blur-md border-b border-white/10">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all
                         ${
                           activeSection === section.id
                             ? "bg-gradient-to-r from-[#F07730]/30 to-[#EFD28E]/30 border border-[#F07730]/50"
                             : "bg-white/5 border border-white/10 hover:bg-white/10"
                         }`}
              >
                <span className="text-lg">
                  {typeof section.icon === "string"
                    ? section.icon
                    : section.icon}
                </span>
                <span className="text-sm text-gray-300 hidden md:inline">
                  {section.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Desktop Only */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="wallet-btn3 rounded-2xl p-6">
                <p className="text-lg font-bold text-white mb-4">
                  Quick Navigation
                </p>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all flex items-center gap-2
                               ${
                                 activeSection === section.id
                                   ? "bg-[#F07730]/20 text-[#F07730]"
                                   : "text-gray-400 hover:bg-white/5 hover:text-white"
                               }`}
                    >
                      <span>{section.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            {/* Section 1: Claims and Protests */}
            <motion.section
              id="claims"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-8"
            >
              <p className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-[#F07730]" />
                1. Claims and Protests
              </p>
              <p className="text-gray-400 mb-6">
                How to dispute game outcomes or transaction errors.
              </p>

              <div className="space-y-4">
                <p className="text-gray-300">
                  All complaints must be submitted within{" "}
                  <span className="text-[#F07730] font-bold">14 days</span> of
                  the wager's result via{" "}
                  <a
                    href="mailto:support@moonbet.games"
                    className="text-[#F07730] underline hover:text-[#EFD28E]"
                  >
                    support@moonbet.games
                  </a>
                </p>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="text-white font-bold mb-3">
                    Include in your complaint:
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "Your account ID",
                      "Transaction hash or bet reference",
                      "Timestamped screenshot of the game result",
                      "A concise explanation",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#F07730] mt-0.5" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-4 p-4 bg-[#F07730]/10 rounded-xl">
                  <Clock className="w-6 h-6 text-[#F07730]" />
                  <div>
                    <p className="text-white font-bold">Response Timeline</p>
                    <p className="text-gray-300 text-sm">
                      Acknowledgment within 48 hours • Resolution within 7
                      business days
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 2: General Betting Principles */}
            <motion.section
              id="general"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-8"
            >
              <p className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Shield className="w-8 h-8 text-[#F07730]" />
                2. General Betting Principles
              </p>
              <p className="text-gray-400 mb-6">
                Core rules governing acceptance, finality, and error handling of
                casino wagers.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    2.1 Bet Finality
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Once you confirm a wager, it is{" "}
                        <span className="text-[#F07730] font-bold">
                          irrevocable
                        </span>
                        . Always verify game type, stake, and settings before
                        confirming.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Moonbet may void or adjust wagers only for clear
                        technical errors or rule violations.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    2.2 Provable Fairness
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        All casino games use{" "}
                        <span className="text-[#F07730] font-bold">
                          blockchain-based RNG
                        </span>{" "}
                        with open shuffles or provable algorithms. Game results
                        are publicly auditable on-chain.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Moonbet cannot alter results after provable data is
                        committed.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    2.3 Error Handling
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        If a game fails to load or a transaction times out, any
                        pending wager is canceled and stake returned
                        automatically.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        In rare cases of smart-contract malfunction, Moonbet
                        will issue refunds once the issue is verified and fixed.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 3: Eligible Games */}
            <motion.section
              id="games"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-8"
            >
              <p className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">🎮</span>
                3. Eligible Games and Bet Types
              </p>
              <p className="text-gray-400 mb-6">
                Definitions of each supported casino game and their wager
                structures.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <p className="text-lg font-bold text-white mb-3">
                    3.1 Slot Games
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="text-gray-300">
                      <span className="text-[#F07730] font-bold">
                        Single Spin:
                      </span>{" "}
                      Stake per spin × paylines
                    </li>
                    <li className="text-gray-300">
                      <span className="text-[#F07730] font-bold">
                        Bonus Rounds:
                      </span>{" "}
                      Follow same stake-per-line rule
                    </li>
                    <li className="text-gray-300">
                      <span className="text-[#F07730] font-bold">
                        Autoplay:
                      </span>{" "}
                      Must set loss limit
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <p className="text-lg font-bold text-white mb-3">
                    3.2 Card & Live Games
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="text-gray-300">
                      <span className="text-[#F07730] font-bold">
                        Table Bet:
                      </span>{" "}
                      Stake against dealer
                    </li>
                    <li className="text-gray-300">
                      <span className="text-[#F07730] font-bold">
                        Side Bets:
                      </span>{" "}
                      Separate payout tables
                    </li>
                    <li className="text-gray-300">
                      <span className="text-[#F07730] font-bold">
                        Time Limits:
                      </span>{" "}
                      Confirm before "no more bets"
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <p className="text-lg font-bold text-white mb-3">
                    3.3 Special Games
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="text-gray-300">
                      <span className="text-[#F07730] font-bold">
                        Ball Drop:
                      </span>{" "}
                      Stake per ball (Plinko)
                    </li>
                    <li className="text-gray-300">
                      <span className="text-[#F07730] font-bold">
                        Volatility:
                      </span>{" "}
                      Low, Medium, High settings
                    </li>
                    <li className="text-gray-300">
                      <span className="text-[#F07730] font-bold">
                        Row Count:
                      </span>{" "}
                      8-16 rows adjust multipliers
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 4: Stake Limits */}
            <motion.section
              id="limits"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-8"
            >
              <p className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-[#F07730]" />
                4. Stake Limits and Controls
              </p>
              <p className="text-gray-400 mb-6">
                Minimum, maximum, and dynamic limits to ensure platform
                stability.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#F07730]/20 to-transparent rounded-xl p-6 border border-[#F07730]/30">
                  <p className="text-lg font-bold text-white mb-4">
                    Default Limits
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Minimum Stake:</span>
                      <span className="text-[#F07730] font-bold">
                        0.10 USDT
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Maximum Stake:</span>
                      <span className="text-[#F07730] font-bold">100 USDT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">VIP Maximum:</span>
                      <span className="text-[#F07730] font-bold">
                        1,000 USDT
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <p className="text-lg font-bold text-white mb-4">
                    Player Controls
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#F07730] mt-0.5" />
                      <span className="text-gray-300">
                        Set personalized daily spend caps
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#F07730] mt-0.5" />
                      <span className="text-gray-300">
                        Configure loss limits in settings
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#F07730] mt-0.5" />
                      <span className="text-gray-300">
                        Dynamic caps based on VIP status
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 5: Settlement and Payouts */}
            <motion.section
              id="settlement"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-8"
            >
              <p className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">💰</span>
                5. Settlement and Payout Mechanics
              </p>
              <p className="text-gray-400 mb-6">
                When and how winnings are credited or refunded.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    5.1 Instant On-Chain Payouts
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-[#F07730] mt-0.5" />
                      <span className="text-gray-300">
                        Winnings disbursed immediately via the same wallet used
                        for betting
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-[#F07730] mt-0.5" />
                      <span className="text-gray-300">
                        Payout transactions generate on-chain record for
                        real-time verification
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    5.2 Refunds and Voided Bets
                  </p>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-white font-bold mb-2">
                      Voided Scenarios:
                    </p>
                    <ul className="grid md:grid-cols-2 gap-2">
                      <li className="text-gray-300 text-sm">• Game crash</li>
                      <li className="text-gray-300 text-sm">
                        • Network failure
                      </li>
                      <li className="text-gray-300 text-sm">
                        • Wager after window closed
                      </li>
                      <li className="text-gray-300 text-sm">
                        • System malfunction
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    5.3 Transaction Fees
                  </p>
                  <div className="flex items-center gap-4 p-4 bg-[#F07730]/10 rounded-xl">
                    <DollarSign className="w-6 h-6 text-[#F07730]" />
                    <div>
                      <p className="text-white font-bold">Zero Platform Fees</p>
                      <p className="text-gray-300 text-sm">
                        Moonbet charges no withdrawal fees • Only blockchain
                        network gas fees apply
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 6: Payout Structures */}
            <motion.section
              id="volatility"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-8"
            >
              <p className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">📊</span>
                6. Payout Structures and Volatility
              </p>
              <p className="text-gray-400 mb-6">
                How multipliers work, chance distributions, and risk settings.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="text-xl font-bold text-white mb-4">
                    6.1 Plinko Multipliers
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                      <h4 className="text-green-400 font-bold mb-2">
                        Low Volatility
                      </h4>
                      <p className="text-gray-300 text-sm">
                        0.5× - 10× multipliers
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Frequent small wins
                      </p>
                    </div>
                    <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
                      <h4 className="text-yellow-400 font-bold mb-2">
                        Medium Volatility
                      </h4>
                      <p className="text-gray-300 text-sm">0.5× - 50× spread</p>
                      <p className="text-gray-400 text-xs mt-1">
                        Balanced risk/reward
                      </p>
                    </div>
                    <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                      <h4 className="text-red-400 font-bold mb-2">
                        High Volatility
                      </h4>
                      <p className="text-gray-300 text-sm">
                        0.2× - 1,000× range
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Rare massive payouts
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    6.2 Slot RTP Variance
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730]">•</span>
                      <span className="text-gray-300">
                        Each slot lists its{" "}
                        <span className="text-[#F07730] font-bold">
                          Return to Player (RTP)
                        </span>{" "}
                        percentage (90%-98%)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730]">•</span>
                      <span className="text-gray-300">
                        Higher RTP games offer steadier returns; low-RTP titles
                        may feature bigger jackpot potential
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    6.3 Table & Live Dealer Payouts
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730]">•</span>
                      <span className="text-gray-300">
                        Standard pay tables displayed before each bet window
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730]">•</span>
                      <span className="text-gray-300">
                        Side bet odds clearly listed on game UI (e.g., Perfect
                        Pairs 25:1)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 7: Smart Contract & Fairness */}
            <motion.section
              id="fairness"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-8"
            >
              <p className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Shield className="w-8 h-8 text-[#F07730]" />
                7. Smart-Contract and Provable Fairness Audits
              </p>
              <p className="text-gray-400 mb-6">
                Transparency measures ensuring game integrity.
              </p>

              <div className="space-y-4">
                {[
                  "All RNG logic and shuffle contracts are open-source",
                  "Independent third-party audits conducted quarterly",
                  "Reports published on Moonbet's Transparency page",
                  "Players can verify individual game seeds and outcomes via on-chain proof tools",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-white/5 rounded-xl"
                  >
                    <CheckCircle className="w-6 h-6 text-[#F07730] mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Section 8: Promotional Conditions */}
            <motion.section
              id="promos"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-8"
            >
              <p className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">🎁</span>
                8. Promotional Bet Conditions
              </p>
              <p className="text-gray-400 mb-6">
                Rules for wagering bonuses, free spins, and rakeback.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-lg font-bold text-white mb-3">
                    8.1 Bonus Wagering
                  </p>
                  <ul className="space-y-2">
                    <li className="text-gray-300">
                      <span className="text-[#F07730] font-bold">
                        Welcome Bonus:
                      </span>{" "}
                      Must wager on Plinko/slots before withdrawal
                    </li>
                    <li className="text-gray-300">
                      <span className="text-[#F07730] font-bold">
                        Free Spins:
                      </span>{" "}
                      Winnings convert to bonus with wagering requirements
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-lg font-bold text-white mb-3">
                    8.2 VIP Rakeback
                  </p>
                  <ul className="space-y-2">
                    <li className="text-gray-300">
                      • Earn rakeback on net losses across all games
                    </li>
                    <li className="text-gray-300">
                      • Weekly credits as withdrawable funds
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 9: Fraud Prevention */}
            <motion.section
              id="fraud"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-8"
            >
              <p className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">🔒</span>
                9. Cancellation and Fraud Prevention
              </p>
              <p className="text-gray-400 mb-6">
                How Moonbet handles suspicious activity and enforces rules.
              </p>

              <div className="space-y-4">
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                  <p className="text-red-400 font-bold mb-2">
                    Security Measures
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      • KYC optional but required for bonuses or VIP status
                    </li>
                    <li>
                      • Automated monitoring flags irregular play patterns
                    </li>
                    <li>• Accounts may be suspended pending review</li>
                    <li>
                      • Report wallet compromise immediately for account freeze
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 10: Responsible Gaming */}
            <motion.section
              id="responsible"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-8"
            >
              <p className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">❤️</span>
                10. Responsible Gaming and Support
              </p>
              <p className="text-gray-400 mb-6">
                Tools for safe play and where to seek help.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-lg font-bold text-white mb-3">
                    Player Protection Tools
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#F07730] mt-0.5" />
                      <span className="text-gray-300">
                        Deposit/Loss Limits (daily, weekly, monthly)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#F07730] mt-0.5" />
                      <span className="text-gray-300">
                        Time-Outs (24 hours to 30 days)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#F07730] mt-0.5" />
                      <span className="text-gray-300">
                        Self-Exclusion (permanent ban option)
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-lg font-bold text-white mb-3">
                    Support Channels
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-[#F07730]">•</span>
                      <span className="text-gray-300">
                        24/7 live chat support
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#F07730]">•</span>
                      <a
                        href="mailto:support@moonbet.games"
                        className="text-gray-300 hover:text-[#F07730]"
                      >
                        support@moonbet.games
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#F07730]">•</span>
                      <span className="text-gray-300">Discord community</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 11: Glossary */}
            <motion.section
              id="glossary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-8"
            >
              <p className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">📖</span>
                11. Glossary of Key Terms
              </p>
              <p className="text-gray-400 mb-6">
                Quick definitions of essential betting concepts.
              </p>

              <div className="space-y-4">
                {glossaryTerms.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/5 rounded-xl p-4 border border-white/10"
                  >
                    <h4 className="text-[#F07730] font-bold mb-1">
                      {item.term}
                    </h4>
                    <p className="text-gray-300 text-sm">{item.definition}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Final Note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-gradient-to-r from-[#F07730]/20 to-[#EFD28E]/20 rounded-2xl p-8 border border-[#F07730]/30"
            >
              <p className="text-gray-300 text-center">
                With these rules, Moonbet guarantees a fair, transparent, and
                secure on-chain casino experience. Always review the rules
                before playing, set your controls wisely, and enjoy provably
                honest crypto gambling on Moonbet.
              </p>
            </motion.div>
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
    </div>
  );
};

export default BettingRules;

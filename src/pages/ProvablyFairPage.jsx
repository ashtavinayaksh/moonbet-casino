import React, { useState } from "react";
import { motion } from "framer-motion";

const ResponsibleGambling = () => {
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [showAssessmentResult, setShowAssessmentResult] = useState(false);

  // Custom Icons
  const Heart = ({ className }) => (
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
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
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

  const Lock = ({ className }) => (
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
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );

  const Warning = ({ className }) => (
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
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  );

  const Phone = ({ className }) => (
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
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );

  const Mail = ({ className }) => (
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
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );

  const ExternalLink = ({ className }) => (
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
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );

  // Self-assessment questions
  const assessmentQuestions = [
    "Do you gamble more than you originally intended?",
    "Have you tried to win back losses by gambling more?",
    "Do you think about gambling when you're not playing?",
    "Have you borrowed money or sold possessions to fund gambling?",
    "Do friends or family express concern about your gambling?",
    "Do you feel anxious or irritable when not gambling?",
    "Have you lied about the time or money spent gambling?",
    "Do you gamble to escape problems or negative feelings?",
  ];

  const handleAssessmentAnswer = (questionIndex, answer) => {
    setAssessmentAnswers({
      ...assessmentAnswers,
      [questionIndex]: answer,
    });
  };

  const calculateAssessmentResult = () => {
    const yesCount = Object.values(assessmentAnswers).filter(
      (answer) => answer === "yes"
    ).length;
    setShowAssessmentResult(true);
    return yesCount;
  };

  const getAssessmentFeedback = (yesCount) => {
    if (yesCount === 0) {
      return {
        level: "low",
        message:
          "Great! Your gambling habits appear healthy. Keep enjoying responsible gaming!",
        color: "text-green-400",
      };
    } else if (yesCount <= 2) {
      return {
        level: "moderate",
        message:
          "You show some signs that warrant attention. Consider using our responsible gaming tools.",
        color: "text-yellow-400",
      };
    } else {
      return {
        level: "high",
        message:
          "Your answers suggest possible gambling concerns. We strongly recommend using our self-exclusion tools or seeking professional help.",
        color: "text-red-400",
      };
    }
  };

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F07730]/10 via-transparent to-[#EFD28E]/10" />
        <div className="container max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1
              className="text-5xl md:text-2xl font-bold mb-6 text-[#f7f7f7] 
                         bg-clip-text "
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Responsible Gambling at Moonbet
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              At Moonbet, we believe crypto gambling should be transparent,
              fair, and most importantly, fun. We're committed to creating a
              safe environment where players can enjoy decentralized gaming
              responsibly.
            </p>
            <div className="bg-[#F07730]/10 rounded-2xl p-6 border border-[#F07730]/30 max-w-3xl mx-auto">
              <p className="text-gray-300 italic">
                "Gambling should enhance your life, not control it. If you feel
                your gaming is becoming problematic, we encourage you to use our
                tools and resources or reach out for professional help."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Our Responsible Gambling Philosophy
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Unlike traditional casinos that profit from problem gambling,
              Moonbet's success depends on players having positive, sustainable
              experiences. Our near-zero house edge games and provably fair
              algorithms mean we win when you win, creating natural incentives
              for responsible play.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                text: "Instant transactions can accelerate spending patterns",
                icon: "⚡",
              },
              {
                text: "24/7 accessibility requires extra self-awareness",
                icon: "🌐",
              },
              {
                text: "Blockchain records provide perfect spending transparency",
                icon: "🔍",
              },
              {
                text: "No chargebacks mean all transactions are final",
                icon: "🔒",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="wallet-btn3 rounded-xl p-6 text-center"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="text-gray-300 text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gaming Tools Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
            style={{ fontFamily: "Neuropolitical, sans-serif" }}
          >
            Moonbet's Responsible Gaming Tools
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Cooling-Off Periods */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="wallet-btn3 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-8 h-8 text-[#F07730]" />
                <h3 className="text-2xl font-bold text-white">
                  Cooling-Off Periods
                </h3>
              </div>
              <p className="text-gray-300 mb-6">
                Take a temporary break from gaming when you need to step back
                and reassess. During cooling-off, your wallet remains connected,
                but all gaming functions are disabled.
              </p>

              <div className="mb-6">
                <h4 className="text-white font-bold mb-3">
                  Available durations:
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {["24 hours", "7 days", "1 month", "3 months"].map(
                    (duration) => (
                      <div
                        key={duration}
                        className="bg-white/5 rounded-lg px-4 py-2 text-center"
                      >
                        <span className="text-[#F07730] font-bold">
                          {duration}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                <h4 className="text-red-400 font-bold mb-2">
                  During cooling-off, you cannot:
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Place any bets or play games</li>
                  <li>• End the cooling-off period early</li>
                  <li>• Access promotional offers</li>
                </ul>
              </div>
            </motion.div>

            {/* Self-Exclusion */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="wallet-btn3 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-8 h-8 text-[#F07730]" />
                <h3 className="text-2xl font-bold text-white">
                  Self-Exclusion
                </h3>
              </div>
              <p className="text-gray-300 mb-6">
                For players who need a longer break or believe they may have a
                gambling problem, self-exclusion provides complete account
                suspension.
              </p>

              <div className="mb-6">
                <h4 className="text-white font-bold mb-3">
                  Available durations:
                </h4>
                <div className="space-y-2">
                  {[
                    "6 months",
                    "1 year",
                    "3 years",
                    "5 years",
                    "Lifetime (permanent)",
                  ].map((duration) => (
                    <div
                      key={duration}
                      className="bg-white/5 rounded-lg px-4 py-2"
                    >
                      <span className="text-[#F07730] font-bold">
                        {duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
                <Warning className="w-5 h-5 text-yellow-400 mb-2" />
                <p className="text-yellow-400 font-bold mb-1">Important:</p>
                <p className="text-gray-300 text-sm">
                  Self-exclusion cannot be reversed early. Your account will
                  only reactivate after the full period and upon written
                  request.
                </p>
              </div>
            </motion.div>
          </div>

          {/* On-chain Limits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="wallet-btn3 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#F07730]" />
              On-chain Spending Limits
            </h3>
            <p className="text-gray-300 mb-6">
              Leverage blockchain smart contracts to set immutable limits on
              your gaming activity. Once set, these limits cannot be bypassed
              until the time period expires.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "Deposit Limits",
                  desc: "Set maximum amounts you can deposit daily, weekly, or monthly",
                },
                {
                  title: "Loss Limits",
                  desc: "Cap total losses over specified timeframes",
                },
                {
                  title: "Bet Limits",
                  desc: "Restrict maximum bet sizes across all games",
                },
                {
                  title: "Session Time Limits",
                  desc: "Automatically disconnect after set gaming periods",
                },
              ].map((limit, i) => (
                <div
                  key={i}
                  className="bg-white/5 rounded-xl p-4 border border-white/10"
                >
                  <h4 className="text-[#F07730] font-bold mb-2">
                    {limit.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{limit.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Self-Assessment Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Self-Assessment Tools
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Regular self-evaluation helps maintain healthy gaming habits.
              Complete this assessment honestly to understand your relationship
              with gambling.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-3xl mx-auto"
          >
            <div className="wallet-btn3 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Quick Self-Assessment Questions
              </h3>

              <div className="space-y-4 mb-8">
                {assessmentQuestions.map((question, i) => (
                  <div
                    key={i}
                    className="bg-white/5 rounded-xl p-4 border border-white/10"
                  >
                    <p className="text-gray-300 mb-3">
                      {i + 1}. {question}
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleAssessmentAnswer(i, "yes")}
                        className={`px-6 py-2 rounded-lg transition-all ${
                          assessmentAnswers[i] === "yes"
                            ? "bg-[#F07730] text-black font-bold"
                            : "bg-white/10 text-gray-300 hover:bg-white/20"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleAssessmentAnswer(i, "no")}
                        className={`px-6 py-2 rounded-lg transition-all ${
                          assessmentAnswers[i] === "no"
                            ? "bg-green-500 text-white font-bold"
                            : "bg-white/10 text-gray-300 hover:bg-white/20"
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={calculateAssessmentResult}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#F07730] to-[#EFD28E] 
                         text-black font-bold rounded-xl hover:shadow-lg hover:shadow-[#F07730]/25 
                         transition-all mb-6"
              >
                Get Assessment Result
              </button>

              {showAssessmentResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                >
                  <h4 className="text-xl font-bold text-white mb-3">
                    Your Result
                  </h4>
                  <p
                    className={`text-lg ${
                      getAssessmentFeedback(
                        Object.values(assessmentAnswers).filter(
                          (a) => a === "yes"
                        ).length
                      ).color
                    }`}
                  >
                    {
                      getAssessmentFeedback(
                        Object.values(assessmentAnswers).filter(
                          (a) => a === "yes"
                        ).length
                      ).message
                    }
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Help & Support Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
            style={{ fontFamily: "Neuropolitical, sans-serif" }}
          >
            Professional Help & Support Organizations
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* International Resources */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="wallet-btn3 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">
                International Resources
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Gamblers Anonymous", url: "gamblersanonymous.org" },
                  { name: "GambleAware", url: "gambleaware.org" },
                  { name: "Gambling Therapy", url: "gamblingtherapy.org" },
                  {
                    name: "National Council on Problem Gambling",
                    url: "ncpgambling.org",
                  },
                ].map((resource, i) => (
                  <a
                    key={i}
                    href={`https://${resource.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 
                             hover:bg-white/10 transition-all group"
                  >
                    <span className="text-gray-300 group-hover:text-white">
                      {resource.name}
                    </span>
                    <ExternalLink className="w-4 h-4 text-[#F07730]" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Crisis Hotlines */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="wallet-btn3 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">
                Crisis Hotlines
              </h3>
              <div className="space-y-4">
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-5 h-5 text-red-400" />
                    <h4 className="text-red-400 font-bold">
                      National Problem Gambling Helpline
                    </h4>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    1-800-522-4700
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="text-white font-bold mb-2">
                    International Crisis Lines
                  </h4>
                  <p className="text-gray-300">
                    Available 24/7 in multiple languages
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="text-white font-bold mb-2">
                    Crypto-Specific Support
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Blockchain Gaming Addiction Support</li>
                    <li>• Digital Asset Management Counseling</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Blocking Software */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="wallet-btn3 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">
              Gambling Blocking Software
            </h3>
            <p className="text-gray-300 mb-6">
              Third-party applications can help restrict access to gambling
              websites as an additional protective measure:
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {[
                {
                  name: "Betblocker",
                  url: "betblocker.org",
                  desc: "Free blocking software",
                },
                {
                  name: "Gamban",
                  url: "gamban.com",
                  desc: "Comprehensive gambling blocker",
                },
                {
                  name: "GamBlock",
                  url: "gamblock.com",
                  desc: "Device-level protection",
                },
                {
                  name: "Cold Turkey",
                  url: "getcoldturkey.com",
                  desc: "Website and app blocker",
                },
              ].map((software, i) => (
                <a
                  key={i}
                  href={`https://${software.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all"
                >
                  <h4 className="text-[#F07730] font-bold mb-1">
                    {software.name}
                  </h4>
                  <p className="text-gray-400 text-sm">{software.desc}</p>
                </a>
              ))}
            </div>

            <p className="text-gray-500 text-sm italic">
              *Moonbet is not responsible for third-party software functionality
              or effectiveness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Protecting Minors Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Protecting Minors
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Moonbet is strictly for users 18 years and older. We take underage
              gambling prevention seriously and employ multiple safeguards.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="wallet-btn3 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">
                Prevention Measures
              </h3>
              <ul className="space-y-3">
                {[
                  "Age verification through blockchain identity protocols",
                  "Automated detection of suspicious account patterns",
                  "Immediate account suspension for suspected minors",
                  "No winnings paid to underage accounts (funds returned to deposit source)",
                ].map((measure, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#F07730] mt-0.5" />
                    <span className="text-gray-300">{measure}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="wallet-btn3 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">
                Protect Your Household
              </h3>
              <p className="text-gray-300 mb-4">
                If you share devices with minors:
              </p>
              <ul className="space-y-2">
                {[
                  "Always disconnect your wallet when finished gaming",
                  "Use strong, unique passwords and never save credentials",
                  "Store wallet recovery phrases securely away from children",
                  "Install gambling blocking software on shared devices",
                  "Educate children about gambling risks and legal age requirements",
                  "Monitor device usage and internet activity",
                ].map((tip, i) => (
                  <li
                    key={i}
                    className="text-gray-300 text-sm flex items-start gap-2"
                  >
                    <span className="text-[#F07730]">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fair Play Commitment */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
            style={{ fontFamily: "Neuropolitical, sans-serif" }}
          >
            Our Commitment to Fair Play
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Provably Fair Gaming",
                desc: "Every game outcome is verifiable on the Solana blockchain. Players can independently verify that results weren't manipulated.",
                icon: <Shield className="w-8 h-8" />,
              },
              {
                title: "Transparent RTPs",
                desc: "All Return to Player percentages are clearly displayed and verifiable. Our original games feature near-zero house edges.",
                icon: "📊",
              },
              {
                title: "No Predatory Practices",
                desc: "No misleading promotions, clear communication about risks, no targeting of vulnerable players, honest marketing.",
                icon: <Heart className="w-8 h-8" />,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="wallet-btn3 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-[#F07730]/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-[#F07730]">
                  {typeof item.icon === "string" ? (
                    <span className="text-2xl">{item.icon}</span>
                  ) : (
                    item.icon
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Contact Us for Help
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Our support team is trained in responsible gambling assistance and
              available 24/7.
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="wallet-btn3 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Immediate Support:
                </h3>

                <div className="space-y-4 mb-8">
                  <a
                    href="#"
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                  >
                    <span className="text-2xl">💬</span>
                    <div className="text-left">
                      <h4 className="text-white font-bold">Live Chat</h4>
                      <p className="text-gray-400 text-sm">
                        Available 24/7 on Moonbet.games
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:support@moonbet.games"
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                  >
                    <Mail className="w-6 h-6 text-[#F07730]" />
                    <div className="text-left">
                      <h4 className="text-white font-bold">Email Support</h4>
                      <p className="text-gray-400 text-sm">
                        support@moonbet.games
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:contact@moonbet.games"
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                  >
                    <Mail className="w-6 h-6 text-[#F07730]" />
                    <div className="text-left">
                      <h4 className="text-white font-bold">
                        Responsible Gaming Specialist
                      </h4>
                      <p className="text-gray-400 text-sm">
                        contact@moonbet.games
                      </p>
                    </div>
                  </a>
                </div>

                <div className="bg-[#F07730]/10 rounded-xl p-6 border border-[#F07730]/30">
                  <h4 className="text-[#F07730] font-bold mb-2">
                    For Serious Concerns:
                  </h4>
                  <p className="text-gray-300 text-sm">
                    If you believe you have a gambling problem, contact our
                    Responsible Gaming Specialist directly at
                    support@moonbet.games. All communications are confidential
                    and handled with complete discretion.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Message */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-[#F07730]/20 to-[#EFD28E]/20 rounded-2xl p-8 border border-[#F07730]/30 text-center"
          >
            <Heart className="w-12 h-12 text-[#F07730] mx-auto mb-4" />
            <p className="text-lg text-white font-bold mb-4">
              Remember: Gambling should be entertainment, not a way to make
              money or solve financial problems.
            </p>
            <p className="text-gray-300">
              At Moonbet, we're committed to ensuring your crypto gaming
              experience remains positive, transparent, and under your control.
            </p>
            <p className="text-gray-500 text-sm mt-6">
              Last Updated: September 29, 2025
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ResponsibleGambling;

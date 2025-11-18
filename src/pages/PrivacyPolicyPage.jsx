import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicyPage = () => {
  // Custom SVG Icon Component
  const PolicyIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 20 20"
      fill="none"
      className="w-6 h-6"
    >
      <path
        d="M19.4823 8.75592L17.1303 6.4017C16.1631 5.43353 16.7542 4.41157 17.8082 4.34951C19.5443 4.24194 20.5198 2.38835 19.102 0.845078C17.5602 -0.569936 15.7166 0.402369 15.6092 2.13597C15.543 3.19102 14.5138 3.78682 13.5507 2.82279L11.2483 0.518218C10.558 -0.172739 9.43784 -0.172739 8.74755 0.518218L6.41624 2.85175C5.449 3.81992 4.42389 3.21998 4.35776 2.16493C4.25028 0.427194 2.3902 -0.561661 0.848403 0.85749C-0.573525 2.4049 0.414385 4.26676 2.15046 4.37434C3.20451 4.44054 3.80386 5.47077 2.84076 6.43893L0.517722 8.76005C-0.172574 9.45101 -0.172574 10.5723 0.517722 11.2632L2.82009 13.5678C3.78733 14.5318 3.21277 15.5372 2.15873 15.6034C0.422651 15.711 -0.548724 17.5604 0.869071 19.1037C2.41087 20.5229 4.25028 19.5547 4.35776 17.817C4.42389 16.7619 5.43247 16.1827 6.39971 17.1467L8.72274 19.472C9.42544 20.1753 10.5746 20.1753 11.2773 19.4761L13.6044 17.1467C14.5179 16.1909 13.9268 15.1855 12.8852 15.1193C11.1491 15.0118 10.1653 13.1499 11.5831 11.6066C13.1249 10.1875 14.985 11.1763 15.0925 12.9141C15.1586 13.9567 16.1589 14.5442 17.1138 13.6299L19.4492 11.2922C19.4533 11.288 19.4533 11.288 19.4575 11.2839L19.4823 11.2591C20.1726 10.5681 20.1726 9.44687 19.4823 8.75592Z"
        fill="url(#gradient1)"
      />
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F07730" />
          <stop offset="100%" stopColor="#EFD28E" />
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <section className="w-full min-h-screen bg-[#080808] py-12 md:py-16 lg:py-20">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="wallet-btn3 rounded-2xl pb-6 text-center"
        >
          <div className="flex items-center gap-4 ">
            <PolicyIcon />
            <h1 className="font-bold text-[#CED5E3] uppercase">
              Privacy Policy
            </h1>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Introduction */}
          <div className="wallet-btn3 rounded-2xl">
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              This Privacy Policy describes how Moonbet Operations Ltd.
              ("Moonbet," "we," "us," or "our") collects, uses, maintains, and
              discloses information collected from users of our decentralized
              crypto casino platform at Moonbet.games. It applies to all
              products and services offered through our platform.
            </p>
          </div>

          {/* Section 1 */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">1.</span> Moonbet Statement
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              Moonbet is committed to protecting and respecting your privacy
              while maintaining player trust. We collect only the data necessary
              to provide fair, transparent blockchain gaming and never sell user
              information.
            </p>
          </div>

          {/* Section 2 */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">2.</span> Data Controller
            </h2>
            <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
              <p className="text-gray-300 text-sm md:text-base">
                <span className="text-[#F07730] font-bold">
                  Data Controller:
                </span>{" "}
                Moonbet
                <br />
                <span className="text-[#F07730] font-bold">DPM:</span> Privacy
                Manager
                <br />
                <span className="text-[#F07730] font-bold">Email:</span>{" "}
                <a
                  href="mailto:support@moonbet.games"
                  className="text-[#EFD28E] hover:text-[#F07730] transition-colors"
                >
                  support@moonbet.games
                </a>
              </p>
            </div>
            <p className="text-gray-400 mt-4 text-sm md:text-base">
              You may contact our Data Privacy Manager with any questions or
              concerns. We encourage players to reach out before contacting
              regulators.
            </p>
          </div>

          {/* Section 3 */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">3.</span> Information We Collect
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
              {[
                { label: "Identity Data", value: "Username or display name" },
                { label: "Contact Data", value: "Email (optional)" },
                {
                  label: "Crypto Data",
                  value: "Wallet address, blockchain records",
                },
                {
                  label: "Transaction Data",
                  value: "Deposits, withdrawals, bets, and wins",
                },
                {
                  label: "Technical Data",
                  value: "IP, browser info, device type",
                },
                {
                  label: "Profile Data",
                  value: "Preferences, feedback, session behavior",
                },
                {
                  label: "Cookies",
                  value: "Used to enhance experience and keep users logged in",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/5 rounded-lg p-3 md:p-4 border border-white/10"
                >
                  <span className="text-[#F07730] font-bold text-sm">
                    {item.label}:
                  </span>
                  <p className="text-gray-300 text-sm mt-1">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 4 */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">4.</span> How We Use Your Data
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              We process your data to operate, improve, and secure the Moonbet
              platform. Data use includes account registration, bet processing,
              transaction handling, platform analytics, and fraud prevention.
            </p>
          </div>

          {/* Section 5 */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">5.</span> Data Security
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                "Solana blockchain security",
                "Fireblocks integration",
                "End-to-end encryption",
                "Regular security audits",
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#F07730]/10 to-transparent rounded-lg p-4 border border-[#F07730]/30 text-center"
                >
                  <p className="text-gray-300 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6 */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">6.</span> Data Retention
            </h2>
            <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
              <p className="text-gray-300 text-sm md:text-base mb-3">
                We retain data only as long as necessary:
              </p>
              <div className="space-y-2">
                {[
                  { type: "Account data", period: "active period + 6 years" },
                  { type: "Transaction records", period: "6 years" },
                  { type: "Support logs", period: "3 years" },
                  { type: "Blockchain data", period: "permanently" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"
                  >
                    <span className="text-gray-400 text-sm">{item.type}</span>
                    <span className="text-[#F07730] font-bold text-sm">
                      {item.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sections 7-9 */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {/* Marketing */}
            <div className="wallet-btn3 rounded-2xl">
              <h3
                className="text-lg font-bold text-white mb-3"
                style={{ fontFamily: "Neuropolitical, sans-serif" }}
              >
                <span className="text-[#F07730]">7.</span> Marketing
              </h3>
              <p className="text-gray-300 text-sm">
                Players may receive promotions relevant to their gameplay. Opt
                out anytime via links or support.
              </p>
            </div>

            {/* Cookies */}
            <div className="wallet-btn3 rounded-2xl">
              <h3
                className="text-lg font-bold text-white mb-3"
                style={{ fontFamily: "Neuropolitical, sans-serif" }}
              >
                <span className="text-[#F07730]">8.</span> Cookies
              </h3>
              <p className="text-gray-300 text-sm">
                We use cookies to enhance usability and secure gameplay
                including analytical and security cookies.
              </p>
            </div>

            {/* Your Rights */}
            <div className="wallet-btn3 rounded-2xl">
              <h3
                className="text-lg font-bold text-white mb-3"
                style={{ fontFamily: "Neuropolitical, sans-serif" }}
              >
                <span className="text-[#F07730]">9.</span> Your Rights
              </h3>
              <p className="text-gray-300 text-sm">
                You have rights to access, correct, delete, restrict, or
                transfer your personal data.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">10.</span> Contact
            </h2>
            <p className="text-gray-300 mb-4 text-sm md:text-base">
              For any privacy concerns or requests, reach out via:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:support@moonbet.games"
                className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
              >
                <span className="text-[#F07730]">📧</span>
                <span className="text-gray-300">support@moonbet.games</span>
              </a>
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-[#F07730]">💬</span>
                <span className="text-gray-300">24/7 Live Chat</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;

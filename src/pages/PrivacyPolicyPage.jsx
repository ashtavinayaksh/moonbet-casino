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
            <h1 className="font-bold text-[#CED5E3] uppercase text-2xl md:text-4xl lg:text-4xl">
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
              This Privacy Policy describes how Moonbet Games LLC ("Moonbet,"
              "we," "us," or "our") collects, uses, maintains, and discloses
              information collected from users of our decentralized crypto
              casino platform at Moonbet.games. This Privacy Policy applies to
              moonbet.games and all products and services offered through our
              platform.
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
              while maintaining the confidence and trust of our players. This
              Privacy Policy explains how your personal information is
              collected, why it is collected, and how it is kept secure. We
              collect only what is necessary to provide fair, transparent gaming
              on the blockchain and to comply with applicable legal and
              regulatory obligations.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              This Privacy Policy is issued in accordance with the General Data
              Protection Regulation (EU) 2016/679 ("GDPR") and other applicable
              data protection laws and regulations.
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
                  Full name of data controller:
                </span>{" "}
                Moonbet Games LLC
                <br />
                <span className="text-[#F07730] font-bold">
                  Registered Address:
                </span>
                <br />
                <span className="text-[#F07730] font-bold">
                  Registration Number:
                </span>{" "}
                <br />
                <span className="text-[#F07730] font-bold">
                  Name or title of Data Privacy Manager (DPM):
                </span>{" "}
                Privacy Manager
                <br />
                <span className="text-[#F07730] font-bold">
                  Email address:
                </span>{" "}
                <a
                  href="mailto:support@moonbet.games"
                  className="text-[#EFD28E] hover:text-[#F07730] transition-colors"
                >
                  support@moonbet.games
                </a>
              </p>
            </div>
            <p className="text-gray-400 mt-4 text-sm md:text-base">
              We have appointed a Data Privacy Manager (DPM) who is responsible
              for overseeing questions in relation to this Privacy Policy. If
              you have any questions about this Privacy Policy, including any
              requests to exercise your legal rights, please contact the DPM
              using the details above.
            </p>
            <p className="text-gray-400 mt-4 text-sm md:text-base">
              You have the right to make a complaint at any time to the relevant
              supervisory authority for data protection issues. We would,
              however, appreciate the chance to deal with your concerns before
              you approach any regulator, so please contact us in the first
              instance.
            </p>
          </div>

          {/* Section 3 */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">3.</span> CHANGES TO THE PRIVACY
              POLICY AND YOUR DUTY TO INFORM US OF CHANGES
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-4">
              We keep our Privacy Policy under regular review. This version was
              last updated on November 18, 2025.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-4">
              It is important that the personal data we hold about you is
              accurate and current. Please keep us informed if your personal
              data changes during your relationship with us.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-4">
              Any changes we may make to our Privacy Policy in the future will
              be posted on this page and any such changes will become effective
              upon posting of the revised Privacy Policy. If we make any
              material or substantial changes to this Privacy Policy, we will
              use reasonable endeavors to inform you by email, notice on the
              platform, or other agreed communication channels.
            </p>
          </div>

          {/* Section 4 */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">4.</span> THIRD-PARTY LINKS
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-4">
              Our platform may include links to third-party websites, plug-ins,
              and applications. Clicking on those links or enabling those
              connections may allow third parties to collect or share data about
              you. We do not control these third-party websites and are not
              responsible for their privacy statements. When you leave our
              website, we encourage you to read the privacy notice or policy of
              every website you visit.
            </p>
          </div>

          {/* Section 5 */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">5.</span> THE DATA WE COLLECT
              ABOUT YOU
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-4">
              Personal data, or personal information, means any information
              about an individual from which that person can be identified. It
              does not include data where the identity has been removed
              (anonymous data).
            </p>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-4">
              We may collect, use, store, and transfer different kinds of
              personal data about you which we have grouped together as follows:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mt-4">
              {[
                {
                  label: "Identity Data",
                  value:
                    "Username or similar identifier, nickname, display name, date of birth, copies of identification documents (passport, national ID, driver's license), video or photographic identification records.",
                },
                {
                  label: "Contact Data",
                  value:
                    "Email address, telephone number, correspondence address (if provided voluntarily).",
                },
                {
                  label: "Financial Data:",
                  value:
                    "Wallet addresses, blockchain transaction records, cryptocurrency balances, details of income sources, monthly income levels.",
                },
                {
                  label: "Transaction Data",
                  value:
                    "Details about deposits, withdrawals, bets, wins, losses, bonuses, and other activities using our platform.",
                },
                {
                  label: "Technical Data",
                  value:
                    "Internet protocol (IP) address, login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, device identifiers, and other technology on the devices you use to access our platform.",
                },
                {
                  label: "Usage Data",
                  value:
                    "Information about how you use our platform, games played, session duration, navigation paths, and interaction patterns.",
                },
                {
                  label: "Marketing and Communications Data",
                  value:
                    "Your preferences in receiving promotions from us and your communication preferences.",
                },
                {
                  label: "Occupational Data",
                  value:
                    "Type of occupation, employment status, countries related to your occupation.",
                },
                {
                  label: "Compliance Data",
                  value:
                    "Information relating to your status as a Politically Exposed Person (PEP) or association with PEPs, information required for anti-money laundering (AML) and Know Your Customer (KYC) compliance.",
                },
                {
                  label: "Cookies",
                  value:
                    "We use cookies to improve the user experience and gather general statistics about users of our platform. Among other things, cookies allow you to stay logged in. We use both First Party Cookies (set by us) and Third Party Cookies (set by approved third parties to monitor the platform and improve user experience). Further details are provided in Section 12.",
                },
                {
                  label: "Aggregated Data",
                  value:
                    "We may also collect, use, and share Aggregated Data, such as statistical or demographic data, for any purpose. Aggregated Data may be derived from your personal data but is not considered personal data in law, as this data does not directly or indirectly reveal your identity. However, if we combine or connect Aggregated Data with your personal data so that it can directly or indirectly identify you, we treat the combined data as personal data.",
                },
                {
                  label: "Special Categories of Personal Data",
                  value:
                    "We do not collect any Special Categories of Personal Data about you (this includes details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, information about your health, and genetic and biometric data). Nor do we collect any information about criminal convictions and offences unless required by law for AML/KYC compliance purposes.",
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

          {/* Section 6 */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">6.</span> IF YOU FAIL TO PROVIDE
              PERSONAL DATA
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-4">
              Where we need to collect personal data by law, or under the terms
              of our service agreement, and you fail to provide that data when
              requested, we may not be able to provide you access to our
              platform or provide you with gaming services. In this case, we may
              not be able to provide the service in question, and we reserve the
              right to suspend or terminate your account.
            </p>
          </div>

          {/* Section 7 - How Personal Data is Collected */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">7.</span> HOW IS YOUR PERSONAL
              DATA COLLECTED?
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
              We use different methods to collect personal data from and about
              you, including through:
            </p>

            {/* Direct Interactions */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                Direct Interactions
              </h3>
              <p className="text-gray-300 text-sm md:text-base mb-3">
                You may give us your Identity, Contact, Financial, Occupational,
                and Compliance Data by filling in forms or by corresponding with
                us by post, phone, email, or otherwise. This includes personal
                data you provide when you:
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 ml-4">
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Connect your wallet for gameplay
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Register for an account
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Subscribe to our services or publications
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Request marketing materials to be sent to you
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Enter a competition, promotion, or survey
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Provide information through support communications
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Provide feedback or contact us
                  </span>
                </li>
              </ul>
            </div>

            {/* Automated Technologies */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                Automated Technologies or Interactions
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                As you interact with our platform, we will automatically collect
                Technical Data about your equipment, browsing actions, and
                patterns. We collect this personal data by using cookies, server
                logs, and other similar technologies.
              </p>
            </div>

            {/* Blockchain Networks */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                Blockchain Networks
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                Transaction data is automatically recorded on the blockchain
                (Solana or other networks we operate on) and is publicly
                viewable due to the inherent nature of blockchain technology.
              </p>
            </div>

            {/* Third Parties */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                Third Parties or Publicly Available Sources
              </h3>
              <p className="text-gray-300 text-sm md:text-base mb-3">
                We may receive personal data about you from various third
                parties and public sources, including:
              </p>
              <ul className="grid sm:grid-cols-2 gap-3">
                <li className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-300 text-sm">
                    Analytics providers of anonymous usage statistics
                  </p>
                </li>
                <li className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-300 text-sm">
                    Technical service providers
                  </p>
                </li>
                <li className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-300 text-sm">
                    Payment service providers and cryptocurrency exchanges
                  </p>
                </li>
                <li className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-300 text-sm">
                    Fraud prevention and security service providers
                  </p>
                </li>
                <li className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-300 text-sm">
                    Public blockchain data (inherently public transaction
                    records)
                  </p>
                </li>
                <li className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-300 text-sm">
                    Identity verification service providers
                  </p>
                </li>
                <li className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-300 text-sm">
                    Credit reference agencies and fraud prevention agencies
                  </p>
                </li>
                <li className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-300 text-sm">
                    Law enforcement and regulatory authorities
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 8 - How We Use Your Personal Data */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">8.</span> HOW WE USE YOUR
              PERSONAL DATA
            </h2>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
              We will only use your personal data when the law allows us to.
              Most commonly, we will use your personal data in the following
              circumstances:
            </p>

            <ul className="grid gap-3 mb-6">
              <li className="flex items-start md:items-center gap-2">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Where we need to perform the contract we are about to enter
                  into or have entered into with you.
                </span>
              </li>
              <li className="flex items-start md:items-center gap-2">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Where it is necessary for our legitimate interests (or those
                  of a third party) and your interests and fundamental rights do
                  not override those interests.
                </span>
              </li>
              <li className="flex items-start md:items-center gap-2">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Where we need to comply with a legal or regulatory obligation.
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
              Generally, we do not rely on consent as a legal basis for
              processing your personal data, although in limited circumstances
              we may get your consent before sending promotional communications
              to you via email or before collecting certain optional data. You
              have the right to withdraw consent to marketing at any time by
              contacting us.
            </p>

            {/* Purposes Table */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-4">
                PURPOSES FOR WHICH WE WILL USE YOUR PERSONAL DATA
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="bg-black text-white font-bold p-3 text-sm text-left rounded-l-lg">
                        Purpose / Activity
                      </th>
                      <th className="bg-black text-white font-bold p-3 text-sm text-left">
                        Type of Data
                      </th>
                      <th className="bg-black text-white font-bold p-3 text-sm text-left rounded-r-lg">
                        Lawful Basis for Processing
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          To register you as a new user of the platform
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Identity (b) Contact (c) Financial
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Performance of a contract with you (b) Necessary
                          for our legitimate interests (to provide gaming
                          services to you)
                        </p>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          To process your gaming transactions including
                          deposits, withdrawals, and bet processing
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Identity (b) Financial (c) Transaction (d) Profile
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Performance of a contract with you (b) Necessary
                          for our legitimate interests (to enable us to provide
                          gaming services)
                        </p>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          To verify your identity and conduct Know Your Customer
                          (KYC) checks
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Identity (b) Contact (c) Financial (d)
                          Occupational (e) Compliance
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Necessary to comply with a legal obligation (b)
                          Necessary for our legitimate interests (to prevent
                          fraud and comply with AML regulations)
                        </p>
                      </td>
                    </tr>
                    {/* Row 4 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          To conduct anti-money laundering (AML) checks and
                          monitor for suspicious activity
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Identity (b) Financial (c) Transaction (d)
                          Compliance (e) Occupational
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Necessary to comply with a legal obligation (b)
                          Necessary for our legitimate interests (to prevent
                          money laundering and comply with regulatory
                          requirements)
                        </p>
                      </td>
                    </tr>
                    {/* Row 5 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          To manage our relationship with you, including: (a)
                          Notifying you about changes to our terms or privacy
                          policy (b) Asking you to provide feedback or complete
                          surveys
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Identity (b) Contact (c) Profile (d) Marketing and
                          Communications
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Performance of a contract with you (b) Necessary
                          to comply with a legal obligation (c) Necessary for
                          our legitimate interests (to improve the service and
                          maintain customer relationships)
                        </p>
                      </td>
                    </tr>
                    {/* Row 6 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          To maintain and update the platform and develop
                          additional features and functionality
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Identity (b) Profile (c) Usage (d) Technical
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Necessary for our legitimate interests (to assist
                          us in delivery of services to you and improve platform
                          performance)
                        </p>
                      </td>
                    </tr>
                    {/* Row 7 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          To administer and protect our business and platform
                          (including troubleshooting, data analysis, testing,
                          system maintenance, support, reporting, and hosting of
                          data)
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Identity (b) Technical (c) Usage
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Necessary for our legitimate interests (for
                          running our business, provision of administration and
                          IT services, network security, to prevent fraud) (b)
                          Necessary to comply with a legal obligation
                        </p>
                      </td>
                    </tr>
                    {/* Row 8 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          To use data analytics to improve the platform,
                          products/services, and player relationships and
                          experiences
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Technical (b) Usage (c) Profile
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Necessary for our legitimate interests (to improve
                          our platform and ensure it is appropriate and relevant
                          to users)
                        </p>
                      </td>
                    </tr>
                    {/* Row 9 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          To make suggestions and recommendations about games or
                          services that may interest you
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Identity (b) Technical (c) Usage (d) Profile (e)
                          Marketing and Communications
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Necessary for our legitimate interests (to develop
                          our products/services and grow our business)
                        </p>
                      </td>
                    </tr>
                    {/* Row 10 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          To monitor transactions for preventing fraud,
                          irregular betting, money laundering, and cheating
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Identity (b) Financial (c) Transaction (d) Profile
                          (e) Technical
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Necessary to comply with a legal obligation (b)
                          Necessary for our legitimate interests (to prevent
                          fraud and ensure fair gaming)
                        </p>
                      </td>
                    </tr>
                    {/* Row 11 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          To share information with fraud prevention agencies
                          and law enforcement to prevent illegal activity
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Identity (b) Financial (c) Transaction (d)
                          Compliance
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Necessary to comply with a legal obligation (b)
                          Necessary for our legitimate interests (to prevent
                          crime and protect our business and customers)
                        </p>
                      </td>
                    </tr>
                    {/* Row 12 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          To process recruitment applications (if applicable)
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Identity (b) Contact (c) Profile
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Necessary for our legitimate interests (to recruit
                          and assess potential employees) (b) Consent (where
                          applicable)
                        </p>
                      </td>
                    </tr>
                    {/* Row 13 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          To provide customer support services
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Identity (b) Contact (c) Technical (d) Transaction
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          (a) Performance of a contract with you (b) Necessary
                          for our legitimate interests (to provide customer
                          service and resolve issues)
                        </p>
                      </td>
                    </tr>

                    {/* Add more rows as needed following the same pattern */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section 9 - Marketing */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">9.</span> MARKETING
            </h2>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
              We strive to provide you with choices regarding certain personal
              data uses, particularly around marketing and advertising.
            </p>

            {/* Promotional offers from us */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                Promotional offers from us
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                We may use your Identity, Contact, Technical, Usage, and Profile
                Data to form a view on what we think you may want or need, or
                what may be of interest to you. This is how we decide which
                products, services, and offers may be relevant for you (we call
                this marketing).
              </p>
              <p className="text-gray-300 text-sm md:text-base mt-3">
                You will receive marketing communications from us if you have
                requested information from us or used our gaming services and
                you have not opted out of receiving that marketing.
              </p>
            </div>

            {/* Third-party marketing */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                Third-party marketing
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                We will get your express opt-in consent before we share your
                personal data with any third party for marketing purposes.
              </p>
            </div>

            {/* Opting out */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">Opting out</h3>
              <p className="text-gray-300 text-sm md:text-base">
                You can ask us or third parties to stop sending you marketing
                messages at any time by following the opt-out links on any
                marketing message sent to you or by contacting us at any time.
              </p>
              <p className="text-gray-300 text-sm md:text-base mt-3">
                Where you opt out of receiving these marketing messages, this
                will not apply to personal data provided to us as a result of
                gaming services, service experience, or other transactions.
              </p>
            </div>
          </div>

          {/* Section 10 - Anti-Money Laundering (AML) and Fraud Prevention */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">10.</span> ANTI-MONEY LAUNDERING
              (AML) AND FRAUD PREVENTION
            </h2>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
              We are committed to preventing money laundering, fraud, and other
              illegal activities on our platform. To fulfill our legal
              obligations and protect our business and customers, we:
            </p>

            <ul className="grid sm:grid-cols-2 gap-3">
              <li className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-gray-300 text-sm">
                  <span className="font-bold text-white">
                    Conduct KYC checks:
                  </span>{" "}
                  We verify the identity of our users by collecting and
                  verifying Identity, Contact, Financial, Occupational, and
                  Compliance Data.
                </p>
              </li>
              <li className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-gray-300 text-sm">
                  <span className="font-bold text-white">
                    Monitor transactions:
                  </span>{" "}
                  We monitor deposits, withdrawals, betting patterns, and other
                  financial activities for suspicious behavior, irregular
                  patterns, and potential money laundering.
                </p>
              </li>
              <li className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-gray-300 text-sm">
                  <span className="font-bold text-white">
                    Share data with relevant authorities:
                  </span>{" "}
                  We may share your personal data with law enforcement agencies,
                  regulatory bodies, financial intelligence units, fraud
                  prevention agencies, and credit reference agencies where
                  required by law or necessary to prevent illegal activity.
                </p>
              </li>
              <li className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-gray-300 text-sm">
                  <span className="font-bold text-white">
                    Maintain industry databases:
                  </span>{" "}
                  We may contribute to and access industry-wide databases that
                  track fraudulent activity, suspicious accounts, and
                  individuals engaged in illegal activities related to online
                  gaming.
                </p>
              </li>
              <li className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-gray-300 text-sm">
                  <span className="font-bold text-white">
                    Assess PEP status:
                  </span>{" "}
                  We collect information on whether you are a Politically
                  Exposed Person (PEP) or have associations with PEPs, as
                  required by AML regulations.
                </p>
              </li>
              <li className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-gray-300 text-sm">
                  <span className="font-bold text-white">Record keeping:</span>{" "}
                  We retain transaction and identification records for the
                  periods required by law (typically 10 years from the last
                  transaction or account closure) to comply with AML
                  regulations.
                </p>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-6">
              Failure to provide information required for AML and KYC purposes
              may result in suspension or termination of your account and our
              inability to provide gaming services to you.
            </p>
          </div>

          {/* Section 11 - Data Security */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">11.</span> DATA SECURITY
            </h2>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
              We have put in place appropriate security measures to prevent your
              personal data from being accidentally lost, used or accessed in an
              unauthorized way, altered, or disclosed. In addition, we limit
              access to your personal data to those employees, agents,
              contractors, and other third parties who have a business need to
              know. They will only process your personal data on our
              instructions and they are subject to a duty of confidentiality.
            </p>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-3">
              Our security measures include:
            </p>

            <ul className="grid sm:grid-cols-2 gap-2 ml-4 mb-6">
              <li className="flex items-start md:items-center gap-2">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Blockchain Security: Utilizing proven decentralized network
                  security (Solana or other blockchain networks).
                </span>
              </li>
              <li className="flex items-start md:items-center gap-2">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Fireblocks Integration: Enterprise-grade custody and key
                  management security for cryptocurrency storage and
                  transactions.
                </span>
              </li>
              <li className="flex items-start md:items-center gap-2">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Encryption: Industry-standard encryption (SSL/TLS) for all
                  data transmission between your device and our servers.
                </span>
              </li>
              <li className="flex items-start md:items-center gap-2">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Access Controls: Role-based access controls ensuring only
                  authorized personnel can access personal data.
                </span>
              </li>
              <li className="flex items-start md:items-center gap-2">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Regular Security Audits: Ongoing security assessments,
                  penetration testing, and vulnerability testing conducted by
                  third-party security experts.
                </span>
              </li>
              <li className="flex items-start md:items-center gap-2">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Multi-Factor Authentication: Available for user accounts to
                  enhance security.
                </span>
              </li>
              <li className="flex items-start md:items-center gap-2">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Secure Data Storage: Personal data stored on secure servers
                  with restricted physical and digital access.
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              We have put in place procedures to deal with any suspected
              personal data breach and will notify you and any applicable
              regulator of a breach where we are legally required to do so,
              typically within 72 hours of becoming aware of the breach.
            </p>
          </div>

          {/* Section 12 - Use of Cookies */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">12.</span> USE OF COOKIES
            </h2>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
              We use cookies as a means of collecting information from a web
              server for the purposes outlined in this Privacy Policy, following
              a player's use of our platform.
            </p>

            {/* WHAT ARE COOKIES */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                WHAT ARE COOKIES
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                Cookies are small files of letters and numbers that we store on
                your browser or the hard drive of your computer if you agree.
                They help us to improve our platform and deliver a more
                personalized service. Cookies contain information that is
                transferred to your computer's hard drive. Some of the cookies
                we use are essential for the platform to operate.
              </p>
            </div>

            {/* COOKIES WE USE AND THEIR PURPOSE */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                COOKIES WE USE AND THEIR PURPOSE
              </h3>
              <p className="text-gray-300 text-sm md:text-base mb-4">
                We use 6 types of cookies on our platform:
              </p>

              <ol className="grid sm:grid-cols-2 gap-3">
                <li className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-300 text-sm">
                    <span className="text-[#F07730] font-bold">
                      1. Strictly necessary cookies:
                    </span>{" "}
                    These are cookies that are required for the operation of our
                    platform. For example, if you connect your wallet to the
                    platform, we use a cookie to keep you logged in and allow
                    you to access gaming areas.
                  </p>
                </li>
                <li className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-300 text-sm">
                    <span className="text-[#F07730] font-bold">
                      2. Analytical or performance cookies:
                    </span>{" "}
                    These allow us to recognize and count the number of visitors
                    and to see how visitors move around our platform when they
                    are using it. This helps us to improve the way our platform
                    works, for example, by ensuring that users are finding what
                    they are looking for easily.
                  </p>
                </li>
                <li className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-300 text-sm">
                    <span className="text-[#F07730] font-bold">
                      3. Functionality cookies:
                    </span>{" "}
                    These are used to recognize you when you return to our
                    platform. This enables us to personalize content for you,
                    greet you by name, and remember your preferences (for
                    example, your choice of games, display settings, or
                    language).
                  </p>
                </li>
                <li className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-300 text-sm">
                    <span className="text-[#F07730] font-bold">
                      4. Session cookies:
                    </span>{" "}
                    These cookies assist in managing your session and navigation
                    throughout the platform. They expire when you close your
                    browser.
                  </p>
                </li>
                <li className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-300 text-sm">
                    <span className="text-[#F07730] font-bold">
                      5. Security cookies:
                    </span>{" "}
                    These cookies help us prevent fraudulent activities on our
                    platform and ensure secure gaming sessions by detecting
                    unusual or suspicious behavior.
                  </p>
                </li>
                <li className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-300 text-sm">
                    <span className="text-[#F07730] font-bold">
                      6. Social media cookies:
                    </span>{" "}
                    These cookies allow you to share content on social media
                    platforms directly from our website.
                  </p>
                </li>
              </ol>
            </div>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              You can set your browser to refuse all or some cookies, or to
              alert you when websites set or access cookies. If you disable or
              refuse cookies, please note that some parts of our platform may
              become inaccessible or not function properly.
            </p>
          </div>

          {/* Section 13 */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">13.</span> PHONE CALLS AND
              CUSTOMER SUPPORT COMMUNICATIONS
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-4">
              Phone calls, live chat conversations, and other communications
              with our Customer Support Team may be recorded and retained for
              training and security purposes, along with the resolution of any
              queries arising from the service you receive. These recordings are
              retained for 2 years from the date of the last contact.
            </p>
          </div>

          {/* Section 14 - International Data Transfers */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">14.</span> INTERNATIONAL DATA
              TRANSFERS
            </h2>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
              Given that the internet is a global environment, using the
              internet to collect and process personal data necessarily involves
              the transmission of data on an international basis. Some of the
              data processors engaged to process personal data may be based
              outside your jurisdiction.
            </p>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-3">
              Whenever we transfer your personal data internationally, we ensure
              a similar degree of protection is afforded to it by ensuring at
              least one of the following safeguards is implemented:
            </p>

            <ul className="grid gap-3 mb-6">
              <li className="flex items-start md:items-center gap-2">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  We will only transfer your personal data to countries that
                  have been deemed to provide an adequate level of protection
                  for personal data by the relevant authorities.
                </span>
              </li>
              <li className="flex items-start md:items-center gap-2">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Where we use certain service providers, we may use specific
                  contracts approved by relevant data protection authorities
                  (such as Standard Contractual Clauses) that give personal data
                  the same protection it has in your jurisdiction.
                </span>
              </li>
              <li className="flex items-start md:items-center gap-2">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Where we use service providers based in the United States, we
                  may transfer data to them if they participate in recognized
                  data protection frameworks.
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              Please contact us if you want further information on the specific
              mechanism used by us when transferring your personal data
              internationally.
            </p>
          </div>

          {/* Section 15 - Disclosure of Information */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">15.</span> DISCLOSURE OF
              INFORMATION
            </h2>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
              We may share your personal data with the parties set out below for
              the purposes set out in Section 8:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  Regulatory bodies and law enforcement
                </h3>
                <p className="text-gray-300 text-sm">
                  When required by law, to comply with legal obligations, or to
                  prevent illegal activity, fraud, or money laundering.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  Corporate affiliates
                </h3>
                <p className="text-gray-300 text-sm">
                  Such as subsidiary companies, parent companies, and business
                  partners engaged to process information on our behalf for the
                  purposes described in this Privacy Policy.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  Service providers
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  Including but not limited to:
                </p>
                <ul className="grid sm:grid-cols-2 gap-2 ml-4">
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300 text-sm">
                      Technical infrastructure providers (hosting, cloud
                      storage, IT support)
                    </span>
                  </li>
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300 text-sm">
                      Payment processors and cryptocurrency exchanges
                    </span>
                  </li>
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300 text-sm">
                      Wallet operators and virtual currency service providers
                    </span>
                  </li>
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300 text-sm">
                      Security providers and fraud prevention agencies
                    </span>
                  </li>
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300 text-sm">
                      Identity verification service providers
                    </span>
                  </li>
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300 text-sm">
                      Customer support service providers
                    </span>
                  </li>
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300 text-sm">
                      Marketing and analytics providers
                    </span>
                  </li>
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300 text-sm">
                      Legal and professional advisors
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  Credit reference agencies and fraud prevention agencies
                </h3>
                <p className="text-gray-300 text-sm">
                  To prevent fraud, money laundering, and other illegal
                  activities, and to verify your identity.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  Third parties in connection with business transfers
                </h3>
                <p className="text-gray-300 text-sm">
                  In the event of a merger, acquisition, sale of assets, or
                  other business transaction, your personal data may be
                  transferred to the acquiring or merging entity.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  Blockchain network
                </h3>
                <p className="text-gray-300 text-sm">
                  Transaction data (wallet addresses, transaction amounts,
                  timestamps) is automatically recorded on public blockchain
                  networks and is inherently publicly accessible due to the
                  transparent nature of blockchain technology.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  Industry databases
                </h3>
                <p className="text-gray-300 text-sm">
                  We may share information about fraudulent or suspicious
                  activity with industry-wide databases to protect the wider
                  gaming community.
                </p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-6">
              We require all third parties to respect the security of your
              personal data and to treat it in accordance with the law. We do
              not allow our third-party service providers to use your personal
              data for their own purposes and only permit them to process your
              personal data for specified purposes and in accordance with our
              instructions.
            </p>
          </div>

          {/* Section 16 - Data Retention */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">16.</span> DATA RETENTION
            </h2>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
              We will retain your personal data for the period of time required
              to fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required or permitted by law.
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Retention periods by category:
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="bg-black text-white font-bold p-3 text-sm text-left rounded-l-lg">
                        Data Category
                      </th>
                      <th className="bg-black text-white font-bold p-3 text-sm text-left">
                        Retention Period
                      </th>
                      <th className="bg-black text-white font-bold p-3 text-sm text-left rounded-r-lg">
                        Reason
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Account and wallet data
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          While your account is active plus 10 years after
                          account closure
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Regulatory requirement for AML/KYC compliance
                        </p>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Transaction records (deposits, withdrawals, bets)
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          10 years after last transaction
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Regulatory requirement for financial record-keeping
                          and AML compliance
                        </p>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Identity verification documents (KYC)
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          10 years after account closure
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Regulatory requirement for AML compliance
                        </p>
                      </td>
                    </tr>

                    {/* Row 4 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Support communications (emails, chat logs, call
                          recordings)
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          2 years from last contact
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Customer service and dispute resolution
                        </p>
                      </td>
                    </tr>

                    {/* Row 5 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">Marketing data</p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Until withdrawal of consent, or 2 years from last
                          interaction if consent not renewed
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Direct marketing purposes
                        </p>
                      </td>
                    </tr>

                    {/* Row 6 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Usage and Technical Data
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          3 years from collection
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Platform improvement and security purposes
                        </p>
                      </td>
                    </tr>

                    {/* Row 7 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">Blockchain data</p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">Permanently</p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Inherent characteristic of blockchain technology; data
                          is immutable and publicly accessible
                        </p>
                      </td>
                    </tr>

                    {/* Row 8 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Recruitment data (if applicable)
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          6 months from application, extendable with candidate
                          consent
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Recruitment and talent acquisition purposes
                        </p>
                      </td>
                    </tr>

                    {/* Row 9 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Fraud and compliance records
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          10 years from incident or detection
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Legal obligation and protection of business interests
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4">
              At the end of the retention period, personal data will be securely
              deleted or anonymized, except where retention is required by law
              or for the establishment, exercise, or defense of legal claims.
            </p>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              Note: Blockchain transaction data cannot be deleted due to the
              immutable nature of distributed ledger technology. By using our
              platform, you acknowledge and accept that transaction data
              recorded on the blockchain will remain publicly accessible
              indefinitely.
            </p>
          </div>

          {/* Section 17 - Your Legal Rights */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">17.</span> YOUR LEGAL RIGHTS
            </h2>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
              Under certain circumstances, you have rights under data protection
              laws (including GDPR) in relation to your personal data. You have
              the right to:
            </p>

            <div className="space-y-4 mb-6">
              <p className="text-gray-300 text-sm">
                <span className="font-bold text-white">
                  Request access to your personal data
                </span>{" "}
                (commonly known as a "data subject access request"). This
                enables you to receive a copy of the personal data we hold about
                you and to check that we are lawfully processing it.
              </p>

              <p className="text-gray-300 text-sm">
                <span className="font-bold text-white">
                  Request correction of the personal data that we hold about
                  you.
                </span>{" "}
                This enables you to have any incomplete or inaccurate data we
                hold about you corrected, though we may need to verify the
                accuracy of the new data you provide to us.
              </p>

              <p className="text-gray-300 text-sm">
                <span className="font-bold text-white">
                  Request erasure of your personal data.
                </span>{" "}
                This enables you to ask us to delete or remove personal data
                where there is no good reason for us continuing to process it.
                You also have the right to ask us to delete or remove your
                personal data where you have successfully exercised your right
                to object to processing (see below), where we may have processed
                your information unlawfully, or where we are required to erase
                your personal data to comply with local law.
              </p>

              <p className="text-gray-300 text-sm">
                <span className="font-bold text-white">Note:</span> Blockchain
                data cannot be deleted due to its immutable nature. We will
                anonymize or delete off-chain data where legally permissible.
              </p>

              <p className="text-gray-300 text-sm">
                <span className="font-bold text-white">
                  Object to processing of your personal data
                </span>{" "}
                where we are relying on a legitimate interest (or those of a
                third party) and there is something about your particular
                situation which makes you want to object to processing on this
                ground, as you feel it impacts on your fundamental rights and
                freedoms. You also have the right to object where we are
                processing your personal data for direct marketing purposes. In
                some cases, we may demonstrate that we have compelling
                legitimate grounds to process your information which override
                your rights and freedoms.
              </p>

              <p className="text-gray-300 text-sm">
                <span className="font-bold text-white">
                  Request restriction of processing of your personal data.
                </span>{" "}
                This enables you to ask us to suspend the processing of your
                personal data in the following scenarios:
              </p>

              <ul className="grid gap-2 ml-4">
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    If you want us to establish the data's accuracy.
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Where our use of the data is unlawful but you do not want us
                    to erase it.
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Where you need us to hold the data even if we no longer
                    require it as you need it to establish, exercise, or defend
                    legal claims.
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    You have objected to our use of your data but we need to
                    verify whether we have overriding legitimate grounds to use
                    it.
                  </span>
                </li>
              </ul>

              <p className="text-gray-300 text-sm">
                <span className="font-bold text-white">
                  Request the transfer of your personal data to you or to a
                  third party.
                </span>{" "}
                We will provide to you, or a third party you have chosen, your
                personal data in a structured, commonly used, machine-readable
                format. Note that this right only applies to automated
                information which you initially provided consent for us to use
                or where we used the information to perform a contract with you.
              </p>

              <p className="text-gray-300 text-sm">
                <span className="font-bold text-white">
                  Withdraw consent at any time
                </span>{" "}
                where we are relying on consent to process your personal data.
                However, this will not affect the lawfulness of any processing
                carried out before you withdraw your consent. If you withdraw
                your consent, we may not be able to provide certain services to
                you. We will advise you if this is the case at the time you
                withdraw your consent.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                <span className="font-bold text-white">
                  How to exercise your rights:
                </span>{" "}
                If you wish to exercise any of the rights set out above, please
                contact us at{" "}
                <a
                  href="mailto:support@moonbet.games"
                  className="text-[#EFD28E] hover:text-[#F07730] transition-colors"
                >
                  support@moonbet.games
                </a>{" "}
                with sufficient information to verify your identity.
              </p>

              <p className="text-gray-300 text-sm">
                <span className="font-bold text-white">
                  No fee usually required:
                </span>{" "}
                You will not have to pay a fee to access your personal data (or
                to exercise any of the other rights). However, we may charge a
                reasonable fee if your request is clearly unfounded, repetitive,
                or excessive. Alternatively, we may refuse to comply with your
                request in these circumstances.
              </p>

              <p className="text-gray-300 text-sm">
                <span className="font-bold text-white">
                  What we may need from you:
                </span>{" "}
                We may need to request specific information from you to help us
                confirm your identity and ensure your right to access your
                personal data (or to exercise any of your other rights). This is
                a security measure to ensure that personal data is not disclosed
                to any person who has no right to receive it. We may also
                contact you to ask you for further information in relation to
                your request to speed up our response.
              </p>

              <p className="text-gray-300 text-sm">
                <span className="font-bold text-white">
                  Time limit to respond:
                </span>{" "}
                We try to respond to all legitimate requests within one month.
                Occasionally it may take us longer than a month if your request
                is particularly complex or you have made a number of requests.
                In this case, we can extend the response period by a further two
                months. We will notify you within one month of receiving your
                request if we need additional time and explain the reason for
                the delay.
              </p>
            </div>
          </div>

          {/* Section 18 - Your Legal Rights */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">18.</span> RECRUITMENT
            </h2>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
              If you apply for employment or contractor positions with Moonbet,
              we will collect and process personal data provided in your
              application, including:
            </p>
            <ul className="grid gap-2 ml-4">
              <li className="flex items-start md:items-center gap-2">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Identity Data (name, date of birth, contact details)
                </span>
              </li>
              <li className="flex items-start md:items-center gap-2">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Professional information (CV, employment history,
                  qualifications, references)
                </span>
              </li>
              <li className="flex items-start md:items-center gap-2">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Any other information you provide during the recruitment
                  process
                </span>
              </li>
            </ul>

            <div className="space-y-4 mt-4 mb-6">
              <p className="text-gray-300 text-sm">
                <span className="font-bold text-white">Purpose: </span> To
                assess your suitability for the role and to communicate with you
                regarding your application.
              </p>

              <p className="text-gray-300 text-sm">
                <span className="font-bold text-white">Legal basis:</span> Our
                legitimate interest in recruiting suitable employees and
                contractors, and, where applicable, your consent.
              </p>

              <p className="text-gray-300 text-sm">
                <span className="font-bold text-white">Retention period:</span>{" "}
                We will retain your personal data for 6 months from the date of
                your application. If you consent, we may retain your data for a
                longer period to consider you for future opportunities. You may
                withdraw your consent at any time by contacting us.
              </p>

              <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
                If your application is successful, the personal data collected
                during the recruitment process will be retained as part of your
                employee or contractor record in accordance with our internal HR
                policies.
              </p>
            </div>
          </div>

          {/* Section 19 - Data Retention */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">19.</span> CALIFORNIA PRIVACY
              RIGHTS (CCPA)
            </h2>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
              If you are a California resident, you may have additional rights
              regarding your personal information under the California Consumer
              Privacy Act (CCPA).
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Categories of Personal Information We Collect:
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="bg-black text-white font-bold p-3 text-sm text-left rounded-l-lg">
                        Personal Information Category
                      </th>
                      <th className="bg-black text-white font-bold p-3 text-sm text-left">
                        Examples
                      </th>
                      <th className="bg-black text-white font-bold p-3 text-sm text-left rounded-r-lg">
                        Collected
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">Identifiers</p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Username, email address, IP address, wallet addresses
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">YES</p>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Personal information (as defined in Cal. Civ. Code §
                          1798.80)
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Communications, gameplay data, identification
                          documents
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">YES</p>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Commercial information
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Transaction records, betting history,
                          deposit/withdrawal records
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">YES</p>
                      </td>
                    </tr>

                    {/* Row 4 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Internet or network activity
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Browsing history, interaction with platform, session
                          data
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">YES</p>
                      </td>
                    </tr>

                    {/* Row 5 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Geolocation data
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          IP address location, country/region
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">YES</p>
                      </td>
                    </tr>

                    {/* Row 6 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">Sensory data</p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Support call recordings, video identification (if any)
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">YES</p>
                      </td>
                    </tr>

                    {/* Row 7 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Professional or employment information
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Occupation type, employment status
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">YES</p>
                      </td>
                    </tr>

                    {/* Row 8 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Education information
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">Not applicable</p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">NO</p>
                      </td>
                    </tr>

                    {/* Row 9 */}
                    <tr className="border-b border-white/10">
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Inferences drawn from personal information
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">
                          Gaming preferences, betting patterns, user behavior
                          analysis
                        </p>
                      </td>
                      <td className="bg-white/5 p-3 border border-white/10">
                        <p className="text-gray-300 text-sm">YES</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h3 class="text-lg font-bold text-white mt-6 mb-3">
                Your California Rights:
              </h3>
              <ul className="grid gap-2 mt-4 ml-4">
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    {" "}
                    <span className="font-bold text-white">
                      Right to know{" "}
                    </span>{" "}
                    what personal information we collect, use, disclose, and
                    sell.
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    {" "}
                    <span className="font-bold text-white">
                      Right to know{" "}
                    </span>{" "}
                    what personal information we collect, use, disclose, and
                    sell.
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    {" "}
                    <span className="font-bold text-white">
                      Right to delete{" "}
                    </span>{" "}
                    personal information we have collected from you (subject to
                    certain exceptions, including blockchain immutability and
                    legal retention requirements).
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    {" "}
                    <span className="font-bold text-white">
                      Right to opt-out of the sale of personal information.{" "}
                    </span>
                    We do not sell personal information to third parties for
                    monetary consideration.
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    {" "}
                    <span className="font-bold text-white">
                      Right to non-discrimination{" "}
                    </span>
                    or exercising your CCPA rights. We will not discriminate
                    against you for exercising your rights under the CCPA.
                  </span>
                </li>
              </ul>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mt-3 mb-3">
                    How to exercise your California rights:
                  </h3>
                  <p className="text-gray-300 text-sm">
                    To exercise these rights, contact us at{" "}
                    <a
                      href="mailto:support@moonbet.games"
                      class="text-[#EFD28E] hover:text-[#F07730] transition-colors"
                    >
                      support@moonbet.games
                    </a>{" "}
                    with sufficient information to verify your identity. We will
                    respond to verifiable requests within 45 days, or notify you
                    if additional time is required.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Verification process
                  </h3>
                  <p className="text-gray-300 text-sm">
                    We may request additional information to verify your
                    identity before processing your request, including wallet
                    address verification, email confirmation, or other identity
                    verification methods.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 20 */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">20.</span> CHILDREN'S PRIVACY
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-4">
              Our platform is strictly for users aged 18 and older (or the legal
              gambling age in your jurisdiction, whichever is higher). We do not
              knowingly collect personal information from anyone under the age
              of 18. If we learn we have collected personal information from
              someone under 18, we will delete that information immediately and
              terminate the account. If you believe we have inadvertently
              collected personal data from a minor, please contact us
              immediately at{" "}
              <a
                href="mailto:support@moonbet.games"
                class="text-[#EFD28E] hover:text-[#F07730] transition-colors"
              >
                support@moonbet.games
              </a>
              .
            </p>
          </div>

          {/* Section 21 - Supervisory Authority */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">21.</span> SUPERVISORY AUTHORITY
            </h2>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
              You have the right to lodge a complaint with a data protection
              supervisory authority if you believe that we have violated your
              data protection rights. We would, however, appreciate the
              opportunity to address your concerns before you contact a
              supervisory authority, so please contact us first.
            </p>

            <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
              <p className="text-gray-300 text-sm md:text-base">
                <span className="text-[#F07730] font-bold">
                  Contact for data protection concerns:
                </span>
                <br />
                <span className="font-bold text-[#F07730]">
                  Data Privacy Manager{" "}
                </span>
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
          </div>

          {/* Section 22 - Contact Us */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">22.</span> CONTACT US
            </h2>
            <p className="text-gray-300 mb-4 text-sm md:text-base">
              If you have specific questions regarding your personal information
              or how we use it, please contact us:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
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
              {/* <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-[#F07730]">🌐</span>
                <span className="text-gray-300">[To be provided]</span>
              </div> */}
            </div>
            <p className="text-gray-300 text-sm md:text-base">
              We aim to respond to all inquiries within 48 hours during business
              days.
            </p>
          </div>

          {/* Section 23 - Glossary */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">23.</span> GLOSSARY
            </h2>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-4">
                LAWFUL BASIS:
              </h3>
              <ul className="grid gap-4">
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Legitimate Interest
                    </span>{" "}
                    means the interest of our business in conducting and
                    managing our business to enable us to give you the best
                    service and the most secure experience. We make sure we
                    consider and balance any potential impact on you (both
                    positive and negative) and your rights before we process
                    your personal data for our legitimate interests. We do not
                    use your personal data for activities where our interests
                    are overridden by the impact on you (unless we have your
                    consent or are otherwise required or permitted to by law).
                    You have the right to object to processing based on
                    legitimate interests.
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Performance of Contract
                    </span>{" "}
                    means processing your data where it is necessary for the
                    performance of a contract to which you are a party or to
                    take steps at your request before entering into such a
                    contract.
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Comply with a legal or regulatory obligation
                    </span>{" "}
                    means processing your personal data where it is necessary
                    for compliance with a legal or regulatory obligation that we
                    are subject to, such as AML/KYC laws, financial
                    record-keeping requirements, or responding to lawful
                    requests from authorities.
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    <span className="font-bold text-white">Consent</span> means
                    you have given clear, affirmative consent for us to process
                    your personal data for a specific purpose. You have the
                    right to withdraw consent at any time.
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Data Controller
                    </span>{" "}
                    means the entity that determines the purposes and means of
                    processing personal data.
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    <span className="font-bold text-white">Data Processor</span>{" "}
                    means an entity that processes personal data on behalf of
                    the data controller.
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    <span className="font-bold text-white">GDPR</span> means the
                    General Data Protection Regulation (EU) 2016/679.
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    <span className="font-bold text-white">AML</span> means
                    Anti-Money Laundering regulations and laws designed to
                    prevent money laundering and terrorist financing.
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    <span className="font-bold text-white">KYC</span> means Know
                    Your Customer procedures used to verify the identity of
                    users and assess risk.
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    <span className="font-bold text-white">PEP</span> means
                    Politically Exposed Person, an individual who holds or has
                    held a prominent public function, or an immediate family
                    member or close associate of such a person.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;

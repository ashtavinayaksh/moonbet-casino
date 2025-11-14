import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicyPage = () => {
  return (
    <section className="w-full py-10">
      <div className="container max-w-5xl mx-auto px-4 text-[#CED5E3]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M19.4823 8.75592L17.1303 6.4017C16.1631 5.43353 16.7542 4.41157 17.8082 4.34951C19.5443 4.24194 20.5198 2.38835 19.102 0.845078C17.5602 -0.569936 15.7166 0.402369 15.6092 2.13597C15.543 3.19102 14.5138 3.78682 13.5507 2.82279L11.2483 0.518218C10.558 -0.172739 9.43784 -0.172739 8.74755 0.518218L6.41624 2.85175C5.449 3.81992 4.42389 3.21998 4.35776 2.16493C4.25028 0.427194 2.3902 -0.561661 0.848403 0.85749C-0.573525 2.4049 0.414385 4.26676 2.15046 4.37434C3.20451 4.44054 3.80386 5.47077 2.84076 6.43893L0.517722 8.76005C-0.172574 9.45101 -0.172574 10.5723 0.517722 11.2632L2.82009 13.5678C3.78733 14.5318 3.21277 15.5372 2.15873 15.6034C0.422651 15.711 -0.548724 17.5604 0.869071 19.1037C2.41087 20.5229 4.25028 19.5547 4.35776 17.817C4.42389 16.7619 5.43247 16.1827 6.39971 17.1467L8.72274 19.472C9.42544 20.1753 10.5746 20.1753 11.2773 19.4761L13.6044 17.1467C14.5179 16.1909 13.9268 15.1855 12.8852 15.1193C11.1491 15.0118 10.1653 13.1499 11.5831 11.6066C13.1249 10.1875 14.985 11.1763 15.0925 12.9141C15.1586 13.9567 16.1589 14.5442 17.1138 13.6299L19.4492 11.2922C19.4533 11.288 19.4533 11.288 19.4575 11.2839L19.4823 11.2591C20.1726 10.5681 20.1726 9.44687 19.4823 8.75592Z"
              fill="#CED5E3"
            />
          </svg>
          <h3 className="text-[18px] font-[400] uppercase">Privacy Policy</h3>
        </motion.div>

        {/* Policy Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 leading-relaxed text-[15px]"
        >
          <p>
            <strong>Last Updated:</strong> September 29, 2025
          </p>

          <p>
            This Privacy Policy describes how Moonbet Operations Ltd.
            (“Moonbet,” “we,” “us,” or “our”) collects, uses, maintains, and
            discloses information collected from users of our decentralized
            crypto casino platform at Moonbet.games. It applies to all products
            and services offered through our platform.
          </p>

          <h4 className="text-lg font-semibold mt-8 mb-2">
            1. Moonbet Statement
          </h4>
          <p>
            Moonbet is committed to protecting and respecting your privacy while
            maintaining player trust. We collect only the data necessary to
            provide fair, transparent blockchain gaming and never sell user
            information.
          </p>

          <h4 className="text-lg font-semibold mt-8 mb-2">
            2. Data Controller
          </h4>
          <p>
            Data Controller: <strong>Moonbet</strong>
            <br />
            DPM: Privacy Manager
            <br />
            Email: support@moonbet.games
          </p>
          <p>
            You may contact our Data Privacy Manager with any questions or
            concerns. We encourage players to reach out before contacting
            regulators.
          </p>

          <h4 className="text-lg font-semibold mt-8 mb-2">
            3. Information We Collect
          </h4>
          <ul className="list-disc ml-6 space-y-1">
            <li>Identity Data: Username or display name</li>
            <li>Contact Data: Email (optional)</li>
            <li>Crypto Data: Wallet address, blockchain records</li>
            <li>Transaction Data: Deposits, withdrawals, bets, and wins</li>
            <li>Technical Data: IP, browser info, device type</li>
            <li>Profile Data: Preferences, feedback, session behavior</li>
            <li>
              Cookies: Used to enhance experience and keep users logged in
            </li>
          </ul>

          <h4 className="text-lg font-semibold mt-8 mb-2">
            4. How We Use Your Data
          </h4>
          <p>
            We process your data to operate, improve, and secure the Moonbet
            platform. Data use includes account registration, bet processing,
            transaction handling, platform analytics, and fraud prevention.
          </p>

          <h4 className="text-lg font-semibold mt-8 mb-2">5. Data Security</h4>
          <p>
            We use Solana blockchain security, Fireblocks integration,
            encryption, and role-based access controls. Regular audits ensure
            platform integrity and data safety.
          </p>

          <h4 className="text-lg font-semibold mt-8 mb-2">6. Data Retention</h4>
          <p>
            We retain data only as long as necessary:
            <br />
            Account data – active period + 6 years
            <br />
            Transaction records – 6 years
            <br />
            Support logs – 3 years
            <br />
            Blockchain data – permanently
          </p>

          <h4 className="text-lg font-semibold mt-8 mb-2">
            7. Marketing and Communication
          </h4>
          <p>
            Players may receive promotions relevant to their gameplay. You may
            opt out anytime via links in our messages or by contacting support.
          </p>

          <h4 className="text-lg font-semibold mt-8 mb-2">8. Cookies</h4>
          <p>
            We use cookies to enhance usability and secure gameplay. Types
            include strictly necessary, analytical, session, functionality, and
            security cookies.
          </p>

          <h4 className="text-lg font-semibold mt-8 mb-2">9. Your Rights</h4>
          <p>
            You have rights to access, correct, delete, restrict, or transfer
            your personal data. Requests can be made by contacting{" "}
            <strong>support@moonbet.games</strong>.
          </p>

          <h4 className="text-lg font-semibold mt-8 mb-2">10. Contact</h4>
          <p>
            For any privacy concerns or requests, reach out via:
            <br />
            Email: support@moonbet.games
            <br />
            Live Chat: Available 24/7 on our platform
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;

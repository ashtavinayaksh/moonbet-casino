import React from "react";
import { motion } from "framer-motion";

const ResponsibleGamblingPage = () => {
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
          <h3 className="text-[18px] font-[400] uppercase">
            Responsible Gambling
          </h3>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 leading-relaxed text-[15px]"
        >
          <p>
            At Moonbet, we believe crypto gambling should be transparent, fair,
            and fun. Our mission is to create a safe environment where players
            can enjoy decentralized gaming responsibly. Gambling should enhance
            your life, not control it.
          </p>

          <h4 className="text-lg font-semibold mt-8 mb-2">
            Our Responsible Gambling Philosophy
          </h4>
          <p>
            Unlike traditional casinos that profit from addiction, Moonbet’s
            success depends on players having positive, sustainable experiences.
            Our near-zero house edge and provably fair algorithms ensure a fair
            gaming ecosystem where everyone benefits from responsible play.
          </p>

          <h4 className="text-lg font-semibold mt-8 mb-2">
            Crypto Gaming Considerations
          </h4>
          <ul className="list-disc ml-6 space-y-1">
            <li>Instant transactions can accelerate spending patterns</li>
            <li>24/7 accessibility requires extra self-awareness</li>
            <li>Blockchain records provide transparent spending history</li>
            <li>No chargebacks — all transactions are final</li>
          </ul>

          <h4 className="text-lg font-semibold mt-8 mb-2">
            Responsible Gaming Tools
          </h4>
          <p>
            Moonbet provides tools to help you stay in control. For assistance,
            contact us via Live Chat or <strong>support@moonbet.games</strong>.
          </p>

          <h5 className="font-semibold mt-6">Cooling-Off Periods</h5>
          <ul className="list-disc ml-6 space-y-1">
            <li>24 hours</li>
            <li>7 days</li>
            <li>1 month</li>
            <li>3 months</li>
          </ul>
          <p>
            During this period, you cannot place bets, play games, or access
            promotions. Accounts reactivate automatically when the duration
            ends.
          </p>

          <h5 className="font-semibold mt-6">Self-Exclusion</h5>
          <p>For longer breaks, self-exclusion disables gaming features for:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>6 months</li>
            <li>1 year</li>
            <li>3 years</li>
            <li>5 years</li>
            <li>Lifetime</li>
          </ul>
          <p>
            Self-exclusion cannot be reversed early. Permanent exclusion
            requires written confirmation at{" "}
            <strong>support@moonbet.games</strong>.
          </p>

          <h5 className="font-semibold mt-6">On-chain Spending Limits</h5>
          <ul className="list-disc ml-6 space-y-1">
            <li>Deposit, loss, and bet limits set by smart contracts</li>
            <li>Session time limits and automated disconnects</li>
            <li>Immutable on-chain enforcement for accountability</li>
          </ul>

          <h5 className="font-semibold mt-6">Reality Check Reminders</h5>
          <p>
            Receive automatic notifications on session length and spending.
            Customize reminders to suit your play style.
          </p>

          <h5 className="font-semibold mt-6">
            Transaction History & Spending Analysis
          </h5>
          <p>
            Access detailed Solana-based data, including profit/loss summaries,
            transaction records, and spending analytics, all verifiable on the
            blockchain.
          </p>

          <h4 className="text-lg font-semibold mt-8 mb-2">Self-Assessment</h4>
          <p>
            Reflect on your gaming habits using these questions. If you answer
            “yes” to three or more, consider seeking help:
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Do you gamble more than planned?</li>
            <li>Have you chased losses?</li>
            <li>Do you hide gambling behavior from others?</li>
            <li>Do friends or family express concern?</li>
          </ul>

          <h4 className="text-lg font-semibold mt-8 mb-2">
            Professional Support Resources
          </h4>
          <ul className="list-disc ml-6 space-y-1">
            <li>Gamblers Anonymous – gamblersanonymous.org</li>
            <li>GambleAware – gambleaware.org</li>
            <li>Gambling Therapy – gamblingtherapy.org</li>
            <li>National Council on Problem Gambling – ncpgambling.org</li>
          </ul>

          <h5 className="font-semibold mt-6">Crypto-Specific Help</h5>
          <ul className="list-disc ml-6 space-y-1">
            <li>Blockchain Gaming Addiction Support</li>
            <li>Digital Asset Management Counseling</li>
          </ul>

          <h5 className="font-semibold mt-6">Blocking Software</h5>
          <ul className="list-disc ml-6 space-y-1">
            <li>BetBlocker – betblocker.org</li>
            <li>Gamban – gamban.com</li>
            <li>GamBlock – gamblock.com</li>
            <li>Cold Turkey – getcoldturkey.com</li>
          </ul>

          <h4 className="text-lg font-semibold mt-8 mb-2">Protecting Minors</h4>
          <p>
            Moonbet is for users 18 and older. We enforce strict age checks via
            blockchain identity and automated detection systems.
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Immediate suspension for suspected minors</li>
            <li>Funds returned to the deposit source for underage users</li>
            <li>Encourage parental controls and secure wallet handling</li>
          </ul>

          <h4 className="text-lg font-semibold mt-8 mb-2">
            Fair Play Commitment
          </h4>
          <ul className="list-disc ml-6 space-y-1">
            <li>Provably fair Solana-based games</li>
            <li>Transparent Return-to-Player rates</li>
            <li>No deceptive marketing or unrealistic promises</li>
          </ul>

          <h4 className="text-lg font-semibold mt-8 mb-2">Contact Us</h4>
          <p>
            Our support team is available 24/7 to help with responsible gaming.
            <br />
            Live Chat: Available anytime on Moonbet.games
            <br />
            Email: <strong>support@moonbet.games</strong>
            <br />
            Responsible Gaming Specialist: contact@moonbet.games
          </p>

          <p className="mt-6 text-sm text-gray-400">
            Last Updated: September 29, 2025
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ResponsibleGamblingPage;

// src/components/sections/HomeFAQSection.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HomeFAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "Is Moonbet Legit?",
      answer:
        "Yes, Moonbet is a fully legitimate decentralized casino operating on the Solana blockchain. All games are provably fair with transparent smart contracts that can be verified on-chain.",
    },
    {
      question: "Are Moonbet Games Licensed?",
      answer:
        "Moonbet operates as a decentralized platform on the blockchain. While traditional licensing doesn't apply to DeFi protocols, all our games use verified smart contracts and provably fair algorithms that ensure transparency and fairness.",
    },
    {
      question: "States/Countries Where Moonbet Is Legal?",
      answer:
        "As a decentralized platform, Moonbet is accessible globally wherever cryptocurrency transactions are permitted. Users are responsible for complying with their local regulations regarding online gaming and cryptocurrency use.",
    },
    {
      question: "Tips And Tricks For Moonbet Players?",
      answer:
        "Start with small bets to understand game mechanics. Take advantage of daily rewards and bonuses. Set limits for yourself and never bet more than you can afford to lose. Join our community for strategies and updates.",
    },
    {
      question: "What Payment Methods Does Moonbet Accept?",
      answer:
        "Pure Crypto Only. Solana (SOL), Bitcoin, Ethereum, And All Major Tokens. Connect With Phantom, Metamask, Or Any Web3 Wallet You Like. No Fiat, Banks, Or Traditional Payment Headaches. Crypto In, Crypto Out, Instant Everything.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full py-10 bg-[#000]">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-center text-[#E5EAF2] 
             text-[26px] font-[400] leading-[34px] uppercase"
          >
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-lg p-[1px]
        bg-[linear-gradient(106deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.10)_35%,rgba(255,255,255,0.05)_70%,rgba(255,255,255,0)_100%)]
        transition-all duration-300"
            >
              {/* Inner container with background */}
              <div className="rounded-lg bg-[#0A0B0D]/80 backdrop-blur-sm">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-2 text-left flex justify-between items-center group"
                >
                  <p className="text-base md:text-lg font-[400] text-[#CED5E3] pr-4">
                    {index + 1}. {faq.question}
                  </p>
                  <motion.span
                    animate={{ rotate: activeIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 text-2xl text-[#CED5E3] group-hover:text-[#EFD28E] transition-colors"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-sm md:text-base text-gray-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        ></motion.div>
      </div>
    </section>
  );
};

export default HomeFAQSection;

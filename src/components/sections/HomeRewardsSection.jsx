// src/components/sections/HomeRewardsSection.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import MoonBetButton from "../ui-elements/MoonBetButton";

const HomeRewardsSection = () => {
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Rewards data
  const rewardsData = [
    {
      id: 1,
      badge: "NOW LIVE",
      titleLine1: "New Rewards",
      titleLine2: "System",
      buttonText: "SEE REWARDS",
    },
    {
      id: 2,
      badge: "NOW LIVE",
      titleLine1: "New Rewards",
      titleLine2: "System",
      buttonText: "SEE REWARDS",
    },
    {
      id: 3,
      badge: "NOW LIVE",
      titleLine1: "New Rewards",
      titleLine2: "System",
      buttonText: "SEE REWARDS",
    },
  ];

  // Handle scroll to update current index for indicators
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.clientWidth * 0.85;
    const newIndex = Math.round(scrollLeft / cardWidth);

    setCurrentIndex(Math.min(newIndex, rewardsData.length - 1));
  };

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (container) {
      container.addEventListener("scroll", handleScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // Trigger animations when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3,
      },
    },
  };

  const glowVariants = {
    initial: { opacity: 0.3, scale: 0.8 },
    animate: {
      opacity: [0.3, 0.6, 0.3],
      scale: [0.8, 1.1, 0.8],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="w-full py-16 md:py-10 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Effect with Animation */}
      <motion.div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl"
          variants={glowVariants}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl"
          variants={glowVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 2 }}
        />
      </motion.div>

      <div className="relative z-10 w-full mx-auto px-4">
        {/* Cards Container - Scrollable on mobile, grid on desktop */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto lg:overflow-visible scrollbar-hide px-4 lg:px-8"
        >
          <motion.div
            className="flex lg:grid lg:grid-cols-3 gap-6 pb-4"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {rewardsData.map((reward, index) => (
              <motion.div
                key={reward.id}
                variants={cardVariants}
                custom={index}
                whileHover={{
                  scale: 1.02,
                  translateY: -5,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0 w-[85vw] lg:w-full"
              >
                <motion.div
                  className="wallet-btn3 relative h-full backdrop-blur-xl rounded-2xl p-6 hover:border-[#F07730]/50 transition-all duration-300 group"
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(240, 119, 48, 0.2)",
                  }}
                >
                  {/* Badge with Animation */}
                  {reward.badge && (
                    <motion.span
                      className="inline-block py-1 text-[#F07730] text-xs font-semibold mb-4"
                      variants={badgeVariants}
                    >
                      {reward.badge}
                    </motion.span>
                  )}

                  {/* Content with Stagger Animation */}
                  <motion.p
                    className="text-[#FFF] font-[600] text-[24px] leading-[28px] mb-8"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1 + 0.3,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      viewport={{ once: true }}
                    >
                      {reward.titleLine1}
                    </motion.span>
                    <br />
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      viewport={{ once: true }}
                    >
                      {reward.titleLine2}
                    </motion.span>
                  </motion.p>

                  {/* Button with Animation */}
                  {/* <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1 + 0.6,
                      type: "spring",
                      stiffness: 150,
                    }}
                    viewport={{ once: true }}
                  >
                    <MoonBetButton
                      onClick={() =>
                        console.log(`${reward.buttonText} clicked`)
                      }
                    ></MoonBetButton>
                  </motion.div> */}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-[176px] h-[44px] 
                 bg-gradient-to-r from-[#F07730] to-[#EFD28E]
                 text-[#000] font-[600] text-[16px] 
                 font-['Neue_Plack',sans-serif]
                 rounded-lg shadow-md 
                 transition-all duration-300
                 hover:from-[#F07730]/90 hover:to-[#EFD28E]/90
                 flex items-center justify-center"
                  >
                    {reward.buttonText}
                  </motion.button>
                  {/* Hover Glow Effect with Animation */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F07730]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    initial={false}
                    whileHover={{
                      opacity: [0, 1, 0.8],
                      transition: {
                        duration: 0.5,
                        times: [0, 0.5, 1],
                      },
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Scroll Indicators with Animation */}
        <motion.div
          className="flex lg:hidden justify-center gap-2 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {rewardsData.map((_, index) => (
            <motion.span
              key={index}
              className={`transition-all duration-300 ${
                currentIndex === index
                  ? "w-8 h-2 bg-[#F07730] rounded-full"
                  : "w-2 h-2 bg-white/20 rounded-full"
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: index * 0.1 + 0.9,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.section>
  );
};

export default HomeRewardsSection;

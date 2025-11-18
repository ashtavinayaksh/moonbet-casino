import React from "react";
import { motion } from "framer-motion";

const ProvidersPage = () => {
  const providers = [
    { id: 1, name: "Pragmatic Play", logo: "/providers/vector1.svg" },
    { id: 2, name: "Evolution", logo: "/providers/evolution.svg" },
    { id: 3, name: "BGaming", logo: "/providers/bgaming.svg" },
    { id: 4, name: "Hacksaw Gaming", logo: "/providers/hacksaw.svg" },
    { id: 5, name: "Thunderkick", logo: "/providers/thunderkick.svg" },
    { id: 6, name: "Play'n GO", logo: "/providers/playngo.svg" },
    { id: 7, name: "Spribe", logo: "/providers/spribe.svg" },
    { id: 8, name: "Endorphina", logo: "/providers/endorphina.svg" },
    { id: 9, name: "3oaks", logo: "/providers/3oaks.svg" },
    { id: 10, name: "Nolimit", logo: "/providers/nolimit.svg" },
  ];

  return (
    <section className="w-full py-10">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
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
          <h3 className="text-[#CED5E3] text-[18px] font-[400] uppercase">
            Providers
          </h3>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {providers.map((provider, i) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="trust_btn bg-[#080808]/20 rounded-xl flex items-center justify-center p- hover:bg-white/5 transition-all duration-300"
            >
              <img
                src={provider.logo}
                alt={provider.name}
                className="max-w-[100px] max-h-[50px] object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = `<span class='text-white/60 text-xs font-medium text-center'>${provider.name}</span>`;
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProvidersPage;

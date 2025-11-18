import React from "react";

const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 bg-[#080808]/80 backdrop-blur-sm flex flex-col items-center justify-center z-[9999]">
      <img
        src="/icons/logo.svg"
        alt="Loading..."
        className="w-40 h-40 mb-4 animate-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
      />

      <div className="loader-dual-ring"></div>

      <style>
        {`
        .loader-dual-ring {
          display: inline-block;
          width: 64px;
          height: 64px;
        }
        .loader-dual-ring:after {
          content: " ";
          display: block;
          width: 48px;
          height: 48px;
          margin: 8px;
          border-radius: 50%;
          border: 6px solid #EFD28E;
          border-color: #F07730 transparent #EFD28E transparent;
          animation: loader-dual-ring 1.2s linear infinite;
        }
        @keyframes loader-dual-ring {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
      </style>
    </div>
  );
};

export default GlobalLoader;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#080808] text-white text-center p-6">
      
      {/* Glow 404 */}
      <h1 className="text-[120px] font-extrabold bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(240,119,48,0.4)]">
        404
      </h1>

      <p className="text-gray-300 text-lg mt-2">
        Oops! The page you are looking for doesn’t exist.
      </p>

      <p className="text-gray-400 text-sm mt-1">
        Redirecting to homepage in <span className="text-[#EFD28E]">5 seconds...</span>
      </p>

      {/* Optional loader */}
      <div className="mt-6">
        <img
          src="/icons/moonlogo.gif"
          alt="Loading"
          className="w-24 opacity-80"
        />
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-8 bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-black px-6 py-3 rounded-lg font-bold hover:opacity-90 transition"
      >
        Go to Homepage Now
      </button>
    </div>
  );
};

export default NotFound;

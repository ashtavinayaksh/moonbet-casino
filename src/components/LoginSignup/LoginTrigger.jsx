// src/components/LoginSignup/LoginTrigger.jsx

import { useState, useEffect, useRef } from "react";
import LoginSignup from "./LoginSignup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileModal from "../profile/ProfileModal"; // ADD THIS LINE (Line 6)

export const LoginTrigger = ({
  buttonText = "Login",
  defaultTab = "login",
  onLoginSuccess,
  onSignupSuccess,
  className = "",
  forceOpen = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false); // ADD THIS LINE (Line 19)
  const dropdownRef = useRef(null);

  useEffect(() => {
  if (forceOpen) setIsModalOpen(true);
}, [forceOpen]);

  // Check login state
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle login success
const handleLoginSuccess = (userData) => {
  // Extract essential fields
  const { token, user } = userData || {};
  if (token) localStorage.setItem("token", token);

  if (user) {
    const { username, email, kycStatus, id } = user;

    // Save individual entries (easy access)
    // localStorage.setItem("userId", _id);
    // localStorage.setItem("username", username);
    // localStorage.setItem("email", email);
    // localStorage.setItem("kycStatus", kycStatus);

    // Save as a compact JSON for profile dropdowns/modals
    localStorage.setItem("user", JSON.stringify({ id, username, email, kycStatus }));
  }

  setIsLoggedIn(true);
  handleCloseModal();
  if (onLoginSuccess) onLoginSuccess(userData);
};

// Handle signup success
const handleSignupSuccess = (userData) => {
  const { token, user } = userData || {};
  if (token) localStorage.setItem("token", token);

  if (user) {
    const { username, email, kycStatus, id } = user;
    // localStorage.setItem("userId", _id);
    // localStorage.setItem("username", username);
    // localStorage.setItem("email", email);
    // localStorage.setItem("kycStatus", kycStatus);
    localStorage.setItem("user", JSON.stringify({ id, username, email, kycStatus }));
  }

  setIsLoggedIn(true);
  handleCloseModal();
  if (onSignupSuccess) onSignupSuccess(userData);
};

  const handleLogout = () => {
   localStorage.removeItem("token");
   window.dispatchEvent(new Event("tokenChanged"));
  localStorage.removeItem("user");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("kycStatus");
  localStorage.clear();
  window.dispatchEvent(new Event("tokenChanged"));
    setIsLoggedIn(false);
    setDropdownOpen(false);
    toast.info("You have been logged out successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleOpenModal = () => {
    setActiveTab(defaultTab);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // ADD THIS FUNCTION (Line 80-84)
  const handleProfileClick = () => {
    setDropdownOpen(false);
    setShowProfileModal(true);
  };

  // Logged-in state UI
  if (isLoggedIn) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const initials = user.username
      ? user.username.charAt(0).toUpperCase()
      : "U";

    return (
      <div className="relative" ref={dropdownRef}>
        {/* Profile Avatar Button */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`${className} w-14 h-14 rounded-full overflow-hidden flex items-center justify-center`}
        >
          <img
            src="/icons/login.svg" // :point_left: replace with your image path
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div
            className="absolute right-0 mt-3 w-56 bg-[#1b2132] border border-white/10 rounded-xl shadow-2xl py-2 z-[9999]"
            style={{ backdropFilter: "blur(16px)" }}
          >
            {/* REPLACE THE LINK WITH BUTTON (Lines 109-114) */}
            <button
              onClick={handleProfileClick}
              className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-white/10 transition-all w-full text-left"
            >
              <img
                src="/icons/user.svg"
                alt=""
                className="w-4 h-4 invert brightness-0"
              />
              <span>Profile</span>
            </button>

            <Link
              to="/bets"
              className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-white/10 transition-all"
            >
              <img
                src="/icons/crypto.svg"
                alt=""
                className="w-4 h-4 invert brightness-0"
              />
              <span>Bets</span>
            </Link>

            <Link
              to="/transactions"
              className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-white/10 transition-all"
            >
              <img
                src="/icons/transaction.svg"
                alt=""
                className="w-4 h-4 invert brightness-0"
              />
              <span>Transactions</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-white/10 transition-all"
            >
              <img
                src="/icons/setting.svg"
                alt=""
                className="w-4 h-4 invert brightness-0"
              />
              <span>Settings</span>
            </Link>

            <div className="border-t border-white/10 my-1"></div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-500/10 transition-all"
            >
              <img
                src="/icons/power-button.svg"
                alt=""
                className="w-4 h-4 invert brightness-0"
              />
              <span>Logout</span>
            </button>
          </div>
        )}

        {/* ADD PROFILE MODAL HERE (Lines 147-152) */}
        <ProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          userData={user}
        />
      </div>
    );
  }

  // Default login state UI
  return (
    <>
      <button
        onClick={handleOpenModal}
        className={`${className} cursor-pointer z-[9999]`}
        style={{ pointerEvents: "auto" }}
      >
        {buttonText}
      </button>

      <LoginSignup
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        defaultTab={activeTab}
        onLoginSuccess={handleLoginSuccess}
        onSignupSuccess={handleSignupSuccess}
      />
    </>
  );
};

export default LoginTrigger;

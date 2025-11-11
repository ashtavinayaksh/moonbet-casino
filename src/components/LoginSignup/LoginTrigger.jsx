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
    if (token) {
      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("tokenChanged"));
    }

    if (user) {
      const { username, email, kycStatus, id } = user;

      // Save as a compact JSON for profile dropdowns/modals
      localStorage.setItem(
        "user",
        JSON.stringify({ id, username, email, kycStatus })
      );
    }

    setIsLoggedIn(true);
    handleCloseModal();
    if (onLoginSuccess) onLoginSuccess(userData);
  };

  // Handle signup success
  const handleSignupSuccess = (userData) => {
    const { token, user } = userData || {};
    if (token) {
      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("tokenChanged"));
    }

    if (user) {
      const { username, email, kycStatus, _id } = user;
      const id = _id;
      localStorage.setItem(
        "user",
        JSON.stringify({ id, username, email, kycStatus })
      );
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
            className="custom-header absolute right-0 mt-3 w-44 rounded-[24px] py-2 z-[9999] shadow-2xl"
            style={{
              background: "linear-gradient(180deg, #50545B 0%, #3C4046 100%)",
              backdropFilter: "blur(67.95500183105469px)",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
            }}
          >
            {/* Profile Button */}
            <button
              onClick={handleProfileClick}
              className="flex items-center gap-3 px-4 py-2.5 text-[#A7A7A7] dropdown-hover-effect transition-all w-full text-left hover:bg-[radial-gradient(366.61%_130.38%_at_16.42%_20%,_rgba(255,_255,_255,_0.40)_0%,_rgba(255,_255,_255,_0.36)_6.76%,_rgba(255,_255,_255,_0)_100%)] hover:rounded-[60px] hover:shadow-lg hover:text-white hover:filter hover:drop-shadow-[0_0_4px_rgba(0,_0,_0,_0.10)]"
            >
              <img
                src="/icons/user.svg"
                alt="Profile Icon"
                className="w-4 h-4 invert brightness-0 hover:brightness-100"
              />
              <span>Profile</span>
            </button>

            {/* Bets Link */}
            <Link
              to="/bets"
              className="flex items-center gap-3 px-4 py-2.5 text-[#A7A7A7] dropdown-hover-effect transition-all hover:bg-[radial-gradient(366.61%_130.38%_at_16.42%_20%,_rgba(255,_255,_255,_0.40)_0%,_rgba(255,_255,_255,_0.36)_6.76%,_rgba(255,_255,_255,_0)_100%)] hover:rounded-[60px] hover:shadow-lg hover:text-white hover:filter hover:drop-shadow-[0_0_4px_rgba(0,_0,_0,_0.10)]"
            >
              <img
                src="/icons/crypto.svg"
                alt=""
                className="w-4 h-4 invert brightness-0"
              />
              <span>Bets</span>
            </Link>

            {/* Transactions Link */}
            <Link
              to="/transactions"
              className="flex items-center gap-3 px-4 py-2.5 text-[#A7A7A7] dropdown-hover-effect transition-all hover:bg-[radial-gradient(366.61%_130.38%_at_16.42%_20%,_rgba(255,_255,_255,_0.40)_0%,_rgba(255,_255,_255,_0.36)_6.76%,_rgba(255,_255,_255,_0)_100%)] hover:rounded-[60px] hover:shadow-lg hover:text-white hover:filter hover:drop-shadow-[0_0_4px_rgba(0,_0,_0,_0.10)]"
            >
              <img
                src="/icons/transaction.svg"
                alt=""
                className="w-4 h-4 invert brightness-0"
              />
              <span>Transactions</span>
            </Link>

            {/* Settings Link */}
            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-2.5 text-[#A7A7A7] dropdown-hover-effect transition-all hover:bg-[radial-gradient(366.61%_130.38%_at_16.42%_20%,_rgba(255,_255,_255,_0.40)_0%,_rgba(255,_255,_255,_0.36)_6.76%,_rgba(255,_255,_255,_0)_100%)] hover:rounded-[60px] hover:shadow-lg hover:text-white hover:filter hover:drop-shadow-[0_0_4px_rgba(0,_0,_0,_0.10)]"
            >
              <img
                src="/icons/setting.svg"
                alt=""
                className="w-4 h-4 invert brightness-0"
              />
              <span>Settings</span>
            </Link>

            {/* Divider */}
            <div className="border-t border-white/10 my-1"></div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-500/10 transition-all hover:rounded-[60px] hover:shadow-lg hover:text-white"
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

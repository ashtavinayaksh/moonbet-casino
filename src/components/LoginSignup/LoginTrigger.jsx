// src/components/LoginSignup/LoginTrigger.jsx

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
              className="relative flex items-center gap-3 px-4 py-2.5 w-full text-left rounded-[60px] overflow-hidden transition-all duration-300
             text-[#A7A7A7] group"
            >
              {/* Default State */}
              <div className="flex items-center gap-3 transition-all duration-300 group-hover:opacity-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 35 35"
                  fill="none"
                >
                  <path
                    d="M13.6571 14.141C13.6571 11.8578 15.6055 10 18 10C20.3945 10 22.3429 11.8578 22.3429 14.141C22.3429 16.4243 20.3945 18.2821 18 18.2821C15.6055 18.2821 13.6571 16.4243 13.6571 14.141ZM20.7429 19.5897H15.2571C12.3589 19.5897 10 21.839 10 24.6026C10 25.9251 11.1273 27 12.5143 27H23.4857C24.8727 27 26 25.9251 26 24.6026C26 21.839 23.6411 19.5897 20.7429 19.5897Z"
                    fill="#E1E1E1"
                  />
                </svg>
                <span className="text-sm font-medium">Profile</span>
              </div>

              {/* Hover State */}
              <div
                className="absolute inset-0 flex items-center gap-3  opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  borderRadius: "60px",
                  background:
                    "radial-gradient(366.61% 130.38% at 16.42% 20%, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.36) 6.76%, rgba(255,255,255,0) 100%)",
                  filter: "drop-shadow(0 0 4px rgba(0,0,0,0.10))",
                }}
              >
                {/* Gray Circle Icon */}
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#A7A7A7] flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM4 20v-1c0-2.21 3.58-4 8-4s8 1.79 8 4v1H4z"
                      fill="white"
                    />
                  </svg>
                </div>

                {/* Label */}
                <span className="text-sm font-medium text-white">Profile</span>
              </div>
            </button>
            {/* Bets Button */}
            <Link
              to="/bets"
              className="relative flex items-center gap-3 px-4 py-2.5 w-full text-left rounded-[60px] overflow-hidden transition-all duration-300
             text-[#A7A7A7] group"
            >
              {/* Default State */}
              <div className="flex items-center gap-3 transition-all duration-300 group-hover:opacity-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M28.15 17C28.626 17 29 16.625 29 16.1667V15.3333C29 13.4916 27.4785 12 25.6 12H15.4C13.53 12 12 13.4916 12 15.3333V23.6667C12 25.5083 13.53 27 15.4 27H25.6C27.4785 27 29 25.5083 29 23.6667V22.8333C29 22.375 28.626 22 28.15 22C26.7475 22 25.6 20.875 25.6 19.5C25.6 18.125 26.7475 17 28.15 17ZM18.8 25.3333H17.1V23.6667C17.1 23.2083 17.4825 22.8333 17.95 22.8333C18.426 22.8333 18.8 23.2083 18.8 23.6667V25.3333ZM18.8 20.3333C18.8 20.7917 18.426 21.1667 17.95 21.1667C17.4825 21.1667 17.1 20.7917 17.1 20.3333V18.6667C17.1 18.2083 17.4825 17.8333 17.95 17.8333C18.426 17.8333 18.8 18.2083 18.8 18.6667V20.3333ZM18.8 15.3333C18.8 15.7917 18.426 16.1667 17.95 16.1667C17.4825 16.1667 17.1 15.7917 17.1 15.3333V13.6667H18.8V15.3333Z"
                    fill="#E1E1E1"
                  />
                </svg>
                <span className="text-sm font-medium">Bets</span>
              </div>

              {/* Hover State */}
              <div
                className="absolute inset-0 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  borderRadius: "60px",
                  background:
                    "radial-gradient(366.61% 130.38% at 16.42% 20%, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.36) 6.76%, rgba(255,255,255,0) 100%)",
                  filter: "drop-shadow(0 0 4px rgba(0,0,0,0.10))",
                }}
              >
                {/* Gray Circle Icon */}
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#A7A7A7] flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M15.15 9C15.626 9 16 8.625 16 8.16667V7.33333C16 5.49167 14.4785 4 12.6 4H8.4C6.53 4 5 5.49167 5 7.33333V15.6667C5 17.5083 6.53 19 8.4 19H12.6C14.4785 19 16 17.5083 16 15.6667V14.8333C16 14.375 15.626 14 15.15 14C13.7475 14 12.6 12.875 12.6 11.5C12.6 10.125 13.7475 9 15.15 9ZM9.8 17.3333H8.1V15.6667C8.1 15.2083 8.4825 14.8333 8.95 14.8333C9.426 14.8333 9.8 15.2083 9.8 15.6667V17.3333ZM9.8 12.3333C9.8 12.7917 9.426 13.1667 8.95 13.1667C8.4825 13.1667 8.1 12.7917 8.1 12.3333V10.6667C8.1 10.2083 8.4825 9.83333 8.95 9.83333C9.426 9.83333 9.8 10.2083 9.8 10.6667V12.3333ZM9.8 7.33333C9.8 7.79167 9.426 8.16667 8.95 8.16667C8.4825 8.16667 8.1 7.79167 8.1 7.33333V5.66667H9.8V7.33333Z"
                      fill="white"
                    />
                  </svg>
                </div>

                {/* Label */}
                <span className="text-sm font-medium text-white">Bets</span>
              </div>
            </Link>

            {/* Transactions Button */}
            <Link
              to="/transactions"
              className="relative flex items-center gap-3 px-4 py-2.5 w-full text-left rounded-[60px] overflow-hidden transition-all duration-300 text-[#A7A7A7] group"
            >
              {/* Default State */}
              <div className="flex items-center gap-3 transition-all duration-300 group-hover:opacity-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M20.5 12C18.8189 12 17.1755 12.4985 15.7777 13.4325C14.3798 14.3665 13.2904 15.694 12.647 17.2472C12.0037 18.8004 11.8354 20.5094 12.1633 22.1583C12.4913 23.8071 13.3008 25.3217 14.4896 26.5104C15.6783 27.6992 17.1929 28.5087 18.8417 28.8367C20.4906 29.1646 22.1996 28.9963 23.7528 28.353C25.306 27.7096 26.6335 26.6202 27.5675 25.2223C28.5015 23.8245 29 22.1811 29 20.5C29 18.2457 28.1045 16.0837 26.5104 14.4896C24.9164 12.8955 22.7543 12 20.5 12ZM16.6364 18.1818H22.5014L22.2695 17.9577C22.124 17.8122 22.0423 17.6149 22.0423 17.4091C22.0423 17.3072 22.0624 17.2063 22.1014 17.1122C22.1403 17.018 22.1975 16.9325 22.2695 16.8605C22.3416 16.7884 22.4271 16.7313 22.5213 16.6923C22.6154 16.6533 22.7163 16.6332 22.8182 16.6332C23.024 16.6332 23.2213 16.7149 23.3668 16.8605L24.9123 18.4059C25.0195 18.5146 25.0921 18.6526 25.121 18.8025C25.1499 18.9524 25.1337 19.1075 25.0745 19.2482C25.0166 19.3893 24.9181 19.5101 24.7916 19.5954C24.6651 19.6806 24.5162 19.7265 24.3636 19.7273H16.6364C16.4314 19.7273 16.2349 19.6459 16.09 19.5009C15.9451 19.356 15.8636 19.1595 15.8636 18.9545C15.8636 18.7496 15.9451 18.5531 16.09 18.4081C16.2349 18.2632 16.4314 18.1818 16.6364 18.1818ZM24.3636 22.8182H18.4986L18.7305 23.0423C18.8029 23.1141 18.8604 23.1996 18.8996 23.2937C18.9388 23.3879 18.959 23.4889 18.959 23.5909C18.959 23.6929 18.9388 23.7939 18.8996 23.8881C18.8604 23.9822 18.8029 24.0677 18.7305 24.1395C18.6586 24.212 18.5732 24.2695 18.479 24.3087C18.3848 24.3479 18.2838 24.3681 18.1818 24.3681C18.0798 24.3681 17.9788 24.3479 17.8846 24.3087C17.7905 24.2695 17.705 24.212 17.6332 24.1395L16.0877 22.5941C15.9805 22.4854 15.9079 22.3474 15.879 22.1975C15.8501 22.0476 15.8663 21.8925 15.9255 21.7518C15.9834 21.6107 16.0819 21.4899 16.2084 21.4046C16.3349 21.3194 16.4838 21.2735 16.6364 21.2727H24.3636C24.5686 21.2727 24.7651 21.3541 24.91 21.4991C25.055 21.644 25.1364 21.8405 25.1364 22.0455C25.1364 22.2504 25.055 22.4469 24.91 22.5919C24.7651 22.7368 24.5686 22.8182 24.3636 22.8182Z"
                    fill="#E1E1E1"
                  />
                </svg>
                <span className="text-sm font-medium">Transactions</span>
              </div>

              {/* Hover State */}
              <div
                className="absolute inset-0 flex items-center gap-3  opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  borderRadius: "60px",
                  background:
                    "radial-gradient(366.61% 130.38% at 16.42% 20%, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.36) 6.76%, rgba(255,255,255,0) 100%)",
                  filter: "drop-shadow(0 0 4px rgba(0,0,0,0.10))",
                }}
              >
                {/* Gray Circle Icon */}
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#A7A7A7] flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="44"
                    height="40"
                    viewBox="0 0 44 40"
                    fill="none"
                  >
                    <g filter="url(#filter0_d_8372_499)">
                      <rect width="40" height="40" rx="20" fill="#A7A7A7" />
                      <path
                        d="M20.5 12C18.8189 12 17.1755 12.4985 15.7777 13.4325C14.3798 14.3665 13.2904 15.694 12.647 17.2472C12.0037 18.8004 11.8354 20.5094 12.1633 22.1583C12.4913 23.8071 13.3008 25.3217 14.4896 26.5104C15.6783 27.6992 17.1929 28.5087 18.8417 28.8367C20.4906 29.1646 22.1996 28.9963 23.7528 28.353C25.306 27.7096 26.6335 26.6202 27.5675 25.2223C28.5015 23.8245 29 22.1811 29 20.5C29 18.2457 28.1045 16.0837 26.5104 14.4896C24.9164 12.8955 22.7543 12 20.5 12ZM16.6364 18.1818H22.5014L22.2695 17.9577C22.124 17.8122 22.0423 17.6149 22.0423 17.4091C22.0423 17.3072 22.0624 17.2063 22.1014 17.1122C22.1403 17.018 22.1975 16.9325 22.2695 16.8605C22.3416 16.7884 22.4271 16.7313 22.5213 16.6923C22.6154 16.6533 22.7163 16.6332 22.8182 16.6332C23.024 16.6332 23.2213 16.7149 23.3668 16.8605L24.9123 18.4059C25.0195 18.5146 25.0921 18.6526 25.121 18.8025C25.1499 18.9524 25.1337 19.1075 25.0745 19.2482C25.0166 19.3893 24.9181 19.5101 24.7916 19.5954C24.6651 19.6806 24.5162 19.7265 24.3636 19.7273H16.6364C16.4314 19.7273 16.2349 19.6459 16.09 19.5009C15.9451 19.356 15.8636 19.1595 15.8636 18.9545C15.8636 18.7496 15.9451 18.5531 16.09 18.4081C16.2349 18.2632 16.4314 18.1818 16.6364 18.1818ZM24.3636 22.8182H18.4986L18.7305 23.0423C18.8029 23.1141 18.8604 23.1996 18.8996 23.2937C18.9388 23.3879 18.959 23.4889 18.959 23.5909C18.959 23.6929 18.9388 23.7939 18.8996 23.8881C18.8604 23.9822 18.8029 24.0677 18.7305 24.1395C18.6586 24.212 18.5732 24.2695 18.479 24.3087C18.3848 24.3479 18.2838 24.3681 18.1818 24.3681C18.0798 24.3681 17.9788 24.3479 17.8846 24.3087C17.7905 24.2695 17.705 24.212 17.6332 24.1395L16.0877 22.5941C15.9805 22.4854 15.9079 22.3474 15.879 22.1975C15.8501 22.0476 15.8663 21.8925 15.9255 21.7518C15.9834 21.6107 16.0819 21.4899 16.2084 21.4046C16.3349 21.3194 16.4838 21.2735 16.6364 21.2727H24.3636C24.5686 21.2727 24.7651 21.3541 24.91 21.4991C25.055 21.644 25.1364 21.8405 25.1364 22.0455C25.1364 22.2504 25.055 22.4469 24.91 22.5919C24.7651 22.7368 24.5686 22.8182 24.3636 22.8182Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_8372_499"
                        x="-4"
                        y="-4"
                        width="48"
                        height="48"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_8372_499"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_8372_499"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <span className="text-sm font-medium text-white">
                  Transactions
                </span>
              </div>
            </Link>

            {/* Settings Button */}
            <Link
              to="/settings"
              className="relative flex items-center gap-3 px-4 py-2.5 w-full text-left rounded-[60px] overflow-hidden transition-all duration-300 text-[#A7A7A7] group"
            >
              {/* Default State */}
              <div className="flex items-center gap-3 transition-all duration-300 group-hover:opacity-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M27.9857 17.6528C27.655 17.6051 27.3394 17.4838 27.0625 17.298C26.7855 17.1123 26.5543 16.8668 26.386 16.5798C26.2177 16.2929 26.1167 15.972 26.0905 15.6409C26.0643 15.3098 26.1136 14.9771 26.2347 14.6675C26.3117 14.4651 26.323 14.2439 26.2671 14.0348C26.2112 13.8257 26.0909 13.6392 25.923 13.5015C25.1818 12.8829 24.3382 12.3969 23.4297 12.0652C23.2228 11.9888 22.9969 11.9793 22.7843 12.0379C22.5716 12.0966 22.383 12.2205 22.2453 12.3919C22.0381 12.6553 21.7732 12.8684 21.4708 13.0149C21.1684 13.1614 20.8364 13.2376 20.5 13.2376C20.1636 13.2376 19.8316 13.1614 19.5292 13.0149C19.2268 12.8684 18.9619 12.6553 18.7547 12.3919C18.617 12.2205 18.4284 12.0966 18.2157 12.0379C18.0031 11.9793 17.7772 11.9888 17.5703 12.0652C16.7315 12.3714 15.9472 12.8088 15.247 13.3607C15.0705 13.4996 14.9434 13.691 14.8843 13.9069C14.8251 14.1228 14.8371 14.3518 14.9183 14.5605C15.0491 14.8782 15.1031 15.222 15.0761 15.5642C15.049 15.9065 14.9417 16.2376 14.7626 16.5312C14.5836 16.8247 14.3378 17.0725 14.045 17.2545C13.7522 17.4366 13.4206 17.5479 13.0767 17.5796C12.8534 17.6033 12.6437 17.6977 12.4785 17.8488C12.3132 17.9998 12.2011 18.1997 12.1587 18.4189C12.0532 18.938 12 19.4663 12 19.996C11.9992 20.4394 12.0352 20.8821 12.1077 21.3197C12.1437 21.5459 12.2537 21.754 12.4207 21.9118C12.5877 22.0696 12.8023 22.1683 13.0313 22.1927C13.3828 22.2255 13.7212 22.3415 14.0183 22.531C14.3154 22.7205 14.5625 22.9779 14.739 23.2818C14.9154 23.5857 15.016 23.9272 15.0325 24.2777C15.0489 24.6282 14.9806 24.9775 14.8333 25.2963C14.737 25.5037 14.7131 25.7372 14.7654 25.9597C14.8178 26.1821 14.9434 26.3809 15.1223 26.5242C15.8591 27.1317 16.6946 27.6098 17.593 27.938C17.7079 27.9776 17.8284 27.9985 17.95 28C18.1167 27.9996 18.2809 27.9596 18.4288 27.8831C18.5767 27.8067 18.704 27.6961 18.8 27.5607C19.002 27.2682 19.2727 27.0291 19.5887 26.8642C19.9047 26.6993 20.2564 26.6135 20.6133 26.6144C20.9591 26.6148 21.3001 26.6955 21.609 26.85C21.9179 27.0045 22.1862 27.2286 22.3927 27.5043C22.53 27.6878 22.7245 27.821 22.9459 27.8831C23.1672 27.9453 23.4031 27.9329 23.6167 27.8479C24.4382 27.5193 25.2029 27.0651 25.8833 26.5017C26.0543 26.3613 26.176 26.1705 26.2309 25.957C26.2859 25.7434 26.2714 25.518 26.1893 25.3132C26.0561 24.9996 25.9979 24.6594 26.0196 24.3197C26.0412 23.9799 26.142 23.6497 26.314 23.3553C26.486 23.0609 26.7245 22.8102 27.0107 22.6231C27.2969 22.436 27.6229 22.3176 27.963 22.2772C28.1835 22.2469 28.3886 22.1476 28.5486 21.9937C28.7086 21.8397 28.8151 21.6392 28.8527 21.4211C28.9437 20.9512 28.993 20.4744 29 19.996C29.0001 19.4914 28.9527 18.9879 28.8583 18.4921C28.8201 18.2788 28.7152 18.0829 28.5585 17.9322C28.4018 17.7815 28.2014 17.6838 27.9857 17.6528ZM23.3333 19.996C23.3333 20.553 23.1672 21.0975 22.8558 21.5607C22.5445 22.0238 22.102 22.3848 21.5843 22.5979C21.0666 22.8111 20.4969 22.8669 19.9473 22.7582C19.3976 22.6495 18.8928 22.3813 18.4965 21.9874C18.1003 21.5936 17.8304 21.0918 17.7211 20.5454C17.6118 19.9991 17.6679 19.4329 17.8823 18.9182C18.0968 18.4036 18.46 17.9638 18.9259 17.6543C19.3918 17.3448 19.9396 17.1797 20.5 17.1797C21.2515 17.1797 21.9721 17.4764 22.5035 18.0046C23.0348 18.5327 23.3333 19.2491 23.3333 19.996Z"
                    fill="#E1E1E1"
                  />
                </svg>
                <span className="text-sm font-medium">Settings</span>
              </div>

              {/* Hover State */}
              <div
                className="absolute inset-0 flex items-center gap-3  opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  borderRadius: "60px",
                  background:
                    "radial-gradient(366.61% 130.38% at 16.42% 20%, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.36) 6.76%, rgba(255,255,255,0) 100%)",
                  filter: "drop-shadow(0 0 4px rgba(0,0,0,0.10))",
                }}
              >
                {/* Gray Circle Icon */}
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#A7A7A7] flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="44"
                    height="40"
                    viewBox="0 0 44 40"
                    fill="none"
                  >
                    <g filter="url(#filter0_d_8372_512)">
                      <rect width="40" height="40" rx="20" fill="#A7A7A7" />
                      <path
                        d="M27.9857 17.6528C27.655 17.6051 27.3394 17.4838 27.0625 17.298C26.7855 17.1123 26.5543 16.8668 26.386 16.5798C26.2177 16.2929 26.1167 15.972 26.0905 15.6409C26.0643 15.3098 26.1136 14.9771 26.2347 14.6675C26.3117 14.4651 26.323 14.2439 26.2671 14.0348C26.2112 13.8257 26.0909 13.6392 25.923 13.5015C25.1818 12.8829 24.3382 12.3969 23.4297 12.0652C23.2228 11.9888 22.9969 11.9793 22.7843 12.0379C22.5716 12.0966 22.383 12.2205 22.2453 12.3919C22.0381 12.6553 21.7732 12.8684 21.4708 13.0149C21.1684 13.1614 20.8364 13.2376 20.5 13.2376C20.1636 13.2376 19.8316 13.1614 19.5292 13.0149C19.2268 12.8684 18.9619 12.6553 18.7547 12.3919C18.617 12.2205 18.4284 12.0966 18.2157 12.0379C18.0031 11.9793 17.7772 11.9888 17.5703 12.0652C16.7315 12.3714 15.9472 12.8088 15.247 13.3607C15.0705 13.4996 14.9434 13.691 14.8843 13.9069C14.8251 14.1228 14.8371 14.3518 14.9183 14.5605C15.0491 14.8782 15.1031 15.222 15.0761 15.5642C15.049 15.9065 14.9417 16.2376 14.7626 16.5312C14.5836 16.8247 14.3378 17.0725 14.045 17.2545C13.7522 17.4366 13.4206 17.5479 13.0767 17.5796C12.8534 17.6033 12.6437 17.6977 12.4785 17.8488C12.3132 17.9998 12.2011 18.1997 12.1587 18.4189C12.0532 18.938 12 19.4663 12 19.996C11.9992 20.4394 12.0352 20.8821 12.1077 21.3197C12.1437 21.5459 12.2537 21.754 12.4207 21.9118C12.5877 22.0696 12.8023 22.1683 13.0313 22.1927C13.3828 22.2255 13.7212 22.3415 14.0183 22.531C14.3154 22.7205 14.5625 22.9779 14.739 23.2818C14.9154 23.5857 15.016 23.9272 15.0325 24.2777C15.0489 24.6282 14.9806 24.9775 14.8333 25.2963C14.737 25.5037 14.7131 25.7372 14.7654 25.9597C14.8178 26.1821 14.9434 26.3809 15.1223 26.5242C15.8591 27.1317 16.6946 27.6098 17.593 27.938C17.7079 27.9776 17.8284 27.9985 17.95 28C18.1167 27.9996 18.2809 27.9596 18.4288 27.8831C18.5767 27.8067 18.704 27.6961 18.8 27.5607C19.002 27.2682 19.2727 27.0291 19.5887 26.8642C19.9047 26.6993 20.2564 26.6135 20.6133 26.6144C20.9591 26.6148 21.3001 26.6955 21.609 26.85C21.9179 27.0045 22.1862 27.2286 22.3927 27.5043C22.53 27.6878 22.7245 27.821 22.9459 27.8831C23.1672 27.9453 23.4031 27.9329 23.6167 27.8479C24.4382 27.5193 25.2029 27.0651 25.8833 26.5017C26.0543 26.3613 26.176 26.1705 26.2309 25.957C26.2859 25.7434 26.2714 25.518 26.1893 25.3132C26.0561 24.9996 25.9979 24.6594 26.0196 24.3197C26.0412 23.9799 26.142 23.6497 26.314 23.3553C26.486 23.0609 26.7245 22.8102 27.0107 22.6231C27.2969 22.436 27.6229 22.3176 27.963 22.2772C28.1835 22.2469 28.3886 22.1476 28.5486 21.9937C28.7086 21.8397 28.8151 21.6392 28.8527 21.4211C28.9437 20.9512 28.993 20.4744 29 19.996C29.0001 19.4914 28.9527 18.9879 28.8583 18.4921C28.8201 18.2788 28.7152 18.0829 28.5585 17.9322C28.4018 17.7815 28.2014 17.6838 27.9857 17.6528ZM23.3333 19.996C23.3333 20.553 23.1672 21.0975 22.8558 21.5607C22.5445 22.0238 22.102 22.3848 21.5843 22.5979C21.0666 22.8111 20.4969 22.8669 19.9473 22.7582C19.3976 22.6495 18.8928 22.3813 18.4965 21.9874C18.1003 21.5936 17.8304 21.0918 17.7211 20.5454C17.6118 19.9991 17.6679 19.4329 17.8823 18.9182C18.0968 18.4036 18.46 17.9638 18.9259 17.6543C19.3918 17.3448 19.9396 17.1797 20.5 17.1797C21.2515 17.1797 21.9721 17.4764 22.5035 18.0046C23.0348 18.5327 23.3333 19.2491 23.3333 19.996Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_8372_512"
                        x="-4"
                        y="-4"
                        width="48"
                        height="48"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_8372_512"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_8372_512"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <span className="text-sm font-medium text-white">Settings</span>
              </div>
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

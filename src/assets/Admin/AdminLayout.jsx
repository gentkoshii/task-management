import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import Popup from "../../components/Popup";
import { Outlet } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const AdminLayout = () => {
  const { darkMode } = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    window.location.href = "/login";
  };

  const buttonClass = darkMode ? "text-gray-200" : "text-gray-800";
  const popupClass = darkMode
    ? "bg-gray-800 text-gray-200"
    : "bg-white text-gray-900";
  const overlayClass = darkMode
    ? "bg-black bg-opacity-75"
    : "bg-black bg-opacity-50";

  return (
    <div
      className={`flex ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
      }`}
    >
      <Sidebar
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        toggleLogout={() => setShowLogoutConfirm(true)}
      />
      <div
        className={`flex-1 transition-margin duration-300 ease-in-out h-full ${
          isDrawerOpen ? "ml-64" : "ml-0"
        } md:ml-64`}
      >
        <button
          onClick={toggleDrawer}
          className={`fixed top-5 left-5 z-40 text-xl ${buttonClass} md:hidden`}
        >
          <FontAwesomeIcon icon={isDrawerOpen ? faXmark : faBars} />
        </button>
        <div className="p-10 h-full">
          <Outlet />
        </div>
      </div>
      {showLogoutConfirm && (
        <div
          className={`fixed inset-0 flex items-center justify-center ${overlayClass} z-50`}
        >
          <div
            className={`p-6 rounded-lg shadow-lg max-w-md w-full ${popupClass}`}
          >
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className={`px-4 py-2 rounded transition duration-150 ${buttonClass} bg-gray-500 hover:bg-gray-600`}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className={`px-4 py-2 rounded transition duration-150 ${buttonClass} bg-blue-500 hover:bg-blue-600`}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;

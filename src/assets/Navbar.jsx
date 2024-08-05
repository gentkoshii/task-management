import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notifications from "./Modals/Notifications";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState("/user-avatar.png");
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, setDarkMode } = useTheme();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    const userObject = JSON.parse(localStorage.getItem("user"));
    if (userObject) {
      setUserId(userObject.id || "");
      if (userObject.profilePicture) {
        setProfilePic(userObject.profilePicture);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const icon =
    "h-8 w-8 cursor-pointer rounded-full border border-black p-1 resize-none";
  const containerClass = darkMode
    ? "bg-gray-800 text-gray-200"
    : "bg-white text-gray-900";
  const linkClass = darkMode
    ? "text-gray-200 hover:text-blue-400"
    : "text-black hover:text-blue-600";
  const sidebarClass = darkMode
    ? "bg-gray-800 text-gray-200"
    : "bg-white text-gray-900";

  return (
    <div
      className={`flex justify-center items-center p-8 shadow-md w-full ${containerClass}`}
    >
      <div className="flex flex-row sm:gap-5 md:gap-10 lg:gap-16 items-center justify-between sm:w-fit md:w-full lg:w-fit">
        <div className="flex">
          <Link
            to="/"
            className={`flex items-center gap-2 ${linkClass} no-underline`}
          >
            <div className="flex flex-row items-center justify-center gap-2">
              {darkMode ? (
                <img
                  src="../../../public/1.1.png"
                  alt="logo"
                  className="rounded-md h-8 w-8"
                  style={{ minWidth: "32px", minHeight: "32px" }}
                />
              ) : (
                <img
                  src="../../../public/1.png"
                  alt="logo"
                  className="rounded-md h-8 w-8"
                  style={{ minWidth: "32px", minHeight: "32px" }}
                />
              )}
              <h4 className="m-0 md:text-lg lg:text-2xl">TaskFlow</h4>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex justify-center items-center md:gap-7 lg:gap-[3vw]">
          <Link to="/" className={`${linkClass} no-underline transition`}>
            <h5 className="m-0 text-lg md:text-base lg:text-xl">Home</h5>
          </Link>
          <Link to="/about" className={`${linkClass} no-underline transition`}>
            <h5 className="m-0 text-lg md:text-base lg:text-xl">About</h5>
          </Link>
          <Link
            to="/features"
            className={`${linkClass} no-underline transition`}
          >
            <h5 className="m-0 text-lg md:text-base lg:text-xl">Features</h5>
          </Link>
          <Link to="/help" className={`${linkClass} no-underline transition`}>
            <h5 className="m-0 text-lg md:text-base lg:text-xl">Help</h5>
          </Link>
          <Link
            to="/contact"
            className={`${linkClass} no-underline transition`}
          >
            <h5 className="m-0 text-lg md:text-base lg:text-xl">Contact</h5>
          </Link>

          <div className="hidden md:flex gap-3 md:gap-5">
            <form onSubmit={handleSearchSubmit} className="flex">
              <input
                className="lg:w-[15vw] md:w-20 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="hidden">
                Search
              </button>
            </form>
            <div onClick={toggleDarkMode} className="h-8 w-8">
              {darkMode ? (
                <div className="flex-shrink-0">
                  <img
                    src="/light-mode.png"
                    alt="light mode icon"
                    className="h-8 w-8 rounded-full cursor-pointer border border-black p-1 resize-none"
                    style={{ minWidth: "32px", minHeight: "32px" }}
                  />
                </div>
              ) : (
                <div className="flex-shrink-0">
                  <img
                    src="/dark-mode.png"
                    alt="dark mode icon"
                    className={icon}
                    style={{ minWidth: "32px", minHeight: "32px" }}
                  />
                </div>
              )}
            </div>
            {isLoggedIn ? (
              <div className="flex items-center gap-3 relative">
                <button onClick={toggleNotifications}>
                  {darkMode ? (
                    <img
                      src="/bell-ring-white.png"
                      alt="notifications"
                      className={icon}
                      style={{ minWidth: "32px", minHeight: "32px" }}
                    />
                  ) : (
                    <img
                      src="/bell-ring.png"
                      alt="notifications"
                      className={icon}
                      style={{ minWidth: "32px", minHeight: "32px" }}
                    />
                  )}
                </button>
                {showNotifications && (
                  <Notifications
                    userId={userId}
                    numberOfLatestNotifications={5}
                    onClose={toggleNotifications}
                  />
                )}
                <Link to={"/user"}>
                  <img
                    src={profilePic}
                    alt="profile"
                    className="rounded-5 w-6 h-6"
                    style={{ minWidth: "32px", minHeight: "32px" }}
                  />
                </Link>
                <button onClick={handleLogout}>
                  {darkMode ? (
                    <img
                      src="/logout-white.png"
                      alt="logout"
                      className="h-6 w-6 cursor-pointer"
                      style={{ minWidth: "24px", minHeight: "24px" }}
                    />
                  ) : (
                    <img
                      src="/logout.png"
                      alt="logout"
                      className="h-6 w-6 cursor-pointer"
                      style={{ minWidth: "24px", minHeight: "24px" }}
                    />
                  )}
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <Link to="/login" className={linkClass}>
                  <h5 className="m-0 md:text-base">Login</h5>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div
          className="md:hidden flex items-center h-8 w-8"
          onClick={toggleMenu}
        >
          {darkMode ? (
            <img
              src="/menu-white.png"
              alt="menu"
              className=""
              style={{ minWidth: "32px", minHeight: "32px" }}
            />
          ) : (
            <img
              src="/menu.png"
              alt="menu"
              className=""
              style={{ minWidth: "32px", minHeight: "32px" }}
            />
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div
          className={`fixed top-0 right-0 w-[50%] h-full ${sidebarClass} shadow-lg flex flex-col z-50`}
        >
          <div className="flex justify-end p-8">
            <button onClick={toggleMenu} className={linkClass}>
              {darkMode ? (
                <img
                  src="/menu-white.png"
                  alt="menu"
                  className="h-7 w-7"
                  style={{ minWidth: "28px", minHeight: "28px" }}
                />
              ) : (
                <img
                  src="/menu.png"
                  alt="menu"
                  className="h-7 w-7"
                  style={{ minWidth: "28px", minHeight: "28px" }}
                />
              )}
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 p-4">
            <button onClick={toggleDarkMode} className={linkClass}>
              {darkMode ? (
                <img
                  src="/light-mode.png"
                  alt="light mode icon"
                  className={icon}
                  style={{ minWidth: "32px", minHeight: "32px" }}
                />
              ) : (
                <img
                  src="/dark-mode.png"
                  alt="dark mode icon"
                  className={icon}
                  style={{ minWidth: "32px", minHeight: "32px" }}
                />
              )}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button onClick={toggleNotifications}>
                  {darkMode ? (
                    <img
                      src="/bell-ring-white.png"
                      alt="notifications"
                      className={icon}
                      style={{ minWidth: "32px", minHeight: "32px" }}
                    />
                  ) : (
                    <img
                      src="/bell-ring.png"
                      alt="notifications"
                      className={icon}
                      style={{ minWidth: "32px", minHeight: "32px" }}
                    />
                  )}
                </button>
                {showNotifications && (
                  <Notifications
                    userId={userId}
                    numberOfLatestNotifications={5}
                    onClose={toggleNotifications}
                  />
                )}
                <button>
                  <img
                    src={profilePic}
                    alt="profile"
                    className={`${icon} p-0`}
                    style={{ minWidth: "32px", minHeight: "32px" }}
                  />
                </button>
                <button onClick={handleLogout}>
                  {darkMode ? (
                    <img
                      src="/logout-white.png"
                      alt="logout"
                      className="h-6 w-6 cursor-pointer"
                      style={{ minWidth: "24px", minHeight: "24px" }}
                    />
                  ) : (
                    <img
                      src="/logout.png"
                      alt="logout"
                      className="h-6 w-6 cursor-pointer"
                      style={{ minWidth: "24px", minHeight: "24px" }}
                    />
                  )}
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <Link to="/login" className={linkClass}>
                  <h5 className="m-0 md:text-base">Login</h5>
                </Link>
              </div>
            )}
          </div>
          <div className="flex-grow flex flex-col justify-center items-center gap-4">
            <Link to="/" className={linkClass} onClick={toggleMenu}>
              <h5 className="m-0">Home</h5>
            </Link>
            <Link to="/about" className={linkClass} onClick={toggleMenu}>
              <h5 className="m-0">About</h5>
            </Link>
            <Link to="/features" className={linkClass} onClick={toggleMenu}>
              <h5 className="m-0">Features</h5>
            </Link>
            <Link to="/help" className={linkClass} onClick={toggleMenu}>
              <h5 className="m-0">Help</h5>
            </Link>
            <Link to="/contact" className={linkClass} onClick={toggleMenu}>
              <h5 className="m-0">Contact</h5>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

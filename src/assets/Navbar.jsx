import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notifications from "./Modals/Notifications";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [profilePic, setProfilePic] = useState(
    "../../../public/user-avatar.png"
  );
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }

    const userObject = JSON.parse(localStorage.getItem("user"));
    if (userObject) {
      setUserId(userObject.id || "");
      if (userObject.ProfilePicture) {
        setProfilePic(userObject.ProfilePicture);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
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

  const icon = "h-7 w-7 rounded-full cursor-pointer border border-black p-1";

  return (
    <div className="w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-black no-underline"
          >
            <img
              src="../../../public/1.png"
              alt="logo"
              className="h-10 rounded-md"
            />
            <h5 className="m-0 text-lg">TaskFlow</h5>
          </Link>
        </div>

        <div className="relative lg:hidden z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>

          <div
            className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg ${
              isMenuOpen ? "block" : "hidden"
            } z-50`}
          >
            <Link
              to="/"
              className="block px-4 py-2 text-black no-underline hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 text-black no-underline hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/features"
              className="block px-4 py-2 text-black no-underline hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/help"
              className="block px-4 py-2 text-black no-underline hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Help
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-2 text-black no-underline hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center px-4 py-2"
            >
              <input
                className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <div className="flex flex-col items-start gap-2 px-4 py-2">
              <button>
                <img
                  src="../../../public/dark-mode.png"
                  alt="dark mode icon"
                  className={icon}
                
                />
              </button>
              {isLoggedIn ? (
                <>
                  <button
                    onClick={toggleNotifications}
                    className="flex items-center gap-2"
                  >
                    <img
                      src="../../../public/bell-ring.png"
                      alt="notifications"
                      className={icon}
                    />
                    Notifications
                  </button>
                  {showNotifications && <Notifications userId={userId} />}
                  <button className="flex items-center gap-2">
                    <img src={profilePic} alt="profile" className={icon} />
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <img
                      src="../../../public/logout.png"
                      alt="logout"
                      className="h-6 w-6 cursor-pointer"
                    />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-black no-underline hover:text-blue-600 transition"
                >
                  <img
                    src="../../../public/login.png"
                    alt="login"
                    className="h-6 w-6"
                  />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <Link
            to="/"
            className="text-black no-underline hover:text-blue-600 transition"
          >
            <h5 className="m-0 text-lg">Home</h5>
          </Link>
          <Link
            to="/about"
            className="text-black no-underline hover:text-blue-600 transition"
          >
            <h5 className="m-0 text-lg">About</h5>
          </Link>
          <Link
            to="/features"
            className="text-black no-underline hover:text-blue-600 transition"
          >
            <h5 className="m-0 text-lg">Features</h5>
          </Link>
          <Link
            to="/help"
            className="text-black no-underline hover:text-blue-600 transition"
          >
            <h5 className="m-0 text-lg">Help</h5>
          </Link>
          <Link
            to="/contact"
            className="text-black no-underline hover:text-blue-600 transition"
          >
            <h5 className="m-0 text-lg">Contact</h5>
          </Link>
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center lg:mt-0"
          >
            <input
              className="w-40 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="hidden">
              Search
            </button>
          </form>
          <div className="flex items-center gap-3 lg:mt-0">
            <button>
              <img
                src="../../../public/dark-mode.png"
                alt="dark mode icon"
                className={icon}
                
              />
            </button>
            {isLoggedIn ? (
              <>
                <button onClick={toggleNotifications}>
                  <img
                    src="../../../public/bell-ring.png"
                    alt="notifications"
                    className={icon}
                  />
                </button>
                {showNotifications && <Notifications userId={userId} />}
                <button>
                  <img src={profilePic} alt="profile" className={icon} />
                </button>
                <button onClick={handleLogout}>
                  <img
                    src="../../../public/logout.png"
                    alt="logout"
                    className="h-6 w-6 cursor-pointer"
                  />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-black no-underline hover:text-blue-600 transition"
              >
                <h5 className="m-0 text-lg">Login</h5>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

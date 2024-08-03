import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notifications from "./Modals/Notifications";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState("/user-avatar.png");
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const icon = "h-7 w-7 rounded-full cursor-pointer border border-black p-1";

  return (
    <div className="flex w-screen justify-center items-center p-[34px]">
      <div className="w-full md:w-[80%] lg:w-[60%] flex justify-between items-center m-0">
        <div className="flex">
          <Link
            to="/"
            className="flex items-center gap-2 text-black no-underline"
          >
            <img src="/1.png" alt="logo" className="h-10 rounded-md" />
            <h5 className="m-0">TaskFlow</h5>
          </Link>
        </div>

        <div className="hidden md:flex justify-center gap-4">
          <Link to="/" className="text-black no-underline">
            <h5 className="m-0">Home</h5>
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
        </div>

        <div className="hidden md:flex gap-3">
          <form onSubmit={handleSearchSubmit} className="flex">
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
          <button>
            <img
              src="/dark-mode.png"
              alt="dark mode icon"
              className={`${icon}`}
            />
          </button>
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button onClick={toggleNotifications}>
                <img
                  src="/bell-ring.png"
                  alt="notifications"
                  className={`${icon}`}
                />
              </button>
              {showNotifications && <Notifications userId={userId} />}
              <button>
                <img src={profilePic} alt="profile" className={`${icon} p-0`} />
              </button>
              <button onClick={handleLogout}>
                <img
                  src="/logout.png"
                  alt="logout"
                  className="h-6 w-6 cursor-pointer"
                />
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" className="text-black no-underline">
                <h5 className="m-0">Login</h5>
              </Link>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-black">
            <img src="/menu.png" alt="menu" className="h-8 w-8" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-[50%] h-full bg-white shadow-lg flex flex-col z-50">
          <div className="flex justify-end p-8">
            <button onClick={toggleMenu} className="text-black">
              <img src="/menu.png" alt="close menu" className="h-7 w-7" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 p-4">
            <button className="text-black border rounded-5 border-black h-7">
              <img src="/dark-mode.png" alt="close menu" className="h-6 w-6" />
            </button>
            <button onClick={toggleNotifications} className="text-black">
              <img
                src="/bell-ring.png"
                alt="notifications"
                className={`${icon}`}
              />
            </button>
            {showNotifications && <Notifications userId={userId} />}
            <button className="text-black">
              <img src={profilePic} alt="profile" className={`${icon} p-0`} />
            </button>
            <button onClick={handleLogout} className="text-black">
              <img
                src="/logout.png"
                alt="logout"
                className="h-6 w-6 cursor-pointer"
              />
            </button>
          </div>
          <div className="flex-grow flex flex-col justify-center items-center gap-4">
            <Link
              to="/"
              className="text-black no-underline"
              onClick={toggleMenu}
            >
              <h5 className="m-0">Home</h5>
            </Link>
            <Link
              to="/about"
              className="text-black no-underline"
              onClick={toggleMenu}
            >
              <h5 className="m-0">About</h5>
            </Link>
            <Link
              to="/features"
              className="text-black no-underline"
              onClick={toggleMenu}
            >
              <h5 className="m-0">Features</h5>
            </Link>
            <Link
              to="/help"
              className="text-black no-underline"
              onClick={toggleMenu}
            >
              <h5 className="m-0">Help</h5>
            </Link>
            <Link
              to="/contact"
              className="text-black no-underline"
              onClick={toggleMenu}
            >
              <h5 className="m-0">Contact</h5>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

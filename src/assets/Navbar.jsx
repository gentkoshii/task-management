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
  // Handle form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery)}`); // Redirects to search results page
    }
  };

  const icon = "h-7 rounded-full cursor-pointer border-1 border-black p-[2px]";

  return (
    <div className="flex w-screen justify-center items-center p-[34px]">
      <div className="w-[60%] flex justify-between items-center m-0">
        <div className="flex">
          <Link
            to="/"
            className="flex items-center gap-2 text-black no-underline"
          >
            <img
              src="../../../public/1.png"
              alt="logo"
              className="h-10 rounded-md"
            />
            <h5 className="m-0">TaskFlow</h5>
          </Link>
        </div>

        <div className="flex justify-center gap-4">
          <Link to="/" className="text-black no-underline">
            <h5 className="m-0">Home</h5>
          </Link>
          <Link to="/about" className="text-black no-underline">
            <h5 className="m-0">About</h5>
          </Link>
          <Link to="/features" className="text-black no-underline">
            <h5 className="m-0">Features</h5>
          </Link>
          <Link to="/help" className="text-black no-underline">
            <h5 className="m-0">Help</h5>
          </Link>
          <Link to="/contact" className="text-black no-underline">
            <h5 className="m-0">Contact</h5>
          </Link>
        </div>

        <div className="flex gap-3">
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              className="w-40 border-[1px] border-black rounded-md"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </form>
          <button>
            <img
              src="../../../public/dark-mode.png"
              alt="dark mode icon"
              className={`${icon}`}
            />
          </button>
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button onClick={toggleNotifications}>
                <img
                  src="../../../public/bell-ring.png"
                  alt="notifications"
                  className={`${icon}`}
                />
              </button>

              {showNotifications && <Notifications userId={userId} />}
              <button className="">
                <img src={profilePic} alt="profile" className={`${icon}`} />
              </button>
              <button className="" onClick={handleLogout}>
                <img
                  src="../../../public/logout.png"
                  alt="logout"
                  className="h-6 w-6 cursor-pointer"
                />
              </button>
            </div>
          ) : (
            <div className="">
              <Link to="/login" className="text-black no-underline">
                <h5 className="m-0">Login</h5>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

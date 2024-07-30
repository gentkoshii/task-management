import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [profilePic, setProfilePic] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }

    // Get profile picture from LocalStorage if exists
    const userObject = JSON.parse(localStorage.getItem("user"));
    if (userObject && userObject.ProfilePicture) {
      setProfilePic(userObject.ProfilePicture);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
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
          <input
            className="w-40 border-[1px] border-black rounded-md"
            type="text"
            placeholder="Search..."
          />
          <button>
            <img
              src="../../../public/dark-mode.png"
              alt="dark mode icon"
              className={`${icon}`}
            />
          </button>
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button className="">
                <img
                  src="../../../public/bell-ring.png"
                  alt="notifications"
                  className={`${icon}`}
                />
              </button>
              <button className="">
                <img
                  src={profilePic}
                  alt="notifications"
                  className={`${icon}`}
                />
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

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [initial, setInitial] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    fetchName();
  }, []);

  const fetchName = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("url");
      if (response.ok) {
        const data = await response.json();
        const userName = data.name;
        setName(userName);
        setInitial(name.trim().charAt(0).toUpperCase());
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
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
            <img src="1.png" alt="logo" className="h-10 rounded-md" />
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
              src="dark-mode.png"
              alt="dark mode icon"
              className={`${icon}`}
            />
          </button>
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button className="">
                <img
                  src="bell-ring.png"
                  alt="notifications"
                  className={`${icon}`}
                />
              </button>
              <button className="">
                <div className="h-7 w-7 flex justify-center bg-red-400 rounded-full border-1 border-black p-[2px]">
                  <p>{initial}</p>
                </div>
              </button>
              <button className="" onClick={handleLogout}>
                <img
                  src="logout.png"
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

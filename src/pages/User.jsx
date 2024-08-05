import React, { useState, useEffect } from "react";
import Navbar from "../assets/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "./User/Dashboard";
import Projects from "./User/Projects";
import { useTheme } from "../context/ThemeContext";

const User = () => {
  const [activeLink, setActiveLink] = useState("dashboard");
  const [name, setName] = useState("Anonymous");
  const [profilePic, setProfilePic] = useState(
    "../../../public/user-avatar.png"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  useEffect(() => {
    getUserProfile();
    const handleScroll = () => {
      setShowScrollTopButton(window.scrollY > window.innerHeight * 1.1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const getUserProfile = async () => {
    await axios
      .get(`https://4wvk44j3-7001.euw.devtunnels.ms/api/user/profile`, {
        headers: requestHeaders,
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        setName(response.data.firstName + " " + response.data.lastName);
        setProfilePic(response.data.profilePicture);
      });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sidebarBgClass = darkMode
    ? "bg-gray-800 text-gray-200"
    : "bg-[#FFDF92] text-black";
  const linkBgClass = darkMode ? "bg-gray-700" : "bg-[#fff2d3]";
  const linkTextClass = darkMode ? "text-white" : "text-black";
  const containerBgClass = darkMode ? "bg-slate-900" : "bg-white";
  const buttonBgClass = darkMode ? "bg-slate-400" : "bg-[#FFDF92]";

  return (
    <div
      className={`flex flex-col min-h-[587px] py-8 px-6 ${containerBgClass}`}
    >
      <div className="flex w-full flex-col md:flex-row justify-center gap-2 md:gap-14">
        {/* Sidebar */}
        <button
          className={`absolute top-[4.5vh] left-[36px] md:hidden ${buttonBgClass} p-2 rounded-md`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <img src="hide.png" alt="Menu" className="h-6 w-6" />
        </button>
        <div
          className={`flex md:w-18 lg:w-[25vw] w-full ${sidebarBgClass} border-1 py-5 px-8 h-full rounded-lg flex-col justify-between gap-6 ${
            isSidebarOpen ? "flex" : "hidden "
          } md:flex`}
        >
          <div className="flex items-centere gap-6">
            <img
              src={profilePic}
              title="Profile Picture"
              alt="avatar"
              className="h-8 w-8 rounded-full "
            />
            <p className="text-xl capitalize">{name}</p>
          </div>
          <div className="flex flex-col py-24 gap-1">
            <Link
              className={`text-md font-semibold no-underline hover:translate-x-[2px] pl-6 ${linkTextClass} ${
                activeLink === "dashboard"
                  ? `${linkBgClass} w-full rounded-md`
                  : ""
              }`}
              onClick={() => setActiveLink("dashboard")}
            >
              Dashboard
            </Link>
            <Link
              className={`text-md font-semibold no-underline hover:translate-x-[2px] pl-6 ${linkTextClass} ${
                activeLink === "projects"
                  ? `${linkBgClass} w-full rounded-md`
                  : ""
              }`}
              onClick={() => setActiveLink("projects")}
            >
              Projects
            </Link>
          </div>
          <div>
            <button onClick={handleLogout} className="flex gap-2">
              {darkMode ? (
                <img
                  src="logout-white.png"
                  alt="logout"
                  className="h-6 w-6 cursor-pointer hover:translate-x-[2px]"
                />
              ) : (
                <img
                  src="logout.png"
                  alt="logout"
                  className="h-6 w-6 cursor-pointer hover:translate-x-[2px]"
                />
              )}
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className={`w-full flex rounded-md border-1 ${containerBgClass}`}>
          {activeLink === "dashboard" && <Dashboard />}
          {activeLink === "projects" && <Projects />}
        </div>
      </div>
      {showScrollTopButton && (
        <button
          className="fixed bottom-10 right-10 bg-[#FFDF92] p-3 rounded-full shadow-lg"
          onClick={scrollToTop}
        >
          <img src="up.png" alt="Scroll to top" className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default User;

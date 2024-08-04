import React, { useState, useEffect } from "react";
import Navbar from "../assets/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "./User/Dashboard";
import Projects from "./User/Projects";

const User = () => {
  const [activeLink, setActiveLink] = useState("dashboard");
  const [name, setName] = useState("Anonymous");
  const [profilePic, setProfilePic] = useState(
    "../../../public/user-avatar.png"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-1 min-h-[800px] w-[90%] justify-center ml-[5%] gap-14 relative">
        {/* Sidebar */}
        <button
          className="fixed top-[82px] left-[36px] md:hidden bg-[#FFDF92] p-2 rounded-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <img src="hide.png" alt="Menu" className="h-6 w-6" />
        </button>
        <div
          className={`fixed top-30 mt-4 left-8 w-80 bg-[#FFDF92] border-1 py-5 pl-8 h-[780px] rounded-lg flex flex-col justify-between gap-6  ${
            isSidebarOpen ? "flex" : "hidden "
          } md:flex`}
        >
          <div className="flex items-center gap-6">
            <img
              src={profilePic}
              title="Profile Picture"
              alt="avatar"
              className="h-8 w-8 rounded-full border-1 border-black"
            />
            <p className="text-xl">{name}</p>
          </div>
          <div className="flex flex-col py-24 gap-1">
            <Link
              className={`text-md font-semibold text-black no-underline hover:translate-x-[2px] pl-6 ${
                activeLink === "dashboard" ? "bg-[#fff2d3] w-48 rounded-md" : ""
              }`}
              onClick={() => setActiveLink("dashboard")}
            >
              Dashboard
            </Link>
            <Link
              className={`text-md font-semibold text-black no-underline hover:translate-x-[2px] pl-6 ${
                activeLink === "projects" ? "bg-[#fff2d3] w-48 rounded-md" : ""
              }`}
              onClick={() => setActiveLink("projects")}
            >
              Projects
            </Link>
          </div>
          <div>
            <button onClick={handleLogout} className="flex gap-2">
              <img
                src="logout.png"
                alt="logout"
                className="h-6 w-6 cursor-pointer hover:translate-x-[2px]"
              />
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-0 md:ml-80 w-full mt-6 mb-10 bg-transparent rounded-md border-1">
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

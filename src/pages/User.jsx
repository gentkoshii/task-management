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
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile();
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

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-1 min-h-[800px] w-[90%] justify-center ml-[5%] gap-14 relative">
        {/* Sidebar */}
        <div className="fixed top-30 left-10 w-80 bg-[#FFDF92] border-1 border-[#FFE5A8] py-5 pl-8 h-[800px] rounded-lg flex flex-col justify-between gap-6">
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
        <div className="ml-80 w-full mb-10 bg-transparent rounded-md border-1">
          {activeLink === "dashboard" && <Dashboard />}
          {activeLink === "projects" && <Projects />}
        </div>
      </div>
    </div>
  );
};

export default User;

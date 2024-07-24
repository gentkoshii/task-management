import React, { useState } from "react";
import Navbar from "../assets/Navbar";
import { Link } from "react-router-dom";
import Dashboard from "./User/Dashboard";
import Projects from "./User/Projects";
import Tasks from "./User/Tasks";

const User = () => {
  const [activeLink, setActiveLink] = useState("dashboard");

  return (
    <div className="flex flex-col gap-3 min-h[100vh] overflow-hidden ">
      <Navbar />
      <div className="flex flex-1 min-h-[800px] w-[90%] justify-center ml-[5%] gap-14">
        <div className="flex flex-col justify-between py-5 pl-8 w-80 bg-[#FFDF92] rounded-md border-1 border-[#FFE5A8] ">
          <div className="flex gap-6 item-center">
            <img
              src="user-avatar.png"
              alt="avatar"
              className="h-8 w-8 rounded-5 p-[3px] border-1 border-black"
            />
            <p className="text-md">{name}</p>{" "}
            {/* Replace with actual username */}
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
            <Link
              className={`text-md font-semibold text-black no-underline hover:translate-x-[2px] pl-6 ${
                activeLink === "tasks" ? "bg-[#fff2d3] w-48 rounded-md" : ""
              }`}
              onClick={() => setActiveLink("tasks")}
            >
              Tasks
            </Link>
          </div>
          <div>
            <Link to={"/login"}>
              <img
                src="logout.png"
                alt="logout"
                className="h-6 hover:translate-x-[2px]"
              />
            </Link>
          </div>
        </div>
        <div className="w-full bg-transparent rounded-md border-1">
          {/* map the projects */}
          {activeLink === "dashboard" ? <Dashboard /> : null}
          {activeLink === "projects" ? <Projects /> : null}
          {activeLink === "tasks" ? <Tasks /> : null}
        </div>
      </div>
    </div>
  );
};

export default User;

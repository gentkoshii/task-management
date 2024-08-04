import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCog,
  faUser,
  faTachometerAlt,
  faSignOutAlt,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const Sidebar = ({ isOpen, toggleDrawer, toggleLogout }) => {
  const { darkMode, setDarkMode } = useTheme();

  const menuItems = [
    { icon: faTachometerAlt, text: "Dashboard" },
    { icon: faUserCog, text: "Users" },
    { icon: faMessage, text: "Messages" },
    { icon: faUser, text: "Profile" },
    { icon: faSignOutAlt, text: "Log Out" },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const icon = `h-8 w-8 cursor-pointer ${
    darkMode ? "border-white" : "border-black"
  } rounded-full border border-black p-1 resize-none`;

  return (
    <div
      className={`${
        darkMode ? "bg-slate-800" : "bg-white"
      } shadow-lg h-full fixed z-30 w-64 transform flex flex-col gap-10 justify-center pt-8 transition-transform duration-300 ease-in-out
                        ${
                          isOpen ? "translate-x-0" : "-translate-x-full"
                        } md:translate-x-0`}
    >
      <div className="text-center py-4 gap-4 flex flex-col">
        {darkMode ? (
          <img
            src="../../../public/1.1.png"
            alt="logo"
            className="mx-auto h-12 w-auto rounded-md"
          />          ) : (
          <img
            src="../../../public/1.png"
            alt="logo"
            className="mx-auto h-12 w-auto rounded-md"
          />          )}
        <h1 className="text-lg dark:text-white">TaskFlow</h1>
      </div>
      <ul className="space-y-7">
        {menuItems.map((item) => (
          <li
            key={item.text}
            className={`pl-4 py-2 ${
              darkMode ? "text-white" : "text-gray-700"
            }  text-sm ${
              darkMode ? "hover:bg-slate-900" : "hover:bg-gray-200"
            } dark:text-white cursor-pointer`}
          >
            {item.text === "Log Out" ? (
              <div
                onClick={toggleLogout}
                className={`flex items-center no-underline ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="mr-2" />
                {item.text}
              </div>
            ) : (
              <Link
                to={`/admin/${item.text.replace(" ", "").toLowerCase()}`}
                className={`flex items-center no-underline ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`mr-2 ${darkMode ? "text-white" : "text-black"}`}
                />
                {item.text}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <div
        onClick={toggleDarkMode}
        className=" flex w-full p-6 items-end justify-end"
      >
        {darkMode ? (
          <div className="">
            <img src="/light-mode.png" alt="light mode icon" className={icon} />
          </div>
        ) : (
          <div className="">
            <img src="/dark-mode.png" alt="dark mode icon" className={icon} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

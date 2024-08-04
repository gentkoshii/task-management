import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { darkMode } = useTheme();

  const linkClass = darkMode ? 'text-white no-underline' : 'text-black no-underline';
  const iconClass = darkMode ? 'text-white' : 'text-black';

  return (
    <div className="w-screen flex justify-center bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-6xl px-4 lg:px-0 py-4 border-t-[1px] border-black dark:border-white gap-5 flex flex-col">
        <div className="flex gap-2 items-center">
        {darkMode ? (
          <img
            src="../../../public/1.1.png"
            alt="logo"
            className="h-9 rounded-md"
          />          ) : (
          <img
            src="../../../public/1.png"
            alt="logo"
            className="h-9 rounded-md"
          />          )}
          <h2 className="font-semibold dark:text-white">TaskFlow</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-8 text-left">
          <div className="flex flex-col mb-4">
            <div className="flex gap-2">
              <Link to="https://facebook.com">
                <FontAwesomeIcon icon={faFacebook} className={`h-6 w-6 ${iconClass}`} />
              </Link>
              <Link to="https://instagram.com">
                <FontAwesomeIcon icon={faInstagram} className={`h-6 w-6 ${iconClass}`} />
              </Link>
              <Link to="https://twitter.com">
                <FontAwesomeIcon icon={faTwitter} className={`h-6 w-6 ${iconClass}`} />
              </Link>
            </div>
            <p className="m-0 text-lg pt-2 dark:text-white">(045) 123-456</p>
            <p className="m-0 text-lg pt-2 dark:text-white">
              123 Street, Prishtina, Kosove
            </p>
          </div>

          <div>
            <h3 className="font-semibold dark:text-white">Features</h3>
            <div className="flex flex-col">
              <Link
                to="/features"
                className={linkClass}
              >
                Easy Task Management
              </Link>
              <Link
                to="/features"
                className={linkClass}
              >
                Task Creation
              </Link>
              <Link
                to="/features"
                className={linkClass}
              >
                Collaboration
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold dark:text-white">Company</h3>
            <div className="flex flex-col">
              <Link to="/about" className={linkClass}>
                About Us
              </Link>
              <Link to="/help" className={linkClass}>
                Help
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold dark:text-white">Legal</h3>
            <div className="flex flex-col">
              <p className="m-0 text-lg pt-2 dark:text-white">
                Privacy Policy
              </p>
              <p className="m-0 text-lg pt-2 dark:text-white">
                Terms of Service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

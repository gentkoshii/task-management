import React from "react";
import { Link } from "react-router-dom";

const image = "h-7 w-7 rounded-full";
const column = "flex flex-col gap-3 p-0";

const Footer = () => {
  return (
    <div className="w-screen flex justify-center bg-gray-100">
      <div className="w-full max-w-6xl px-4 lg:px-0 py-4 border-t-[1px] border-black gap-5 flex flex-col">
        <div className="flex gap-2 items-center">
          <img
            src="../../../public/1.png"
            alt="logo"
            className="h-9 rounded-md"
          />
          <h2 className="font-semibold">TaskFlow</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-8 text-left">
          <div className="flex flex-col mb-4">
            <div className="flex gap-2">
              <Link to="/facebook.com">
                <img
                  src="../../../public/instagram.png"
                  alt="icon"
                  className="h-6 w-6"
                />
              </Link>
              <Link to="/facebook.com">
                <img
                  src="../../../public/facebook.png"
                  alt="icon"
                  className="h-6 w-6"
                />
              </Link>
              <Link to="/">
                <img
                  src="../../../public/twitter.png"
                  alt="icon"
                  className="h-6 w-6"
                />
              </Link>
            </div>
            <p className="m-0 text-lg pt-2">(045) 123-456</p>
            <p className="m-0 text-lg pt-2">123 Street, Prishtina, Kosove</p>
          </div>

          <div>
            <h3 className="font-semibold">Features</h3>
            <div className="flex flex-col">
              <Link
                to="/features/easy-task-management"
                className="text-black no-underline"
              >
                Easy Task Management
              </Link>
              <Link
                to="/features/task-creation"
                className="text-black no-underline"
              >
                Task Creation
              </Link>
              <Link
                to="/features/collaboration"
                className="text-black no-underline"
              >
                Collaboration
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Company</h3>
            <div className="flex flex-col">
              <Link to="/about" className="text-black no-underline">
                About Us
              </Link>
              <Link to="/help" className="text-black no-underline">
                Help
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Legal</h3>
            <div className="flex flex-col">
              <Link to="/privacy" className="text-black no-underline">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-black no-underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

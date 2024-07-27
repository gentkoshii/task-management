import React from "react";
import { Link } from "react-router-dom";

const image = " h-7 w-7 rounded-3";
const column = "flex flex-col gap-3 p-0";

const Footer = () => {
  return (
    <div className="w-screen flex justify-center bg-gray-100">
      <div className="w-[60%] flex justify-between  items-start text-left pt-4 pb-5 border-i border-t-[1px] border-black ">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <img
              src="../../../public/1.png"
              alt="logo"
              className="h-9 rounded-md"
            />
            <h2 className="font-semibold">TaskFlow</h2>
          </div>
          <div>
            <div className="flex jus gap-2">
              <Link to="/facebook.com">
                <img
                  src="../../../public/instagram.png"
                  alt="icon"
                  className={`${image}`}
                />
              </Link>
              <Link to="/facebook.com">
                <img
                  src="../../../public/facebook.png"
                  alt="icon"
                  className={`${image}`}
                />
              </Link>
              <Link to="/">
                <img
                  src="../../../public/twitter.png"
                  alt="icon"
                  className={`${image}`}
                />
              </Link>
            </div>
          </div>
          <p className="m-0 text-lg pt-2">(045) 123-456</p>
          <p className="m-0 text-lg pt-2">123 Street, Prishtina, Kosove</p>
        </div>

        <div>
          <h3 className="font-semibold">Features</h3>
          <div className={`${column}`}>
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
          <div className={`${column}`}>
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
          <div className={`${column}`}>
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
  );
};

export default Footer;

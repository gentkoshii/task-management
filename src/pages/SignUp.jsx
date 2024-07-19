import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../assets/Navbar";

function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sending a Post request!
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("url", {
        email,
        password,
      });
      if (response.status == 200) {
        navigate("/login");
        console.log("Sign up successful:", response.data);
      } else {
        console.error("error ");
      }
    } catch (error) {
      console.error("Sign up failed:", error);
      // Displaying an error message!!
    }
  };

  const fadeOut =
    "rounded-full blur-3xl bg-[radial-gradient(_#FFDF92,_#FFF4DB_80%)] opacity-45 absolute -z-10";
  const input =
    "w-72 bg-[#FFF4DB] p-2 border-solid border-black border-1 rounded-lg placeholder:bg-transparent placeholder:text-gray-800";
  const display = "flex justify-center items-center relative ";

  return (
    <div className="h-lvh flex flex-col justify-between">
      <div>
        <Navbar />
      </div>
      <div className={`${display} w-screen h-full `}>
        <div className={`${display} w-[400px] h-[500px] rounded-4`}>
          <form
            onSubmit={handleSubmit}
            className={`${display} flex-col gap-3 absolute z-1`}
          >
            <div className="flex gap-2">
              <img src="1.png" alt="icon" className="h-10 rounded-md" />
              <h2>TaskFlow</h2>
            </div>
            <h4>Sign Up To Continue</h4>
            <input
              className={`${input}`}
              type="text"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={`${input}`}
              type="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="submit"
              id="signupButton"
              value="Sign Up"
              className="h-10 w-24 rounded-5 bg-[#FFD56F] border-1 border-solid border-black text-xl"
            />
            <h4>Already Have An Account?</h4>
            <Link to="/login" className="text-gray-800 no-underline">
              <h4>Log In</h4>
            </Link>
          </form>
        </div>
        <div
          className={`w-[400px] h-[500px] bg-[#FFDF92] rounded-4 blur-[1px] shadow-xl absolute -z-1`}
        ></div>
        <div
          className={`${fadeOut} w-[400px] h-[400px] top-[5%] right-[8%]`}
        ></div>
        <div
          className={`${fadeOut} w-[300px] h-[300px] bottom-[7%] left-[30%]`}
        ></div>
        <div
          className={`${fadeOut} w-[500px] h-[500px] top-[5%] left-[5%]`}
        ></div>
        {/* bg-[radial-gradient(_#FF9B9B,_#FFF4DB_80%)] */}
      </div>
    </div>
  );
}

export default SignUp;

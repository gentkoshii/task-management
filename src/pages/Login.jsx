import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../assets/Navbar";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("url", {
        email,
        password,
      });
      console.log("response", response.data);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        console.log("token", token);
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
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
      <div className={`${display} h-full`}>
        <div className={`${display} w-[400px] h-[500px] rounded-4`}>
          <form
            onSubmit={handleSubmit}
            className={`${display} flex-col gap-3 absolute z-1`}
          >
            <div className="flex gap-2">
              <img src="1.png" alt="icon" className="h-10 rounded-md" />
              <h2>TaskFlow</h2>
            </div>
            <h4>Log in to continue</h4>
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
              id="loginButton"
              value="Log In"
              className=" h-10 w-24 rounded-4 bg-[#FFD56F] border-1 border-solid border-black text-xl"
            />
            <h4>Don't Have An Account ?</h4>
            <Link to="/signup" className="text-gray-800 no-underline ">
              <h4>Sign Up</h4>
            </Link>
          </form>
        </div>
        <div className="w-[400px] h-[500px] bg-[#FFDF92] rounded-4  blur-[1px] shadow-xl absolute -z-1"></div>
        <div
          className={`${fadeOut} w-[400px] h-[400px] top-[5%] right-[8%]`}
        ></div>
        <div
          className={`${fadeOut} w-[300px] h-[300px] bottom-[7%] left-[30%]`}
        ></div>
        <div
          className={`${fadeOut} w-[500px] h-[500px] top-[5%] left-[5%]`}
        ></div>
      </div>
    </div>
  );
}

export default Login;

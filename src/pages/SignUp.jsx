import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../assets/Navbar";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/user/register?firstname=${name}&lastname=${lastName}`,
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        navigate("/login");
      } else {
        setError("An unexpected error occurred.");
      }
    } catch (error) {
      setError("Sign up failed. Please try again.");
      console.error("Sign up failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const fadeOut =
    "rounded-full blur-3xl bg-[radial-gradient(_#FFDF92,_#FFF4DB_80%)] opacity-45 absolute -z-10";
  const input =
    "w-full max-w-xs md:max-w-md bg-[#FFF4DB] p-2 border-solid border-black border-1 rounded-lg placeholder:bg-transparent placeholder:text-gray-800";
  const display = "flex justify-center items-center relative";

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className={`${display} h-full`}>
        <div className={`${display} w-[90%] max-w-[400px] h-[500px] rounded-4`}>
          <form
            onSubmit={handleSubmit}
            className={`${display} flex-col gap-3 absolute z-1 text-center`}
          >
            <div className="flex gap-2 items-center">
              <img src="1.png" alt="icon" className="h-10 rounded-md" />
              <h4>TaskFlow</h4>
            </div>
            <h4 className="text-sm md:text-base">Sign Up To Continue</h4>
            <input
              className={`${input} text-sm md:text-base`}
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className={`${input} text-sm md:text-base`}
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              className={`${input} text-sm md:text-base`}
              type="text"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className={`${input} text-sm md:text-base`}
              type="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              id="signupButton"
              className="h-10 w-24 rounded-4 bg-[#FFD56F] border-1 border-solid border-black text-xl"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            <h4>Already Have An Account?</h4>
            <Link to="/login" className="text-gray-800 no-underline">
              <h4 className="text-sm md:text-base">Log In</h4>
            </Link>
          </form>
        </div>
        <div className="w-[90%] max-w-[400px] h-[500px] bg-[#FFDF92] rounded-4 blur-[1px] shadow-xl absolute -z-1"></div>
        <div
          className={`${fadeOut} w-[80%] max-w-[400px] h-[400px] top-[5%] right-[8%]`}
        ></div>
        <div
          className={`${fadeOut} w-[70%] max-w-[300px] h-[300px] bottom-[7%] left-[30%]`}
        ></div>
        <div
          className={`${fadeOut} w-[90%] max-w-[500px] h-[500px] top-[5%] left-[5%]`}
        ></div>
      </div>
    </div>
  );
}

export default SignUp;

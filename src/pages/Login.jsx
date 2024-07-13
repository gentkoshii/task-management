import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  // State variables for username and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

  const handleSubmit = async (e) => {
    
  };

  return (
    <div className="font-poppins">
      <div className="loginSetup">
        <form onSubmit={handleSubmit}>
          <h2><img src="" alt="icon" />TaskFlow</h2>
          <h3>Log in to continue</h3>
          <input
            type="text"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" id="loginButton" value="Log In" />
          <h3>Don't Have An Account ?</h3>
          <Link to="/signup">Sign Up</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;

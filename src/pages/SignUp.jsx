import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  // State variables for username and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

  const handleSubmit = async (e) => {
    
  };

  return (
    <div className="signup">
      <div className="signupSetup">
        <form onSubmit={handleSubmit}>
          <h2><img src="" alt="icon" />TaskFlow</h2>
          <h3>Sign Up To Continue</h3>
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
          <input type="submit" id="loginButton" value="Sign Up" />
          <h3>Already Have An Account ?</h3>
          <Link to="/login">Log In</Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

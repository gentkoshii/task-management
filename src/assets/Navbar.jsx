import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
      <div>
        
        <div>
          <Link to="/">TaskFlow</Link>
        </div>
        
        <div>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/features">Features</Link>
          <Link to="/contact">Contact</Link>
        </div>
        
        <div>
          <div>
            <input
              type="text"
              placeholder="Search"/>
          </div>
          <Link to="/login">Login</Link>
        </div>
        
      </div>
  );
};

export default Navbar;

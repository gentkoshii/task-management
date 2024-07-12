import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
      <div>
        
        <div>
          <img src="" alt="logo" />
          <h2>TaskFlow</h2>
          <div>
            <div>
              <img src="" alt="icon" />
              <img src="" alt="icon" />
              <img src="" alt="icon" />
            </div>
          </div>
          <p>(045) 123-456</p>
          <p>123 Street, Prishtina, Kosove</p>
        </div>
        
        <div>
          <h3>Features</h3>
          <ul>
            <li>
              <Link to="/features/easy-task-management">Easy Task Management</Link>
            </li>
            <li>
              <Link to="/features/task-creation">Task Creation</Link>
            </li>
            <li>
              <Link to="/features/collaboration">Collaboration</Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3>Company</h3>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3>Legal</h3>
          <ul>
            <li>
              <Link to="/privacy" >Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms of Service</Link>
            </li>
          </ul>
        </div>
      </div>
  );
};

export default Footer;

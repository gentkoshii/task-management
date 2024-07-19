import React from "react";
import Navbar from "./assets/Navbar.jsx";
import Footer from "./assets/Footer.jsx";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './assets/Navbar.jsx';
import Footer from './assets/Footer.jsx';



const App = () => {
  return (
    <div className='overflow-hidden'>
      <Navbar />
      <Outlet />  
      <Footer />
    </div>
  );
}

export default App;

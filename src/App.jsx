import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './assets/Navbar.jsx';
import Footer from './assets/Footer.jsx';

  const App = () => {
    const location = useLocation();
    const showNavAndFooter = !location.pathname.startsWith('/admin')  && !location.pathname.startsWith('/user');
 

  return (
    <div className='overflow-hidden'>
      {showNavAndFooter && <Navbar />}
      <Outlet />  
      {showNavAndFooter && <Footer />}
    </div>
  );
}

export default App;

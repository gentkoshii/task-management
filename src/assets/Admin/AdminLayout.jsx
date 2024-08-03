import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import Popup from '../../components/Popup';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    window.location.href = '/login';
  };

  return (
    <div className="flex">
        <Sidebar isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} toggleLogout={() => setShowLogoutConfirm(true)} />
        <div className={`flex-1 min-h-screen transition-margin duration-300 ease-in-out ${isDrawerOpen ? 'ml-64' : 'ml-0'} md:ml-64`}>
            <button onClick={toggleDrawer} className="absolute top-5 left-5 z-40 text-xl text-gray-800 md:hidden">
                <FontAwesomeIcon icon={isDrawerOpen ? faXmark : faBars} />
            </button>
            <div className="p-10">
                <Outlet />
            </div>
        </div>
        {showLogoutConfirm && (
            <Popup 
                message="Are you sure you want to log out?" 
                onConfirm={handleLogout} 
                onCancel={() => setShowLogoutConfirm(false)} 
                type="confirm"
            />
        )}
    </div>
  );
};

export default AdminLayout;

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCog,
  faUser,
  faTachometerAlt,
  faSignOutAlt,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleDrawer, toggleLogout }) => {
    const menuItems = [
        { icon: faTachometerAlt, text: 'Dashboard' },
        { icon: faUserCog, text: 'Users' },
        { icon: faMessage, text: 'Messages' },
        { icon: faUser, text: 'Profile' },
        { icon: faSignOutAlt, text: 'Log Out' }
    ];

    return (
        <div className={`bg-white shadow-lg h-full fixed z-30 w-64 transform transition-transform duration-300 ease-in-out
                        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <div className="text-center py-4">
                <img src="/1.png" alt="Logo" className="mx-auto h-12 w-auto rounded-md"/>
                <h1 className="text-lg">TaskFlow</h1>
            </div>
            <ul className="pt-4 space-y-7">
                {menuItems.map(item => (
                    <li key={item.text} className="pl-4 py-2 text-gray-700 text-sm hover:bg-gray-200 cursor-pointer">
                        {item.text === 'Log Out' ? (
                            <div onClick={toggleLogout} className="flex items-center no-underline text-dark">
                                <FontAwesomeIcon icon={item.icon} className="mr-2" />
                                {item.text}
                            </div>
                        ) : (
                            <Link to={`/admin/${item.text.replace(' ', '').toLowerCase()}`} className="flex items-center no-underline text-dark">
                                <FontAwesomeIcon icon={item.icon} className="mr-2" />
                                {item.text}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;

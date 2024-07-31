import React from 'react';
import { Link } from 'react-router-dom';

const colorClasses = {
    blue: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900',
    green: 'text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900',
    red: 'text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900',
    gray: 'text-white bg-gray-700 hover:bg-gray-800 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900',
  };

const CustomButton = ({ color, bgColor, btnText, to }) => {
  return (
    <Link to={to} className={`focus:outline-none text-white bg-${bgColor}-700 hover:bg-${bgColor}-800 focus:ring-4 focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-${bgColor}-600 dark:hover:bg-${bgColor}-700 dark:focus:ring-${bgColor}-900 no-underline`}>
      {btnText}
    </Link>
  );
};

export default CustomButton;

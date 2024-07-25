import React from 'react';

const CustomButton = ({ color, bgColor, btnText }) => {
  return (
    <button
      className={`focus:outline-none text-white bg-${bgColor}-700 hover:bg-${bgColor}-800 focus:ring-4 focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-900`}
    >
      {btnText}
    </button>
  );
};

export default CustomButton;

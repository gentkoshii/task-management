import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
      <div className='flex w-screen justify-center items-center p-[34px] bg-gray-100'>
        <div className=' w-[60%] flex justify-between items-center m-0'>
          
          <div className='flex'>
            <Link to="/" className='flex items-center gap-2 text-black no-underline'>
              <img src="1.png" alt="" className='h-10 rounded-md'/>
              <h5 className='m-0'>TaskFlow</h5>
            </Link>
          </div>

          <div className='flex justify-center gap-4 '>
            <Link to="/" className='text-black no-underline '><h5 className='m-0'>Home</h5></Link>
            <Link to="/about" className='text-black no-underline'><h5 className='m-0'>About</h5></Link>
            <Link to="/features" className='text-black no-underline'><h5 className='m-0'>Features</h5></Link>
            <Link to="/contact" className='text-black no-underline'><h5 className='m-0'>Contact</h5></Link>
          </div>

          <div className='flex gap-2'>
            <input className='w-40 border-[1px] border-black rounded-md '
              type="text"
              placeholder="Search..."/>
            <Link to="/login" className=' text-black no-underline'><h5 className='m-0'>Login</h5></Link>
          </div>
        
        </div>
      </div>
  );
};

export default Navbar;

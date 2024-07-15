
import './Contact.scss';
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="mx-auto p-6">
            <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold mb-2">Contact Us</h1>
      <p className="mb-4">We'd love to hear from you. Whether you have a question, need support, or want to share feedback, our team is here to help. 
        Fill out the form below, and we'll get back to you as soon as possible.</p>

      <h1 className="text-xl font-semibold mb-2">Contact Form</h1>
      <p className="mb-4">Please complete the form below, and one of our support team members will reach out to you shortly.</p>
</div>
      <div className="max-w-2xl mx-auto  text-black rounded-lg border border-black">
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div className="flex justify-between gap-4">
            <input 
                type="text"
                name="firstName"
                placeholder="Enter your name..."
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border border-black rounded-lg bg-custom-yellow placeholder-black"
                />
            <input 
                type="text"
                name="lastName"
                placeholder="Enter your last name..."
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border border-black rounded-lg bg-custom-yellow placeholder-black"
                />
          </div>
          <div className="flex justify-between gap-4">
            <input 
                type="email"
                name="email"
                placeholder="Enter your email..."
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-black rounded-lg bg-custom-yellow placeholder-black"
                />
            <input 
                type="text"
                name="phone"
                placeholder="Enter your phone number..."
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-black rounded-lg bg-custom-yellow placeholder-black"
            />
          </div>
          <textarea 
              name="message"
              placeholder="Enter your message..."
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-black rounded-lg bg-custom-yellow h-32 placeholder-black"
          ></textarea>
          <div className="flex justify-center items-center">
            <button 
              type="submit" 
              className="w-96 p-2 border border-black rounded-lg bg-custom-yellow text-center font-bold">
              Submit
            </button>
          </div>
        </form>
      </div>

      <p className="text-center mt-4">
        We look forward to assisting you and making your TaskFlow experience exceptional.
      </p>
    </div>
  );
}
export default Contact
import React, { useState } from "react";
import axios from "axios";
import Popup from "../components/Popup";
import { useTheme } from "../context/ThemeContext";

const Contact = () => {
  const { darkMode } = useTheme();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^\+?[0-9]{10,15}$/;

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.message
    ) {
      setPopupMessage("All fields are required.");
      setShowPopup(true);
      return;
    }

    if (!emailPattern.test(formData.email)) {
      setPopupMessage("Please enter a valid email address.");
      setShowPopup(true);
      return;
    }

    if (!phonePattern.test(formData.phoneNumber)) {
      setPopupMessage("Please enter a valid phone number.");
      setShowPopup(true);
      return;
    }

    try {
      const response = await axios.post(
        "https://4wvk44j3-7001.euw.devtunnels.ms/api/contactform",
        formData
      );
      if (response.status === 201) {
        setPopupMessage("Contact information submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          message: "",
        });
      } else {
        setPopupMessage(
          "There was an error submitting the contact information!"
        );
      }
    } catch (error) {
      console.error(
        "There was an error submitting the contact information!",
        error
      );
      setPopupMessage("There was an error submitting the contact information!");
    }
    setShowPopup(true);
  };

  const textClass = darkMode ? "text-gray-300" : "text-gray-700";
  const inputClass = darkMode ? "bg-gray-800 text-white placeholder-gray-400" : "bg-custom-yellow text-black placeholder-black";
  const borderClass = darkMode ? "border-gray-600" : "border-black";
  const buttonClass = darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-custom-yellow hover:bg-pink-180";

  return (
    <div className={`mx-auto p-6 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="max-w-3xl mx-auto">
        <h1 className={`text-xl font-semibold mb-2 ${textClass}`}>Contact Us</h1>
        <p className={`mb-4 ${textClass}`}>
          We'd love to hear from you. Whether you have a question, need support,
          or want to share feedback, our team is here to help. Fill out the form
          below, and we'll get back to you as soon as possible.
        </p>
        <h1 className={`text-xl font-semibold mb-2 ${textClass}`}>Contact Form</h1>
        <p className={`mb-4 ${textClass}`}>
          Please complete the form below, and one of our support team members
          will reach out to you shortly.
        </p>
      </div>
      <div className={`max-w-2xl mx-auto rounded-lg ${borderClass} border`}>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name..."
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg ${inputClass} ${borderClass} border`}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name..."
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg ${inputClass} ${borderClass} border`}
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg ${inputClass} ${borderClass} border`}
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter your phone number..."
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg ${inputClass} ${borderClass} border`}
            />
          </div>
          <textarea
            name="message"
            placeholder="Enter your message..."
            value={formData.message}
            onChange={handleChange}
            className={`w-full p-2 rounded-lg ${inputClass} ${borderClass} border h-32`}
          ></textarea>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className={`w-64 p-2 rounded-lg ${buttonClass} text-center font-bold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-lg`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <p className={`text-center mt-4 ${textClass}`}>
        We look forward to assisting you and making your TaskFlow experience
        exceptional.
      </p>
      {showPopup && (
        <Popup
          message={popupMessage}
          onConfirm={() => setShowPopup(false)}
          type="ok"
        />
      )}
    </div>
  );
};

export default Contact;

import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { decodeToken } from "react-jwt";
import CustomButton from "../../../components/Button";
import { useTheme } from "../../../context/ThemeContext";

const ProfilePage = () => {
  const { darkMode } = useTheme();
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [isProfilePictureLoading, setIsProfilePictureLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    document.title = "Profile";

    const token = localStorage.getItem("token");
    const decodedToken = decodeToken(token);
    const userId = decodedToken.sub;

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://4wvk44j3-7001.euw.devtunnels.ms/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
        setInitialValues({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phoneNumber: response.data.phoneNumber,
          currentPassword: "",
          newPassword: "",
          newPasswordConfirmation: "",
        });
        setProfilePicture(response.data.profilePicture || "");
        setIsProfilePictureLoading(false);
        setUserName(response.data.firstName);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, []);

  const validateUserForm = (values) => {
    const errors = {};
    if (values.firstName && values.firstName.trim() === "") {
      errors.firstName = "Required. Your name";
    }
    if (values.lastName && values.lastName.trim() === "") {
      errors.lastName = "Required. Your last name";
    }
    if (
      values.phoneNumber &&
      !/^\+?[0-9]{10,15}$/.test(values.phoneNumber)
    ) {
      errors.phoneNumber = "Please enter a valid phone number";
    }
    return errors;
  };

  const validatePasswordForm = (values) => {
    const errors = {};
    if (!values.currentPassword) {
      errors.currentPassword = "Required. Your current password";
    }
    if (!values.newPassword) {
      errors.newPassword = "Required. New password";
    } else if (values.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    }
    if (!values.newPasswordConfirmation) {
      errors.newPasswordConfirmation = "Required. New password one more time";
    } else if (values.newPassword !== values.newPasswordConfirmation) {
      errors.newPasswordConfirmation = "Passwords must match";
    }
    return errors;
  };

  const handleUserSubmit = async (values, actions) => {
    const token = localStorage.getItem("token");
    const decodedToken = decodeToken(token);
    const userId = decodedToken.sub;

    const formData = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await axios.put(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/user/profile/update?userId=${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Profile updated successfully");
      actions.setSubmitting(false);
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile");
      actions.setSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (values, actions) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        "https://4wvk44j3-7001.euw.devtunnels.ms/api/user/change-password",
        {
          oldPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmNewPassword: values.newPasswordConfirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Password changed successfully");
      actions.setSubmitting(false);
    } catch (error) {
      console.error("Error changing password", error);
      alert("Failed to change password");
      actions.setSubmitting(false);
    }
  };

  const containerClass = darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800";
  const cardClass = darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900";
  const borderClass = darkMode ? "border-gray-700" : "border-gray-300";
  const inputClass = darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-900";
  const labelClass = darkMode ? "text-gray-300" : "text-gray-700";

  return (
    <main className={`p-4 sm:p-8 min-h-screen ${containerClass}`}>
      <div className={`max-w-4xl mx-auto ${cardClass} p-6 sm:p-8 rounded-lg shadow-lg relative`}>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Profile</h1>
        </div>

        <div className={`p-4 sm:p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center mb-6 ${cardClass}`}>
          <img
            src={isProfilePictureLoading ? "/avatar.png" : profilePicture}
            alt="Avatar"
            className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 border-gray-300 mb-4 sm:mb-0 sm:mr-6"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold">
              Hey, <span className="text-blue-600">{userName}!</span>
            </h2>
            <div className="mt-2 flex items-center justify-center sm:justify-start">
              <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 mr-2" />
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Admin</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col">
            <div className={`mb-6 p-4 border rounded-lg ${inputClass}`}>
              <label className={`block font-semibold ${labelClass}`}>Profile Picture</label>
              <div className="mt-2">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded inline-flex items-center hover:bg-blue-600 transition"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <FontAwesomeIcon icon={faUpload} className="mr-2" /> Upload
                </button>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(event) => setProfilePicture(event.currentTarget.files[0])}
                />
                <p className="text-gray-600 mt-2">Max 500kb</p>
              </div>
            </div>

            <div className={`flex-1 p-4 border rounded-lg ${inputClass}`}>
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validate={validateUserForm}
                onSubmit={handleUserSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className="flex flex-col">
                    <div className="mb-4">
                      <label htmlFor="firstName" className={`block font-semibold ${labelClass}`}>First Name</label>
                      <Field name="firstName" id="firstName" placeholder="First Name" className={`p-2 border rounded w-full ${inputClass}`} />
                      {errors.firstName && touched.firstName ? (
                        <div className="text-red-600 text-xs mt-1">{errors.firstName}</div>
                      ) : (
                        <p className="text-gray-600 text-xs mt-1">Required. Your name</p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="lastName" className={`block font-semibold ${labelClass}`}>Last Name</label>
                      <Field name="lastName" id="lastName" placeholder="Last Name" className={`p-2 border rounded w-full ${inputClass}`} />
                      {errors.lastName && touched.lastName ? (
                        <div className="text-red-600 text-xs mt-1">{errors.lastName}</div>
                      ) : (
                        <p className="text-gray-600 text-xs mt-1">Required. Your last name</p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="phoneNumber" className={`block font-semibold ${labelClass}`}>Phone Number</label>
                      <Field name="phoneNumber" id="phoneNumber" placeholder="Phone Number" className={`p-2 border rounded w-full ${inputClass}`} />
                      {errors.phoneNumber && touched.phoneNumber ? (
                        <div className="text-red-600 text-xs mt-1">{errors.phoneNumber}</div>
                      ) : (
                        <p className="text-gray-600 text-xs mt-1">Required. Your phone number</p>
                      )}
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                        disabled={isSubmitting}
                      >
                        Submit
                      </button>
                      <button type="button" className="border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-100 transition">Options</button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          <div className={`p-4 border rounded-lg ${inputClass}`}>
            <Formik
              initialValues={{
                currentPassword: "",
                newPassword: "",
                newPasswordConfirmation: "",
              }}
              validate={validatePasswordForm}
              onSubmit={handlePasswordSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="flex flex-col">
                  <div className="mb-4">
                    <label htmlFor="currentPassword" className={`block font-semibold ${labelClass}`}>Current password</label>
                    <Field name="currentPassword" id="currentPassword" type="password" placeholder="Current password" autoComplete="current-password" className={`p-2 border rounded w-full ${inputClass}`} />
                    {errors.currentPassword && touched.currentPassword ? (
                      <div className="text-red-600 text-xs mt-1">{errors.currentPassword}</div>
                    ) : (
                      <p className="text-gray-600 text-xs mt-1">Required. Your current password</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="newPassword" className={`block font-semibold ${labelClass}`}>New password</label>
                    <Field name="newPassword" id="newPassword" type="password" placeholder="New password" autoComplete="new-password" className={`p-2 border rounded w-full ${inputClass}`} />
                    {errors.newPassword && touched.newPassword ? (
                      <div className="text-red-600 text-xs mt-1">{errors.newPassword}</div>
                    ) : (
                      <p className="text-gray-600 text-xs mt-1">Password must be at least 8 characters</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="newPasswordConfirmation" className={`block font-semibold ${labelClass}`}>Confirm password</label>
                    <Field name="newPasswordConfirmation" id="newPasswordConfirmation" type="password" placeholder="Confirm password" autoComplete="new-password" className={`p-2 border rounded w-full ${inputClass}`} />
                    {errors.newPasswordConfirmation && touched.newPasswordConfirmation ? (
                      <div className="text-red-600 text-xs mt-1">{errors.newPasswordConfirmation}</div>
                    ) : (
                      <p className="text-gray-600 text-xs mt-1">Passwords must match</p>
                    )}
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                    <button type="button" className="border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-100 transition">Options</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="mt-6 flex justify-end items-end">
          <CustomButton to="/" color="blue" bgColor="blue" btnText="Go to homepage" />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;

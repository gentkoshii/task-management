import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import CustomButton from "../../../components/Button";

const ProfilePage = () => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    lastname: "",
    phoneNumber: "",
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    document.title = "Profile";
    // Fetch user data from backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/user"); // Replace with your endpoint
        setInitialValues({
          name: response.data.name,
          lastname: response.data.lastname,
          phoneNumber: response.data.phoneNumber,
          currentPassword: "",
          newPassword: "",
          newPasswordConfirmation: "",
        });
        setProfilePicture(response.data.profilePicture); // Assuming backend returns the profile picture URL
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, []);

  // Custom validation function
  const validateUserForm = (values) => {
    const errors = {};
    if (values.name && values.name.trim() === "") {
      errors.name = "Required. Your name";
    }
    if (values.lastname && values.lastname.trim() === "") {
      errors.lastname = "Required. Your last name";
    }
    if (values.phoneNumber && !/^\+?[0-9]{10,15}$/.test(values.phoneNumber)) {
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

  // Function to handle form submission
  const handleSubmit = async (values, actions) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("lastname", values.lastname);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("currentPassword", values.currentPassword);
    formData.append("newPassword", values.newPassword);
    formData.append("newPasswordConfirmation", values.newPasswordConfirmation);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ); // Replace with your endpoint
      alert("Profile updated successfully");
      actions.setSubmitting(false);
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile");
      actions.setSubmitting(false);
    }
  };

  return (
    <main className="p-4 sm:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg relative">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Profile
          </h1>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center mb-6">
          <img
            src={profilePicture || "/avatar.png"}
            alt="Avatar"
            className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 border-gray-300 mb-4 sm:mb-0 sm:mr-6"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Hey, <span className="text-blue-600">{userName}!</span>
            </h2>
            <div className="mt-2 flex items-center justify-center sm:justify-start">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-blue-600 mr-2"
              />
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                Admin
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col">
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <label className="block text-gray-700 font-semibold">
                Profile Picture
              </label>
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
                  onChange={(event) =>
                    setProfilePicture(event.currentTarget.files[0])
                  }
                />
                <p className="text-gray-600 mt-2">Max 500kb</p>
              </div>
            </div>

            <div className="flex-1 p-4 border rounded-lg bg-gray-50">
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validate={validateUserForm}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className="flex flex-col">
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-semibold"
                      >
                        Name
                      </label>
                      <Field
                        name="name"
                        id="name"
                        placeholder="Name"
                        className="p-2 border rounded w-full"
                      />
                      {errors.name && touched.name ? (
                        <div className="text-red-600 text-xs mt-1">
                          {errors.name}
                        </div>
                      ) : (
                        <p className="text-gray-600 text-xs mt-1">
                          Required. Your name
                        </p>
                      )}

                      <label
                        htmlFor="lastname"
                        className="block text-gray-700 font-semibold"
                      >
                        Last Name
                      </label>
                      <Field
                        name="lastname"
                        id="lastname"
                        placeholder="Last Name"
                        className="p-2 border rounded w-full"
                      />
                      {errors.lastname && touched.lastname ? (
                        <div className="text-red-600 text-xs mt-1">
                          {errors.lastname}
                        </div>
                      ) : (
                        <p className="text-gray-600 text-xs mt-1">
                          Required. Your last name
                        </p>
                      )}

                      <label
                        htmlFor="phoneNumber"
                        className="block text-gray-700 font-semibold"
                      >
                        Phone Number
                      </label>
                      <Field
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Phone Number"
                        className="p-2 border rounded w-full"
                      />
                      {errors.phoneNumber && touched.phoneNumber ? (
                        <div className="text-red-600 text-xs mt-1">
                          {errors.phoneNumber}
                        </div>
                      ) : (
                        <p className="text-gray-600 text-xs mt-1">
                          Required. Your phone number
                        </p>
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
                      <button
                        type="button"
                        className="border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-100 transition"
                      >
                        Options
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-gray-50">
            <Formik
              initialValues={{
                currentPassword: "",
                newPassword: "",
                newPasswordConfirmation: "",
              }}
              validate={validatePasswordForm}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="flex flex-col">
                  <div className="mb-4">
                    <label
                      htmlFor="currentPassword"
                      className="block text-gray-700 font-semibold"
                    >
                      Current password
                    </label>
                    <Field
                      name="currentPassword"
                      id="currentPassword"
                      type="password"
                      placeholder="Current password"
                      autoComplete="current-password"
                      className="p-2 border rounded w-full"
                    />
                    {errors.currentPassword && touched.currentPassword ? (
                      <div className="text-red-600 text-xs mt-1">
                        {errors.currentPassword}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-xs mt-1">
                        Required. Your current password
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="newPassword"
                      className="block text-gray-700 font-semibold"
                    >
                      New password
                    </label>
                    <Field
                      name="newPassword"
                      id="newPassword"
                      type="password"
                      placeholder="New password"
                      autoComplete="new-password"
                      className="p-2 border rounded w-full"
                    />
                    {errors.newPassword && touched.newPassword ? (
                      <div className="text-red-600 text-xs mt-1">
                        {errors.newPassword}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-xs mt-1">
                        Password must be at least 8 characters
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="newPasswordConfirmation"
                      className="block text-gray-700 font-semibold"
                    >
                      Confirm password
                    </label>
                    <Field
                      name="newPasswordConfirmation"
                      id="newPasswordConfirmation"
                      type="password"
                      placeholder="Confirm password"
                      autoComplete="new-password"
                      className="p-2 border rounded w-full"
                    />
                    {errors.newPasswordConfirmation &&
                    touched.newPasswordConfirmation ? (
                      <div className="text-red-600 text-xs mt-1">
                        {errors.newPasswordConfirmation}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-xs mt-1">
                        Passwords must match
                      </p>
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
                    <button
                      type="button"
                      className="border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-100 transition"
                    >
                      Options
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="mt-6 flex justify-end items-end">
          <CustomButton
            to="/"
            color="blue"
            bgColor="blue"
            btnText="Go to homepage"
          />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;

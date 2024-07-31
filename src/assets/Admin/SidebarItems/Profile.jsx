import React from 'react';
import { Formik, Form, Field } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faUpload, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../../../components/Button';

const ProfilePage = () => {
  const userForm = {
    name: '',
    email: '', 
  };

  React.useEffect(() => {
    document.title = "Profile";
  }, []);

  return (
    <main className="p-8 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800"> Profile
          </h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center mb-6">
          <img src="/avatar.png" alt="Avatar" className="w-24 h-24 rounded-full border-2 border-gray-300 mr-6" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Hey, <span className="text-blue-600">John Doe!</span></h2>
            <p className="text-gray-600">Last login 12 mins ago from 127.0.0.1</p>
            <div className="mt-2 flex items-center">
              <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 mr-2" />
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Verified</span>
              <label className="flex items-center ml-4">
                <input type="checkbox" className="form-checkbox text-blue-600" />
                <span className="ml-2 text-gray-800">Notifications</span>
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <label className="block text-gray-700 font-semibold">Avatar</label>
              <div className="mt-2">
                <button className="bg-blue-500 text-white py-2 px-4 rounded inline-flex items-center hover:bg-blue-600 transition">
                  <FontAwesomeIcon icon={faUpload} className="mr-2" /> Upload
                </button>
                <p className="text-gray-600 mt-2">Max 500kb</p>
              </div>
            </div>

            <div className="flex-1 p-4 border rounded-lg bg-gray-50">
              <Formik
                initialValues={userForm}
                onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
              >
                <Form className="flex flex-col">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold">
                      Name
                    </label>
                    <Field
                      name="name"
                      id="name"
                      placeholder="Name"
                      className="p-2 border rounded w-full"
                    />
                    <p className="text-gray-600 text-xs mt-1">Required. Your name</p>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold">
                      E-mail
                    </label>
                    <Field
                      name="email"
                      id="email"
                      placeholder="E-mail"
                      className="p-2 border rounded w-full"
                    />
                    <p className="text-gray-600 text-xs mt-1">Required. Your e-mail</p>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                      Submit
                    </button>
                    <button type="button" className="border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-100 transition">
                      Options
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-gray-50">
            <Formik
              initialValues={{
                currentPassword: '',
                newPassword: '',
                newPasswordConfirmation: '',
              }}
              onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
            >
              <Form className="flex flex-col">
                <div className="mb-4">
                  <label htmlFor="currentPassword" className="block text-gray-700 font-semibold">
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
                  <p className="text-gray-600 text-xs mt-1">Required. Your current password</p>
                </div>
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-gray-700 font-semibold">
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
                  <p className="text-gray-600 text-xs mt-1">Required. New password</p>
                </div>
                <div className="mb-4">
                  <label htmlFor="newPasswordConfirmation" className="block text-gray-700 font-semibold">
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
                  <p className="text-gray-600 text-xs mt-1">Required. New password one more time</p>
                </div>
                <div className="flex justify-end space-x-4">
                  <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                    Submit
                  </button>
                  <button type="button" className="border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-100 transition">
                    Options
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
        <div className="absolute top-4 right-4">
                <CustomButton to="/" color="blue" bgColor="blue" btnText="Go to homepage" />
            </div>
      </div>
    </main>
  );
};

export default ProfilePage;

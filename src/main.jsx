import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";

import App from './App.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Help from './pages/Help.jsx';
import Features from './pages/Features.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Admin from './pages/Admin.jsx';
import User from './pages/User.jsx';
import Boards from './pages/Boards.jsx';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/help",
    element: <Help />,
  },
  {
    path: "/features",
    element: <Features />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/boards",
    element: <Boards />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

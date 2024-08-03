import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import App from "./App.jsx";
import Homepage from "./pages/Homepage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Help from "./pages/Help.jsx";
import Features from "./pages/Features.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import AdminLayout from "./assets/Admin/AdminLayout.jsx";
import Dashboard from "./assets/Admin/SidebarItems/Dashboard.jsx";
import Users from "./assets/Admin/Users.jsx";
import Profile from "./assets/Admin/SidebarItems/Profile.jsx";
import ContactMessages from "./assets/Admin/SidebarItems/ContactMessages.jsx";
import User from "./pages/User.jsx";
import Projects from "./pages/User/Projects.jsx";
import Board from "./pages/Board.jsx";
import Search from "./pages/Search.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "profile", element: <Profile /> },
      { path: "messages", element: <ContactMessages /> },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "about", element: <AboutUs /> },
      { path: "help", element: <Help /> },
      { path: "features", element: <Features /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "projects", element: <Projects /> },
      { path: "projects/:projectId", element: <Board /> },
      { path: "search/:searchQuery", element: <Search /> },
    ],
  },
  {
    path: "/user",
    element: <User />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

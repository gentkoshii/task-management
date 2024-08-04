import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../../../components/Button";
import axios from "axios";
import { useTheme } from "../../../context/ThemeContext";

const Dashboard = () => {
  const { darkMode } = useTheme();
  const [users, setUsers] = useState(null);
  const [projectsRegistered, setProjectsRegistered] = useState(null);
  const [userStatistics, setUserStatistics] = useState({
    verifiedUsers: null,
    newUserLast30Days: null,
  });

  const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users data
        const usersResponse = await axios.get(
          "https://4wvk44j3-7001.euw.devtunnels.ms/api/user/activity",
          { headers: requestHeaders }
        );

        // Update users state
        setUsers(usersResponse.data.allUsers);
        setUserStatistics({
          verifiedUsers: usersResponse.data.verifiedUsers,
          newUserLast30Days: usersResponse.data.newSignsUps,
        });

        // Fetch projects data
        const projectsResponse = await axios.get(
          "https://4wvk44j3-7001.euw.devtunnels.ms/api/project/analytics/count",
          { headers: requestHeaders }
        );

        // Update projects state
        setProjectsRegistered(projectsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const containerClass = darkMode
    ? "bg-gray-900 text-gray-200"
    : "bg-white text-gray-900";
  const cardClass = darkMode
    ? "bg-gray-800 text-gray-200"
    : "bg-white text-gray-900";
  const textClass = darkMode ? "text-gray-400" : "text-gray-600";
  const iconClass = darkMode ? "text-gray-400" : "text-gray-700";

  return (
    <div className={`lg:p-8 md:p-5 relative ${containerClass}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Welcome to the Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div
            className={`shadow-md p-6 rounded-lg flex items-center ${cardClass}`}
          >
            <FontAwesomeIcon
              icon={faUsers}
              className="text-blue-500 text-3xl mr-4"
            />
            <div>
              <p className="text-2xl font-bold">{users}</p>
              <p className={textClass}>Users</p>
            </div>
          </div>
          <div
            className={`shadow-md p-6 rounded-lg flex w-full items-center ${cardClass}`}
          >
            <FontAwesomeIcon
              icon={faProjectDiagram}
              className="text-green-500 text-3xl mr-4"
            />
            <div>
              <p className="text-2xl font-bold">{projectsRegistered}</p>
              <p className={textClass}>Projects Registered</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className={`shadow-md p-6 rounded-lg ${cardClass}`}>
            <h2 className="text-xl font-bold mb-4">User Statistics</h2>
            <div className="space-y-2">
              <p>
                <strong>Verified Users:</strong> {userStatistics.verifiedUsers}
              </p>
              <p>
                <strong>New Users (last 30 days):</strong>{" "}
                {userStatistics.newUserLast30Days}
              </p>
            </div>
          </div>
        </div>
        <div className="fixed bottom-4 right-4">
          <CustomButton
            to="/"
            color="blue"
            bgColor="blue"
            btnText="Go to homepage"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

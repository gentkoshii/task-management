import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";

const Notifications = ({ userId, numberOfLatestNotifications, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }
      const requestHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.get(
          `https://4wvk44j3-7001.euw.devtunnels.ms/api/notification/latest?numberOfLatestNotifications=5`,
          {
            headers: requestHeaders,      
            params: {
              numberOfLatestNotifications,
            },
          }
        );
        setNotifications(response.data);
      } catch (error) {
        setError("Failed to fetch notifications.");
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [userId, numberOfLatestNotifications]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const containerBgClass = darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-black";
  const borderClass = darkMode ? "border-gray-600" : "border-gray-300";
  const overlayBgClass = darkMode ? "bg-black opacity-75" : "bg-black opacity-50";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className={`absolute inset-0 ${overlayBgClass}`}></div>
      <div className={`relative ${containerBgClass} border ${borderClass} rounded-lg shadow-lg w-80`}>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Activity Center</h3>
            <button onClick={onClose} className="text-blue-500">Close</button>
          </div>
          <div className="mt-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div key={notification.id} className={`flex items-center border-b ${borderClass} py-3`}>
                  <img src="/user-avatar.png" alt="User avatar" className="w-10 h-10 rounded-full mr-3" />
                  <div className="flex flex-col">
                    <span>{notification.message}</span>
                    <span className="text-gray-500 text-sm">{notification.timestamp}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No notifications</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

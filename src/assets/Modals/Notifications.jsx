import React, { useState, useEffect } from "react";
import axios from "axios";

const Notifications = ({ userId, numberOfLatestNotifications }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="notifications-dropdown">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <p>{notification.message}</p>
          </div>
        ))
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
};

export default Notifications;

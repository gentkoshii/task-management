import React, { useState, useEffect } from "react";
import axios from "axios";

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/notifications?userId=${userId}`
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

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

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const AddReminder = ({ setOpenAddReminderModal, onSaveReminder, taskId }) => {
  const [description, setDescription] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [existingReminder, setExistingReminder] = useState(null);
  const [reminders, setReminders] = useState([]);

  const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchReminders = async () => {
      if (taskId) {
        try {
          const response = await axios.get(
            `https://4wvk44j3-7001.euw.devtunnels.ms/api/reminder/task/${taskId}`,
            { headers: requestHeaders }
          );
          setReminders(response.data);
        } catch (error) {
          console.error("Failed to fetch reminders:", error);
        }
      }
    };

    fetchReminders();
  }, [taskId]);

  const handleSaveReminder = useCallback(async () => {
    if (!description || !reminderDate) {
      alert("Description and Reminder Date are required.");
      return;
    }

    try {
      const reminderData = {
        description,
        reminderDate: new Date(reminderDate).toISOString(), // Ensure ISO string format
        taskId: taskId,
      };

      let response;
      if (existingReminder && existingReminder.id) {
        response = await axios.patch(
          `https://4wvk44j3-7001.euw.devtunnels.ms/api/reminder/${existingReminder.id}`,
          reminderData,
          { headers: requestHeaders }
        );
      } else {
        response = await axios.post(
          `https://4wvk44j3-7001.euw.devtunnels.ms/api/reminder`,
          reminderData,
          { headers: requestHeaders }
        );
      }

      onSaveReminder(reminderData); // Call the onSaveReminder prop to handle the reminder save

      // Reset states after saving
      setDescription("");
      setReminderDate("");
      setExistingReminder(null);
      setOpenAddReminderModal(false); // Close the modal after saving

      // Refresh the list of reminders
      const remindersResponse = await axios.get(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/reminder/task/${taskId}`,
        { headers: requestHeaders }
      );
      setReminders(remindersResponse.data);
    } catch (error) {
      console.error("Failed to save reminder:", error);
    }
  }, [
    description,
    reminderDate,
    taskId,
    existingReminder,
    onSaveReminder,
    setOpenAddReminderModal,
    requestHeaders,
  ]);

  const handleEditReminder = (reminder) => {
    setDescription(reminder.description);
    setReminderDate(
      new Date(reminder.reminderDateTime).toISOString().slice(0, 16)
    );
    setExistingReminder(reminder);
  };

  const handleDeleteReminder = async (reminderId) => {
    try {
      await axios.delete(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/reminder/${reminderId}`,
        { headers: requestHeaders }
      );

      // Refresh the list of reminders
      const remindersResponse = await axios.get(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/reminder/task/${taskId}`,
        { headers: requestHeaders }
      );
      setReminders(remindersResponse.data);
    } catch (error) {
      console.error("Failed to delete reminder:", error);
    }
  };

  const handleCloseModal = useCallback(() => {
    setOpenAddReminderModal(false);
  }, [setOpenAddReminderModal]);

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div className="bg-white px-6 py-4 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={handleCloseModal}
          className="absolute top-3 right-3 text-gray-600 font-semibold hover:text-gray-700"
        >
          X
        </button>
        <h3 className="text-lg font-semibold">Add Reminder</h3>
        <div className="mt-3 flex flex-col space-y-1">
          <label htmlFor="description" className="text-sm">
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="Reminder Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-transparent px-3 py-2 outline-none rounded-md text-sm border border-gray-500 focus:outline-[#FFDF92] ring-1"
          />
        </div>
        <div className="mt-3 flex flex-col space-y-1">
          <label htmlFor="reminderDate" className="text-sm">
            Reminder Date
          </label>
          <input
            id="reminderDate"
            type="datetime-local"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
            className="bg-transparent px-3 py-2 outline-none rounded-md text-sm border border-gray-500 focus:outline-[#FFDF92] ring-1"
          />
        </div>
        <div className="mt-4 flex gap-4">
          <button
            onClick={handleSaveReminder}
            className="w-full bg-[#FFDF92] text-black px-4 py-2 rounded hover:bg-[#FFDF92] hover:-translate-y-[1px]"
          >
            Save Reminder
          </button>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Existing Reminders</h4>
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex justify-between items-center bg-gray-100 p-2 rounded mt-2"
            >
              <div onClick={() => handleEditReminder(reminder)}>
                <p>{reminder.description}</p>
                <p>{new Date(reminder.reminderDateTime).toLocaleString()}</p>
              </div>
              <button
                onClick={() => handleDeleteReminder(reminder.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddReminder;

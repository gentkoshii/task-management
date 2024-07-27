import React, { useState, useEffect } from "react";

const AddEditTask = ({
  type,
  setOpenAddEditTask,
  onSaveTask,
  currentTask,
  column,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reminder, setReminder] = useState("");
  const [timeTracking, setTimeTracking] = useState("");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    if (type === "edit" && currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setTags(currentTask.tags ? currentTask.tags.join(", ") : "");
      setSubtasks(currentTask.subtasks || []);
      setPriority(currentTask.priority);
      setDueDate(currentTask.dueDate);
      setReminder(currentTask.reminder || "");
      setTimeTracking(currentTask.timeTracking || "");
      setFile(null);
    }
  }, [type, currentTask]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const maxSize = 8 * 1024 * 1024; // 8MB limit
      if (selectedFile.size > maxSize) {
        setFileError("File size should be less than 8MB.");
        setFile(null);
      } else {
        setFileError("");
        setFile(selectedFile);
      }
    }
  };

  const handleSave = () => {
    // Validate required fields
    if (!title || !dueDate) {
      alert("Title and Due Date are required.");
      return;
    }

    const task = {
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()), // Convert comma-separated string to array
      subtasks,
      priority,
      dueDate,
      status: column,
      reminder,
      timeTracking,
      file,
    };
    onSaveTask(task);
  };

  const addSubtask = () => {
    if (newSubtask) {
      setSubtasks([...subtasks, newSubtask]);
      setNewSubtask("");
    }
  };

  const removeSubtask = (index) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenAddEditTask(false);
      }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div className="bg-white px-6 py-4 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={() => setOpenAddEditTask(false)}
          className="absolute top-3 right-3 text-gray-600 font-semibold hover:text-gray-700"
        >
          X
        </button>
        <h3 className="text-lg font-semibold">
          {type === "add" ? "Add New Task" : "Edit Task"}
        </h3>
        <div className="mt-3 flex flex-col space-y-1">
          <label htmlFor="title" className="text-sm">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent px-3 py-2 outline-none rounded-md text-sm border border-gray-500 focus:outline-[#FFDF92] ring-1"
          />
        </div>
        <div className="mt-3 flex flex-col space-y-1">
          <label htmlFor="description" className="text-sm">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-transparent px-3 py-2 outline-none rounded-md text-sm border border-gray-500 focus:outline-[#FFDF92] ring-1"
          />
        </div>
        <div className="mt-3 flex flex-col space-y-1">
          <label htmlFor="tags" className="text-sm">
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            type="text"
            placeholder="e.g. to do, doing, done, review"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="bg-transparent px-3 py-2 outline-none rounded-md text-sm border border-gray-500 focus:outline-[#FFDF92] ring-1"
          />
        </div>
        <div className="mt-3 flex flex-col space-y-1">
          <label htmlFor="subtasks" className="text-sm">
            Subtasks
          </label>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <input
                id="newSubtask"
                type="text"
                placeholder="New subtask"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                className="bg-transparent px-3 py-2 outline-none rounded-md text-sm border border-gray-500 focus:outline-[#FFDF92] ring-1 flex-1"
              />
              <button
                onClick={addSubtask}
                className="ml-2 px-3 py-1 bg-[#FFDF92] text-black rounded-md text-sm"
              >
                Add
              </button>
            </div>
            <ul className="list-disc pl-5">
              {subtasks.map((subtask, index) => (
                <li key={index} className="flex items-center">
                  {subtask}
                  <button
                    onClick={() => removeSubtask(index)}
                    className="ml-2 text-gray-500 font-semibold text-xs"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-3 flex flex-col space-y-1">
          <label htmlFor="file" className="text-sm">
            Attach File (Max 8MB)
          </label>
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            className="bg-transparent px-3 py-2 outline-none rounded-md text-sm border border-gray-500 focus:outline-[#FFDF92] ring-1"
          />
          {fileError && (
            <p className="text-red-500 text-xs mt-1">{fileError}</p>
          )}
        </div>
        <div className="mt-3 flex flex-col space-y-1">
          <label htmlFor="priority" className="text-sm">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-transparent px-3 py-2 outline-none rounded-md text-sm border border-gray-500 focus:outline-[#FFDF92] ring-1"
          >
            <option value="">Select Priority</option>
            <option value="Normal">Normal</option>
            <option value="Important">Important</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
        <div className="mt-3 flex flex-col space-y-1">
          <label htmlFor="dueDate" className="text-sm">
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-transparent px-3 py-2 outline-none rounded-md text-sm border border-gray-500 focus:outline-[#FFDF92] ring-1"
          />
        </div>
        <div className="mt-3 flex flex-col space-y-1">
          <label htmlFor="reminder" className="text-sm">
            Reminder
          </label>
          <input
            id="reminder"
            type="datetime-local"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            className="bg-transparent px-3 py-2 outline-none rounded-md text-sm border border-gray-500 focus:outline-[#FFDF92] ring-1"
          />
        </div>
        <div className="mt-3 flex flex-col space-y-1">
          <label htmlFor="timeTracking" className="text-sm">
            Time Tracking
          </label>
          <input
            id="timeTracking"
            type="text"
            placeholder="e.g. 2 hours"
            value={timeTracking}
            onChange={(e) => setTimeTracking(e.target.value)}
            className="bg-transparent px-3 py-2 outline-none rounded-md text-sm border border-gray-500 focus:outline-[#FFDF92] ring-1"
          />
        </div>
        <div className="mt-4 flex gap-4">
          <button
            onClick={handleSave}
            className="w-full bg-[#FFDF92] text-black px-4 py-2 rounded hover:bg-[#FFDF92] hover:-translate-y-[1px]"
          >
            {type === "add" ? "Create Task" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditTask;

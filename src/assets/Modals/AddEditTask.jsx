import React from "react";
import { useState, useEffect } from "react";

function AddEditTask({ type, setOpenAddEditTask, onSaveTask, currentTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("to do");

  useEffect(() => {
    if (type === "edit" && currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setStatus(currentTask.status);
    }
  }, [type, currentTask]);

  const handleSave = () => {
    const task = { title, description, status };
    onSaveTask(task);
    setOpenAddEditTask(false);
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
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div>
          <h3 className="text-xl font-semibold">
            {type === "edit" ? "Edit" : "Add New"} Task
          </h3>
        </div>
        <div className="mt-8 flex flex-col space-y-1">
          <label htmlFor="taskName" className="text-sm">
            Task Name
          </label>
          <input
            id="taskName"
            type="text"
            placeholder="e.g Take coffee break"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm 
          border border-gray-500 focus:outline-[#FFDF92] ring-1"
          />
        </div>
        <div className="mt-8 flex flex-col space-y-1">
          <label htmlFor="taskDescription" className="text-sm">
            Task Description
          </label>
          <textarea
            id="taskDescription"
            placeholder="e.g It's always good to take a break..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-transparent px-4 py-2 outline-none focus:border-0 min-h-200 rounded-md text-sm 
          border border-gray-600 focus:outline-[#FFDF92] ring-1"
          />
        </div>
        <div className="mt-8 flex flex-col space-y-1">
          <label htmlFor="taskStatus" className="text-sm">
            Status
          </label>
          <select
            id="taskStatus"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm 
          border border-gray-600 focus:outline-[#FFDF92] ring-1"
          >
            <option value="to do">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="mt-8">
          <button
            onClick={handleSave}
            className="w-full bg-[#FFDF92] text-black px-4 py-2 rounded hover:-translate-y-[1px]"
          >
            {type === "edit" ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditTask;

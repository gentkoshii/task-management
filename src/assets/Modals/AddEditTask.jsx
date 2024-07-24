import React from "react";
import { useState, useEffect } from "react";

function AddEditTask({ type, setOpenAddEditTask, onSaveTask, currentTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState("to do");
  const [priority, setPriority] = useState("normal");
  const [dueDate, setDueDate] = useState("");
  const [timeTracking, setTimeTracking] = useState("");

  useEffect(() => {
    if (type === "edit" && currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setTags(currentTask.tags);
      setStatus(currentTask.status);
      setPriority(currentTask.priority || "normal");
      setDueDate(currentTask.dueDate);
      setTimeTracking(currentTask.timeTracking);
    }
  }, [type, currentTask]);

  const handleSave = () => {
    const task = {
      title,
      description,
      status,
      priority,
      tags: tags.split(",").map((tag) => tag.trim()),
      dueDate,
      timeTracking,
    };
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
        <button className="w-auto bg-[#FFDF92] text-black mt-3 px-4 py-2 rounded hover:-translate-y-[1px]">
          Add Reminder
        </button>
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
          <label htmlFor="taskTags" className="text-sm">
            Tags (Separate with commas)
          </label>
          <textarea
            id="taskTags"
            placeholder="e.g UI, Feature, Bug, Testing..."
            value={tags}
            onChange={(e) => setTags(e.target.value)}
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
        <div className="mt-8 flex flex-col space-y-1">
          <label htmlFor="taskPriority" className="text-sm">
            Priority
          </label>
          <select
            id="taskPriority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm 
          border border-gray-600 focus:outline-[#FFDF92] ring-1"
          >
            <option value="normal">Normal</option>
            <option value="important">Important</option>
          </select>
        </div>
        <div className="mt-8 flex flex-col space-y-1">
          <label htmlFor="taskDueDate" className="text-sm">
            Due Date
          </label>
          <input
            type="date"
            id="taskDueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm 
          border border-gray-600 focus:outline-[#FFDF92] ring-1"
          />
        </div>
        <div className="mt-8 flex flex-col space-y-1">
          <label htmlFor="taskTimeTracking" className="text-sm">
            Time Tracking (Minutes)
          </label>
          <input
            type="number"
            id="taskTimeTracking"
            value={timeTracking}
            onChange={(e) => setTimeTracking(e.target.value)}
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm 
          border border-gray-600 focus:outline-[#FFDF92] ring-1"
          />
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

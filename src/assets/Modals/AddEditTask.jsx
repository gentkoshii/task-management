import React, { useState, useEffect } from "react";

const AddEditTask = ({
  type,
  setOpenAddEditTask,
  onSaveTask,
  currentTask,
  column,
  projectId,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState(currentTask?.dueDate || "");

  useEffect(() => {
    if (type === "edit" && currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setTags(currentTask.tags ? currentTask.tags.join(", ") : "");
      setPriority(currentTask.priority);

      let dateFormatted = new Date(currentTask.dueDate);
      dateFormatted = dateFormatted.toISOString().split("T")[0];
      setDueDate(dateFormatted);
    }
  }, [type, currentTask]);

  const handleSave = () => {
    if (!title || !dueDate) {
      alert("Title and Due Date are required.");
      return;
    }

    let statusBoard;
    if (column === "to do") {
      statusBoard = 0;
    } else if (column === "in progress") {
      statusBoard = 1;
    } else {
      statusBoard = 2;
    }

    const task = {
      title,
      description,
      tags: tags.length > 0 ? tags.split(",").map((tag) => tag.trim()) : [],
      priority: Number(priority),
      dueDate,
      status: statusBoard,
      projectId,
    };
    onSaveTask(task);
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
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
            <option value="4">Critical</option>
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

import React from "react";
import { useState, useEffect } from "react";
import AddEditTask from "../assets/Modals/AddEditTask";
import Navbar from "../assets/Navbar";
import Footer from "../assets/Footer";
import axios from "axios";

const Board = () => {
  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [taskType, setTaskType] = useState("add");
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  const URL = "http://localhost:3000";

  useEffect(() => {
    axios
      .get(`${URL}/tasks`)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const openAddTask = () => {
    setTaskType("add");
    setCurrentTask(null);
    setOpenAddEditTask(true);
  };

  const openEditTask = (task) => {
    setTaskType("edit");
    setCurrentTask(task);
    setOpenAddEditTask(true);
  };

  const handleSaveTask = (task) => {
    if (taskType === "add") {
      axios
        .post(`${URL}/tasks`, task)
        .then((response) => {
          setTasks([...tasks, response.data]);
          setOpenAddEditTask(false);
        })
        .catch((error) => console.error("Error creating task:", error));
    } else {
      axios
        .put(`${URL}/tasks/${currentTask.id}`, task)
        .then((response) => {
          setTasks(
            tasks.map((t) => (t.id === currentTask.id ? response.data : t))
          );
          setOpenAddEditTask(false);
        })
        .catch((error) => console.error("Error updating task:", error));
    }
  };

  const deleteTask = (id) => {
    axios
      .delete(`${URL}/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <div
          key={task.id}
          className="mb-4 p-4 border rounded-lg shadow-md bg-white"
        >
          <h3 className="text-xl font-semibold">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>
          <div className="flex flex-wrap mt-2">
            {task.tags &&
              task.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
          </div>
          <p className="text-sm">Status: {task.status}</p>
          <p className="text-sm">Priority: {task.priority}</p>
          <p className="text-sm">Due Date: {task.dueDate}</p>

          <div className="flex space-x-2">
            <button
              onClick={() => openEditTask(task)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ));
  };

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Navbar />
      <div className="w-[60%] mx-[20%] py-[30px]">
        <button
          onClick={openAddTask}
          className="bg-[#FFDF92] text-black px-3 py-2 rounded mb-4"
        >
          Add New Task
        </button>

        <div className="grid grid-cols-3 gap-16">
          {["to do", "doing", "done"].map((status) => (
            <div
              key={status}
              className="bg-[#FFDF92] p-4 rounded-lg shadow-inner min-h-[500px]"
            >
              <h2 className="text-xl font-[550] mb-4 capitalize">{status}</h2>
              {renderTasks(status)}
            </div>
          ))}
        </div>

        {openAddEditTask && (
          <AddEditTask
            type={taskType}
            setOpenAddEditTask={setOpenAddEditTask}
            onSaveTask={handleSaveTask}
            currentTask={currentTask}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Board;

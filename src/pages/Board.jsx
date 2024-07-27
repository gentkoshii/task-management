import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddEditTask from "../assets/Modals/AddEditTask";
import TaskDetails from "../assets/Modals/TaskDetails";
import InviteMembers from "../assets/Modals/InviteMembers";
import axios from "axios";

const Board = () => {
  const { projectId } = useParams();
  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [taskType, setTaskType] = useState("add");
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [columns, setColumns] = useState(["to do", "in progress", "done"]);
  const [currentStatus, setCurrentStatus] = useState("");
  const [projectName, setProjectName] = useState("");
  const [openTaskDetails, setOpenTaskDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newColumn, setNewColumn] = useState("");
  const [openInviteMembers, setOpenInviteMembers] = useState(false);

  const URL = "http://localhost:3000";

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  useEffect(() => {
    sortColumns();
  }, [columns]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${URL}/projects/${projectId}`);
      const project = response.data;
      setProjectName(project.name || "Project Name");
      setTasks(project.tasks || []);
      setColumns(project.columns || ["to do", "in progress", "done"]);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const openAddTask = (status) => {
    setTaskType("add");
    setCurrentTask(null);
    setOpenAddEditTask(true);
    setCurrentStatus(status);
  };

  const openEditTask = (task) => {
    setTaskType("edit");
    setCurrentTask(task);
    setOpenAddEditTask(true);
  };

  const handleSaveTask = async (task) => {
    try {
      if (taskType === "add") {
        const newTask = { ...task, id: generateUniqueId() };
        await axios.patch(`${URL}/projects/${projectId}`, {
          tasks: [...tasks, newTask],
        });
        setTasks((prevTasks) => [...prevTasks, newTask]);
      } else {
        await axios.patch(`${URL}/projects/${projectId}`, {
          tasks: tasks.map((t) => (t.id === currentTask.id ? task : t)),
        });
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === currentTask.id ? task : t))
        );
      }
      setOpenAddEditTask(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.patch(`${URL}/projects/${projectId}`, {
        tasks: tasks.filter((task) => task.id !== id),
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setOpenTaskDetails(true);
  };

  const handleSaveComment = async (updatedComments) => {
    const updatedTask = { ...selectedTask, comments: updatedComments };
    try {
      await axios.patch(`${URL}/projects/${projectId}`, {
        tasks: tasks.map((task) =>
          task.id === selectedTask.id ? updatedTask : task
        ),
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === selectedTask.id ? updatedTask : task
        )
      );
      setSelectedTask(updatedTask);
    } catch (error) {
      console.error("Error updating comments:", error);
    }
  };

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <div
          key={task.id} // Ensure each task has a unique key
          onClick={() => handleTaskClick(task)}
          className="mb-3 px-4 py-3 border rounded-lg shadow-md bg-white cursor-pointer hover:bg-gray-100"
        >
          <h3 className="text-lg font-semibold capitalize">{task.title}</h3>
          <p className="text-gray-600 text-sm overflow-hidden overflow-ellipsis first-letter:uppercase">
            {task.description}
          </p>
          <div className="flex flex-wrap uppercase">
            {task.tags &&
              task.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 px-2 rounded-md text-sm  mb-2"
                >
                  {tag}
                </span>
              ))}
          </div>

          {task.subtasks && (
            <div className="list-disc capitalize">
              {task.subtasks.map((subtask, index) => (
                <p key={index} className="flex items-left">
                  {subtask}
                </p>
              ))}
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openEditTask(task);
              }}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(task.id);
              }}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ));
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const addColumn = async () => {
    if (newColumn && !columns.includes(newColumn)) {
      const updatedColumns = [...columns, newColumn];
      setColumns(updatedColumns);
      setNewColumn("");
      try {
        await axios.patch(`${URL}/projects/${projectId}`, {
          columns: updatedColumns,
        });
        await fetchTasks(); // Fetch updated project data
      } catch (error) {
        console.error("Error updating columns:", error);
      }
    }
  };

  const sortColumns = () => {
    const fixedOrder = [
      "to do",
      "in review",
      "accepted",
      "in progress",
      "done",
    ];

    const sortedColumns = fixedOrder
      .filter((col) => columns.includes(col))
      .concat(columns.filter((col) => !fixedOrder.includes(col)));

    setColumns(sortedColumns);
  };

  return (
    <div className="min-h-[65.6vh] flex flex-col justify-between overflow-hidden">
      <div className="px-4">
        <p className="text-xl font-semibold">Project: {projectName}</p>
        <div className="flex items-center gap-2 my-3">
          <select
            value={newColumn}
            onChange={(e) => setNewColumn(e.target.value)}
            className="mr-2 border py-2 px-1 rounded"
          >
            <option value="">Select Column</option>
            <option value="in review">In Review</option>
            <option value="accepted">Accepted</option>
          </select>
          <button
            onClick={addColumn}
            className="bg-[#ffe7ae] text-black px-3 py-2 rounded"
          >
            Add Column
          </button>
          <button
            onClick={() => setOpenInviteMembers(true)} // Updated to set true correctly
            className="bg-[#ffe7ae] text-black px-3 py-2 rounded"
          >
            Invite Members
          </button>
        </div>
      </div>
      <div className="flex overflow-x-auto pb-12">
        {columns.map((status) => (
          <div
            key={status}
            className="bg-[#FFDF92] shadow-md min-h-[500px] w-[300px] flex-shrink-0 mx-4 p-4 rounded-lg"
          >
            <h2 className="text-xl font-[550] mb-2 capitalize">{status}</h2>
            {status === "to do" && (
              <button
                onClick={() => openAddTask(status)}
                className="bg-[#FFDF92] text-black font-semibold py-2 rounded mb-2"
              >
                + Add New Task
              </button>
            )}
            <div className="overflow-y-auto">{renderTasks(status)}</div>
          </div>
        ))}
      </div>

      {openAddEditTask && (
        <AddEditTask
          type={taskType}
          setOpenAddEditTask={setOpenAddEditTask}
          onSaveTask={handleSaveTask}
          currentTask={currentTask}
          column={currentStatus}
        />
      )}

      {openTaskDetails && selectedTask && (
        <TaskDetails
          task={selectedTask}
          setOpenTaskDetails={setOpenTaskDetails}
          onSaveComment={handleSaveComment}
        />
      )}

      {openInviteMembers && (
        <InviteMembers
          setOpenInviteMembers={setOpenInviteMembers} // Pass close handler
          projectId={projectId}
        />
      )}
    </div>
  );
};

export default Board;
import React, { useState, useEffect, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import AddEditTask from "../assets/Modals/AddEditTask";
import TaskDetails from "../assets/Modals/TaskDetails";
import InviteMembers from "../assets/Modals/InviteMembers";
import axios from "axios";
import AddReminder from "../assets/Modals/AddReminder";

const Board = () => {
  const { projectId: paramProjectId } = useParams();
  const [projectId, setProjectId] = useState(paramProjectId);
  const [projectName, setProjectName] = useState("");
  const [taskType, setTaskType] = useState("add");
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [columns, setColumns] = useState(["to do", "in progress", "done"]);
  const [currentStatus, setCurrentStatus] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [newColumn, setNewColumn] = useState("");
  const [members, setMembers] = useState([]);
  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [openTaskDetails, setOpenTaskDetails] = useState(false);
  const [openInviteMembers, setOpenInviteMembers] = useState(false);
  const [openAddReminderModal, setOpenAddReminderModal] = useState(false);
  const [reminderTaskId, setReminderTaskId] = useState(null);

  const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const response = await axios.get(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/project/${projectId}`
      );
      const project = response.data;
      setProjectName(project.name || "Project Name");
      setColumns(project.columns || ["to do", "in progress", "done"]);
      fetchTasks();
      getMembers();
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/project/${projectId}/tasks`
      );
      const fetchedTasks = response.data.tasks;
      setTasks(fetchedTasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [projectId]);

  const handleSaveComment = async (taskId, comment) => {
    try {
      await axios.post(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/task/${taskId}/comments`,
        { text: comment },
        { headers: requestHeaders }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error saving comment:", error);
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

  const handleOpenAddReminder = (task) => {
    setReminderTaskId(task.id);
    setOpenAddReminderModal(true);
  };

  const handleSaveReminder = async (reminder) => {
    setOpenAddReminderModal(false);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setOpenTaskDetails(true);
  };

  const handleSaveTask = async (task) => {
    console.log(task);
    const newTask = { ...task };
    try {
      if (taskType === "add") {
        await axios.post(
          "https://4wvk44j3-7001.euw.devtunnels.ms/api/task",
          newTask,
          { headers: requestHeaders }
        );
      } else {
        await axios.put(
          `https://4wvk44j3-7001.euw.devtunnels.ms/api/task/${currentTask.id}`,
          newTask,
          { headers: requestHeaders }
        );
      }
      fetchTasks();
      setOpenAddEditTask(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/task/${id}`,
        { headers: requestHeaders }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const getMembers = async () => {
    try {
      const response = await axios.get(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/project/${projectId}/users`
      );
      const members = response.data.users;
      setMembers(members);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const addColumn = async () => {
    if (newColumn && !columns.includes(newColumn)) {
      try {
        await axios.post(
          `https://4wvk44j3-7001.euw.devtunnels.ms/api/project/add-columns`,
          { projectId, columnNames: [newColumn] },
          { headers: requestHeaders }
        );
        fetchProject();
      } catch (error) {
        console.error("Error adding column:", error);
      }
    }
  };

  const sortColumns = (columns) => {
    const sortOrder = ["To Do", "In Progress", "in review", "testing", "Done"];
    return columns.sort((a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b));
  };

  const renderTasks = (status) => {
    const statusMapping = {
      "To Do": 0,
      "In Progress": 1,
      "in review": 2,
      testing: 3,
      Done: 4,
    };

    const taskPriorityToImage = {
      0: "/problem-green.png",
      1: "/problem-yellow.png",
      2: "/problem-orange.png",
      3: "/problem-red.png",
    };

    const statusValue = statusMapping[status];

    return tasks
      .filter((task) => task.status === statusValue)
      .map((task) => (
        <div
          key={task.id}
          onClick={() => handleTaskClick(task)}
          className="mb-2 px-2 py-2 border rounded-lg shadow-md bg-white cursor-pointer hover:bg-gray-100 relative"
        >
          <h3 className="w-40 text-lg font-semibold capitalize">
            {task.title}
          </h3>
          <p className="text-gray-600 text-sm overflow-hidden overflow-ellipsis first-letter:uppercase">
            {task.description}
          </p>
          <div className="flex flex-wrap w-52 uppercase">
            {task.tags &&
              task.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 px-2 rounded-md text-sm mx-1"
                >
                  {tag}
                </span>
              ))}
          </div>
          {console.log(task)}
          <div className="flex justify-end absolute bottom-3 right-1">
            <img
              src={taskPriorityToImage[task.priority]}
              alt="priority-icon"
              className="w-4 h-4"
            />
          </div>

          <div className="flex justify-end absolute top-3 right-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenAddReminder(task);
              }}
              className="text-white px-2 rounded"
            >
              <img src="/timer.png" alt="reminder-icon" className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openEditTask(task);
              }}
              className=" text-white  rounded"
            >
              <img src="/edit.png" alt="edit-icon" className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(task.id);
              }}
              className=" text-white px-2 rounded"
            >
              <img src="/bin.png" alt="delete-icon" className="w-4 h-4" />
            </button>
          </div>
        </div>
      ));
  };

  return (
    <div className="min-h-[65.6vh] dark:bg-slate-700 flex flex-col">
      <div className="px-4 mt-4">
        <p className="text-xl font-semibold dark:text-gray-50">
          Project: {projectName}
        </p>
        <div className="flex md:flex-row md:gap-14 flex-col my-4">
          <div className="flex w-full md:w-72 gap-2">
            <select
              value={newColumn}
              onChange={(e) => setNewColumn(e.target.value)}
              className="border py-2 px-1 rounded w-full"
            >
              <option value="">Select Column</option>
              {["in review", "testing"].map((column) => (
                <option key={column} value={column}>
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </option>
              ))}
            </select>
            <button
              onClick={addColumn}
              className="bg-[#ffe7ae] dark:bg-gray-50 text-xl text-black px-3 py-2 rounded"
            >
              +
            </button>
          </div>
          <div className=" flex flex-col md:flex-row md:ml-0 gap-2 mt-2">
            <button
              onClick={() => setOpenInviteMembers(true)}
              className=" px-3 py-2 bg-[#ffe7ae] dark:bg-gray-50 text-black rounded"
            >
              Invite Members
            </button>
            <div className=" text-black px-3 py-2 dark:bg-gray-50 rounded border capitalize">
              Members:{" "}
              {members && members.map((member) => member.firstName).join(", ")}
            </div>
          </div>
        </div>
      </div>
      <div className="flex overflow-x-auto pb-12 ">
        {sortColumns(columns).map((status) => (
          <div
            key={status}
            className="bg-[#FFDF92] dark:bg-gray-100 shadow-md min-h-[500px] w-[300px] flex-shrink-0 mx-4 p-4 rounded-lg relative"
          >
            <h2 className="text-xl font-[550] mb-2 capitalize">{status}</h2>
            {status === "To Do" && (
              <button
                onClick={() => openAddTask(status)}
                className="bg-transparent text-black text-2xl font-semibold py-2 rounded mb-2 absolute top-3 right-6"
              >
                +
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
          projectId={projectId}
        />
      )}

      {openAddReminderModal && (
        <AddReminder
          setOpenAddReminderModal={setOpenAddReminderModal}
          onSaveReminder={handleSaveReminder}
          taskId={reminderTaskId}
        />
      )}

      {openTaskDetails && selectedTask && (
        <TaskDetails
          task={selectedTask}
          setOpenTaskDetails={setOpenTaskDetails}
          onSaveComment={handleSaveComment}
          members={members}
          requestHeaders={requestHeaders}
        />
      )}

      {openInviteMembers && (
        <InviteMembers
          setOpenInviteMembers={setOpenInviteMembers}
          projectId={projectId}
        />
      )}
    </div>
  );
};

export default Board;

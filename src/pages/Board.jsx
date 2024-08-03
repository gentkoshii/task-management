import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddEditTask from "../assets/Modals/AddEditTask";
import TaskDetails from "../assets/Modals/TaskDetails";
import InviteMembers from "../assets/Modals/InviteMembers";
import axios from "axios";
import AddReminder from "../assets/Modals/AddReminder";

const Board = () => {
  const { projectId: paramProjectId } = useParams();
  const [projectId, setProjectId] = useState(paramProjectId);
  const [taskId, setTaskId] = useState();
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
      fetchTasks();
      getMembers();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      console.log(
        `Fetching project: https://4wvk44j3-7001.euw.devtunnels.ms/api/project/${projectId}`
      );
      const response = await axios.get(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/project/${projectId}`
      );
      const project = response.data;
      setProjectName(project.name || "Project Name");
      const Columns = await fetchColumns();
      setColumns(Columns || ["to do", "in progress", "done"]);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const fetchColumns = async () => {
    try {
      console.log(
        `Fetching columns: https://4wvk44j3-7001.euw.devtunnels.ms/api/project/${projectId}/columns`
      );
      const response = await axios.get(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/project/${projectId}/columns`
      );
      const columns = response.data;
      return columns;
    } catch (error) {
      console.error("Error fetching columns:", error);
    }
  };

  const handleSaveComment = async (taskId, comment) => {
    try {
      await axios.post(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/task/${taskId}/comments`,
        {
          text: comment,
        },
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

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/project/${projectId}/tasks`
      );
      const tasks = response.data.tasks;
      setTasks(tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleSaveTask = async (task) => {
    const newTask = { ...task };
    try {
      if (taskType === "add") {
        await axios
          .post(
            `https://4wvk44j3-7001.euw.devtunnels.ms/api/task`,
            {
              ...newTask,
            },
            { headers: requestHeaders }
          )
          .then(() => {
            fetchTasks();
          });
        setTasks((prevTasks) => [...prevTasks, newTask]);
      } else {
        let statusBoard;
        if (currentStatus === "to do") {
          statusBoard = 0;
        } else if (currentStatus === "in progress") {
          statusBoard = 1;
        } else if (currentStatus === "in review") {
          statusBoard = 2;
        } else if (currentStatus === "testing") {
          statusBoard = 3;
        } else {
          statusBoard = 4;
        }
        await axios
          .put(
            `https://4wvk44j3-7001.euw.devtunnels.ms/api/task/${currentTask.id}`,
            {
              ...newTask,
            },
            { headers: requestHeaders }
          )
          .then(() => {
            fetchTasks();
          });
      }
      setOpenAddEditTask(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios
        .delete(`https://4wvk44j3-7001.euw.devtunnels.ms/api/task/${id}`, {
          headers: requestHeaders,
        })
        .then(() => {
          fetchTasks();
        });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const getMembers = async () => {
    try {
      console.log(
        `Fetching members: https://4wvk44j3-7001.euw.devtunnels.ms/api/project/${projectId}/users`
      );
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
          {
            projectId: projectId,
            columnNames: [newColumn],
          },
          { headers: requestHeaders }
        );
        fetchProject(); // Fetch updated project data
      } catch (error) {
        console.error("Error adding column:", error);
      }
    }
  };

  const sortColumns = (columns) => {
    const sortLikeThis = [
      "to do",
      "in progress",
      "in review",
      "testing",
      "done",
    ];

    return columns.sort((a, b) => {
      const orderA = sortLikeThis.indexOf(a);
      const orderB = sortLikeThis.indexOf(b);
      return orderA - orderB;
    });
  };

  const renderTasks = (status) => {
    const statusMapping = {
      "to do": 0,
      "in progress": 1,
      "in review": 2,
      testing: 3,
      done: 4,
    };

    const statusValue = statusMapping[status];

    return tasks
      .filter((task) => task.status === statusValue)
      .map((task) => (
        <div
          key={task.id}
          onClick={() => handleTaskClick(task)}
          className="mb-2 px-4 py-2 border rounded-lg shadow-md bg-white cursor-pointer hover:bg-gray-100 relative"
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
                  className="bg-gray-200 text-gray-800 px-2 rounded-md text-sm mx-1"
                >
                  {tag}
                </span>
              ))}
          </div>
          <div className="flex justify-end absolute top-3 right-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenAddReminder(task);
              }}
              className="text-white px-2 rounded"
            >
              <img src="/timer.png" alt="reminder-icon" className="w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openEditTask(task);
              }}
              className=" text-white  rounded"
            >
              <img src="/edit.png" alt="edit-icon" className="w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(task.id);
              }}
              className=" text-white px-2 rounded"
            >
              <img src="/bin.png" alt="delete-icon" className="w-5" />
            </button>
          </div>
        </div>
      ));
  };

  return (
    <div className="min-h-[65.6vh] flex flex-col justify-between overflow-hidden">
      <div className="px-4">
        <p className="text-xl font-semibold">Project: {projectName}</p>
        <div className="flex items-center gap-3 my-4">
          <select
            value={newColumn}
            onChange={(e) => setNewColumn(e.target.value)}
            className="border py-2 px-1 rounded"
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
            className="bg-[#ffe7ae] text-xl text-black px-3 py-2 rounded"
          >
            +
          </button>
          <button
            onClick={() => setOpenInviteMembers(true)}
            className=" bg-[#ffe7ae] text-black px-3 py-2 rounded"
          >
            Invite Members
          </button>
          <div className=" text-black px-3 py-2 rounded border capitalize">
            Members:{" "}
            {members && members.map((member) => member.firstName).join(", ")}
          </div>
        </div>
      </div>
      <div className="flex overflow-x-auto pb-12 ">
        {sortColumns(columns).map((status) => (
          <div
            key={status}
            className="bg-[#FFDF92] shadow-md min-h-[500px] w-[300px] flex-shrink-0 mx-4 p-4 rounded-lg relative"
          >
            <h2 className="text-xl font-[550] mb-2 capitalize">{status}</h2>
            {status === "to do" && (
              <button
                onClick={() => openAddTask(status)}
                className="bg-[#FFDF92] text-black text-2xl font-semibold py-2 rounded mb-2 absolute top-3 right-6"
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

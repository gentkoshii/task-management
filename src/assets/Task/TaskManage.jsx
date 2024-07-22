import React, { useState } from "react";
import TaskCard from "./TaskCard";

const TaskManage = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      state: "To Do",
      description: "Description of Task 1",
      assignedTo: null, // Initially not assigned
    },
    {
      id: 2,
      title: "Task 2",
      state: "Doing",
      description: "Description of Task 2",
      assignedTo: null,
    },
    {
      id: 3,
      title: "Task 3",
      state: "Done",
      description: "Description of Task 3",
      assignedTo: null,
    },
  ]);

  const [projectMembers] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Johnson" },
    { id: 4, name: "Emily Brown" },
  ]);

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleAssign = (taskId, memberId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, assignedTo: memberId } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditTitle = (taskId, newTitle) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: newTitle } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditDescription = (taskId, newDescription) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, description: newDescription } : task
    );
    setTasks(updatedTasks);
  };

  const handleAddTask = (state) => {
    const newTask = {
      id: tasks.length + 1,
      title: `New Task ${tasks.length + 1}`,
      state: state,
      description: `Description of New Task ${tasks.length + 1}`,
      assignedTo: null,
    };
    setTasks([...tasks, newTask]);
  };

  // Organize tasks by state
  const columns = {
    "To Do": tasks.filter((task) => task.state === "To Do"),
    Doing: tasks.filter((task) => task.state === "Doing"),
    Done: tasks.filter((task) => task.state === "Done"),
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {Object.entries(columns).map(([columnTitle, tasksInColumn]) => (
        <div key={columnTitle}>
          <h2>{columnTitle}</h2>
          <button onClick={() => handleAddTask(columnTitle)}>Add Task</button>
          {tasksInColumn.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              assignedTo={task.assignedTo}
              projectMembers={projectMembers}
              onDelete={() => handleDeleteTask(task.id)}
              onAssign={(memberId) => handleAssign(task.id, memberId)}
              onEditTitle={(newTitle) => handleEditTitle(task.id, newTitle)}
              onEditDescription={(newDescription) =>
                handleEditDescription(task.id, newDescription)
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskManage;

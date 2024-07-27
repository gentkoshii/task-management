import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [totalProjectsCount, setTotalProjectsCount] = useState(0);

  const URL = "http://localhost:3000";

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${URL}/projects`);
      const projectsData = response.data;

      setProjects(projectsData);
      setTotalProjectsCount(projectsData.length);

      // Calculate total completed tasks
      const completedTasks = projectsData.reduce((total, project) => {
        const completedInProject =
          project.tasks?.filter((task) => task.status === "done").length || 0; // Change "done" to the actual status name in your tasks
        return total + completedInProject;
      }, 0);

      setCompletedTasksCount(completedTasks);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="mt-4">
        <p>Total Projects: {totalProjectsCount}</p>
        <p>Completed Tasks: {completedTasksCount}</p>
      </div>
    </div>
  );
};

export default Dashboard;

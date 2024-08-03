import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [totalProjectsCount, setTotalProjectsCount] = useState(0);

  useEffect(() => {
    fetchProjects();
  }, []);

  const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchProjects = async () => {
    console.log("Fetching projects...");
    try {
      const response = await axios.get(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/project/my-projects`,
        {
          headers: requestHeaders,
        }
      );
      const projectsData = response.data;

      setProjects(projectsData);
      setTotalProjectsCount(projectsData.length);

      const completedTasks = projectsData.reduce((total, project) => {
        const completedInProject =
          project.tasks?.filter((task) => task.status === "done").length || 0;
        return total + completedInProject;
      }, 0);

      setCompletedTasksCount(completedTasks);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const calculatePercentage = (completed, total) => {
    return total === 0 ? 0 : (completed / total) * 100;
  };

  const ProgressCircle = (completed, total) => {
    const percentage = calculatePercentage(completed, total);

    return (
      <div
        className="relative w-28 h-28 flex items-center justify-center"
        style={{
          background: `conic-gradient(#fccd61 ${percentage}%, lightgray ${percentage}% 100%)`,
          borderRadius: "50%",
        }}
      >
        <div
          className="absolute w-24 h-24 rounded-full bg-white flex items-center justify-center"
          style={{
            borderRadius: "50%",
          }}
        >
          <span className="text-xl font-semibold text-[#fccd61]">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    );
  };

  const totalTasks = projects.reduce(
    (total, project) => total + (project.tasks?.length || 0),
    0
  );

  return (
    <div className="p-4 m-5">
      <h1 className="text-2xl font-semibold">Welcome to TaskFlow</h1>
      <div className="mt-4">
        <p>Total Projects you are working on: {totalProjectsCount}</p>
        <p>Total Tasks you are working on: {totalTasks}</p>
        <p>Completed Tasks: {completedTasksCount}</p>
        <div className="mt-2 grid grid-cols-1 lg:grid-cols-4 gap-5">
          {projects.map((project) => {
            const totalTasks = project.tasks?.length || 0;
            const completedTasksInProject =
              project.tasks?.filter((task) => task.status === "done").length ||
              0;

            return (
              <div
                key={project.id}
                className="border p-4 w-full grid-rows-4 items-center rounded-lg"
              >
                <div className="text-left">
                  <h2 className="text-xl font-semibold">{project.name}</h2>
                  <p>Total Tasks: {totalTasks}</p>
                  <p>Completed Tasks: {completedTasksInProject}</p>
                </div>
                <div className="mt-4 flex items-center justify-center">
                  {ProgressCircle(completedTasksInProject, totalTasks)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

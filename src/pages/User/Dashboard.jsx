import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import axios from "axios";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [totalProjectsCount, setTotalProjectsCount] = useState(0);
  const [myTasks, setMyTasks] = useState([]);
  const [myCompletedTasksCount, setMyCompletedTasksCount] = useState(0);
  const { darkMode } = useTheme();

  useEffect(() => {
    fetchProjects();
    fetchMyTasks();
  }, []);

  const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const projectBgClass = darkMode
    ? "bg-[linear-gradient(135deg,_#1F2937,_#497188_90%)] text-white"
    : "bg-[linear-gradient(135deg,_#FFDF92,_#ffebbc_80%)] text-black";

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/project/my-projects`,
        { headers: requestHeaders }
      );

      const projectsData = response.data;
      setTotalProjectsCount(projectsData.length);

      // Fetch detailed info for each project
      const detailedProjects = await Promise.all(
        projectsData.map(async (project) => {
          try {
            const projectResponse = await axios.get(
              `https://4wvk44j3-7001.euw.devtunnels.ms/api/project/${project.id}/tasks`,
              { headers: requestHeaders }
            );
            return { ...project, tasks: projectResponse.data.tasks };
          } catch (error) {
            console.error(
              `Error fetching tasks for project ${project.id}:`,
              error
            );
            return { ...project, tasks: [] };
          }
        })
      );

      setProjects(detailedProjects);

      const completedTasks = detailedProjects.reduce((total, project) => {
        const completedInProject =
          project.tasks?.filter((task) => task.status === "done").length || 0;
        return total + completedInProject;
      }, 0);

      setCompletedTasksCount(completedTasks);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchMyTasks = async () => {
    try {
      const response = await axios.get(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/task/my-tasks`,
        { headers: requestHeaders }
      );
      const myTasksData = response.data;
      setMyTasks(myTasksData);

      // Count completed tasks
      const completedMyTasks = myTasksData.filter(
        (task) => task.status === "done"
      ).length;
      setMyCompletedTasksCount(completedMyTasks);
    } catch (error) {
      console.error("Error fetching my tasks:", error);
    }
  };

  const calculatePercentage = (completed, total) => {
    return total === 0 ? 0 : (completed / total) * 100;
  };

  const ProgressCircle = ({ completed, total }) => {
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
          <span className="text-xl font-semibold text-[#141441] dark:">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 m-5">
      <h1 className="text-2xl font-semibold dark:text-white">
        Welcome to TaskFlow
      </h1>
      <div className="mt-4 dark:text-white">
        <p>Total Projects you are working on: {totalProjectsCount}</p>
        <p>Total Tasks you are working on: {myTasks.length}</p>
        <div className="mt-2 grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-1 gap-5 ">
          {projects.map((project) => {
            const totalTasks = project.tasks?.length || 0;
            const completedTasksInProject =
              project.tasks?.filter((task) => task.status === 4).length || 0;

            return (
              <div
                key={project.id}
                className={`border p-4 w-full grid-rows-4 items-center rounded-lg ${projectBgClass} dark:text-black`}
              >
                <div className="text-left">
                  <h2 className="text-xl font-semibold">{project.name}</h2>
                  <p>Total Tasks: {totalTasks}</p>
                  <p>Completed Tasks: {completedTasksInProject}</p>
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <ProgressCircle
                    completed={completedTasksInProject}
                    total={totalTasks}
                  />
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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddProject from "../../assets/Modals/AddProject";
import { useTheme } from "../../context/ThemeContext";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const { darkMode } = useTheme();

  const navigate = useNavigate();

  const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    await axios
      .get(`https://4wvk44j3-7001.euw.devtunnels.ms/api/project/my-projects`, {
        headers: requestHeaders,
      })
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));
  };

  const handleSaveProject = async () => {
    const newProject = {
      name: newProjectName,
      description: newProjectDescription,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/project`,
        newProject,
        { headers: requestHeaders }
      );
      setProjects([...projects, response.data]);
      setIsAddProjectOpen(false);
      setNewProjectName("");
      setNewProjectDescription("");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    await axios
      .delete(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/project/${projectId}`,
        {
          headers: requestHeaders,
        }
      )
      .then(() => {
        setProjects(projects.filter((project) => project.id !== projectId));
      })
      .catch((error) => console.error("Error deleting project:", error));
  };

  const handleClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const buttonBgClass = darkMode ? "bg-slate-400" : "bg-[#FFDF92]";
  const projectBgClass = darkMode
    ? "bg-[linear-gradient(135deg,_#1F2937,_#497188_90%)] text-white"
    : "bg-[linear-gradient(135deg,_#FFDF92,_#ffebbc_80%)] text-black";
  const deleteButtonClass = darkMode
    ? "bg-slate-800 text-white hover:bg-slate-700"
    : "bg-gray-400 text-white hover:bg-gray-500";
  return (
    <div className="relative flex flex-col gap-10 p-10 dark:bg-slate-900 z-10">
      <div>
        <button
          className={`text-lg my-3 px-4 py-2 rounded hover:-translate-y-1 ${buttonBgClass} text-black`}
          onClick={() => setIsAddProjectOpen(true)}
        >
          Create a new Project
        </button>
      </div>
      {isAddProjectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <AddProject
            projectName={newProjectName}
            setProjectName={setNewProjectName}
            projectDescription={newProjectDescription}
            setProjectDescription={setNewProjectDescription}
            onSaveProject={handleSaveProject}
            onCancel={() => setIsAddProjectOpen(false)}
          />
        </div>
      )}
      <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-1 gap-5">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleClick(project.id)}
            className={`${projectBgClass} h-[300px] p-4 rounded-lg shadow-md cursor-pointer hover:-translate-y-1 relative`}
          >
            <div className="text-xl font-semibold">{project.name}</div>
            <div className="text-sm my-3">{project.description}</div>
            <p className="text-sm mt-2">
              Created: {new Date(project.createdAt).toLocaleDateString()}
            </p>
            {project.updatedAt && (
              <p className="text-sm">
                Last Updated: {new Date(project.updatedAt).toLocaleDateString()}
              </p>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteProject(project.id);
              }}
              className={`mt-4 px-4 py-2 rounded absolute bottom-4 ${deleteButtonClass}`}
            >
              Delete Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;

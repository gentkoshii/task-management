import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddProject from "../../assets/Modals/AddProject";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");

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

  return (
    <div className="flex flex-col gap-10 m-10 h-full">
      <div>
        <button
          onClick={() => setIsAddProjectOpen(true)}
          className="bg-[#ffe3a0] text-lg text-black my-3 px-4 py-2 rounded hover:-translate-y-1"
        >
          Create a new Project
        </button>
        {isAddProjectOpen && (
          <AddProject
            projectName={newProjectName}
            setProjectName={setNewProjectName}
            projectDescription={newProjectDescription}
            setProjectDescription={setNewProjectDescription}
            onSaveProject={handleSaveProject}
            onCancel={() => setIsAddProjectOpen(false)}
          />
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleClick(project.id)}
            className=" bg-[linear-gradient(135deg,_#FFDF92,_#ffebbc_80%)]  min-h-[200px] min-w-[300px] p-4 rounded-lg shadow-md w-64 cursor-pointer hover:-translate-y-1"
          >
            <div className="text-xl text-black font-semibold">
              {project.name}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Created: {new Date(project.createdAt).toLocaleDateString()}
            </p>
            {project.updatedAt && (
              <p className="text-sm text-gray-600">
                Last Updated: {new Date(project.updatedAt).toLocaleDateString()}
              </p>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteProject(project.id);
              }}
              className="mt-4 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
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

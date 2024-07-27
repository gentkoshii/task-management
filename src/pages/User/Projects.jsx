import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddProject from "../../assets/Modals/AddProject";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const URL = "http://localhost:3000";
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    axios
      .get(`${URL}/projects`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));
  };

  const handleSaveProject = () => {
    const newProject = {
      name: newProjectName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    axios
      .post(`${URL}/projects`, newProject)
      .then((response) => {
        setProjects([...projects, response.data]);
        setIsAddProjectOpen(false);
        setNewProjectName("");
      })
      .catch((error) => console.error("Error creating project:", error));
  };

  const handleDeleteProject = (projectId) => {
    axios
      .delete(`${URL}/projects/${projectId}`)
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
          className="bg-[#FFDF92] text-lg text-black my-3 px-4 py-2 rounded hover:translate-x-1"
        >
          Create a new Project
        </button>
        {isAddProjectOpen && (
          <AddProject
            projectName={newProjectName}
            setProjectName={setNewProjectName}
            onSaveProject={handleSaveProject}
            onCancel={() => setIsAddProjectOpen(false)}
          />
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleClick(project.id)} // Ensure this is correctly navigating
            className="bg-[#FFDF92] min-h-[200px] min-w-[300px] p-4 rounded-lg shadow-md w-64 cursor-pointer"
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
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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

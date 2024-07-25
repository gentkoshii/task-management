import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddProject from "../../assets/Modals/AddProject";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const URL = "http://localhost:3000";

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
            className="bg-[#FFDF92] min-h-[200px] min-w-[300px] p-4 rounded-lg shadow-md w-64"
          >
            <Link
              to={`/projects/${project.id}`}
              className="text-xl text-black no-underline font-semibold"
            >
              {project.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;

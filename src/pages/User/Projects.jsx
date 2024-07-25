import React from "react";

const Projects = () => {
  return (
    <div className="flex flex-col gap-10 m-10 h-full">
      <div>
        <button className="bg-[#FFDF92] text-lg text-black my-3 px-4 py-2 rounded hover:translate-x-1">
          Create a new Project
        </button>
      </div>
      <div>
        {/* map the projects */}
        <p className="text-lg">You don't have any projects yet.</p>
      </div>
    </div>
  );
};

export default Projects;

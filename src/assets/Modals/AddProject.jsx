import React from "react";

function AddProject({
  projectName,
  setProjectName,
  projectDescription,
  setProjectDescription,
  onSaveProject,
  onCancel,
}) {
  const handleSave = () => {
    onSaveProject();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        onCancel();
      }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div className="bg-white px-8 py-6 rounded-lg shadow-lg w-full max-w-lg">
        <div>
          <h3 className="text-xl font-semibold">Add New Project</h3>
        </div>
        <div className="mt-4 flex flex-col space-y-1">
          <label htmlFor="projectName" className="text-sm">
            Project Name
          </label>
          <input
            id="projectName"
            type="text"
            placeholder="e.g New Website Project"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm 
          border border-gray-500 focus:outline-[#FFDF92] ring-1"
          />
          <label htmlFor="projectDescription" className="text-sm">
            Project Description
          </label>
          <input
            id="projectDescription"
            type="text"
            placeholder="e.g This is a website description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm 
          border border-gray-500 focus:outline-[#FFDF92] ring-1"
          />
        </div>

        <div className="mt-4 flex gap-4">
          <button
            onClick={handleSave}
            className="w-full bg-[#FFDF92] text-black px-4 py-2 rounded hover:-translate-y-[1px]"
          >
            Create Project
          </button>
          <button
            onClick={onCancel}
            className="w-full bg-gray-100 text-black px-4 py-2 rounded hover:-translate-y-[1px]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProject;

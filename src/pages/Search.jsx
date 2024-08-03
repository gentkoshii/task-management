import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const { searchQuery } = useParams();
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all projects
        const response = await axios.get(
          `https://4wvk44j3-7001.euw.devtunnels.ms/api/project/my-projects`,
          { headers: requestHeaders }
        );
        const projects = response.data;

        // Filter projects based on searchQuery
        const filteredProjects = projects.filter((project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredProjects.length > 0) {
          setSearchData(filteredProjects);
        } else {
          setError("No projects found");
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [searchQuery]);

  const handleClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-10 m-10 h-full">
      <h1>Search Results for "{searchQuery}"</h1>
      <div className="flex flex-wrap gap-4">
        {searchData.map((project) => (
          <div
            key={project.id}
            onClick={() => handleClick(project.id)}
            className="bg-[linear-gradient(135deg,_#FFDF92,_#ffebbc_80%)] min-h-[200px] min-w-[300px] p-4 rounded-lg shadow-md w-64 cursor-pointer hover:-translate-y-1"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

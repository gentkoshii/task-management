import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";

const Search = () => {
  const { searchQuery } = useParams();
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();

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
        const response = await axios.get(
          `https://4wvk44j3-7001.euw.devtunnels.ms/api/project/my-projects`,
          { headers: requestHeaders }
        );
        const projects = response.data;

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

  if (loading) return <div className="min-h-[587px]">Loading...</div>;
  if (error) return <div className="min-h-[587px]">Error: {error}</div>;

  const gradientStyle = darkMode
    ? "bg-[linear-gradient(135deg,_#1F2937,_#497188_90%)]"
    : "bg-[linear-gradient(135deg,_#FFDF92,_#ffebbc_80%)]";

  return (
    <div className={gradientStyle}>
      <div className="flex flex-col w-[70%] ml-[15%] min-h-[502px] gap-10 p-10">
        <h2 className="text-2xl font-semibold dark:text-white">
          Search Results for "{searchQuery}"
        </h2>
        <div className="w-full grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-6">
          {searchData.map((project) => (
            <div
              key={project.id}
              onClick={() => handleClick(project.id)}
              className="h-[300px] bg-gray-50 p-6 border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              <div className="text-xl text-black font-semibold mb-2">
                {project.name}
              </div>
              <div className="text-sm text-gray-600 mb-4 line-clamp-3">
                {project.description || "No description available."}
              </div>
              <div className="mt-auto">
                <p className="text-sm text-gray-600">
                  Created: {new Date(project.createdAt).toLocaleDateString()}
                </p>
                {project.updatedAt && (
                  <p className="text-sm text-gray-600">
                    Last Updated:{" "}
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;

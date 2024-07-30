import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const { searchQuery } = useParams();
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/projects/search?query=${encodeURIComponent(
            searchQuery
          )}`
        );
        if (response.data.length > 0) {
          setSearchData(response.data);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Search Results for "{searchQuery}"</h1>
      <div className="projects">
        {searchData.map((project) => (
          <div key={project.id} className="project">
            <h2>{project.name}</h2>
            <p>Created: {new Date(project.createdAt).toLocaleDateString()}</p>
            {project.updatedAt && (
              <p>
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

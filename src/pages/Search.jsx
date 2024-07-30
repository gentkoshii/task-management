import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
          `https://www.omdbapi.com/?t=${encodeURIComponent(
            searchQuery
          )}&apikey=6b1f9886`
        );
        if (response.data.Response === "True") {
          setSearchData([response.data]);
        } else {
          setError(response.data.Error);
        }
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [searchQuery]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div>
      <h1>Search Results for {searchQuery}</h1>
      <div className="movies">
        {searchData.map((item) => (
          <div className="info">
            {/* fix item. to search for the thing in your projects */}
            <img src={item.Poster} className="poster" />
            <div>
              <h2>{item.Title}</h2>
              <div className="rating">
                <img src="star-icon.svg" />
                <h4>{item.imdbRating}</h4>
              </div>
              <div className="details">
                <span>{item.Rated}</span>
                <span>{item.Year}</span>
                <span>{item.Runtime}</span>
              </div>
              <div className="genre">
                <div>{item.Genre.split(",").join("</div><div>")}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

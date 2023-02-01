import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function Results({ addOrRemoveFromFavs, favorites }) {
  const { id } = useParams();
  let query = new URLSearchParams(window.location.search);

  let keyword = query.get("keyword");

  const [moviesResults, setMoviesResults] = useState([]);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=fa83d56954120e4f925065cb7e452725&language=en-US&page=1&include_adult=false&query=${keyword}`;
    axios
      .get(endPoint)
      .then((response) => {
        const moviesArray = response.data.results;
        if (moviesArray.length === 0) {
          Swal.fire("No results.");
        }
        setMoviesResults(moviesArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [keyword, id]);

  return (
    <>
      <h1 className="text-white text-5xl md:text-8xl text-center my-4">
        Results of: {keyword}
      </h1>
      {moviesResults.length === 0 && (
        <h1 className="text-white">No results.</h1>
      )}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
        {moviesResults.map((oneMovie, idx) => {
          console.log(oneMovie);
          // eslint-disable-next-line
          const found = favorites.find(({ id }) => id == oneMovie.id);
          return (
            <div
              className="bg-gray-100 rounded h-full relative mb-16 md:mb-14"
              key={idx}
            >
              <h5 className="text-center text-xl truncate">{oneMovie.title}</h5>
              {oneMovie.poster_path === null ? (
                <img
                  className="w-full"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                  alt=""
                />
              ) : (
                <img
                  className="w-full"
                  src={`https://image.tmdb.org/t/p/w500${oneMovie.poster_path}`}
                  alt=""
                />
              )}
              <p className="px-2">{oneMovie.overview.substring(0, 100)}...</p>
              <div className="grid grid-cols-2 absolute bottom-0 w-full">
                <div>
                  {found ? (
                    <button
                      className="m-1 px-2 rounded bg-red-600 w-fit"
                      onClick={addOrRemoveFromFavs}
                      data-movie-id={oneMovie.id}
                    >
                      Delete Favorites
                    </button>
                  ) : (
                    <button
                      className="m-1 px-2 rounded bg-amber-300 w-fit"
                      onClick={addOrRemoveFromFavs}
                      data-movie-id={oneMovie.id}
                    >
                      Add to Favorites
                    </button>
                  )}
                </div>
                <div className="flex justify-end m-1 px-2">
                  <Link
                    className="rounded bg-cyan-500 px-4 text-center"
                    to={`/details?movieID=${oneMovie.id}`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Results;

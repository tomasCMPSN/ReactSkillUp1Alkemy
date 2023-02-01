import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

function List({ addOrRemoveFromFavs, favorites }) {
  let token = sessionStorage.getItem("token");
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=fa83d56954120e4f925065cb7e452725&page=1";

    axios
      .get(endPoint)
      .then((response) => {
        const apiData = response.data;
        setMovieList(apiData.results);
      })
      .catch((error) => {
        Swal.fire("Error, try later.");
      });
  }, [setMovieList]);

  return (
    <>
      {!token && <Navigate to="/" />}
      <h1 className="text-white text-5xl md:text-8xl text-center my-4">
        Movie List
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
        {movieList.map((oneMovie, idx) => {
          // eslint-disable-next-line
          const found = favorites.find(({ id }) => id == oneMovie.id);
          return (
            <div className="bg-gray-100 rounded h-full relative mb-16 md:mb-14" key={idx}>
              <h5 className="text-center text-xl truncate">{oneMovie.title}</h5>
              <img
                className="w-full"
                src={`https://image.tmdb.org/t/p/w500${oneMovie.poster_path}`}
                alt=""
              />
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

export default List;

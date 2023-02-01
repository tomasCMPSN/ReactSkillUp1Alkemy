import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function Details() {
  let token = sessionStorage.getItem("token");

  let query = new URLSearchParams(window.location.search);
  let movieID = query.get("movieID");

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=fa83d56954120e4f925065cb7e452725&language=en-US`;
    axios
      .get(endPoint)
      .then((response) => {
        const movieData = response.data;
        setMovie(movieData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieID]);

  return (
    <>
      {!token && <Navigate to="/" />}
      {!movie && <p className="text-white">Cargando...</p>}
      {movie && (
        <>
          <div className="gap-4 px-4 mt-4 md:flex">
            <div className="flex justify-center py-4">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt=""
              />
            </div>
            <div className="bg-gray-100 rounded w-full p-2">
              <h1 className="text-5xl text-center">
                Details of: {movie.title}
              </h1>
              <div className="my-4">
                <p className="text-2xl font-bold">Overview</p>
                <p>{movie.overview}</p>
              </div>
              <div className="my-4">
                <p className="text-2xl font-bold">Tagline</p>
                <p>{movie.tagline}</p>
              </div>
              <div className="my-4">
                <p className="text-2xl font-bold">Genres</p>
                <ul className="list-disc list-inside">
                  {movie.genres.map((oneGenre) => (
                    <li key={oneGenre.id}>{oneGenre.name}</li>
                  ))}
                </ul>
              </div>
              <div className="my-4">
                <p className="text-2xl font-bold">Homepage</p>
                <p>{movie.homepage}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Details;

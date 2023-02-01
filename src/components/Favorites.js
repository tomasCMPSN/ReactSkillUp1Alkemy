import { Link, Navigate } from "react-router-dom";

function Favorites({ addOrRemoveFromFavs, favorites }) {
  let token = sessionStorage.getItem("token");
  console.log(favorites);
  return (
    <>
      {!token && <Navigate to="/" />}
      <h2 className="text-white text-5xl md:text-8xl text-center my-4">Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
        {!favorites.length && (
          <div className="text-white">
            <p>No favorites yet.</p>
          </div>
        )}
        {favorites.map((oneMovie, idx) => {
          // eslint-disable-next-line
          const found = favorites.find(({ id }) => id == oneMovie.id);
          return (
            <div className="bg-gray-100 rounded h-full relative mb-16 md:mb-14" key={idx}>
              <h5 className="text-center text-xl truncate">{oneMovie.title}</h5>
              <img
                className="w-full"
                src={oneMovie.imgURL}
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

export default Favorites;

// Libraries
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Login from "./components/Login";
import List from "./components/List";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Details from "./components/Details";
import Results from "./components/Results";
import Favorites from "./components/Favorites";

function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");

    if (favsInLocal !== null) {
      const favsArray = JSON.parse(favsInLocal);
      setFavorites(favsArray);
    }
  }, []);

  const addOrRemoveFromFavs = (e) => {
    const favMovies = localStorage.getItem("favs");

    let tempMoviesInFavs;

    if (favMovies === null) {
      tempMoviesInFavs = [];
    } else {
      tempMoviesInFavs = JSON.parse(favMovies);
    }

    const btn = e.currentTarget;
    const parent = btn.parentElement.parentElement.parentElement;
    const imgURL = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h5").innerText;
    const overview = parent.querySelector("p").innerText;

    const movieData = {
      imgURL,
      title,
      overview,
      id: btn.dataset.movieId,
    };

    let movieIsInArray = tempMoviesInFavs.find((oneMovie) => {
      return oneMovie.id === movieData.id;
    });
    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs)
      console.log("movie added");
    } else {
      let moviesLeft = tempMoviesInFavs.filter((oneMovie) => {
        return oneMovie.id !== movieData.id;
      });
      localStorage.setItem("favs", JSON.stringify(moviesLeft));
      setFavorites(moviesLeft)
      console.log("movie deleted");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black relative">
        <div className="pb-16">
          <Header favorites={favorites} />
          <Routes>
            <Route path="/*" element={<Login />} />
            <Route
              path="/list/*"
              element={<List addOrRemoveFromFavs={addOrRemoveFromFavs} favorites={favorites} />}
            />
            <Route path="/details/*" element={<Details />} />
            <Route path="/results" element={<Results addOrRemoveFromFavs={addOrRemoveFromFavs}  favorites={favorites} />} />
            <Route
              path="/favorites/*"
              element={<Favorites addOrRemoveFromFavs={addOrRemoveFromFavs} favorites={favorites} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;

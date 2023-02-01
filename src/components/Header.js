import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Search from "./Search";

function Header({ favorites }) {
  let token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  const location = useLocation();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  const logOutHandler = () => {
    Swal.fire({
      title: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  return (
    <header className="bg-gray-100 p-4 grid grid-cols-1 md:grid-cols-2 text-xs md:text-xl">
      <nav className="flex justify-center md:justify-start">
        <ul className="flex content-center py-2">
          <li>
            <NavLink className={url === "/" ? "underline" : ""} to="/">Home</NavLink>
          </li>
          <li className="px-4">
            <NavLink className={url === "/list" ? "underline" : ""} to="/list">List</NavLink>
          </li>
          {token && (
            <>
              <li>
                <NavLink className={url === "/favorites" ? "underline" : ""} to="/favorites">Favorites</NavLink>
                {favorites.length > 0 && (
                  <span className="bg-amber-300 px-2 ml-1 rounded">
                    {favorites.length}
                  </span>
                )}
              </li>
              <li>
                <button className="px-4" onClick={logOutHandler}>
                  Log Out
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="flex justify-center md:justify-end">
        <Search />
      </div>
    </header>
  );
}

export default Header;

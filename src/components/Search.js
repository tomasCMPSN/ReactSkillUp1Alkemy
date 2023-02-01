import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();

    const keyword = e.currentTarget.keyword.value.trim();

    if (keyword.length === 0) {
      Swal.fire("Write something.");
    } else if (keyword.length < 2) {
      Swal.fire("Write more than 1 character.");
    } else {
      e.currentTarget.keyword.value = "";
      navigate(`/results?keyword=${keyword}`);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <label>
        <input
          className="border-2 w-36 md:w-52 rounded text-black py-2"
          type="text"
          name="keyword"
          placeholder="Search..."
        />
        <button className="border-2 rounded bg-black text-white py-2 w-24" type="submit">
          Search
        </button>
      </label>
    </form>
  );
}

export default Search;

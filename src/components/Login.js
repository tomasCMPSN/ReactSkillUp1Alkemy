import axios from "axios";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  let token = sessionStorage.getItem("token");

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;

    if (email === "" || password === "") {
      Swal.fire("Empty fields.");
      return;
    }

    if (email !== "" && !regexEmail.test(email)) {
      Swal.fire("Wrong email.");
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      Swal.fire("Wrong credentials.");
      return;
    }

    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        Swal.fire("You are correctly logged.");
        const tokenReceived = res.data.token;
        sessionStorage.setItem("token", tokenReceived);
        navigate("/list");
      });
  };

  return (
    <>
      {token && <Navigate to="/list" />}
      <div className="flex flex-col mx-auto mt-8 rounded shadow-inner py-8 px-8 bg-gray-100 text-center w-fit">
        <h2 className="text-2xl">Login Form</h2>
        <form onSubmit={submitHandler}>
          <label>
            <span>Email:</span>
            <br />
            <input
              className="border-2 rounded text-black"
              type="text"
              name="email"
            />
          </label>
          <br />
          <label>
            <span>Password:</span>
            <br />
            <input
              className="border-2 rounded text-black"
              type="password"
              name="password"
            />
          </label>
          <br />
          <button className="border-2 rounded mt-4 py-2 w-24 bg-black text-white" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;

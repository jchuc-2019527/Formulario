import React, { Children, useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Login.css";
import { url } from "../axiosConnect";
import Axios from "axios";
import Swal from "sweetalert2";
import { Outlet, useNavigate } from "react-router-dom";

const Login = () => {


  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });


  const handleLogin = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const loginUser = (e) => {
    e.preventDefault();
    Axios.post(url + "user/login", user)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          color: "white",
          background: "rgba(0,0,0,0.9)",
          title: res.data.message,
          timer: 3000,
          toast: true,
          showCancelButton: false,
          showConfirmButton: false,
        });
        localStorage.setItem("token", JSON.stringify(res.data.token));
        e.target.reset();
        navigate("/usuarios");
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          color: "white",
          background: "rgba(0,0,0,0.9)",
          title: err.response.data.message,
          timer: 3000,
          toast: true,
          showCancelButton: false,
          showConfirmButton: false,
        });
      });
  };

  return (
    <div>
      <NavBar />
      <div className="general">
        <div className="hola">
          <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <div className="user-box">
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleLogin}
                  required
                />
                <label>Username</label>
              </div>
              <div className="user-box">
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleLogin}
                  required
                />
                <label>Password</label>
              </div>
              <button className="ns">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

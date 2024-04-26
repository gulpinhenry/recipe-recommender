import React, { useState } from "react";
import {AiOutlineUser} from "react-icons/ai"
import { RiLockPasswordLine } from "react-icons/ri";
import "../PageLayout/LoginLayout.css";
import { Link, useNavigate } from "react-router-dom";

const LoginLayout = () => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState({});
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  const handleLogin = () => {
    fetch("/api/user/login", {
      method: "POST",
      credentials: "include", // Ensure cookies are included
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // If login was successful
          // alert(data.message);
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("username", data.data.username);
          window.location.href = "/"; // Redirect to home page or dashboard
        } else {
          // If login failed
          alert(`Login failed: ${data.error}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  return (
    <div className="container">
      <div className="container-form">
        <form onSubmit={handleSignUp}>
          {/* <form> */}
          {/* <h1>Login</h1> */}
          <p>To continue, please sign in.</p>
          <div className="inputBox">
            <AiOutlineUser className="mail" />
            <input
              type="text"
              value={username}
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="inputBox">
            <RiLockPasswordLine className="password" />
            <input
              type="password"
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="divBtn">
            <h2 className="orange_text"></h2>
            <button onClick={handleLogin} type="submit" className="loginBtn">
              LOGIN
            </button>
          </div>
        </form>

        <div className="dont">
          <p>
            Want to create a account?{" "}
            <Link to="/signup">
              <h2 className="orange_text">Sign up here</h2>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;

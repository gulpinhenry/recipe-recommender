import React, { useEffect, useState } from 'react'
import "../PageLayout/LoginLayout.css"
import {AiOutlineUser} from "react-icons/ai"
import {FiMail} from "react-icons/fi"
import {RiLockPasswordLine} from "react-icons/ri"
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {

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
  const handleCreateAccountSubmit = () => {
    fetch("/api/user/create", {
      method: "POST",
      credentials: "include", // Ensure cookies are included
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: newUsername, // Ensure this is defined
        email: email, // Ensure this is defined
        password: newPassword, // Ensure this is defined
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // If account creation was successful
          // alert(data.message);
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("username", data.data.username);
          window.location.href = "/";
        } else {
          // If account creation failed
          alert(`Account creation failed: ${data.error}`);
          setShowCreateAccount(false);
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
            <p>Please fill the input below to create a account.</p>

            <div className="inputBox">
                <AiOutlineUser className='fullName'/>
                <input
                     type="text"
                     value={newUsername}
                     placeholder='Username'
                     onChange={(e) => setNewUsername(e.target.value)}
                 />
            </div>

            <div className="inputBox">
                <FiMail className='mail'/>
                    <input
                     type="email"
                     value={email}
                     placeholder='Email'
                     onChange={(e) => setEmail(e.target.value)}
                 />
            </div>
            {error.email && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.email}</span>}

            <div className="inputBox">
                <RiLockPasswordLine className='password'/>
                <input
                     type="password"
                     value={newPassword}
                     placeholder='Password'
                     onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>

            <div className='divBtn'>
                <small className='FG'></small>
                <button className='loginBtn' onClick={handleCreateAccountSubmit} >SIGN UP</button>
            </div>

        </form>

        <div className='dont'>
            <p>Already have a account? <Link to="/"><h2 className='orange_text'>Sign in</h2></Link></p>
        </div>
    </div>
</div>
  )
}

export default SignUp
import React, { useState } from "react";
import './Login.scss';
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";


async function loginUser(credentials) {
    return fetch("https://backendnutech.up.railway.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

const Singin = () => {
  const navigate = useNavigate();

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await loginUser({
        username,
        password,
      });
      if ("accessToken" in response) {
        swal("Success", response.message, "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          localStorage.setItem("accessToken", response["accessToken"]);
          localStorage.setItem("user", JSON.stringify(response["user"]));
          window.location.href = "/dashboard";
        });
      } else {
        swal("Failed", response.message, "error");
      }
    };
  
  return (
    <>
    <div className="Auth-form-container">

<form className="Auth-form" onSubmit={handleSubmit}>
 <h1>Sign In</h1>
 <div className="sectionForm">
    <input type="text" className="username" placeholder="Username" onChange={(e) => setUserName(e.target.value)} required/>
    <input type="password" className="password" id="" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
 </div>
 <div className="submitButton">
  <button className="login">Submit</button>
  <div className="flexOR">
  <div className="line" /><span>OR</span><div className="line" />
  </div>
  
  <button className="register" onClick={()=>navigate("/register")}>Register</button>
 </div>
</form>
</div>
<div className="StyleBackground">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#067bc8" fill-opacity="1" d="M0,128L48,133.3C96,139,192,149,288,170.7C384,192,480,224,576,202.7C672,181,768,107,864,96C960,85,1056,139,1152,144C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
</div>

</>
    
  )
}

export default Singin
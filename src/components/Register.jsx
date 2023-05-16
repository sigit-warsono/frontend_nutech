import React, {useState} from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import withReactContent from 'sweetalert2-react-content';

const Register = () => {
  const navigate = useNavigate();
  const Swal = require('sweetalert2');
  const MySwal = withReactContent(Swal);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Submit = async (e) => {

    e.preventDefault();
    try {
      await axios.post("https://backendnutech.up.railway.app/register", {
        firstName : firstName,
        lastName : lastName,
        username: username,
        password: password
      }).then((response) => {

        MySwal.fire({
          html: <p><strong style={{ fontSize: "20px" }}>{response.data.messageTitle}</strong><br />{response.data.message}</p>,
          icon: 'success',
          confirmButtonText: '<div style="width:60px; font-weight: 800">OK</div',
          confirmButtonColor: '#0099ff',
          timer: 2000,

        }).then((value) => {
          navigate("/");
        });

      });

    } catch (err) {
      if (err.response) {

        MySwal.fire({
          html: <p><strong style={{ fontSize: "20px" }}>{err.response.data.messageTitle}</strong><br />{err.response.data.message}</p>,
          icon: 'error',
          confirmButtonText: '<div style="width:60px; font-weight: 800">OK</div',
          confirmButtonColor: '#0099ff',

        })

      }
    }


  };
  return (
    <>
      <div className="Register-form-container">
        <form className="Auth-form" onSubmit={Submit}>
          <h1>Register</h1>
          <div className="sectionForm">
            <input type="text" className="username" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
            <input type="text" className="username" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
            <input type="text" className="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            <input
              type="password"
              className="password"
              id=""
              placeholder="Password"
              value={password} onChange={(e) => setPassword(e.target.value)} required
            />
          </div>
          <div className="submitButton">
            <button className="login">Submit</button>
            <div className="flexOR">
              <div className="line" />
              <span>OR</span>
              <div className="line" />
            </div>

            <button className="register" onClick={() => navigate("/")}>
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="StyleBackground">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0273bd"
            fill-opacity="1"
            d="M0,128L48,133.3C96,139,192,149,288,170.7C384,192,480,224,576,202.7C672,181,768,107,864,96C960,85,1056,139,1152,144C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </>
  );
};

export default Register;
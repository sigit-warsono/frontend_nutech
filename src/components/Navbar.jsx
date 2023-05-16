import React from 'react';
import "./Navbar.scss";
import { BiLogOutCircle } from "react-icons/bi";

const Navbar = ({handleLogout}) => {
  return (
    <div className="navbar">
      <span className='title'>React js Developer</span>
      <div className="logout" onClick={handleLogout} style={{ cursor: "pointer"}}>
        <span>Logout</span>
        <span><BiLogOutCircle /></span>
      </div>
    </div>
  )
}

export default Navbar
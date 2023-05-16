import Navbar from "./Navbar";
import ProductList from "./ProductList";
import React from "react";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <>
      
      <Navbar handleLogout={handleLogout}/>
      <ProductList />
    </>
  );
};

export default Dashboard;

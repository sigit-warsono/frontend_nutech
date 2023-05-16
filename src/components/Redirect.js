import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductList from "./ProductList";

const Redirect = () => {
  const navigate = useNavigate();

  return (
    <div>
      
      <ProductList />
    </div>
  );
};

export default Redirect;

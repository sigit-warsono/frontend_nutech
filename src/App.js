import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import Singin from "./components/Singin";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";

function App() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Singin />} />
          <Route path="/login" element={<Singin />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="add" element={<AddProduct />} />
        <Route path="edit/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

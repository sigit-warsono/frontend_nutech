import React, { useState, useEffect, Fragment } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./style.css";
import "./ProductList.scss";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import NumberFormat from "react-number-format";
import CurrencyFormat from 'react-currency-format';
import { BiAddToQueue, BiSearch } from "react-icons/bi";
import ModalAdd from "./Modal/ModalAdd";
import ModalDelete from "./Modal/ModalDelete";
import ModalUpdate from "./Modal/ModalUpdate";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");
  const [currentProduct, setCurrentProduct] = useState();
  const [editing, setEditing] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [popUpAdd, setPopUpAdd] = useState(false);
  const [popUpDelete, setPopUpDelete] = useState(false);
  const [popUpUpdate, setPopUpUpdate] = useState(false);
  const [filter , setFilter] = useState("DESC")

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  useEffect(() => {
    getProducts();
  }, [page, keyword, filter]);

  const getProducts = async () => {
    const response = await axios.get(
      `https://backendnutech.up.railway.app/products_list?search_query=${keyword}&page=${page}&limit=${limit}&filter=${filter}`
    );
    setProducts(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  const editProduct = (product) => {
    setShow(true);
    setEditing(true);
    setCurrentProduct({
      id: product.id,
    });
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`https://backendnutech.up.railway.app/products/${productId}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const delProduct = (product) => {
    setPopUpDelete(true);
    setCurrentProduct({
      id: product.id
    });
  };

  const HandUpdate = (product) => {
    setPopUpUpdate(true);
    setCurrentProduct({
      id: product.id
    });
  };

  const HandleFilter_A_Z = (e) => {
   e.preventDefault();
    getProducts();
    setFilter("ASC");

  }

  const HandleFilterFeatures = (e) => {
    e.preventDefault();
     getProducts();
     setFilter("DESC");
 
   }

  const HandleFilter_Z_A = (e) => {
    e.preventDefault();
    getProducts();
    setFilter("DESC");

  }

  const HandlePriceHighLow = (e)=>{
    e.preventDefault();
    getProducts();
    setFilter("HighLow");
  }

  const HandlePriceLowHigh=(e)=>{
    e.preventDefault();
    getProducts();
    setFilter("LowHigh");
  }

  console.log(filter)

  return (
    <div className="ProductList" style={{ overflowX: "hidden"}}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0099ff"
          fill-opacity="1"
          d="M0,224L48,224C96,224,192,224,288,229.3C384,235,480,245,576,224C672,203,768,149,864,149.3C960,149,1056,203,1152,202.7C1248,203,1344,149,1392,122.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
      <h1 style={{ marginTop: "-16rem", marginLeft: "4rem", color: "white" }}>
        Hello welcome, Sigit
      </h1>
      {popUpAdd &&(
        <ModalAdd setPopUpAdd={setPopUpAdd} popUpAdd={popUpAdd} setHandleClose1={handleClose1}
        getProducts={getProducts}/>
      )}

      {popUpDelete &&(
        <ModalDelete setPopUpDelete={setPopUpDelete} popUpDelete={popUpDelete} setHandleClose1={handleClose1}
        getProducts={getProducts} currentProduct={currentProduct}/>
      )}

      {popUpUpdate &&(
        <ModalUpdate setPopUpUpdate={setPopUpUpdate} popUpUpdate={popUpUpdate} getProducts={getProducts} currentProduct={currentProduct}/>
      )}
      <div className="boxSearch">
        <div className="boxFilter">
          <button className="addData" onClick={()=>setPopUpAdd(!popUpAdd)}>
            <BiAddToQueue />
            <span>Add Data</span>
          </button>
          <div className="formInputFilter">
            <div className="formSearch">
            <form onSubmit={searchData}>
            <button className="buttonIconSearch">Search</button>
              <input
                type="text"
                placeholder="Search Product"
                className="inputSearch"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="buttonSearch">
                <BiSearch />
              </button>
            </form>

              
            </div>
            <div className="formFilter">
              <button>Filter</button>
              <select name="" id="" className="inputFilter">
                <option value="test" onClick={HandleFilterFeatures}>Featured</option>
                <option value="test" onClick={HandleFilter_A_Z}>Alphabetically A-Z</option>
                <option value="test" onClick={HandleFilter_Z_A}>Alphabetically Z-A</option>
                <option value="test" onClick={HandlePriceHighLow}>Price sale, high to low</option>
                <option value="test" onClick={HandlePriceLowHigh}>Price sale, low to high</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="listProduct">
        {products.map((product) => (
          <div className="viewCard">
            <img src={product.url} alt="" className="image" />
            <span className="titleProduct">{product.name}</span>
            <div className="descrip">
              <div className="price">
                <div className="price_selling">
                  <span>Rp. <CurrencyFormat displayType={'text'} thousandSeparator={','} value={product.harga_jual}/></span>
                  <span>(Harga beli)</span>
                </div>
                <div className="price_selling">
                <span>Rp. <CurrencyFormat displayType={'text'} thousandSeparator={','} value={product.harga_beli}/></span>

                  <span>(Harga jual)</span>
                </div>
              </div>
              <div className="stock">
                <span>Stock</span>
                <span>:</span>
                <span>{product.stok}</span>
              </div>
            </div>
            <div className="buttonAction">
              <button className="update" onClick={()=>HandUpdate(product)}>Update</button>
              <button className="delete" onClick={()=>delProduct(product)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {products.length > 0 &&(
      <nav
        className="pagination is-centered"
        key={rows}
        role="navigation"
        aria-label="Pagination"
      >
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={changePage}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </nav>
      )}
    </div>
  );
};

export default ProductList;

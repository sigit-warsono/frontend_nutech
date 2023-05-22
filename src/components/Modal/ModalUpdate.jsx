import React, { useState, useEffect } from "react";
import "./style.scss";
import { BiX } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import NumberFormat from "react-number-format";
import withReactContent from 'sweetalert2-react-content';

const ModalUpdate = (props) => {
    const Swal = require('sweetalert2');
    const MySwal = withReactContent(Swal);
  const [name, setName] = useState("");
  const [hargabeli, setHargabeli] = useState("");
  const [hargajual, setHaragajual] = useState("");
  const [stok, setStok] = useState("");
  const [file, setFile] = useState("");
  const [uniqueName, setUniqueName] = useState("");
  const [invalidImage, setInvalidImage] = useState("");
  const [product, setProduct] = useState(props.currentProduct);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    setProduct(props.currentProduct);
    getProductById();
  }, [props]);

  const getProductById = async () => {
    const response = await axios.get(
      `https://backendnutech.up.railway.app/products/${product.id}`
    );
    setName(response.data.name);
    setHargabeli(response.data.harga_beli);
    setHaragajual(response.data.harga_jual);
    setStok(response.data.stok);
    setFile(response.data.image);
    setPreview(response.data.url);
  };


  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    
   
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", name);
    formData.append("harga_beli", hargabeli);
    formData.append("harga_jual", hargajual);
    formData.append("stok", stok);
  
    try {
      await axios.patch(
        `https://backendnutech.up.railway.app/products/${product.id}`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      ).then((response) => {
        MySwal.fire({
            html: <p><strong style={{ fontSize: "20px" }}>Update product success</strong><br /></p>,
            icon: 'success',
            showConfirmButton: false,
            confirmButtonColor: '#0099ff',
            timer: 1500
  
          })
          props.getProducts();
          props.setPopUpUpdate(!props.popUpUpdate);
      });
      
      
    } catch (error) {
      console.log(error);
        setInvalidImage(error.response.data.msg);
        setUniqueName(error.message);
    }
   
  };

  return (
    <div
    className="modalSigit"
    onClick={() => props.setPopUpUpdate(!props.popUpUpdate)}
  >
    <div className="popSigit" onClick={(e) => e.stopPropagation()}>
      <div className="topHead">
        <h1 className="update">Update Product</h1>
        <span onClick={() => props.setPopUpUpdate(!props.popUpUpdate)}>
          <BiX />
        </span>
      </div>
      <form onSubmit={updateProduct}>
      <div className="sectionBody">
          <div className="flexForm">
            <div className="formInput">
              <span>Name Product</span>
              <input
                type="text"
                name=""
                id=""
                className="form"
                value={name}
                onChange={(e) => setName(e.target.value)} required
              />
              {uniqueName=='Image_Unique' ?
              <span style={{ color: "red", fontSize: "0.9rem"}}>Name product already exist</span>
              : ""
              }
             
            </div>
            <div className="formInput">
              <span>Stok</span>
              <NumberFormat
                type="text"
                name=""
                id=""
                className="form"
                value={stok}
                thousandSeparator={true}
                onChange={(e) => setStok(e.target.value)} required
              />
            </div>
          </div>

          <div className="flexForm">
            <div className="formInput">
              <span>Harga Jual</span>
              <NumberFormat
                type="text"
                name=""
                id=""
                className="form"
                value={hargajual}
                thousandSeparator={true}
                prefix={"Rp."}
                onChange={(e) => setHaragajual(e.target.value)} required
              />
            </div>
            <div className="formInput">
              <span>Harga Beli</span>
              <NumberFormat
                type="text"
                name=""
                id=""
                className="form"
                value={hargabeli}
                thousandSeparator={true}
                onChange={(e) => setHargabeli(e.target.value)}
                prefix={"Rp."} required
              />
            </div>
          </div>

          <div className="formFile">
            <input
              type="file"
              name=""
              id=""
              className="formUploadFile"
              onChange={loadImage}
            />
            <div className="flexFile">
              <FaUpload className="imageiconUplaod" />
              <span style={{ fontSize: "0.8rem" }}>Upload Image</span>
            </div>
            {preview ? (
              <figure className="image is-128x128">
                <img
                  src={preview}
                  className="ImageEdit"
                  alt="Preview Image"
                />
              </figure>
            ) : (
              ""
            )}

            {invalidImage=="Invalid_Images" ?
            <span style={{ color: "red", fontSize: "0.9rem"}}>Image Allowed png and jpg. </span>
            : invalidImage=="Max_image" ? 
            <span style={{ color: "red", fontSize: "0.9rem"}}>Size Image maximum 100 Kb</span>
            : null
          }
         
          </div>
          <div className="flexButtonAction">
            <button>Submit</button>
          </div>
      </div>
      </form>
    </div>
  </div>
);
};

export default ModalUpdate

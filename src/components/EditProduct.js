import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import { Form, Button } from "react-bootstrap";

const EditProduct = (props) => {
  const [name, setName] = useState("");
  const [hargabeli, setHargabeli] = useState("");
  const [hargajual, setHaragajual] = useState("");
  const [stok, setStok] = useState("");
  const [file, setFile] = useState("");
  const [product, setProduct] = useState(props.currentProduct);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

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
        `https://bnutecha.herokuapp.com/products/${product.id}`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      
      props.setHandleClose(false);
      props.getProducts();
      console.log("form submitted ✅");
    } catch (error) {
      console.log(error);
    }
   
  };

  return (
    <Form onSubmit={updateProduct}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Nama Product</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Product"
        />
         <Form.Label>Harga jual</Form.Label>
          <NumberFormat
                class="form-control"
                thousandSeparator={true}
                value={hargajual}
                onChange={(e) => setHaragajual(e.target.value)}
                placeholder="Harga Jual"
                prefix={"Rp."}
              />
         <Form.Label>Harga beli</Form.Label>
         <NumberFormat
                class="form-control"
                thousandSeparator={true}
                value={hargabeli}
                onChange={(e) => setHargabeli(e.target.value)}
                placeholder="Harga Beli"
                prefix={"Rp."}
        />
        
          <Form.Label>Stok</Form.Label>
          <NumberFormat
                class="form-control"
                thousandSeparator={true}
                value={stok}
                onChange={(e) => setStok(e.target.value)}
                placeholder="Stok"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" onChange={loadImage} />
      </Form.Group>
      {preview ? (
        <figure className="image is-128x128">
          <img src={preview} className="ImageEdit" alt="Preview Image" />
        </figure>
      ) : (
        ""
      )}
      <Button variant="success" type="submit" block>
        Update
      </Button>
    </Form>
  );
};

export default EditProduct;

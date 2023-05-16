import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import { Form, Button } from "react-bootstrap";

const AddProduct = (props) => {
  const [name, setName] = useState("");
  const [hargabeli, setHargabeli] = useState("");
  const [hargajual, setHaragajual] = useState("");
  const [stok, setStok] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", name);
    formData.append("harga_beli", hargabeli);
    formData.append("harga_jual", hargajual);
    formData.append("stok", stok);
    console.log(file);
    try {
      await axios.post("https://backendnutech.up.railway.app/products", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      props.setHandleClose1(false);
      props.getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={saveProduct}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nama Product</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Product"
            />
            <Form.Label>Harga jual</Form.Label>
              <NumberFormat
                    class="form-control"
                    thousandSeparator={true}
                    onChange={(e) => setHaragajual(e.target.value)}
                    placeholder="Harga Jual"
                    prefix={"Rp."}
                  />
            <Form.Label>Harga beli</Form.Label>
            <NumberFormat
                    class="form-control"
                    thousandSeparator={true}
                    onChange={(e) => setHargabeli(e.target.value)}
                    placeholder="Harga Beli"
                    prefix={"Rp."}
            />
            
              <Form.Label>Stok</Form.Label>
              <NumberFormat
                    class="form-control"
                    thousandSeparator={true}
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
            Add data
          </Button>
        </Form>
  );
};

export default AddProduct;

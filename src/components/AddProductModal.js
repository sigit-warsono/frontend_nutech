import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AddProductModal = () => {
  const [title, setTitle] = useState("");
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
    formData.append("title", title);
    try {
      await axios.post("https://backendnutech.up.railway.app/products", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={saveProduct}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>name product</Form.Label>
        <Form.Control
          type="text"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Product Name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" className="file-input" onChange={loadImage} />
      </Form.Group>
      {preview ? (
        <figure className="image is-128x128">
          <img src={preview} className="ImageEdit" alt="Preview Image" />
        </figure>
      ) : (
        ""
      )}
      <Button variant="success" type="submit" block>
        Add Product
      </Button>
    </Form>
  );
};

export default AddProductModal;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { Form, Button } from "react-bootstrap";

const EditProductModal = (props) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [product, setProduct] = useState(props.currentProduct);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    setProduct(props.currentProduct);
    getProductById();
  }, [props]);

  const getProductById = async () => {
    const response = await axios.get(
      `http://localhost:5000/products/${product.id}`
    );
    setTitle(response.data.name);
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
    alert("sukses selalu");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    try {
      await axios.patch(
        `http://localhost:5000/products/${product.id}`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );

      console.log("form submitted ✅");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={updateProduct}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="hidden" name="id" value={product.id} />
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
        Add Product
      </Button>
    </Form>
  );
};

export default EditProductModal;

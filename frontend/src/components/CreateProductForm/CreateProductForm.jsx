import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { createProduct } from "../../features/products/productsSlice";

function CreateProduct() {
    
    const dispatch = useDispatch();

    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        stock: 0,
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();


    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("stock", product.stock);

    if (image) {
      formData.append("image", image);
    }

    dispatch(createProduct(formData))
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        name="name"
        type="text"
        placeholder="Product name"
        value={product.name}
        onChange={handleChange}
      />

      <input
      name="price"
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
      />

      <input
        name="description"
        type="text"
        placeholder="description"
        value={product.description}
        onChange={handleChange}
      />

      <input
        name="stock"
        type="number"
        placeholder="stock"
        value={product.stock}
        onChange={handleChange}
      />

      <input
        name="image"
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button type="submit">Create product</button>

    </form>
  );
}

export default CreateProduct;
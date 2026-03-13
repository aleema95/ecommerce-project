import {
  fetchProducts,
  fetchProduct,
  addProduct
} from "./product.service.js";

export const getProducts = async (req, res) => {
  const products = await fetchProducts();
  res.json(products);
};

export const getProduct = async (req, res) => {
  const product = await fetchProduct(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
};

export const createProduct = async (req, res) => {
  const product = await addProduct(req.body);
  res.status(201).json(product);
};
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
    try {

    let imageUrl = null;
    
    console.log(req.file)

    if (req.file) {

      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
      );

      imageUrl = result.secure_url;

    }

    const productData = {
      ...req.body,
      image_url: imageUrl
    };

    const product = await addProduct(productData);

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};
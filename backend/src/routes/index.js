import express from "express";
import productRoutes from "../modules/products/product.routes.js";

const router = express.Router();

router.use("/products", productRoutes);

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ecommerce-api"
  });
});

export default router;
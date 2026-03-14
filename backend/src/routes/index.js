import express from "express";
import productRoutes from "../modules/products/product.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import cartRoutes from "../modules/cart/cart.routes.js";

const router = express.Router();

router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/cart", cartRoutes);

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ecommerce-api"
  });
});

export default router;
import express from "express";
import productRoutes from "../modules/products/product.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import cartRoutes from "../modules/cart/cart.routes.js";
import orderRoutes from "../modules/orders/order.routes.js";
import paymentRoutes from "../modules/payments/payment.routes.js"


const router = express.Router();

router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/payments", paymentRoutes);

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ecommerce-api"
  });
});

export default router;
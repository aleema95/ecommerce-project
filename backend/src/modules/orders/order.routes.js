import express from "express";
import { checkoutOrder } from "./order.controller.js";
import { authenticate } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/checkout", authenticate, checkoutOrder);

export default router;
import express from "express";
import {
  getUserCart,
  addItem,
  removeItem,
  clearUserCart
} from "./cart.controller.js";

import { authenticate } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getUserCart);

router.post("/add", authenticate, addItem);

router.delete("/remove", authenticate, removeItem);

router.delete("/clear", authenticate, clearUserCart);

export default router;
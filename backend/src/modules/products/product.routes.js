import express from "express";
import {
  getProducts,
  getProduct,
  createProduct
} from "./product.controller.js";
import upload from "../../middleware/upload.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/",upload.single("image"), createProduct);

export default router;
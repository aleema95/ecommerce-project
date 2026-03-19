import express from "express";
import { stripeWebhook } from "./webhook.controller.js";
import app from "../../app.js";

const router = express.Router();

router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

export default router;
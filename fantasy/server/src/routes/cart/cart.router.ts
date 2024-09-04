import { Router } from "express";
import { getCart, addToCart, putCart } from "./cart.controller";

const router = Router();
router.get("/", getCart);
router.post("/", addToCart);
router.put("/", putCart);

export default router;

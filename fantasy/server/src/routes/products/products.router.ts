import { Router } from "express";
import { getProducts, createProduct, putProduct } from "./products.controller";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", putProduct);

export default router;

import { Router } from "express";
import { getProduct, getProducts } from "./products.controller";

const router = Router();

router.get("/:name", getProduct);
router.get("/", getProducts);

export default router;

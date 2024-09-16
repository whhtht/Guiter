import { Router } from "express";
import { getProduct } from "./products.controller";

const router = Router();

router.get("/:name", getProduct);

export default router;

import { Router } from "express";
import { getProduct, queryProduct } from "./products.controller";

const router = Router();

router.get("/item/:name", getProduct);
router.get("/query", queryProduct);

export default router;

import { Router } from "express";
import {
  searchProducts,
  getProduct,
  queryProduct,
} from "./products.controller";

const router = Router();

router.get("/search", searchProducts);
router.get("/item/:name", getProduct);
router.get("/query", queryProduct);

export default router;

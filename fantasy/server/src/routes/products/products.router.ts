import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
} from "./products.controller";

const router = Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);

export default router;

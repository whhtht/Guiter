import { Router } from "express";
import { getProduct, getSpecification, addProduct } from "./seeder.controller";

const router = Router();

router.get("/product", getProduct);
router.get("/specification", getSpecification);
router.post("/product", addProduct);

export default router;

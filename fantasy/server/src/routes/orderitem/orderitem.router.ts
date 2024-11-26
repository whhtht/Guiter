import { Router } from "express";
import { getOrderDetail } from "./orderitem.controller";

const router = Router();

router.post("/detail", getOrderDetail);

export default router;

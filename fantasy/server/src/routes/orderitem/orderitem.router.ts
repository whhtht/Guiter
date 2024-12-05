import { Router } from "express";
import { getOrderDetail } from "./orderitem.controller";

const router = Router();

router.get("/:orderId", getOrderDetail);

export default router;

import { Router } from "express";
import { createPaymentIntent } from "./payment.controller";

const router = Router();

router.post("/", createPaymentIntent);

export default router;

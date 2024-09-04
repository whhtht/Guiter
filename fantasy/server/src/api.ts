import { Router } from "express";

import healthCheck from "routes/healthcheck/healthCheck.router";
import authRouter from "routes/auth/auth.router";
import productRouter from "routes/products/products.router";
import cardRouter from "routes/cart/cart.router";

const router: Router = Router();
router.use(healthCheck);
router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/cart", cardRouter);

export default router;

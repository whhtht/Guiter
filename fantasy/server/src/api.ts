import { Router } from "express";

import healthCheck from "routes/healthcheck/healthCheck.router";
import authRouter from "routes/auth/auth.router";
import productRouter from "routes/products/products.router";

const router: Router = Router();
router.use(healthCheck);
router.use("/auth", authRouter);
router.use("/products", productRouter);

export default router;

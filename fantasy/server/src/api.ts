import { Router } from "express";

import healthCheck from "routes/healthcheck/healthCheck.router";
import authRouter from "routes/auth/auth.router";
import productRouter from "routes/products/products.router";
import cardRouter from "routes/cart/cart.router";
import cartItemRouter from "routes/cartitem/cartitem.router";
import seedRouter from "routes/seeder/seeder.router";
import paymentRouter from "routes/payment/payment.router";

const router: Router = Router();
router.use(healthCheck);
router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/cart", cardRouter);
router.use("/cartitem", cartItemRouter);
router.use("/seed", seedRouter);
router.use("/payment", paymentRouter);

export default router;

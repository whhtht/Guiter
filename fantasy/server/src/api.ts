import { Router } from "express";

import healthCheck from "routes/healthcheck/healthCheck.router";
import authRouter from "routes/auth/auth.router";
import productRouter from "routes/products/products.router";
import cardRouter from "routes/cart/cart.router";
import cartItemRouter from "routes/cartitem/cartitem.router";
import paymentRouter from "routes/payment/payment.router";
import addressRouter from "routes/address/address.router";
import orderRouter from "routes/order/order.router";
import orderItemRouter from "routes/orderitem/orderitem.router";

const router: Router = Router();
router.use(healthCheck);
router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/cart", cardRouter);
router.use("/cartitem", cartItemRouter);
router.use("/order", orderRouter);
router.use("/orderitem", orderItemRouter);
router.use("/payment", paymentRouter);
router.use("/address", addressRouter);

export default router;

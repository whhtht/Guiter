import { Router } from "express";
import { userPaymentIntent, guestPaymentIntent } from "./payment.controller";
import currentUser from "middlewares/auth.middleware";

const router = Router();

router.post("/user", currentUser, userPaymentIntent);
router.post("/guest", guestPaymentIntent);

export default router;

import { Router } from "express";
import { getCartId } from "./cart.controller";

import currentUser from "middlewares/auth.middleware";

const router = Router();

router.get("/", currentUser, getCartId);
// router.post("/", postCart);
// router.put("/", putCart);
// router.delete("/:productName", deleteCart);

export default router;

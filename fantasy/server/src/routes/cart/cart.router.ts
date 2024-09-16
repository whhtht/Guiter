import { Router } from "express";
import { postCart, putCart, deleteCart, getCartId } from "./cart.controller";

import currentUser from "middlewares/auth.middleware";

const router = Router();

router.post("/", postCart);
router.put("/", putCart);
router.delete("/:productName", deleteCart);
router.get("/", currentUser, getCartId);

export default router;

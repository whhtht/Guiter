import { Router } from "express";
import {
  getCartItems,
  postCartItem,
  postLocalItem,
  putCartItem,
  deleteCartItem,
  cartStatus,
} from "./cartitem.controller";

import currentUser from "middlewares/auth.middleware";

const router = Router();
router.get("/", currentUser, getCartItems);
router.post("/", currentUser, postCartItem);
router.post("/local", currentUser, postLocalItem);
router.put("/", currentUser, putCartItem);
router.put("/status", currentUser, cartStatus);
router.delete("/:productName", deleteCartItem);

export default router;

import { Router } from "express";
import {
  getCartItems,
  postCartItem,
  putCartItem,
  deleteCartItem,
  cartStatus,
} from "./cartitem.controller";

import currentUser from "middlewares/auth.middleware";

const router = Router();
router.get("/", currentUser, getCartItems);
router.post("/", currentUser, postCartItem);
router.put("/", currentUser, putCartItem);
router.delete("/:productName", deleteCartItem);
router.put("/status", currentUser, cartStatus);

export default router;

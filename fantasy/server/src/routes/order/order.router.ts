import { Router } from "express";
import {
  postUserDeliver,
  postGuestDeliver,
  postUserPickup,
  postGuestPickup,
  getUserOrders,
} from "./order.controller";

import currentUser from "middlewares/auth.middleware";

const router = Router();
router.post("/deliver", currentUser, postUserDeliver);
router.post("/guestdeliver", postGuestDeliver);
router.post("/pickup", currentUser, postUserPickup);
router.post("/guestpickup", postGuestPickup);
router.get("/userorders", currentUser, getUserOrders);

export default router;

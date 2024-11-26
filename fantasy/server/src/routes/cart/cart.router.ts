import { Router } from "express";
import { getCartId } from "./cart.controller";

import currentUser from "middlewares/auth.middleware";

const router = Router();

router.get("/", currentUser, getCartId);

export default router;

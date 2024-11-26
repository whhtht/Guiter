import { Router } from "express";
import { getAddress, postAddress, changeAddress } from "./address.controller";

import currentUser from "middlewares/auth.middleware";

const router = Router();
router.get("/getAddress", currentUser, getAddress);
router.post("/postAddress", currentUser, postAddress);
router.post("/changeAddress", currentUser, changeAddress);

export default router;

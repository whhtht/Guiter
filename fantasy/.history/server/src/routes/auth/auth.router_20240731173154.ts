import { Router } from "express";
import { signUpHandler, signInHandler } from "./auth.controller";

const router = Router();

router.post("/signup", signUpHandler);
router.post("/signin", signInHandler);

export default router;

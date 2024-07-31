import { Router } from "express";
import {
  signUpHandler,
  signInHandler,
  checkEmailHandler,
  confirmResetPasswordHandler,
} from "./auth.controller";

const router = Router();

router.post("/signUp", signUpHandler);
router.post("/signIn", signInHandler);
router.post("/checkEmail", checkEmailHandler);
router.post("/resetPassword", confirmResetPasswordHandler);

export default router;

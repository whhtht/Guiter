import { Router } from "express";
import {
  signUpHandler,
  signInHandler,
  forgetPasswordHandler,
  resetPasswordCodeHandler,
  resetPasswordHandler,
} from "./auth.controller";

const router = Router();

router.post("/signUp", signUpHandler);
router.post("/signIn", signInHandler);
router.post("/forgetPassword", forgetPasswordHandler);
router.post("/forgetPassword/resetPasswordCode", resetPasswordCodeHandler);
router.post("/forgetPassword/resetPassword", resetPasswordHandler);

export default router;

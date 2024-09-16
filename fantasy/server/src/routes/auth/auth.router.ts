import { Router } from "express";
import {
  signUpHandler,
  signInHandler,
  forgetPasswordHandler,
  resetPasswordCodeHandler,
  resetPasswordHandler,
  refreshTokenHandler,
  getCurrentUser,
} from "./auth.controller";

import auth from "middlewares/auth.middleware";

const router = Router();

router.post("/signUp", signUpHandler);
router.post("/signIn", signInHandler);
router.post("/forgetPassword", forgetPasswordHandler);
router.post("/forgetPassword/resetPasswordCode", resetPasswordCodeHandler);
router.post("/forgetPassword/resetPassword", resetPasswordHandler);
router.post("/refreshToken", refreshTokenHandler);
router.get("/me", auth, getCurrentUser);

export default router;

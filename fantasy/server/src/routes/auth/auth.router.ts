import { Router } from "express";
import {
  checkUserHandler,
  signUpHandler,
  verifySignUpCodeHandler,
  resendSignUpCodeHandler,
  signInHandler,
  resetCodeHandler,
  verifyResetCodeHandler,
  resetPasswordHandler,
  refreshTokenHandler,
  getCurrentUser,
  ThreePartyLoginHandler,
  magicLinkHandler,
  verifyMagicLinkHandler,
} from "./auth.controller";

import auth from "middlewares/auth.middleware";

const router = Router();

router.post("/checkUser", checkUserHandler);
router.post("/signUp", signUpHandler);
router.post("/verifySignUpCode", verifySignUpCodeHandler);
router.post("/resendSignUpCode", resendSignUpCodeHandler);
router.post("/signIn", signInHandler);
router.post("/resetCode", resetCodeHandler);
router.post("/verifyResetCode", verifyResetCodeHandler);
router.post("/resetPassword", resetPasswordHandler);
router.post("/refreshToken", refreshTokenHandler);
router.post("/ThreePartyLogin", ThreePartyLoginHandler);
router.post("/magicLink", magicLinkHandler);
router.get("/verifyMagicLink", verifyMagicLinkHandler);
router.get("/me", auth, getCurrentUser);

export default router;

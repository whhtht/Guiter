import { Request, Response } from "express";
import {
  signIn,
  signUp,
  checkUserEmail,
  resetPassword,
  confirmResetPassword,
} from "utils/awsCognito";

import Account from "./auth.model";

// Sign up handler
export const signUpHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("Received signup request:", email, password);

  try {
    const result = await signUp(email, password);
    Account.create({
      email,
      password,
      sub: result.UserSub,
      requestId: result.$metadata.requestId,
    });
    res.status(200).json({
      message: "Signup successful",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Sign in handler
export const signInHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("Received signin request:", email, password);

  try {
    const result = await signIn(email, password);
    const { IdToken, AccessToken, RefreshToken } = result.AuthenticationResult;
    res.status(200).json({
      idToken: IdToken,
      accessToken: AccessToken,
      refreshToken: RefreshToken,
      message: "Signin successful",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Check email handler
export const checkEmailHandler = async (req: Request, res: Response) => {
  const email = req.body.email;
  console.log("Received check email request:", email);

  try {
    const exists = await checkUserEmail(email);
    if (!exists) {
      res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User exists." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Reset password handler
export const resetPasswordHandler = async (req: Request, res: Response) => {
  const { email } = req.body.email;
  console.log("Received reset password request:", email);

  try {
    const result = await resetPassword(email);
    res.status(200).json({ message: "Password reset successful.", result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Confirm reset password handler
export const confirmResetPasswordHandler = async (
  req: Request,
  res: Response
) => {
  const { email, code, newPassword } = req.body;
  console.log(
    "Received confirm reset password request:",
    email,
    code,
    newPassword
  );

  try {
    const result = await confirmResetPassword(email, code, newPassword);
    res.status(200).json({ message: "Password reset confirmed.", result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

import { Request, Response } from "express";
import {
  signIn,
  signUp,
  forgetPassword,
  resetPasswordCode,
  resetPassword,
  refreshTokens,
} from "utils/awsCognito";

import User from "./auth.model";

// 注册处理程序
export const signUpHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // 调用AWS Cognito注册用户
    const result = await signUp(email, password);
    User.create({
      email,
      password,
      sub: result.UserSub,
    });
    res.status(200).json({
      message: "Sign up successful",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 登录处理程序
export const signInHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await signIn(email, password);
    const { IdToken, AccessToken, RefreshToken } = result.AuthenticationResult;
    res.status(200).json({
      idToken: IdToken,
      accessToken: AccessToken,
      refreshToken: RefreshToken,
      message: "Sign in successful",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 忘记密码处理程序
export const forgetPasswordHandler = async (req: Request, res: Response) => {
  const email = req.body.email;

  try {
    const exists = await forgetPassword(email);
    if (!exists) {
      res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User exists." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 重置密码代码处理程序
export const resetPasswordCodeHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const result = await resetPasswordCode(email);
    res.status(200).json({ message: "Password reset code sent.", result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 重置密码处理程序
export const resetPasswordHandler = async (req: Request, res: Response) => {
  const { email, code, newPassword } = req.body;

  try {
    const result = await resetPassword(email, code, newPassword);
    console.log("resetPassword result:", result);
    if (result["$metadata"].httpStatusCode === 200) {
      const newRequestId = result["$metadata"].requestId;
      await User.update(
        { password: newPassword, requestId: newRequestId },
        { where: { email } }
      );
      res.status(200).json({ message: "Password has been reset.", result });
    } else {
      res.status(404).json({ message: "Invalid reset code or other error." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 刷新令牌处理程序
export const refreshTokenHandler = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    const { accessToken, idToken } = await refreshTokens(refreshToken);
    res.status(200).json({
      accessToken,
      idToken,
      message: "Token refreshed successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 获取当前用户
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      userId: res.locals.userId,
      message: "Current user fetched successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

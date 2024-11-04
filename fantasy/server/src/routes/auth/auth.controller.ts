import { Request, Response } from "express";
import {
  signIn,
  signUp,
  verifySignUpCode,
  resendSignUpCode,
  sendResetCode,
  resetPassword,
  refreshTokens,
  ThreePartyToken,
  deleteUser,
  initiateAuth,
  respondToAuthChallenge,
  magicLink,
} from "utils/awsCognito";

import crypto from "crypto";

import NodeCache from "node-cache";

import User from "./auth.model";

// 初始化 NodeCache 实例，单位为秒
const cache = new NodeCache({ stdTTL: 300 }); // 设置默认过期时间为5分钟

// 生成随机验证码
function generateMagicToken() {
  return crypto.randomBytes(20).toString("hex");
}

// 解码 JWT获取sub
function decodeJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = Buffer.from(base64, "base64").toString("utf8");
    return JSON.parse(jsonPayload);
  } catch (error) {
    throw new Error("Cannot decode ID Token");
  }
}

// 检查用户
export const checkUserHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      res.status(200).json({ exists: true, message: "User exists." });
    } else {
      res.status(200).json({ exists: false, message: "User not found." });
    }
  } catch (error) {
    res.status(400).json({ message: "Check user failed." });
  }
};

// 注册
export const signUpHandler = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    // 调用AWS Cognito注册用户
    const result = await signUp(email, password);
    User.create({
      email,
      name,
      status: "unverified",
      sub: result.UserSub,
    });
    res.status(200).json({
      message: "Sign up successful.",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 验证注册验证码
export const verifySignUpCodeHandler = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  try {
    const result = await verifySignUpCode(email, code);
    if (result.$metadata.httpStatusCode === 200) {
      // 更新用户的 status 为 active
      await User.update({ status: "active" }, { where: { email } });
      res.status(200).json({ message: "User verify successful." });
    } else {
      res.status(404).json({ message: "User verify failed." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 重新发送注册验证码
export const resendSignUpCodeHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const result = await resendSignUpCode(email);
    if (result.$metadata.httpStatusCode === 200) {
      res.status(200).json({ message: "Resend code successful." });
    } else {
      res.status(404).json({ message: "Resend code failed." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 登录
export const signInHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await signIn(email, password);
    const { IdToken, AccessToken, RefreshToken } = result.AuthenticationResult;
    const decodedToken = decodeJwt(IdToken);
    const user = await User.findOne({ where: { email } });
    if (user.sub === decodedToken.sub) {
      console.log("使用账号密码登录成功");
      res.status(200).json({
        idToken: IdToken,
        accessToken: AccessToken,
        refreshToken: RefreshToken,
        message: "Sign in successful.",
      });
    }
  } catch (error) {
    console.log("使用账号密码登录失败");
    res.status(400).json({ message: "Please try the other method." });
  }
};

// 发送和重发重置密码验证码
export const resetCodeHandler = async (req: Request, res: Response) => {
  const { email } = req.body;
  const verificationCode = crypto.randomInt(100000, 999999).toString();

  try {
    await sendResetCode(email, verificationCode);
    // 将验证码暂存到缓存中，有效期5分钟
    cache.set(email, verificationCode, 300);
    res.status(200).json({ message: "Reset code successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//验证重置密码验证码
export const verifyResetCodeHandler = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  try {
    // 从缓存中获取存储的验证码
    const storedCode = cache.get<string>(email);
    if (!storedCode) {
      return res
        .status(400)
        .json({ message: "Verification code has been express." });
    }
    if (storedCode === code) {
      cache.del(email); // 验证成功后删除缓存中的验证码，防止重复使用
      res.status(200).json({ message: "Verifiy code successful." });
    } else {
      res.status(400).json({ message: "Verifiy code failed." });
    }
  } catch (error) {
    console.error("验证码验证失败:", error);
    res.status(400).json({
      message: "Reset password failed. Please check your verification code.",
    });
  }
};

// 重置密码
export const resetPasswordHandler = async (req: Request, res: Response) => {
  const { email, newpassword } = req.body;

  try {
    if (
      newpassword.length < 8 ||
      !/[A-Z]/.test(newpassword) ||
      !/[0-9!@#$%^&*]/.test(newpassword)
    ) {
      return res.status(400).json({
        message: "Password must meet all the requirements.",
      });
    } else {
      // 调用 Cognito 来重置密码
      const result = await resetPassword(email, newpassword);
      console.log("resetPassword result=", result);
      if (result["$metadata"].httpStatusCode === 200) {
        res.status(200).json({ message: "Password has been reset." });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 刷新令牌
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

// 第三方登录
export const ThreePartyLoginHandler = async (req: Request, res: Response) => {
  const { code } = req.body;

  try {
    const result = await ThreePartyToken(code);
    const IdToken = result.id_token;
    const AccessToken = result.access_token;
    const RefreshToken = result.refresh_token;

    const decodedAccessToken = decodeJwt(AccessToken);
    const username = decodedAccessToken.username;
    const decodedIdToken = decodeJwt(IdToken);
    const email = decodedIdToken.email;
    const sub = decodedIdToken.sub;
    const name = decodedIdToken.given_name;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      User.create({
        email,
        name: name,
        status: "active",
        sub: sub,
      });
      console.log("使用第三方登录创建新用户");
      res.status(200).json({
        idToken: IdToken,
        accessToken: AccessToken,
        refreshToken: RefreshToken,
        message: "Google login successful.",
      });
    } else if (user.sub === sub) {
      console.log("使用第三方登录成功");
      res.status(200).json({
        idToken: IdToken,
        accessToken: AccessToken,
        refreshToken: RefreshToken,
        message: "Third-party identity provider login successful.",
      });
    } else {
      await deleteUser(username);
      console.log("使用第三方登录失败,cognnito用户已删除");
      res
        .status(200)
        .json({ message: "Please use an other method to sign in." });
    }
  } catch (error) {
    console.error("使用第三方登录失败:", error);
    res.status(400).json({ message: error.message });
  }
};

// 生成魔术链接
export const magicLinkHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // 生成一个随机 token
    const magicToken = generateMagicToken();

    // 对 token 进行 HMAC 签名，确保安全性
    const signature = crypto
      .createHmac("sha256", "your-secret-key")
      .update(magicToken)
      .digest("hex");

    const result = await magicLink(email, magicToken, signature);
    console.log("Magic link result:", result);
    res.status(200).json({ message: "Magic link sent successfully" });
  } catch (error) {
    console.error("Error generating magic link:", error);
    res.status(500).json({ error: "Failed to generate magic link" });
  }
};

// 验证 Magic Link
export const verifyMagicLinkHandler = async (req: Request, res: Response) => {
  const { token, email } = req.query as { token: string; email: string };
  try {
    // Initiate the auth process to get the session
    const authResponse = await initiateAuth(email);
    console.log("Magic link verification initiated:", authResponse);

    if (authResponse.Session) {
      // Use token as challenge response
      const challengeResponse = await respondToAuthChallenge(
        email,
        token,
        authResponse.Session
      );
      console.log("Magic link verification response:", challengeResponse);
      res.status(200).json({
        message: "Magic link verified successfully",
        tokens: challengeResponse.AuthenticationResult,
      });
    } else {
      res.status(400).json({ error: "Invalid authentication session" });
    }
  } catch (error) {
    console.error("Error verifying magic link:", error);
    res.status(500).json({ error: "Failed to verify magic link" });
  }
};

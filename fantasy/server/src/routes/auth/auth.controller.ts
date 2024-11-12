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
  createMagicLink,
  sendMagicLink,
  verifyMagicLinkToken,
  checkUser,
} from "utils/awsCognito";

import crypto from "crypto";

import NodeCache from "node-cache";

import User from "./auth.model";

// 初始化 NodeCache 实例，单位为秒
const cache = new NodeCache({ stdTTL: 300 });

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return res.status(400).json({
        message: "Please enter your email address.",
      });
    } else if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter your email address in format: xyz@example.com",
      });
    } else {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(200).json({ exists: false, external: false });
      }
      if (user.method === "account") {
        res.status(200).json({
          exists: true,
          external: false,
          method: user.method,
        });
      }
      if (user.method === "google") {
        res.status(200).json({
          exists: true,
          external: true,
          method: user.method,
        });
      }
      if (user.method === "facebook") {
        res.status(200).json({
          exists: true,
          external: true,
          method: user.method,
        });
      }
      if (user.method === "apple") {
        res.status(200).json({
          exists: true,
          external: true,
          method: user.method,
        });
      }
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error checking email. Please try again." });
  }
};

// 注册
export const signUpHandler = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    let passwordError = "";
    let error = "";
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[0-9!@#$%^&*]/.test(password)
    ) {
      passwordError = "Password must meet all the requirements.";
    }
    if (!name) {
      error = "Please enter your name.";
    }
    if (passwordError || error) {
      return res.status(400).json({
        message: { passwordError, error },
      });
    } else {
      // 调用AWS Cognito注册用户
      const result = await signUp(email, password);
      User.create({
        email,
        name,
        status: "unverified",
        sub: result.UserSub,
      });
      res.status(200).json({ message: "Sign up successfully." });
    }
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
      res.status(200).json({ message: "User verify successfully." });
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
      res.status(200).json({ message: "Resend code successfully." });
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

  if (!password) {
    return res.status(400).json({
      message: "Please enter your password.",
    });
  } else {
    try {
      const result = await signIn(email, password);
      const { IdToken, AccessToken, RefreshToken } =
        result.AuthenticationResult;
      const decodedToken = decodeJwt(IdToken);
      const user = await User.findOne({ where: { email } });
      const name = user.name;
      if (user.sub === decodedToken.sub) {
        res.status(200).json({
          name: name,
          idToken: IdToken,
          accessToken: AccessToken,
          refreshToken: RefreshToken,
        });
      } else {
        res.status(400).json({
          message: "Your password isn’t correct. Please try again.",
        });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

// 发送和重发重置密码验证码
export const resetCodeHandler = async (req: Request, res: Response) => {
  const { email } = req.body;
  const verificationCode = crypto.randomInt(100000, 999999).toString();

  try {
    const user = await checkUser(email);
    const users = user.Users;
    if (users[0].UserStatus !== "EXTERNAL_PROVIDER") {
      await sendResetCode(email, verificationCode);
      // 将验证码暂存到缓存中，有效期5分钟
      cache.set(email, verificationCode, 300);
      res.status(200).json({ message: "Reset code successfully" });
    } else {
      res.status(400).json({
        message:
          "Error to get reset code. Please use another method to sign in.",
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//验证重置密码验证码
export const verifyResetCodeHandler = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  try {
    if (code.length === 0) {
      return res.status(400).json({ message: "Please enter your code." });
    } else if (code.length < 6 && code.length > 0) {
      return res
        .status(400)
        .json({ message: "Please enter six digits verification code." });
    } else {
      // 从缓存中获取存储的验证码
      const storedCode = cache.get<string>(email);
      if (!storedCode) {
        return res
          .status(400)
          .json({ message: "Verification code has been express." });
      }
      if (storedCode === code) {
        // 验证成功后删除缓存中的验证码，防止重复使用
        cache.del(email);
        res.status(200).json({ message: "Verifiy code successfully." });
      } else {
        res.status(400).json({ message: "Verifiy code failed." });
      }
    }
  } catch (error) {
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
      if (result["$metadata"].httpStatusCode === 200) {
        res.status(200).json({ message: "Password reset successfully." });
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
    const method = decodedIdToken.identities[0].providerName.toLowerCase();
    const user = await User.findOne({ where: { email } });
    if (!user) {
      User.create({
        email,
        name: name,
        method: method,
        status: "active",
        sub: sub,
      });
      res.status(200).json({
        email: email,
        name: name,
        method: method,
        idToken: IdToken,
        accessToken: AccessToken,
        refreshToken: RefreshToken,
      });
    } else if (user.sub === sub) {
      res.status(200).json({
        email: email,
        name: name,
        method: method,
        idToken: IdToken,
        accessToken: AccessToken,
        refreshToken: RefreshToken,
      });
    } else {
      await deleteUser(username);
      res
        .status(200)
        .json({ message: "Please use an other method to sign in." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 创建 Magic Link
export const magicLinkHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await checkUser(email);
    const users = user.Users;
    if (users[0].UserStatus !== "EXTERNAL_PROVIDER") {
      const loginUrl = await createMagicLink(email);
      const result = await sendMagicLink(email, loginUrl);
      res.status(200).json({
        message: "Magic link sent successfully.",
        result,
      });
    } else {
      res.status(400).json({
        message:
          "Error to use magic link. Please use another method to sign in.",
      });
    }
  } catch (error) {
    console.error("Error generating magic link:", error);
    res.status(400).json({ message: error.message });
  }
};

// 验证 Magic Link
export const verifyMagicLinkHandler = async (req: Request, res: Response) => {
  const { ChallengeResponses, Session } = req.body;

  try {
    const result = await verifyMagicLinkToken(
      ChallengeResponses.USERNAME,
      Session
    );
    return res
      .status(200)
      .json({ message: "Magic link token verify successfully.", result });
  } catch (error) {
    console.error("Magic link token verification failed:", error);
    return res.status(400).json({ message: error.message });
  }
};

// magic link 回调处理
export const magicLinkCallbackHandler = async (req: Request, res: Response) => {
  const { username, session } = req.query;

  try {
    const result = await verifyMagicLinkToken(
      username as string,
      session as string
    );

    const { IdToken, AccessToken, RefreshToken } = result.AuthenticationResult;
    const decodedIdToken = decodeJwt(IdToken);
    const email = decodedIdToken.email;
    const user = await User.findOne({ where: { email } });
    const name = user.name;
    return res.redirect(
      `http://localhost:5173/signin/magicLink?accessToken=${AccessToken}&refreshToken=${RefreshToken}&idToken=${IdToken}&name=${name}`
    );
  } catch (error) {
    console.error("Magic link token verification failed:", error);
    return res.redirect(`http://localhost:5173/signin?error=${error.message}`);
  }
};

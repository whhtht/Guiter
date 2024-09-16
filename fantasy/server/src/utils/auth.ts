import {
  CognitoIdentityProviderClient,
  GetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import * as dotenv from "dotenv";
import User from "../routes/auth/auth.model";

dotenv.config();

// Cognito Client 实例化
const client = new CognitoIdentityProviderClient({
  region: process.env.COGNITO_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// 验证 Token
export async function verifyToken(accessToken: string) {
  try {
    const params = {
      AccessToken: accessToken,
    };

    // 使用 GetUserCommand 验证 Cognito Token
    const command = new GetUserCommand(params);
    const userData = await client.send(command);
    return userData;
  } catch (error) {
    console.error("Token 验证失败:", error);
    throw new Error("Invalid Token");
  }
}

// 获取用户 ID
export const getUserId = async (accessToken: string) => {
  try {
    // 验证 accessToken 并获取 sub
    const userData = await verifyToken(accessToken);

    // 获取 sub 属性
    const subAttribute = userData.UserAttributes?.find(
      (attr) => attr.Name === "sub"
    );

    const sub = subAttribute?.Value;

    if (!sub) {
      throw new Error("Invalid user token");
    }

    // 根据 sub 获取对应的用户
    const existUser = await User.findOne({ where: { sub } });

    if (!existUser) {
      throw new Error("User not found");
    }

    return existUser;
  } catch (error) {
    console.error("Error getting user ID:", error);
    throw error;
  }
};

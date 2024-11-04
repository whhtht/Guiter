import {
  //aws信息
  CognitoIdentityProviderClient,
  //用户注册
  SignUpCommand,
  //验证码确认注册
  ConfirmSignUpCommand,
  //重新发送验证码
  ResendConfirmationCodeCommand,
  //用户登录和使用忘记密码验证码
  AdminInitiateAuthCommand,
  //用户登录类型
  AuthFlowType,
  //重置密码
  AdminSetUserPasswordCommand,
  // 第三方删除用户
  AdminDeleteUserCommand,
  AdminRespondToAuthChallengeCommand,
} from "@aws-sdk/client-cognito-identity-provider";

// AWS 发送邮件
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// axios
import axios from "axios";

import * as dotenv from "dotenv";

dotenv.config();

// AWS Cognito客户端
const client = new CognitoIdentityProviderClient({
  region: process.env.COGNITO_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// AWS SES客户端
const sesClient = new SESClient({ region: process.env.COGNITO_REGION });

// Cognito注册
export async function signUp(email: string, password: string) {
  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };
  try {
    const command = new SignUpCommand(params);
    const result = await client.send(command);
    return result;
  } catch (error) {
    throw error;
  }
}

// Cognito注册验证码
export async function verifySignUpCode(email: string, code: string) {
  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: email,
    ConfirmationCode: code,
  };
  try {
    const command = new ConfirmSignUpCommand(params);
    const result = await client.send(command);
    return result;
  } catch (error) {
    throw error;
  }
}

// Cognito重新发送注册验证码
export async function resendSignUpCode(email: string) {
  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: email,
  };
  try {
    const command = new ResendConfirmationCodeCommand(params);
    const result = await client.send(command);
    return result;
  } catch (error) {
    throw error;
  }
}

// Cognito登录
export async function signIn(email: string, newpassword: string) {
  const params = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthFlow: AuthFlowType.ADMIN_NO_SRP_AUTH,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: newpassword,
    },
  };
  try {
    const command = new AdminInitiateAuthCommand(params);
    const result = await client.send(command);
    return result;
  } catch (error) {
    throw error;
  }
}

// Cognito发送和重发忘记密码验证码
export async function sendResetCode(email: string, code: string) {
  console.log("email", email);
  const params = {
    region: process.env.COGNITO_REGION,
    Source: process.env.AWS_SES_VERIFIEDEMAIL, // SES 中验证过的发件人邮箱
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: "Your verification code",
        Charset: "UTF-8",
      },
      Body: {
        Text: {
          Data: `Your password reset code is ${code}`,
          Charset: "UTF-8",
        },
      },
    },
  };
  try {
    const command = new SendEmailCommand(params);
    await sesClient.send(command);

    console.log(`验证码已发送到 ${email}`);
  } catch (error) {
    console.error("发送邮件失败:", error);
    throw Error;
  }
}

// Cognito重置密码
export async function resetPassword(email: string, newPassword: string) {
  const params = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: email,
    Password: newPassword,
    Permanent: true, // 设置为 true，表示直接设置新密码，不强制用户在下次登录时更改密码
  };
  try {
    const command = new AdminSetUserPasswordCommand(params);
    const result = await client.send(command);
    return result;
  } catch (error) {
    console.error("resetPassword error:", error);
    throw error;
  }
}

// Cognito刷新token
export async function refreshTokens(refreshToken: string) {
  const params = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
    },
  };
  try {
    const command = new AdminInitiateAuthCommand(params);
    const result = await client.send(command);
    return {
      accessToken: result.AuthenticationResult?.AccessToken,
      idToken: result.AuthenticationResult?.IdToken,
    };
  } catch (error) {
    throw error;
  }
}

// 第三方登陆
export async function ThreePartyToken(code: string) {
  const client_id = process.env.COGNITO_CLIENT_ID; // 替换为你的Client ID
  const redirect_uri = process.env.COGNITO_REDIRECT_URI; // 替换为你的回调URL
  const data = {
    grant_type: "authorization_code",
    client_id,
    redirect_uri,
    code,
  };

  try {
    const response = await axios.post(
      process.env.COGNITO_DOMAIN_TOKEN_URL,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Cognito删除用户
export async function deleteUser(username: string) {
  const params = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: username,
  };

  try {
    const command = new AdminDeleteUserCommand(params);
    const result = await client.send(command);
    console.log("User deleted successfully, ", result);
    return result;
  } catch (error) {
    console.error("Delete user error:", error);
    throw error;
  }
}

export const initiateAuth = async (email: string) => {
  try {
    const command = new AdminInitiateAuthCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthFlow: "CUSTOM_AUTH",
      AuthParameters: {
        USERNAME: email,
      },
    });

    const response = await client.send(command);
    console.log("Initiate auth response:", response);
    return response;
  } catch (error) {
    console.error("Error initiating auth:", error);
    throw error;
  }
};

export const respondToAuthChallenge = async (
  email: string,
  challengeResponse: string,
  session: string
) => {
  try {
    const command = new AdminRespondToAuthChallengeCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_CLIENT_ID,
      ChallengeName: "CUSTOM_CHALLENGE",
      Session: session,
      ChallengeResponses: {
        USERNAME: email,
        ANSWER: challengeResponse, // 用户提供的回答（Magic Link中的 token）
      },
    });

    const response = await client.send(command);
    console.log("Respond to auth challenge response:", response);
    return response; // 如果验证成功，response 中会包含用户的 ID Token 和 Access Token
  } catch (error) {
    console.error("Error responding to auth challenge:", error);
    throw error;
  }
};

// 魔法链接
export async function magicLink(
  email: string,
  magicToken: string,
  signature: string
) {
  // 将 token 和签名嵌入到链接中
  const magicLink = `https://yunongchen.com/verify?token=${magicToken}&signature=${signature}&email=${encodeURIComponent(
    email
  )}`;

  // 配置 AWS SES 邮件
  const params = {
    Source: "yunong.chen@zmley.com",
    Destination: { ToAddresses: [email] },
    Message: {
      Subject: { Data: "Your Magic Link" },
      Body: {
        Html: {
          Data: `<p>Click <a href="${magicLink}">here</a> to log in.</p>`,
        },
      },
    },
  };

  try {
    const command = new SendEmailCommand(params);
    const result = await sesClient.send(command);
    return result;
  } catch (error) {
    console.error("Error generating magic link:", error);
    throw error;
  }
}

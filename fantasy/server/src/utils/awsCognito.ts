import {
  //aws信息
  CognitoIdentityProviderClient,
  //用户注册
  SignUpCommand,
  //用户登录
  AdminInitiateAuthCommand,
  AuthFlowType,
  //获取用户信息
  AdminGetUserCommand,
  //重置密码
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import * as dotenv from "dotenv";

dotenv.config();

// AWS Cognito client
const client = new CognitoIdentityProviderClient({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Cognito sign up
export async function signUp(email: string, password: string) {
  console.log(process.env.COGNITO_CLIENT_ID);
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

// Cognito sign in
export async function signIn(email: string, password: string) {
  const params = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthFlow: AuthFlowType.ADMIN_NO_SRP_AUTH,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
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

// Cognito forgot password
export async function forgetPassword(email: string) {
  const params = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: email,
  };
  try {
    await client.send(new AdminGetUserCommand(params));
    return true;
  } catch (error) {
    if (error.name === "UserNotFoundException") {
      return false;
    }
    throw error;
  }
}

// Cognito sent reset password code
export async function resetPasswordCode(email: string) {
  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: email,
  };
  try {
    const command = new ForgotPasswordCommand(params);
    const result = await client.send(command);
    return result;
  } catch (error) {
    throw error;
  }
}

// Cognito reset password
export async function resetPassword(
  email: string,
  code: string,
  newPassword: string
) {
  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: email,
    ConfirmationCode: code,
    Password: newPassword,
  };
  console.log("resetPassword params:", params);
  try {
    const command = new ConfirmForgotPasswordCommand(params);
    const result = await client.send(command);
    return result;
  } catch (error) {
    console.error("resetPassword error:", error);
    throw error;
  }
}

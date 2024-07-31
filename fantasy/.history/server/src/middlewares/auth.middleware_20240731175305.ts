import AWS from "aws-sdk";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import { AuthFlowType } from "@aws-sdk/client-cognito-identity-provider";

dotenv.config();

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.COGNITO_REGION,
});

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
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
    const result = await cognito.initiateAuth(params).promise();

    if (result.AuthenticationResult) {
      const idToken = result.AuthenticationResult.IdToken!;
      const accessToken = result.AuthenticationResult.AccessToken!;
      const refreshToken = result.AuthenticationResult.RefreshToken!;

      res.json({
        idToken,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(401).send("Authentication failed");
    }
  } catch (error) {
    res.status(401).send("Authentication failed");
  }
};

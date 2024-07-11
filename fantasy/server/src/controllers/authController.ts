import { Request, Response } from 'express';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { awsConfig } from '../config/awsConfig';

const cognito = new CognitoIdentityServiceProvider({
  region: awsConfig.region,
});

export const signUpHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const params = {
    ClientId: awsConfig.clientId,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  };

  try {
    const response = await cognito.signUp(params).promise();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const signInHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: awsConfig.clientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  try {
    const response = await cognito.initiateAuth(params).promise();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

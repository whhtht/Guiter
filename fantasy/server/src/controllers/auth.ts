import { Request, Response } from 'express';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { awsConfig } from '../config/awsConfig';

const cognito = new CognitoIdentityServiceProvider({
  region: awsConfig.region,
});

export const signUpHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
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
    await cognito.signUp(params).promise();
    res.status(200).send('Sign up successful');
  } catch (error) {
    res.status(500).send(error);
  }
};

export const signInHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const params = {
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      UserPoolId: awsConfig.userPoolId,
      ClientId: awsConfig.clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };
    const response = await cognito.adminInitiateAuth(params).promise();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

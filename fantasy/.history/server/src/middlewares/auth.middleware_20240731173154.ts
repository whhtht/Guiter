import { Request, Response, NextFunction } from 'express';
import AWS from 'aws-sdk';

const cognito = new AWS.CognitoIdentityServiceProvider();

const verifyToken = async (token: string) => {
  const params = {
    AccessToken: token,
  };

  try {
    const response = await cognito.getUser(params).promise();
    return response;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send('No token provided');
  }

  try {
    const user = await verifyToken(token);
    res.locals.user = user;
   
    next();
  } catch (error) {
    res.status(401).send('Invalid token');
  }
};

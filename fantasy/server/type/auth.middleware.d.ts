import { CognitoIdentityServiceProvider } from 'aws-sdk';

declare global {
  namespace Express {
    interface Request {
      user?: CognitoIdentityServiceProvider.GetUserResponse;
    }
  }
}

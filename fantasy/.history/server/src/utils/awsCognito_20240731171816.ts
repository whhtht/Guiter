import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  AdminInitiateAuthCommand,
  AuthFlowType,
} from "@aws-sdk/client-cognito-identity-provider";
import { awsConfig } from "../config/awsConfig";

const client = new CognitoIdentityProviderClient({
  region: awsConfig.region,
});

export async function signUp(password: string, email: string) {
  const params = {
    ClientId: awsConfig.clientId,
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

export async function signIn(email: string, password: string) {
  const params = {
    UserPoolId: awsConfig.userPoolId,
    ClientId: awsConfig.clientId,
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

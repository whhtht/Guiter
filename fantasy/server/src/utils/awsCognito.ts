import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  AdminInitiateAuthCommand,
  AuthFlowType,
} from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({
  region: "us-east-2",
});

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

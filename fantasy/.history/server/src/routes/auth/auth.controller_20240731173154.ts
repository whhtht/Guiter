import { Request, Response } from "express";
import { signIn, signUp } from "utils/awsCognito";

export const signUpHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await signUp(email, password);
    console.log(result);
    res.status(200).json({
      message: "Sign up successful. Please check your email for verification.",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Email is already registered or invalid." });
  }
};

export const signInHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const response = await signIn(email, password);
    res.status(200).json({ token: response.AuthenticationResult?.IdToken });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid email or password" });
  }
};

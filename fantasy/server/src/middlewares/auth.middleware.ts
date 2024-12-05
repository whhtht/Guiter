import { getUserId } from "../utils/auth";
import { Request, Response, NextFunction } from "express";

// 储存当前用户 ID
const currentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ error: "No access token provided" });
    }
    const user = await getUserId(accessToken);
    if (!user) {
      throw new Error("User not found");
    }
    res.locals.userId = user.id;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export default currentUser;

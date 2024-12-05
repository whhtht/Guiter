import { Request, Response } from "express";
import User from "../auth/auth.model";
import Cart from "./cart.model";

// 处理 GET 请求 (获取购物车 ID)
export const getCartId = async (req: Request, res: Response) => {
  try {
    const email = res.locals.email;
    const cart = await Cart.findAll({
      where: { email },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["userId", "email", "sub"],
        },
      ],
    });
    return res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

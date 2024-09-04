import { Request, Response } from "express";
import Cart from "./cart.model";
import Product from "../products/products.model";
import User from "../auth/auth.model";

// 处理 GET 请求
export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId } = req.query;
    const cart = await Cart.findAll({
      // 通过 userId 和 productId 过滤购物车项
      where: {
        ...(userId && { userId: userId as string }),
        ...(productId && { productId: productId as string }),
      },
    });
    if (cart.length > 0) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: "No items in cart" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch cart items" });
  }
};

// 处理 POST 请求
export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId } = req.body;

    // 检查用户是否存在
    const existUser = await User.findByPk(userId);
    if (!existUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // 检查产品是否存在
    const existProduct = await Product.findByPk(productId);
    if (!existProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    // 查找是否已有相同的购物车项
    const existingCartItem = await Cart.findOne({
      where: { userId, productId },
    });

    let cartItem: Cart;

    if (existingCartItem) {
      // 如果已经存在，增加数量
      existingCartItem.quantity += 1;
      await existingCartItem.save();
      cartItem = existingCartItem;
    } else {
      // 如果不存在，创建新项并设置数量为1
      cartItem = await Cart.create({
        userId,
        productId,
        quantity: 1,
      });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: "Failed to add item to cart" });
  }
};

// 处理 PUT 请求
export const putCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId } = req.body;

    // 检查用户是否存在
    const existCart = await Cart.findOne({
      where: { userId, productId },
    });

    if (!existCart) {
      res.status(404).json({ error: "Cart item not found" });
      return;
    }

    if (existCart.quantity > 1) {
      // 如果数量大于1，减少数量
      existCart.quantity -= 1;
      await existCart.save();
      res.status(200).json(existCart);
    } else {
      await existCart.destroy();
      res.status(204).send(); // 204 没有内容
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to put cart item" });
  }
};

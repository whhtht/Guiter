import { Request, Response } from "express";
import { getUserId } from "../../utils/auth";
import Cart from "./cart.model";
import { Product, Specification } from "../products/products.model";

// 处理 POST 请求 (登录用户添加购物车)
export const postCart = async (req: Request, res: Response) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ error: "No access token provided" });
    }
    // 获取用户 ID
    const existUser = await getUserId(accessToken!);
    const userId = existUser.id;
    // 获取产品名称
    const productName = req.body.productName;
    // 解码产品名称
    const decodedProductName = decodeURIComponent(productName);
    const product = await Product.findOne({
      where: { name: decodedProductName },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // 获取产品 ID
    const productId = product.id;
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
    // 创建购物车项
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
    console.error(error);
    res.status(400).json({ error: "Failed to add item to cart" });
  }
};

// 处理 PUT 请求 (登录用户减少购物车数量)
export const putCart = async (req: Request, res: Response) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ error: "No access token provided" });
    }
    const existUser = await getUserId(accessToken!);
    const userId = existUser.id;
    // 获取产品名称
    const productName = req.body.productName;
    // 解码产品名称
    const decodedProductName = decodeURIComponent(productName);
    const product = await Product.findOne({
      where: { name: decodedProductName },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // 获取产品 ID
    const productId = product.id;
    // 检查用户是否存在
    const existCart = await Cart.findOne({
      where: { userId, productId },
    });
    if (!existCart) {
      res.status(404).json({ error: "Cart item not found" });
      return;
    }
    // 修改购物车物品数量
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
    console.error(error);
    res.status(400).json({ error: "Failed to put cart item" });
  }
};

// 处理 delete 请求 (登录用户删除购物车商品)
export const deleteCart = async (req: Request, res: Response) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ error: "No access token provided" });
    }
    const existUser = await getUserId(accessToken!);
    const userId = existUser.id;
    // 获取产品名称
    const productName = req.params.productName;
    // 解码产品名称
    const decodedProductName = decodeURIComponent(productName);
    const product = await Product.findOne({
      where: { name: decodedProductName },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // 获取产品 ID
    const productId = product.id;
    // 检查用户是否存在
    const existCart = await Cart.findOne({
      where: { userId, productId },
    });
    if (!existCart) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    // 删除购物车中的商品
    await existCart.destroy();
    res.status(204).send(); // 204 表示成功但没有内容
  } catch (error) {
    console.error("Failed to delete cart item:", error);
    res.status(400).json({ error: "Failed to delete cart item" });
  }
};

// 处理 GET 请求 (获取购物车 ID)
export const getCartId = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    // 通过 include 关联 product 表
    const cart = await Cart.findAll({
      where: { userId },
      include: [
        {
          model: Product, // 关联的表
          as: "product", // 确认关联名称
          attributes: ["id", "name", "price", "specification"], // 只获取想要的字段
          include: [
            {
              model: Specification, // 包含 specification 表
              as: "specificationDetail", // 使用定义的别名
              attributes: ["Condition"], // 获取 Condition 字段
            },
          ],
        },
      ],
    });

    return res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

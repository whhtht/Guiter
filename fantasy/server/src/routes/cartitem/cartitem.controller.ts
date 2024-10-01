import { Request, Response } from "express";
import { getUserId } from "../../utils/auth";
import Cartitem from "./cartitem.model";
import Cart from "../cart/cart.model";
import Product from "../products/products.model";
import Specification from "../products/specification.model";
import { Op } from "sequelize";

// 获取产品Id
const information = async (req: Request) => {
  // 获取产品名称
  const productName = req.body.productName;
  // 解码产品名称
  const decodedProductName = decodeURIComponent(productName);
  // 查找产品
  const product = await Product.findOne({
    where: { name: decodedProductName },
  });
  if (!product) {
    throw new Error("Product not found");
  }
  const productId = product.id;
  return { productId };
};

// 处理get请求（获取用户购物车物品）
export const getCartItems = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const cartItems = await Cartitem.findAll({
      where: { userId },
      attributes: ["id", "cartId", "userId", "productId", "quantity"],
      include: [
        {
          model: Cart,
          as: "cart",
          attributes: ["type"],
        },
        {
          model: Product,
          as: "product",
          attributes: ["name", "price", "specification"],
          include: [
            {
              model: Specification,
              as: "specificationDetail",
              attributes: ["Condition"],
            },
          ],
        },
      ],
    });
    return res.status(200).json(cartItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 处理post请求（添加购物车物品）
export const postCartItem = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const { productId } = await information(req);
    // 检查购物车是否存在, 如果不存在则创建购物车
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }
    // 检查购物车物品是否存在
    const existCartItem = await Cartitem.findOne({
      where: { userId, productId },
    });
    // 添加购物车物品
    let item: Cartitem;
    if (existCartItem) {
      existCartItem.quantity += 1;
      await existCartItem.save();
      item = existCartItem;
    } else {
      item = await Cartitem.create({
        cartId: cart.id,
        userId,
        productId,
        quantity: 1,
      });
    }
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to add item to cart" });
  }
};

// 处理put请求（减少购物车物品）
export const putCartItem = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const { productId } = await information(req);
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }
    const existCartItem = await Cartitem.findOne({
      where: { userId, productId },
    });
    // 减少购物车物品数量
    if (existCartItem) {
      existCartItem.quantity -= 1;
      // 如果数量小于等于0，删除购物车物品
      if (existCartItem.quantity <= 0) {
        await existCartItem.destroy();
        const remainingItems = await Cartitem.count({
          where: { userId },
        });
        // 如果购物车物品数量为0，删除购物车
        if (remainingItems === 0) {
          await Cart.destroy({ where: { userId } });
        }
      } else {
        await existCartItem.save();
      }
      return res.status(200).json(existCartItem);
    } else {
      return res.status(404).json({ error: "Item not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to put cart item" });
  }
};

// 处理 PUT 请求 (更新购物车物品状态)
export const cartStatus = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const { productId } = await information(req);
    // 检查用户是否存在
    let cart = await Cart.findOne({ where: { userId, type: "cart" } });
    if (!cart) {
      cart = await Cart.create({ userId, type: "cart" });
    }
    let saveforlater = await Cart.findOne({
      where: { userId, type: "saveforlater" },
    });
    if (!saveforlater) {
      saveforlater = await Cart.create({ userId, type: "saveforlater" });
    }
    // 检查购物车物品是否存在
    const existCartItem = await Cartitem.findOne({
      where: { userId, productId },
    });
    //检查物品是否是在saveforlater中
    if (existCartItem?.cartId === saveforlater.id) {
      // 如果是 saveforlater 中的物品，变回 cart
      const otherSaveForLaterItems = await Cartitem.findAll({
        where: {
          userId,
          cartId: saveforlater.id,
          productId: { [Op.ne]: productId },
        },
      });
      // 更新 cartItem 的 cartId 为 cart 的 id
      await existCartItem.update({ cartId: cart.id });
      // 如果 saveforlater 中没有其他物品，删除 saveforlater
      if (otherSaveForLaterItems.length === 0) {
        await saveforlater.destroy();
      }
    } else {
      // 如果是 cart 中的物品，变为 saveforlater
      const otherCartItems = await Cartitem.findAll({
        where: { userId, cartId: cart.id, productId: { [Op.ne]: productId } },
      });
      // 更新 cartItem 的 cartId 为 saveforlater 的 id
      await existCartItem.update({ cartId: saveforlater.id });
      // 如果 cart 中没有其他物品，删除 cart
      if (otherCartItems.length === 0) {
        await cart.destroy();
      }
    }
    // 返回更新后的购物车物品
    const cartItems = await Cartitem.findAll({
      where: { userId },
      attributes: ["id", "cartId", "userId", "productId", "quantity"],
      include: [
        {
          model: Cart,
          as: "cart",
          attributes: ["type"],
        },
        {
          model: Product,
          as: "product",
          attributes: ["name", "price", "specification"],
          include: [
            {
              model: Specification,
              as: "specificationDetail",
              attributes: ["Condition"],
            },
          ],
        },
      ],
    });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Failed to update item status:", error);
    res.status(400).json({ error: "Failed to update item status" });
  }
};

// 处理delete请求（删除购物车物品）
export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    // 获取用户 ID
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
    // 查找产品
    const product = await Product.findOne({
      where: { name: decodedProductName },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // 获取产品 ID
    const productId = product.id;
    // 检查购物车是否存在
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }
    // 检查购物车物品是否存在
    const existCartItem = await Cartitem.findOne({
      where: { userId, productId },
    });
    if (!existCartItem) {
      return res.status(400).json({ error: "Item not found in cart" });
    }
    // 删除购物车物品
    const cartitem = await Cart.findOne({ where: { userId, type: "cart" } });
    const saveforlateritem = await Cart.findOne({
      where: { userId, type: "saveforlater" },
    });

    // 计算在 cartitem 中的数量
    const cartItemCount = cartitem
      ? await Cartitem.count({ where: { cartId: cartitem.id } })
      : 0;
    const saveForLaterItemCount = saveforlateritem
      ? await Cartitem.count({ where: { cartId: saveforlateritem.id } })
      : 0;

    // 删除购物车中的物品
    if (existCartItem.cartId === cartitem?.id && cartItemCount === 1) {
      // 删除最后一个 cart 物品
      await existCartItem.destroy();
      await Cart.destroy({ where: { id: cartitem.id } });
    } else if (
      existCartItem.cartId === saveforlateritem?.id &&
      saveForLaterItemCount === 1
    ) {
      // 删除最后一个 saveforlater 物品
      await existCartItem.destroy();
      await Cart.destroy({ where: { id: saveforlateritem.id } });
    } else {
      // 仅删除 cartitem
      await existCartItem.destroy();
    }

    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete cart item:", error);
    res.status(400).json({ error: "Failed to delete cart item" });
  }
};

import { Request, Response } from "express";

import Order from "./order.model";
import Orderitem from "routes/orderitem/orderitem.model";
import Cart from "../cart/cart.model";
import Cartitem from "../cartitem/cartitem.model";
import Product from "../products/products.model";

// 登录用户配送
export const postUserDeliver = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const {
    paymentIntentId,
    name,
    email,
    phone,
    total,
    type,
    address,
    country,
    province,
    city,
    postalCode,
  } = req.body;

  try {
    await Order.create({
      userId: userId,
      paymentIntentId: paymentIntentId,
      name: name,
      email: email,
      phone: phone,
      total: total,
      type: type,
      address: address,
      country: country,
      province: province,
      city: city,
      postalCode: postalCode,
    });
    const order = await Order.findOne({
      where: { paymentIntentId: paymentIntentId },
    });
    const cart = await Cart.findOne({
      where: {
        userId: userId,
        type: "cart",
      },
    });
    // 查找购物车中物品的信息
    const cartItems = await Cartitem.findAll({
      where: { userId: userId, cartId: cart.id },
    });
    // 查找购物车中物品的价格
    const productPrice = await Product.findAll({
      where: { id: cartItems.map((item) => item.productId) },
      attributes: ["id", "price"],
    });

    // 将 productPrice 转换为 map
    const productPriceMap = productPrice.reduce((map, product) => {
      map[product.id] = product.price; // 将 product.id 作为键，product.price 作为值
      return map; // 将 map 继续传递到下一个迭代
    }, {}); // 初始化为空对象 {}

    // 使用 map 计算总价
    const orderItemsData = cartItems.map((item) => {
      const productPrice = productPriceMap[item.productId]; // 根据 productId 获取单价
      const calculatedPrice = productPrice * item.quantity; // 计算总价

      return {
        orderId: order.id,
        productId: item.productId,
        price: calculatedPrice,
        quantity: item.quantity,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    // 批量插入 orderitem 数据
    await Orderitem.bulkCreate(orderItemsData);
    await Cartitem.destroy({ where: { cartId: cart.id } });
    await Cart.destroy({ where: { id: cart.id } });
    res.status(200).json({ status: "successed" });
  } catch (error) {
    console.error("Post user deliver error:", error);
    res.status(400).json({ message: error, status: "failed" });
  }
};

// 未登录用户配送
export const postGuestDeliver = async (req: Request, res: Response) => {
  const {
    cart,
    paymentIntentId,
    name,
    email,
    phone,
    total,
    type,
    address,
    country,
    province,
    city,
    postalCode,
  } = req.body;

  try {
    await Order.create({
      paymentIntentId: paymentIntentId,
      name: name,
      email: email,
      phone: phone,
      total: total,
      type: type,
      address: address,
      country: country,
      province: province,
      city: city,
      postalCode: postalCode,
    });
    const order = await Order.findOne({
      where: { paymentIntentId: paymentIntentId },
    });
    const product = await Product.findAll({
      where: {
        name: cart.map((item: { name: string }) => item.name), // 根据 name 查询
      },
      attributes: ["id", "price", "name"],
    });

    const productPriceMap = product.reduce((map, product) => {
      map[product.name] = { id: product.id, price: product.price };
      return map;
    }, {});

    const cartitem = req.body.cart as {
      name: string;
      price: number;
      quantity: number;
    }[];

    const orderItemsData = cartitem.map((item) => {
      const product = productPriceMap[item.name];
      const calculatedPrice = product.price * item.quantity;

      return {
        orderId: order.id,
        productId: product.id,
        price: calculatedPrice,
        quantity: item.quantity,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await Orderitem.bulkCreate(orderItemsData);
    res.status(200).json({ status: "successed" });
  } catch (error) {
    console.error("Post guest deliver error:", error);
    res.status(400).json({ message: error, status: "failed" });
  }
};

// 登录用户自提
export const postUserPickup = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const { paymentIntentId, name, email, phone, total, type } = req.body;

  try {
    await Order.create({
      userId: userId,
      paymentIntentId: paymentIntentId,
      type: type,
      status: "pickup",
      name: name,
      email: email,
      phone: phone,
      total: total,
    });

    const order = await Order.findOne({
      where: { paymentIntentId: paymentIntentId },
    });
    const cart = await Cart.findOne({
      where: {
        userId: userId,
        type: "cart",
      },
    });
    const cartItems = await Cartitem.findAll({
      where: { userId: userId, cartId: cart.id },
    });
    const productPrice = await Product.findAll({
      where: { id: cartItems.map((item) => item.productId) },
      attributes: ["id", "price"],
    });

    const productPriceMap = productPrice.reduce((map, product) => {
      map[product.id] = product.price;
      return map;
    }, {});
    const orderItemsData = cartItems.map((item) => {
      const productPrice = productPriceMap[item.productId];
      const calculatedPrice = productPrice * item.quantity;

      return {
        orderId: order.id,
        productId: item.productId,
        price: calculatedPrice,
        quantity: item.quantity,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await Orderitem.bulkCreate(orderItemsData);
    await Cartitem.destroy({ where: { cartId: cart.id } });
    await Cart.destroy({ where: { id: cart.id } });
    res.status(200).json({ status: "successed" });
  } catch (error) {
    console.error("Post user pickup error:", error);
    res.status(400).json({ message: error, status: "failed" });
  }
};

// 未登录用户自提
export const postGuestPickup = async (req: Request, res: Response) => {
  const { cart, paymentIntentId, name, email, phone, total, type } = req.body;

  try {
    await Order.create({
      paymentIntentId: paymentIntentId,
      type: type,
      status: "pickup",
      name: name,
      email: email,
      phone: phone,
      total: total,
    });
    const order = await Order.findOne({
      where: { paymentIntentId: paymentIntentId },
    });
    const product = await Product.findAll({
      where: {
        name: cart.map((item: { name: string }) => item.name),
      },
      attributes: ["id", "price", "name"],
    });

    const productPriceMap = product.reduce((map, product) => {
      map[product.name] = { id: product.id, price: product.price };
      return map;
    }, {});

    const cartitem = req.body.cart as {
      name: string;
      price: number;
      quantity: number;
    }[];

    const orderItemsData = cartitem.map((item) => {
      const product = productPriceMap[item.name];
      const calculatedPrice = product.price * item.quantity;

      return {
        orderId: order.id,
        productId: product.id,
        price: calculatedPrice,
        quantity: item.quantity,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await Orderitem.bulkCreate(orderItemsData);
    res.status(200).json({ status: "successed" });
  } catch (error) {
    console.error("Post guest pickup error:", error);
    res.status(400).json({ message: error, status: "failed" });
  }
};

// 获取用户订单
export const getUserOrders = async (req: Request, res: Response) => {
  const userId = res.locals.userId;

  try {
    const order = await Order.findAll({
      where: { userId: userId },
    });
    const orderItems = await Orderitem.findAll({
      where: { orderId: order.map((item) => item.id) },
    });
    const product = await Product.findAll({
      where: { id: orderItems.map((item) => item.productId) },
    });

    const data = order.map((info) => {
      const items = orderItems
        .filter((item) => item.orderId === info.id)
        .map((item) => {
          const prod = product.find((prod) => prod.id === item.productId);
          return {
            name: prod.name,
            condition: prod.condition,
            price: prod.price,
            quantity: item.quantity,
          };
        });

      return {
        orderId: info.id,
        userId: info.userId,
        type: info.type,
        status: info.status,
        data: info.createdAt,
        products: items,
      };
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(400).json({ message: error });
  }
};

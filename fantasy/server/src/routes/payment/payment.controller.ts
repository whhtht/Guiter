import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

import Cartitem from "../cartitem/cartitem.model";
import Cart from "../cart/cart.model";
import Product from "../products/products.model";

dotenv.config();

// 使用 Secret Key 初始化 Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-09-30.acacia",
});

// 登录用户支付
export const userPaymentIntent = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const paymentMethod = req.body.paymentMethodId;
  try {
    // 查找用户购物车中物品的信息
    const cartItems = await Cart.findOne({
      where: {
        userId: userId,
        type: "cart",
      },
    });
    const userItems = await Cartitem.findAll({
      where: { userId: userId, cartId: cartItems.id },
      attributes: ["cartId", "userId", "productId", "quantity"],
    });
    const productPrice = await Product.findAll({
      where: { id: userItems.map((item) => item.productId) },
      attributes: ["id", "price"],
    });
    // 计算购物车中物品价格的总和
    const itemPrice = userItems.reduce((total, item) => {
      // 在 productPrice 中找到匹配的商品
      const product = productPrice.find(
        (product) => product.id === item.productId
      );
      // 如果找到商品，并且商品有价格，计算总价
      if (product && product.price) {
        return total + parseFloat(product.price) * item.quantity;
      }
      return total;
    }, 0);
    // 计算税费、运费、总价
    const tax = 0.15;
    const shippingFee = 30;
    const hst = parseFloat((itemPrice * tax).toFixed(2));
    const totalPrice = (itemPrice + hst + shippingFee).toFixed(2);
    const amount = Math.round(parseFloat(totalPrice) * 100);
    const currency = "cad";
    // 创建一个支付意图
    let paymentIntent: Stripe.PaymentIntent;
    // if (paymentMethod === "applepay") {
    //   paymentIntent = await stripe.paymentIntents.create({
    //     amount,
    //     currency,
    //     payment_method: applePayToken, // 使用Apple Pay生成的token作为payment_method
    //     confirm: true, // 立即确认支付
    //   });
    // } else
    {
      // 处理信用卡支付
      paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: paymentMethod,
        confirm: true,
        payment_method_types: ["card"],
      });
    }
    // 返回给前端用于完成支付
    res.status(200).send({
      status: paymentIntent.status,
      id: paymentIntent.id,
    });
  } catch (error) {
    // 如果出现错误，返回错误信息
    console.log("error:", error);
    return res.status(400).send({
      message: error.message,
    });
  }
};

// 未登录用户支付
export const guestPaymentIntent = async (req: Request, res: Response) => {
  const { cart, paymentMethodId } = req.body;
  console.log("cart:", cart);
  try {
    // 计算购物车中物品价格的总和
    const calculateTotalPrice = (cart: any[]) => {
      const itemPrice = cart.reduce((total, item) => {
        const itemTotal = parseFloat(item.price) * item.quantity;
        return total + itemTotal;
      }, 0);
      return itemPrice;
    };
    const itemPrice = calculateTotalPrice(cart);

    // 计算税费、运费、总价
    const tax = 0.15;
    const shippingFee = 30;
    const hst = parseFloat((itemPrice * tax).toFixed(2));
    const totalPrice = (itemPrice + hst + shippingFee).toFixed(2);
    const amount = Math.round(totalPrice * 100);
    const currency = "cad";
    // 创建一个支付意图
    let paymentIntent: Stripe.PaymentIntent;
    // if (paymentMethod === "applepay") {
    //   paymentIntent = await stripe.paymentIntents.create({
    //     amount,
    //     currency,
    //     payment_method: applePayToken,
    //     confirm: true,
    //   });
    // } else
    {
      // 处理信用卡支付
      paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: paymentMethodId,
        confirm: true,
        payment_method_types: ["card"],
      });
    }

    console.log("paymentIntent:", paymentIntent);

    // 返回给前端用于完成支付
    res.status(200).send({
      cart: cart,
      status: paymentIntent.status,
      id: paymentIntent.id,
    });
  } catch (error) {
    // 如果出现错误，返回错误信息
    console.log("Guest error", error);
    return res.status(400).send({
      message: error.message,
    });
  }
};

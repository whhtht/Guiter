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

export const userPaymentIntent = async (req: Request, res: Response) => {
  const email = res.locals.email;
  const paymentMethod = req.body.paymentMethod;
  const applePayToken = req.body.applePayToken;
  console.log("Payment Method:", paymentMethod);
  console.log("Apple Pay Token:", applePayToken);
  try {
    // 查找用户购物车中物品的信息
    const cartItems = await Cart.findOne({
      where: {
        email: email,
        type: "cart",
      },
    });
    const userItems = await Cartitem.findAll({
      where: { email: email, cartId: cartItems.id },
      attributes: ["cartId", "email", "productId", "quantity"],
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
    if (paymentMethod === "applepay") {
      paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: applePayToken, // 使用Apple Pay生成的token作为payment_method
        confirm: true, // 立即确认支付
      });
    } else {
      // 处理信用卡支付
      paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: paymentMethod, // 前端传递的信用卡 paymentMethodId
        confirm: true,
      });
    }
    // 返回给前端用于完成支付
    res.status(200).send({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    // 如果出现错误，返回错误信息
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const guestPaymentIntent = async (req: Request, res: Response) => {
  const { cart, paymentMethod, applePayToken } = req.body;
  console.log("Payment Method:", paymentMethod);
  console.log("Apple Pay Token:", applePayToken);
  try {
    const calculateTotalPrice = (cart: any[]) => {
      // 使用reduce方法遍历cartItems，计算总价
      const itemPrice = cart.reduce((total, item) => {
        const itemTotal = parseFloat(item.product.price) * item.quantity;
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
    const amount = Math.round(1000 * 100);
    const currency = "cad";
    // 创建一个支付意图
    let paymentIntent: Stripe.PaymentIntent;
    if (paymentMethod === "applepay") {
      paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: applePayToken,
        confirm: true,
      });
    } else {
      // 处理信用卡支付
      paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: paymentMethod,
        confirm: true,
      });
    }
    // 返回给前端用于完成支付
    res.status(200).send({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    // 如果出现错误，返回错误信息
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

// 使用 Secret Key 初始化 Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-09-30.acacia",
});

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount, currency } = req.body;
    // 创建一个支付意图
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // 价格以最小单位表示（如100 表示 $1.00）
      currency,
    });
    // 返回给前端用于完成支付
    res.status(200).send({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
    console.log("Payment Intent Created", paymentIntent);
  } catch (error) {
    // 如果出现错误，返回错误信息
    res.status(500).send({
      success: false,
      message: error.message,
    });
    console.error("Error Creating Payment Intent", error);
  }
};

import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

import Order from "../order/order.model";
import Orderitem from "./orderitem.model";
import Product from "../products/products.model";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-09-30.acacia",
});

// 获取订单详情
export const getOrderDetail = async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findAll({
      where: { id: orderId },
    });
    const paymentIntentId = order[0].paymentIntentId;
    const paymentIntent = (await stripe.paymentIntents.retrieve(
      paymentIntentId
    )) as Stripe.PaymentIntent;
    const latestChargeId =
      typeof paymentIntent.latest_charge === "string"
        ? paymentIntent.latest_charge
        : "";
    const charge = await stripe.charges.retrieve(latestChargeId);
    const type = charge.payment_method_details.type;
    const brand = charge.payment_method_details.card.brand;
    const last4 = charge.payment_method_details.card.last4;
    const bullingName = charge.billing_details.name;
    const bullingAddress = charge.billing_details.address.line1;

    const orderitem = await Orderitem.findAll({
      where: { orderId: orderId },
    });
    const product = await Product.findAll({
      where: { id: orderitem.map((item) => item.productId) },
    });

    const data = order.map((info) => {
      const items = orderitem
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
      const address = {
        name: info.name,
        phone: info.phone,
        address: info.address,
        city: info.city,
        province: info.province,
        postalCode: info.postalCode,
        country: info.country,
      };
      const payment = {
        type: type,
        brand: brand,
        last4: last4,
        billingName: bullingName,
        billingAddress: bullingAddress,
      };

      return {
        orderId: info.id,
        userId: info.userId,
        type: info.type,
        status: info.status,
        data: info.createdAt,
        products: items,
        address: address,
        payment: payment,
      };
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Get order detail error:", error);
    res.status(400).json({ message: error });
  }
};

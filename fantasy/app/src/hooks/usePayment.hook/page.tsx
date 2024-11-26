import { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { PaymentRequest } from "@stripe/stripe-js";
import { userPaymentIntent, guestPaymentIntent } from "../../api/payment/page";

import { Product } from "../../hooks/useCart.hook/context/page";

export const usePayment = () => {
  // 选择支付方式
  const [payment, setPayment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [cardAddress, setCardAddress] = useState<string>("");
  const stripe = useStripe();
  const elements = useElements();

  // 苹果支付请求
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(
    null
  );
  // 初始化 Apple Pay
  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Total",
          amount: 1000, // 金额，最小单位为分
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        } else {
          console.error("设备不支持 Apple Pay");
        }
      });

      // 处理支付请求
      pr.on("paymentmethod", async (ev) => {
        try {
          const { clientSecret } = await userPaymentIntent("Apple Pay");
          const { error, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: ev.paymentMethod.id,
            }
          );

          if (error) {
            console.error("Apple Pay 支付确认失败:", error);
            ev.complete("fail");
          } else if (paymentIntent && paymentIntent.status === "succeeded") {
            console.log("Apple Pay 支付成功");
            ev.complete("success");
          }
        } catch (error) {
          console.error("Apple Pay 支付失败:", error);
          ev.complete("fail");
        }
      });
    }
  }, [stripe]);

  // 处理支付方式变更
  const handlePaymentMethodChange = (method: string) => {
    setPayment(method);
  };

  // 处理登录用户支付
  const handlePayment = async () => {
    if (!stripe || !elements) {
      console.error("Stripe.js 未加载");
      return;
    }
    // 处理信用卡支付
    if (payment === "Credit or Debit card") {
      try {
        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);
        if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
          setError("Please enter card information");
          return;
        }

        const billingDetails = {
          name: cardName,
          address: {
            line1: cardAddress,
          },
        };

        // 确认支付
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: "card",
          card: cardNumberElement,
          billing_details: billingDetails,
        });
        if (error) {
          setError("Failed to create PaymentMethod");
          return;
        }
        console.log("PaymentMethod:", paymentMethod);

        const response = await userPaymentIntent(paymentMethod.id);

        if (response && response.status === "succeeded") {
          console.log("信用卡支付成功:", response);
          return response;
        } else {
          console.error("信用卡支付失败:", response.message);
          setError("Failed to confirm payment, please try again");
        }
      } catch (error) {
        console.error("支付失败:", error);
        setError("Failed to pay, please try again");
      }
    }
  };

  // 处理未登录用户支付
  const handleGuestPayment = async () => {
    const localCartString = localStorage.getItem("cart");
    console.log("localCartString:", localCartString);
    const cartItems: Product[] =
      typeof localCartString === "string" ? JSON.parse(localCartString) : [];
    // 筛选出 type 为 "cart" 的项目
    const filteredCart = cartItems.filter(
      (item: Product) => item.cart.type === "cart"
    );
    console.log("filteredCart:", filteredCart);
    // 将 Product 转换为 string[]
    const cart = filteredCart.map((item) => ({
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      condition: item.product.condition,
    }));
    console.log("cart:", cart);

    if (!stripe || !elements) {
      console.error("Stripe.js 未加载");
      return;
    }

    if (payment === "Credit or Debit card") {
      try {
        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);
        if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
          setError("Please enter card information");
          return;
        }

        // 确认支付
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: "card",
          card: cardNumberElement,
        });
        if (error) {
          console.log("Failed to create PaymentMethod");
          setError("Failed to create PaymentMethod");
          return;
        }
        console.log("PaymentMethod:", paymentMethod);

        const response = await guestPaymentIntent(cart, paymentMethod.id);
        console.log("response:", response);

        if (response && response.status === "succeeded") {
          console.log("未登录用户支付成功:", response);
          return response;
        } else {
          console.error("未登录用户支付确认失败:", response);
          setError("Failed to confirm payment, please try again");
        }
      } catch (error) {
        console.error("未登录用户支付失败:", error);
        setError("Failed to pay, please try again");
      }
    }
  };

  return {
    payment,
    error,
    setCardName,
    setCardAddress,
    handlePaymentMethodChange,
    handlePayment,
    handleGuestPayment,
    paymentRequest, // Apple Pay 支持的请求
  };
};

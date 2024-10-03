// src/hooks/usePayment.tsx
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../api/payment/page";

export const usePayment = (initialAmount: number) => {
  const [amount, setAmount] = useState(initialAmount);
  // 用于追踪支付状态
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  // 使用 useStripe 和 useElements 获取 Stripe.js 对象
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    // 阻止表单默认行为
    event.preventDefault();
    // 检查是否成功加载 Stripe.js
    if (!stripe || !elements) {
      console.error("Stripe.js 未加载");
      return;
    }
    // 获取 CardElement
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error("无法获取 CardElement");
      return;
    }

    try {
      // 调用 paymentService 创建支付意图
      const { clientSecret } = await createPaymentIntent(amount, "cad");
      // 使用 Stripe.js 完成支付
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
      // 处理支付结果
      if (result.error) {
        console.error("支付失败:", result.error);
        setPaymentStatus("failed");
      } else if (result.paymentIntent.status === "succeeded") {
        console.log("支付成功!");
        setPaymentStatus("success");
      }
    } catch (error) {
      console.error("支付过程中出现错误:", error);
      setPaymentStatus("error");
    }
  };

  return {
    amount,
    setAmount,
    paymentStatus,
    handleSubmit,
  };
};

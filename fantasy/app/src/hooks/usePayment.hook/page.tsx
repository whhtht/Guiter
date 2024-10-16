import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
// import { PaymentRequest } from "@stripe/stripe-js";
import { userPaymentIntent, guestPaymentIntent } from "../../api/payment/page";

export const usePayment = () => {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>(""); // 支付方式：信用卡或 Apple Pay
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  // const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(
  //   null
  // );

  // 初始化 Apple Pay
  // useEffect(() => {
  //   if (stripe) {
  //     const pr = stripe.paymentRequest({
  //       country: "US",
  //       currency: "usd",
  //       total: {
  //         label: "Total",
  //         amount: 1000, // 金额，最小单位为分
  //       },
  //       requestPayerName: true,
  //       requestPayerEmail: true,
  //     });

  //     pr.canMakePayment().then((result) => {
  //       if (result) {
  //         setPaymentRequest(pr);
  //       } else {
  //         console.error("设备不支持 Apple Pay");
  //         setPaymentStatus("unsupported");
  //       }
  //     });

  //     // 处理支付请求
  //     pr.on("paymentmethod", async (ev) => {
  //       try {
  //         const { clientSecret } = await userPaymentIntent("Apple Pay");
  //         const { error, paymentIntent } = await stripe.confirmCardPayment(
  //           clientSecret,
  //           {
  //             payment_method: ev.paymentMethod.id,
  //           }
  //         );

  //         if (error) {
  //           console.error("Apple Pay 支付确认失败:", error);
  //           ev.complete("fail");
  //           setPaymentStatus("failed");
  //         } else if (paymentIntent && paymentIntent.status === "succeeded") {
  //           console.log("Apple Pay 支付成功");
  //           ev.complete("success");
  //           setPaymentStatus("success");
  //         }
  //       } catch (error) {
  //         console.error("Apple Pay 支付失败:", error);
  //         setPaymentStatus("error");
  //         ev.complete("fail");
  //       }
  //     });
  //   }
  // }, [stripe]);

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handlePayment = async () => {
    if (!stripe || !elements) {
      console.error("Stripe.js 未加载");
      return;
    }

    if (paymentMethod === "Credit or Debit card") {
      try {
        const { clientSecret } = await userPaymentIntent(paymentMethod);

        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);

        if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
          console.error("无法获取卡片组件");
          return;
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardNumberElement,
            },
          }
        );

        if (error) {
          console.error("支付确认失败:", error);
          setPaymentStatus("failed");
          navigate("/error");
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
          console.log("支付成功");
          setPaymentStatus("success");
          navigate("/success");
        }
      } catch (error) {
        console.error("支付失败:", error);
        setPaymentStatus("error");
      }
    }
  };

  const handleGuestPayment = async () => {
    const localCartString = localStorage.getItem("cart");
    const cart =
      typeof localCartString === "string" ? JSON.parse(localCartString) : [];
    if (!stripe || !elements) {
      console.error("Stripe.js 未加载");
      return;
    }
    if (paymentMethod === "Credit or Debit card") {
      try {
        const { clientSecret } = await guestPaymentIntent(cart, paymentMethod);
        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);
        if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
          console.error("无法获取卡片组件");
          return;
        }
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardNumberElement,
            },
          }
        );
        if (error) {
          console.error("支付确认失败:", error);
          setPaymentStatus("failed");
          navigate("/error");
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
          console.log("支付成功");
          setPaymentStatus("success");
          navigate("/success");
        }
      } catch (error) {
        console.error("支付失败:", error);
        setPaymentStatus("error");
      }
    }
  };

  return {
    paymentMethod,
    handlePaymentMethodChange,
    paymentStatus,
    handlePayment,
    handleGuestPayment,
    // paymentRequest, // Apple Pay 支持的请求
  };
};

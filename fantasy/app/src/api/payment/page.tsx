import apiClient from "../refreshToken/page";
import { API_URL } from "../url/page";

// 创建登录支付意图
export const userPaymentIntent = async (paymentMethodId: string) => {
  try {
    const response = await apiClient.post(`${API_URL}/payment/user`, {
      paymentMethodId,
    });
    console.log("创建支付成功:", response.data);
    return response.data;
  } catch (error) {
    console.error("创建支付失败:", error);
    throw error;
  }
};

// 创建未登录支付意图
export const guestPaymentIntent = async (
  cart: { name: string; price: string; quantity: number; condition: string }[],
  paymentMethodId: string
) => {
  try {
    const response = await apiClient.post(`${API_URL}/payment/guest`, {
      cart,
      paymentMethodId,
    });
    console.log("创建支付成功:", response.data);
    return response.data;
  } catch (error) {
    console.error("创建支付失败:", error);
    throw error;
  }
};

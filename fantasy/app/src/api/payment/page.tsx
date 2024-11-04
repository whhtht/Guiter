import apiClient from "../refreshToken/page";
import { API_URL } from "../url/page";

// 创建登录支付意图
export const userPaymentIntent = async (paymentMethod: string) => {
  try {
    const response = await apiClient.post(`${API_URL}/payment/user`, {
      paymentMethod,
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
  cart: string,
  paymentMethod: string
) => {
  try {
    const response = await apiClient.post(`${API_URL}/payment/guest`, {
      cart,
      paymentMethod,
    });
    console.log("创建支付成功:", response.data);
    return response.data;
  } catch (error) {
    console.error("创建支付失败:", error);
    throw error;
  }
};

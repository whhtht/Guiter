import axios from "axios";

const API_URL = "http://localhost:3000/api";

// 创建支付意图
export const createPaymentIntent = async (amount: number, currency: string) => {
  try {
    const response = await axios.post(`${API_URL}/payment/`, {
      amount,
      currency,
    });
    return response.data;
  } catch (error) {
    console.error("创建支付失败:", error);
    throw error;
  }
};

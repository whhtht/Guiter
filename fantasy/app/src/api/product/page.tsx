import axios from "axios";
import { API_URL } from "../url/page";

interface AxiosErrorResponse {
  response?: {
    data: {
      status: number;
      message: string;
    };
  };
}

// 获取产品
export const getProduct = async (name: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/product/${encodeURIComponent(name)}`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    console.error("Get product error:", axiosError);
    throw new Error(axiosError.response?.data.message);
  }
};

// 获取产品列表
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/product`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    console.error("Get product list error:", axiosError);
    throw new Error(axiosError.response?.data.message);
  }
};

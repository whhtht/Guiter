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

// 搜索产品
export const searchProducts = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}/product/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    throw new Error(axiosError.response?.data.message);
  }
};

// 获取产品
export const getProduct = async (name: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/product/item/${encodeURIComponent(name)}`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    throw new Error(axiosError.response?.data.message);
  }
};

// 从数据库中筛选产品
export const queryProduct = async (filters = {}) => {
  try {
    const response = await axios.get(`${API_URL}/product/query`, {
      params: filters, // 将筛选条件作为查询参数传递
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    throw new Error(axiosError.response?.data.message);
  }
};

import apiClient from "../refreshToken/page";
import { API_URL } from "../url/page";

// 获取购物车ID
export const getCartName = async () => {
  try {
    const response = await apiClient.get(`${API_URL}/cartitem/`);
    return response;
  } catch (error) {
    console.error("获取购物车名字失败:", error);
    throw error;
  }
};

// 添加物品到购物车
export const postCartitem = async (productName: string) => {
  try {
    const response = await apiClient.post(`${API_URL}/cartitem/`, {
      productName,
    });
    return response.data;
  } catch (error) {
    console.error("添加物品到购物车失败:", error);
    throw error;
  }
};

// 添加本地物品到购物车
export const postLocalCartitem = async (
  productName: string,
  type: string,
  quantity: number
) => {
  try {
    const response = await apiClient.post(`${API_URL}/cartitem/local`, {
      productName,
      type,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("添加本地物品到购物车失败:", error);
    throw error;
  }
};

// 修改购物车状态
export const putCartitemStatus = async (productName: string, type: string) => {
  try {
    const response = await apiClient.put(`${API_URL}/cartitem/status`, {
      productName,
      type,
    });
    return response.data;
  } catch (error) {
    console.error("修改购物车状态失败:", error);
    throw error;
  }
};

// 修改购物车物品数量
export const putCartitem = async (productName: string) => {
  try {
    const response = await apiClient.put(`${API_URL}/cartitem/`, {
      productName,
    });
    return response.data;
  } catch (error) {
    console.error("修改购物车物品数量失败:", error);
    throw error;
  }
};

// 从购物车中删除物品
export const deleteCartitem = async (productName: string) => {
  try {
    const encodedProductName = encodeURIComponent(productName);
    const response = await apiClient.delete(
      `${API_URL}/cartitem/${encodedProductName}`
    );
    console.log("Product deleted from cart:", productName);
    return response.data;
  } catch (error) {
    console.error("从购物车中删除物品失败:", error);
    throw error;
  }
};

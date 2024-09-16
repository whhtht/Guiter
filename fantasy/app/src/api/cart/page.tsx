import apiClient from "../refreshToken/page";
const API_URL = "http://localhost:3000/api";

// 添加物品到购物车
export const postCart = async (productName: string) => {
  try {
    const response = await apiClient.post(`${API_URL}/cart/`, {
      productName,
    });
    return response.data;
  } catch (error) {
    console.error("添加到购物车失败:", error);
    throw error;
  }
};

// 修改购物车物品数量
export const putCart = async (productName: string) => {
  try {
    const response = await apiClient.put(`${API_URL}/cart/`, {
      productName,
    });
    return response.data;
  } catch (error) {
    console.error("修改购物车物品数量失败:", error);
    throw error;
  }
};

// 从购物车中删除物品
export const deleteCart = async (productName: string) => {
  try {
    const encodedProductName = encodeURIComponent(productName);
    const response = await apiClient.delete(`${API_URL}/cart/${encodedProductName}`);
    console.log("Product deleted from cart:", productName);
    return response.data;
  } catch (error) {
    console.error("从购物车中删除物品失败:", error);
    throw error;
  }
};

// 获取购物车ID
export const getCartId = async () => {
  try {
    const response = await apiClient.get(`${API_URL}/cart`);
    return response;
  } catch (error) {
    console.error("获取购物车ID失败:", error);
    throw error;
  }
};

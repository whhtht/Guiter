import apiClient from "../refreshToken/page";
import { API_URL } from "../url/page";

interface AxiosErrorResponse {
  response?: {
    data: {
      status: number;
      message: string;
    };
  };
}

// 登录用户配送
export const postUserDeliver = async (
  paymentIntentId: string,
  name: string,
  email: string,
  phone: string,
  total: string,
  type: string,
  address: string,
  country: string,
  province: string,
  city: string,
  postalCode: string
) => {
  try {
    const response = await apiClient.post(`${API_URL}/order/deliver`, {
      paymentIntentId,
      name,
      email,
      phone,
      total,
      type,
      address,
      country,
      province,
      city,
      postalCode,
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    console.error("Post deliver error:", axiosError);
    throw new Error(axiosError.response?.data.message);
  }
};

// 未登录用户配送
export const postGuestDeliver = async (
  cart: { name: string; price: string; quantity: number; condition: string }[],
  paymentIntentId: string,
  name: string,
  email: string,
  phone: string,
  total: string,
  type: string,
  address: string,
  country: string,
  province: string,
  city: string,
  postalCode: string
) => {
  try {
    const response = await apiClient.post(`${API_URL}/order/guestdeliver`, {
      cart,
      paymentIntentId,
      name,
      email,
      phone,
      total,
      type,
      address,
      country,
      province,
      city,
      postalCode,
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    console.error("Post guest deliver error:", axiosError);
    throw new Error(axiosError.response?.data.message);
  }
};

// 登录用户自提
export const postUserPickup = async (
  paymentIntentId: string,
  name: string,
  email: string,
  phone: string,
  total: string,
  type: string
) => {
  try {
    const response = await apiClient.post(`${API_URL}/order/pickup`, {
      paymentIntentId,
      name,
      email,
      phone,
      total,
      type,
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    console.error("Post pickup error:", axiosError);
    throw new Error(axiosError.response?.data.message);
  }
};

// 未登录用户自提
export const postGuestPickup = async (
  cart: { name: string; price: string; quantity: number; condition: string }[],
  paymentIntentId: string,
  name: string,
  email: string,
  phone: string,
  total: string,
  type: string
) => {
  try {
    const response = await apiClient.post(`${API_URL}/order/guestpickup`, {
      cart,
      paymentIntentId,
      name,
      email,
      phone,
      total,
      type,
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    console.error("Post guest pickup error:", axiosError);
    throw new Error(axiosError.response?.data.message);
  }
};

// 获取用户订单
export const getUserOrders = async () => {
  try {
    const response = await apiClient.get(`${API_URL}/order/userorders`);
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    console.error("Get user orders error:", axiosError);
    throw new Error(axiosError.response?.data.message);
  }
};

// 获取订单详情
export const getOrderDetail = async (ordernumber: string) => {
  try {
    const response = await apiClient.post(`${API_URL}/orderitem/detail`, {
      orderId: ordernumber,
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    console.error("Get order detail error:", axiosError);
    throw new Error(axiosError.response?.data.message);
  }
};

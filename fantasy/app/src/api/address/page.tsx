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

// 获取地址列表
export const getAddress = async () => {
  try {
    const response = await apiClient.get(`${API_URL}/address/getAddress`);
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    throw new Error(axiosError.response?.data.message);
  }
};

// 上传地址列表
export const postAddress = async (
  name: string,
  phone: string,
  address: string,
  country: string,
  province: string,
  city: string,
  postalCode: string
) => {
  try {
    const response = await apiClient.post(`${API_URL}/address/postAddress`, {
      name,
      phone,
      address,
      country,
      province,
      city,
      postalCode,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    console.error("Get product error:", axiosError);
    throw new Error(axiosError.response?.data.message);
  }
};

// 修改地址列表
export const changeAddress = async (
  newname: string,
  newphone: string,
  newaddress: string,
  newcountry: string,
  newprovince: string,
  newcity: string,
  newpostalcode: string
) => {
  try {
    const response = await apiClient.post(`${API_URL}/address/changeAddress`, {
      newname,
      newphone,
      newaddress,
      newcountry,
      newprovince,
      newcity,
      newpostalcode,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    console.error("Get product error:", axiosError);
    throw new Error(axiosError.response?.data.message);
  }
};

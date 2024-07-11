import axios from 'axios';

const API_URL = 'http://localhost:3000'; // 替换为你的后端API地址

interface AxiosErrorResponse {
  response?: {
    data: unknown;
  };
}

export const signUp = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    throw axiosError.response?.data || 'Sign up failed';
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    throw axiosError.response?.data || 'Sign in failed';
  }
};

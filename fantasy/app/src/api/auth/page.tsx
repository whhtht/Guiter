import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

interface AxiosErrorResponse {
  response?: {
    data: {
      status: number;
      data:{message: string;}
    };
  };
}

export const signUp = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    throw axiosError.response || { status: 500, message: 'Sign up failed' };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    throw axiosError.response || { status: 500, message: 'Sign in failed' };
  }
};

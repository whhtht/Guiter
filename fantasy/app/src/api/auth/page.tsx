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

// 检查用户是否存在
export const checkUser = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/checkUser`, {
      email,
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    console.error("Check user error:", axiosError);
    throw new Error(axiosError.response?.data.message);
  }
};

// 注册
export const signUp = async (email: string, password: string, name: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signUp`, {
      email,
      password,
      name,
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    console.error("Sign up error:", axiosError);
    throw new Error(axiosError.response?.data.message);
  }
};

// 验证注册验证码
export const verifySignUpCode = async (email: string, code: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/verifySignUpCode`, {
      email,
      code,
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    console.error("Verify sign up code error:", axiosError);
    throw new Error(axiosError.response?.data.message);
  }
};

// 重新发送注册验证码
export const resendSignUpCode = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/resendSignUpCode`, {
      email,
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    console.error("Resend sign up code error:", axiosError);
    throw new Error(axiosError.response?.data.message);
  }
};

// 登录
export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signIn`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    throw new Error(axiosError.response?.data.message);
  }
};

// 发送和重发重置密码验证码
export const resetCode = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/resetCode`, {
      email,
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    throw new Error(axiosError.response?.data.message);
  }
};

// 验证重置密码验证码
export const verifyResetCode = async (email: string, code: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/verifyResetCode`, {
      email,
      code,
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    throw new Error(axiosError.response?.data.message);
  }
};

// 重置密码
export const resetPassword = async (email: string, newpassword: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/resetPassword`, {
      email,
      newpassword,
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    throw new Error(axiosError.response?.data.message);
  }
};

// Magic Link
export const magicLink = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/magicLink`, {
      email,
    });
    console.log(`Magic link sent to ${email}`);
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    throw new Error(axiosError.response?.data.message);
  }
};

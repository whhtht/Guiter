import axios from "axios";

const API_URL = "http://localhost:3000/api";

interface AxiosErrorResponse {
  response?: {
    data: {
      status: number;
      message: string;
    };
  };
}

// 注册
export const signUp = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signUp`, {
      email,
      password,
    });
    console.log("Sign up response:", response);
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    console.error("Sign up error:", axiosError);
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

// 忘记密码
export const forgetPassword = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgetPassword`, {
      email,
    });
    console.log("Check email response:", response);
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    throw new Error(axiosError.response?.data.message);
  }
};

// 重置密码代码
export const resetPasswordCode = async (email: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/forgetPassword/resetPasswordCode`,
      {
        email,
      }
    );
    console.log("Reset password code response:", response);
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    throw new Error(axiosError.response?.data.message);
  }
};

// 重置密码
export const resetPassword = async (
  email: string,
  code: string,
  newPassword: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/forgetPassword/resetPassword`,
      {
        email,
        code,
        newPassword,
      }
    );
    console.log("Reset password response:", response);
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    throw new Error(axiosError.response?.data.message);
  }
};

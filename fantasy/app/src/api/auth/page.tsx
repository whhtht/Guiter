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

const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID as string;
const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN as string;
const redirectUri = import.meta.env.VITE_COGNITO_REDIRECT_URI as string;
const signOutRedirectUri = import.meta.env
  .VITE_COGNITO_SIGNOUT_REDIRECT_URI as string;

// 第三方登录链接
export const googleLoginUrl = `${cognitoDomain}/authorize?client_id=${clientId}&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=${redirectUri}&identity_provider=Google`;
export const facebookLoginUrl = `${cognitoDomain}/authorize?client_id=${clientId}&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=${redirectUri}&identity_provider=Facebook`;
export const cognitoSignOutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
  signOutRedirectUri
)}`;

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
    console.error("注册error:", axiosError.response?.data.message);
    throw axiosError.response?.data.message;
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

// 第三方登录 callback
export const threePartyLogin = async (code: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/threePartyLogin",
      { code }
    );
    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    throw new Error(axiosError.response?.data.message);
  }
};

// Magic Link 登录
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

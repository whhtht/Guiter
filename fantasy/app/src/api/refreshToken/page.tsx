import axios from "axios";

// 获取API URL
import { API_URL } from "../url/page";

// 创建 Axios 实例
const apiClient = axios.create({
  baseURL: API_URL,
});

// 检查 token 是否过期的辅助函数
function isTokenExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split(".")[1]));
  // 检查 token 的过期时间是否小于当前时间
  const currentTime = Math.floor(Date.now() / 1000);
  // 如果 token 过期时间小于当前时间，返回 true
  return payload.exp < currentTime;
}

// 添加请求拦截器
apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    // 只有在 localStorage 中有 token 的情况下才处理拦截器逻辑
    if (accessToken && refreshToken) {
      // 检查 accessToken 是否已过期
      if (isTokenExpired(accessToken)) {
        try {
          // 调用后端刷新 token API
          const response = await axios.post(`${API_URL}/auth/refreshToken`, {
            refreshToken,
          });
          // 从响应中获取新的 token
          const { accessToken: newAccessToken, idToken: newIdToken } =
            response.data;
          // 更新 localStorage 中的 token
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("idToken", newIdToken);
          // 设置新的 Authorization 头
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        } catch (error) {
          console.error("Token refresh failed:", error);
        }
      } else {
        // 如果 accessToken 还没过期，直接使用它
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;

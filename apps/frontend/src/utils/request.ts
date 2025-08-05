import axios, { CreateAxiosDefaults } from 'axios';
import { toast } from 'sonner';

const config: CreateAxiosDefaults = {
  baseURL: '/api',
  timeout: 5000,
};

export const request = axios.create(config);

// 自动将本地存储的 token 添加到请求头
request.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

// 如果返回权限不足，跳转到登录页
request.interceptors.response.use(
  response => {
    const data = response.data;
    if (data.error) {
      toast.error(data.error);
    }
    if (data.message) {
      toast.success(data.message);
    }
    return data;
  },
  error => {
    if (error.response.status === 401) {
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

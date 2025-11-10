/**
 * BaseService - API 服务基类
 *
 * 所有 API 服务继承此类，提供统一的：
 * - 请求拦截（添加 Token）
 * - 响应拦截（统一错误处理）
 * - 类型安全的请求方法
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export abstract class BaseService {
  protected axios: AxiosInstance;

  constructor(baseURL?: string) {
    this.axios = axios.create({
      baseURL: baseURL || import.meta.env.VITE_API_BASE_URL || '/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 请求拦截器：添加 JWT Token
    this.axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 响应拦截器：统一错误处理
    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // 未授权，清除 token
          localStorage.removeItem('token');
          // 可以在这里触发跳转登录的逻辑
          // window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axios.get<T>(url, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: error.response?.data?.code || 'UNKNOWN_ERROR',
          message: error.response?.data?.message || error.message || '请求失败',
        },
      };
    }
  }

  protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axios.post<T>(url, data, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: error.response?.data?.code || 'UNKNOWN_ERROR',
          message: error.response?.data?.message || error.message || '请求失败',
        },
      };
    }
  }

  protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axios.put<T>(url, data, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: error.response?.data?.code || 'UNKNOWN_ERROR',
          message: error.response?.data?.message || error.message || '请求失败',
        },
      };
    }
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axios.delete<T>(url, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: error.response?.data?.code || 'UNKNOWN_ERROR',
          message: error.response?.data?.message || error.message || '请求失败',
        },
      };
    }
  }
}

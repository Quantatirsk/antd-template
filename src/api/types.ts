/**
 * API 类型定义
 *
 * 所有 API 接口的类型定义
 */

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

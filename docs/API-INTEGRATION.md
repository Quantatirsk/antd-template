# API 集成指南

## 概述

本文档介绍项目中的 API 集成模式，包括 BaseService 设计、错误处理、类型安全等最佳实践。

---

## 1. BaseService 架构

### 1.1 设计理念

- **继承式设计**：所有 API 服务继承自 BaseService
- **统一拦截器**：自动添加 Token、统一错误处理
- **类型安全**：全程 TypeScript 类型检查
- **统一响应格式**：ApiResponse<T> 包装所有响应

### 1.2 BaseService 实现

```typescript
// api/base.ts
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
          // 未授权，跳转登录
          localStorage.removeItem('token');
          window.location.href = '/login';
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
          message: error.response?.data?.message || '请求失败',
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
          message: error.response?.data?.message || '请求失败',
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
          message: error.response?.data?.message || '请求失败',
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
          message: error.response?.data?.message || '请求失败',
        },
      };
    }
  }
}
```

---

## 2. API 服务实现

### 2.1 定义类型

```typescript
// api/types.ts
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived';
  createdAt: string;
}

export interface CreateDatasetRequest {
  name: string;
  description?: string;
}
```

### 2.2 实现 API 服务

```typescript
// api/datasets.ts
import { BaseService, ApiResponse } from './base';
import { Dataset, CreateDatasetRequest } from './types';

class DatasetsService extends BaseService {
  /**
   * 获取数据集列表
   */
  async getDatasets(): Promise<ApiResponse<{ datasets: Dataset[] }>> {
    return this.get('/datasets');
  }

  /**
   * 获取单个数据集详情
   */
  async getDataset(id: string): Promise<ApiResponse<Dataset>> {
    return this.get(`/datasets/${id}`);
  }

  /**
   * 创建数据集
   */
  async createDataset(data: CreateDatasetRequest): Promise<ApiResponse<{ dataset_id: string }>> {
    return this.post('/datasets', data);
  }

  /**
   * 更新数据集
   */
  async updateDataset(id: string, data: Partial<Dataset>): Promise<ApiResponse<void>> {
    return this.put(`/datasets/${id}`, data);
  }

  /**
   * 删除数据集
   */
  async deleteDataset(id: string): Promise<ApiResponse<void>> {
    return this.delete(`/datasets/${id}`);
  }

  /**
   * 批量删除数据集
   */
  async batchDeleteDatasets(ids: string[]): Promise<ApiResponse<void>> {
    return this.post('/datasets/batch-delete', { ids });
  }
}

export const datasetsAPI = new DatasetsService();
```

---

## 3. Zustand Store 集成

### 3.1 Store 设计

```typescript
// stores/datasetStore.ts
import { create } from 'zustand';
import { datasetsAPI } from '@/api';
import type { Dataset } from '@/api/types';

interface DatasetState {
  // State
  datasets: Dataset[];
  currentDataset: Dataset | null;
  loading: boolean;
  error: Error | null;

  // Actions
  fetchDatasets: () => Promise<void>;
  fetchDataset: (id: string) => Promise<void>;
  createDataset: (data: CreateDatasetRequest) => Promise<string | null>;
  updateDataset: (id: string, data: Partial<Dataset>) => Promise<boolean>;
  deleteDataset: (id: string) => Promise<boolean>;
  clearError: () => void;
}

export const useDatasetStore = create<DatasetState>((set, get) => ({
  datasets: [],
  currentDataset: null,
  loading: false,
  error: null,

  fetchDatasets: async () => {
    set({ loading: true, error: null });

    const response = await datasetsAPI.getDatasets();

    if (response.success) {
      set({ datasets: response.data.datasets, loading: false });
    } else {
      set({ error: new Error(response.error.message), loading: false });
    }
  },

  fetchDataset: async (id: string) => {
    set({ loading: true, error: null });

    const response = await datasetsAPI.getDataset(id);

    if (response.success) {
      set({ currentDataset: response.data, loading: false });
    } else {
      set({ error: new Error(response.error.message), loading: false });
    }
  },

  createDataset: async (data: CreateDatasetRequest) => {
    set({ loading: true, error: null });

    const response = await datasetsAPI.createDataset(data);

    if (response.success) {
      set({ loading: false });
      // 刷新列表
      get().fetchDatasets();
      return response.data.dataset_id;
    } else {
      set({ error: new Error(response.error.message), loading: false });
      return null;
    }
  },

  updateDataset: async (id: string, data: Partial<Dataset>) => {
    set({ loading: true, error: null });

    const response = await datasetsAPI.updateDataset(id, data);

    if (response.success) {
      set({ loading: false });
      // 刷新列表
      get().fetchDatasets();
      return true;
    } else {
      set({ error: new Error(response.error.message), loading: false });
      return false;
    }
  },

  deleteDataset: async (id: string) => {
    set({ loading: true, error: null });

    const response = await datasetsAPI.deleteDataset(id);

    if (response.success) {
      set({ loading: false });
      // 从列表中移除
      set((state) => ({
        datasets: state.datasets.filter((d) => d.id !== id),
      }));
      return true;
    } else {
      set({ error: new Error(response.error.message), loading: false });
      return false;
    }
  },

  clearError: () => set({ error: null }),
}));
```

---

## 4. 页面中使用

### 4.1 列表页

```typescript
function DatasetsListPage() {
  const { datasets, loading, error, fetchDatasets, deleteDataset } = useDatasetStore();

  useEffect(() => {
    fetchDatasets();
  }, [fetchDatasets]);

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '此操作不可撤销',
      onOk: async () => {
        const success = await deleteDataset(id);
        if (success) {
          message.success('删除成功');
        } else {
          message.error('删除失败');
        }
      },
    });
  };

  if (loading) return <LoadingState mode="skeleton" />;
  if (error) return <ErrorState error={error} onRetry={fetchDatasets} />;
  if (datasets.length === 0) return <EmptyState type="dataset" />;

  return (
    <List
      dataSource={datasets}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button onClick={() => navigate(`/datasets/${item.id}`)}>查看</Button>,
            <Button onClick={() => handleDelete(item.id)} danger>删除</Button>,
          ]}
        >
          <List.Item.Meta title={item.name} description={item.description} />
        </List.Item>
      )}
    />
  );
}
```

### 4.2 创建表单

```typescript
function CreateDatasetModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form] = Form.useForm();
  const { createDataset } = useDatasetStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: CreateDatasetRequest) => {
    setLoading(true);
    const id = await createDataset(values);
    setLoading(false);

    if (id) {
      message.success('创建成功');
      form.resetFields();
      onClose();
    } else {
      message.error('创建失败');
    }
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="name"
          label="名称"
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="描述">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            创建
          </Button>
          <Button onClick={onClose} style={{ marginLeft: designSystem.spacing[2] }}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
```

---

## 5. 错误处理

### 5.1 错误类型

```typescript
export enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export class ApiError extends Error {
  constructor(
    public code: ErrorCode,
    public message: string,
    public details?: any
  ) {
    super(message);
  }
}
```

### 5.2 统一错误处理

```typescript
// utils/error.ts
export function handleApiError(error: any): void {
  if (error.response) {
    // 服务器返回错误
    switch (error.response.status) {
      case 400:
        message.error('请求参数错误');
        break;
      case 401:
        message.error('未授权，请重新登录');
        break;
      case 403:
        message.error('没有权限');
        break;
      case 404:
        message.error('资源不存在');
        break;
      case 500:
        message.error('服务器错误');
        break;
      default:
        message.error('请求失败');
    }
  } else if (error.request) {
    // 网络错误
    message.error('网络错误，请检查网络连接');
  } else {
    // 其他错误
    message.error(error.message || '未知错误');
  }
}
```

---

## 6. 高级功能

### 6.1 请求取消

```typescript
import { CancelToken } from 'axios';

class DatasetsService extends BaseService {
  private cancelToken: CancelToken | null = null;

  async searchDatasets(query: string): Promise<ApiResponse<Dataset[]>> {
    // 取消上一次请求
    if (this.cancelToken) {
      this.cancelToken.cancel('New request initiated');
    }

    const source = axios.CancelToken.source();
    this.cancelToken = source;

    return this.get('/datasets/search', {
      params: { q: query },
      cancelToken: source.token,
    });
  }
}
```

### 6.2 请求重试

```typescript
import axios-retry from 'axios-retry';

constructor() {
  super();

  // 配置请求重试
  axiosRetry(this.axios, {
    retries: 3,  // 重试 3 次
    retryDelay: axiosRetry.exponentialDelay,  // 指数退避
    retryCondition: (error) => {
      // 仅在网络错误或 5xx 错误时重试
      return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
             error.response?.status >= 500;
    },
  });
}
```

### 6.3 请求缓存

```typescript
import { setupCache } from 'axios-cache-interceptor';

constructor() {
  super();

  // 配置请求缓存
  setupCache(this.axios, {
    ttl: 5 * 60 * 1000,  // 缓存 5 分钟
    methods: ['get'],    // 仅缓存 GET 请求
  });
}
```

---

## 7. 测试

### 7.1 Mock API

```typescript
// api/__mocks__/datasets.ts
export const datasetsAPI = {
  getDatasets: jest.fn(() => Promise.resolve({
    success: true,
    data: {
      datasets: [
        { id: '1', name: 'Dataset 1', description: '...', status: 'active' },
        { id: '2', name: 'Dataset 2', description: '...', status: 'archived' },
      ],
    },
  })),

  createDataset: jest.fn(() => Promise.resolve({
    success: true,
    data: { dataset_id: '3' },
  })),

  deleteDataset: jest.fn(() => Promise.resolve({
    success: true,
  })),
};
```

### 7.2 测试用例

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useDatasetStore } from '@/stores/datasetStore';

jest.mock('@/api/datasets');

test('fetchDatasets', async () => {
  const { result } = renderHook(() => useDatasetStore());

  await waitFor(() => result.current.fetchDatasets());

  expect(result.current.datasets).toHaveLength(2);
  expect(result.current.loading).toBe(false);
});
```

---

## 8. 最佳实践

### 8.1 类型安全
- ✅ 所有 API 响应都定义 TypeScript 类型
- ✅ 使用泛型确保类型推导

### 8.2 错误处理
- ✅ 统一的错误格式
- ✅ 友好的错误提示
- ✅ 错误日志上报

### 8.3 性能优化
- ✅ 请求缓存（GET 请求）
- ✅ 请求去重（搜索场景）
- ✅ 请求取消（组件卸载）

### 8.4 安全
- ✅ HTTPS 传输
- ✅ JWT Token 认证
- ✅ XSS/CSRF 防护

---

## 参考资源

- [Axios 文档](https://axios-http.com/)
- [Zustand 文档](https://docs.pmnd.rs/zustand)
- [TypeScript 类型体操](https://github.com/type-challenges/type-challenges)

# 交互模式文档

## 概述

本文档介绍项目中的标准交互模式，包括数据加载、搜索筛选、表单操作等。

---

## 1. 数据加载模式

### 1.1 标准加载流程

```typescript
function DataPage() {
  const [data, setData] = useState<DataType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const response = await api.getData();

      if (response.success) {
        setData(response.data);
      } else {
        setError(new Error(response.error.message));
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <LoadingState mode="skeleton" rows={5} />;
  if (error) return <ErrorState error={error} onRetry={fetchData} />;
  if (!data || data.length === 0) return <EmptyState type="dataset" />;

  return <DataView data={data} />;
}
```

### 1.2 使用 Zustand Store

```typescript
function DataPage() {
  const { data, loading, error, fetchData } = useDataStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={fetchData} />;
  if (!data) return <EmptyState />;

  return <DataView data={data} />;
}
```

### 1.3 分页加载

```typescript
function ListPage() {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 20;

  const fetchPage = async (pageNum: number) => {
    setLoading(true);
    const response = await api.getList({ page: pageNum, pageSize });
    if (response.success) {
      setData(response.data.items);
      setTotal(response.data.total);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPage(page);
  }, [page]);

  return (
    <>
      {loading ? (
        <LoadingState mode="skeleton" />
      ) : (
        <List dataSource={data} renderItem={...} />
      )}
      <Pagination
        current={page}
        pageSize={pageSize}
        total={total}
        onChange={setPage}
      />
    </>
  );
}
```

### 1.4 无限滚动

```typescript
function InfiniteList() {
  const [data, setData] = useState<Item[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = async () => {
    const response = await api.getList({ page, pageSize: 20 });
    if (response.success) {
      setData(prev => [...prev, ...response.data.items]);
      setHasMore(response.data.hasMore);
      setPage(prev => prev + 1);
    }
  };

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<LoadingState mode="spin" />}
    >
      {data.map(item => <ItemCard key={item.id} data={item} />)}
    </InfiniteScroll>
  );
}
```

---

## 2. 搜索/筛选模式

### 2.1 实时搜索（防抖）

```typescript
import { useDebounce } from '@/hooks';

function SearchPage() {
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 500);

  useEffect(() => {
    if (debouncedSearch) {
      performSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <Input.Search
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      placeholder="搜索..."
    />
  );
}
```

### 2.2 组合筛选

```typescript
function FilterableList() {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      // 搜索文本
      const matchSearch = item.name.includes(searchText);

      // 状态筛选
      const matchStatus = statusFilter === 'all' || item.status === statusFilter;

      // 日期范围
      const matchDate = !dateRange ||
        (item.createdAt >= dateRange[0] && item.createdAt <= dateRange[1]);

      return matchSearch && matchStatus && matchDate;
    });
  }, [data, searchText, statusFilter, dateRange]);

  return (
    <>
      {/* 筛选器 */}
      <div style={{ marginBottom: designSystem.spacing[4] }}>
        <Input.Search
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="搜索..."
          style={{ width: 240, marginRight: designSystem.spacing[2] }}
        />
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          style={{ width: 120, marginRight: designSystem.spacing[2] }}
          options={[
            { label: '全部', value: 'all' },
            { label: '活跃', value: 'active' },
            { label: '归档', value: 'archived' },
          ]}
        />
        <DatePicker.RangePicker onChange={setDateRange} />
      </div>

      {/* 结果列表 */}
      <List dataSource={filteredData} renderItem={...} />
    </>
  );
}
```

### 2.3 URL 状态同步

```typescript
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchText = searchParams.get('q') || '';
  const status = searchParams.get('status') || 'all';

  const updateSearch = (newSearch: string) => {
    setSearchParams({ q: newSearch, status });
  };

  const updateStatus = (newStatus: string) => {
    setSearchParams({ q: searchText, status: newStatus });
  };

  // ...
}
```

---

## 3. 表单操作模式

### 3.1 创建表单

```typescript
function CreateForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const response = await api.create(values);

    if (response.success) {
      message.success('创建成功');
      form.resetFields();
      onClose?.();
    } else {
      message.error(response.error.message);
    }

    setLoading(false);
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="name"
        label="名称"
        rules={[{ required: true, message: '请输入名称' }]}
      >
        <Input />
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
  );
}
```

### 3.2 编辑表单

```typescript
function EditForm({ initialData }: { initialData: DataType }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue(initialData);
  }, [initialData, form]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const response = await api.update(initialData.id, values);

    if (response.success) {
      message.success('保存成功');
      onClose?.();
    } else {
      message.error(response.error.message);
    }

    setLoading(false);
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical" initialValues={initialData}>
      {/* 表单字段 */}
    </Form>
  );
}
```

### 3.3 表单验证

```typescript
<Form.Item
  name="email"
  label="邮箱"
  rules={[
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '请输入有效的邮箱地址' },
  ]}
>
  <Input />
</Form.Item>

<Form.Item
  name="password"
  label="密码"
  rules={[
    { required: true, message: '请输入密码' },
    { min: 8, message: '密码至少 8 位' },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: '密码必须包含大小写字母和数字',
    },
  ]}
>
  <Input.Password />
</Form.Item>
```

---

## 4. 删除确认模式

### 4.1 基本确认

```typescript
const handleDelete = (id: string) => {
  Modal.confirm({
    title: '确认删除',
    content: '此操作不可撤销，确定要删除吗？',
    okText: '删除',
    okType: 'danger',
    cancelText: '取消',
    onOk: async () => {
      const response = await api.delete(id);
      if (response.success) {
        message.success('删除成功');
        fetchData();
      } else {
        message.error(response.error.message);
      }
    },
  });
};
```

### 4.2 二次确认（输入名称）

```typescript
const handleDangerousDelete = (item: DataType) => {
  Modal.confirm({
    title: '危险操作',
    content: (
      <>
        <p>此操作将<strong>永久删除</strong>数据集 "{item.name}"，且不可恢复。</p>
        <p>请输入数据集名称以确认：</p>
        <Input id="confirm-input" placeholder={item.name} />
      </>
    ),
    okText: '删除',
    okType: 'danger',
    okButtonProps: { disabled: true },
    onOk: async () => {
      const input = document.getElementById('confirm-input') as HTMLInputElement;
      if (input?.value === item.name) {
        await api.delete(item.id);
        message.success('删除成功');
      } else {
        message.error('名称不匹配');
        return Promise.reject();
      }
    },
  });
};
```

---

## 5. 批量操作模式

### 5.1 选择 + 批量操作

```typescript
function BatchOperationList() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const rowSelection = {
    selectedRowKeys: selectedKeys,
    onChange: setSelectedKeys,
  };

  const handleBatchDelete = () => {
    Modal.confirm({
      title: `确认删除 ${selectedKeys.length} 项？`,
      content: '此操作不可撤销',
      onOk: async () => {
        await api.batchDelete(selectedKeys);
        message.success('删除成功');
        setSelectedKeys([]);
        fetchData();
      },
    });
  };

  return (
    <>
      {/* 批量操作栏 */}
      {selectedKeys.length > 0 && (
        <div style={{ marginBottom: designSystem.spacing[4] }}>
          <span>已选中 {selectedKeys.length} 项</span>
          <Button
            onClick={handleBatchDelete}
            danger
            style={{ marginLeft: designSystem.spacing[2] }}
          >
            批量删除
          </Button>
          <Button onClick={() => setSelectedKeys([])}>取消选择</Button>
        </div>
      )}

      {/* 表格 */}
      <Table
        rowSelection={rowSelection}
        dataSource={data}
        columns={columns}
      />
    </>
  );
}
```

---

## 6. 导出模式

### 6.1 JSON 导出

```typescript
import { exportJSON } from '@/utils/export';

const handleExportJSON = () => {
  const filename = `data_${new Date().toISOString()}.json`;
  exportJSON(data, filename);
  message.success('导出成功');
};
```

### 6.2 CSV 导出

```typescript
import { exportCSV } from '@/utils/export';

const handleExportCSV = () => {
  const filename = `data_${new Date().toISOString()}.csv`;
  exportCSV(data, filename);
  message.success('导出成功');
};
```

### 6.3 多格式导出

```typescript
const handleExport = (format: 'json' | 'csv') => {
  const filename = `data_${new Date().toISOString()}`;

  if (format === 'json') {
    exportJSON(data, `${filename}.json`);
  } else {
    exportCSV(data, `${filename}.csv`);
  }

  message.success('导出成功');
};

// UI
<Dropdown
  menu={{
    items: [
      { key: 'json', label: 'JSON', onClick: () => handleExport('json') },
      { key: 'csv', label: 'CSV', onClick: () => handleExport('csv') },
    ],
  }}
>
  <Button icon={<ExportOutlined />}>导出</Button>
</Dropdown>
```

---

## 7. 反馈模式

### 7.1 Toast 消息

```typescript
// 成功
message.success('操作成功');

// 警告
message.warning('请先选择数据集');

// 错误
message.error('操作失败，请稍后重试');

// 加载中
const hide = message.loading('处理中...', 0);
// 完成后关闭
hide();
```

### 7.2 Notification 通知

```typescript
notification.success({
  message: '创建成功',
  description: '数据集 "my-dataset" 已创建',
  duration: 3,
});

notification.error({
  message: '导入失败',
  description: '文件格式不正确，请检查后重试',
  duration: 0,  // 不自动关闭
});
```

### 7.3 进度条

```typescript
function ImportData() {
  const [progress, setProgress] = useState(0);

  const handleImport = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    await api.import(formData, {
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percent);
      },
    });

    message.success('导入成功');
  };

  return (
    <>
      <Upload onChange={handleImport} />
      {progress > 0 && <Progress percent={progress} />}
    </>
  );
}
```

---

## 8. 实时更新模式

### 8.1 WebSocket 更新

```typescript
function RealtimeList() {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'update') {
        setData(prev => prev.map(item =>
          item.id === message.data.id ? message.data : item
        ));
      } else if (message.type === 'create') {
        setData(prev => [message.data, ...prev]);
      } else if (message.type === 'delete') {
        setData(prev => prev.filter(item => item.id !== message.data.id));
      }
    };

    return () => ws.close();
  }, []);

  return <List dataSource={data} renderItem={...} />;
}
```

### 8.2 轮询更新

```typescript
function PollingList() {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.getList();
      if (response.success) {
        setData(response.data);
      }
    };

    fetchData();

    // 每 5 秒轮询一次
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return <List dataSource={data} renderItem={...} />;
}
```

---

## 9. 优化模式

### 9.1 节流（Throttle）

```typescript
import { useThrottle } from '@/hooks';

function ScrollList() {
  const [scrollTop, setScrollTop] = useState(0);
  const throttledScrollTop = useThrottle(scrollTop, 200);

  const handleScroll = (e: React.UIEvent) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // 使用 throttledScrollTop 进行重计算
  useEffect(() => {
    // 计算可见区域...
  }, [throttledScrollTop]);

  return <div onScroll={handleScroll}>...</div>;
}
```

### 9.2 防抖（Debounce）

```typescript
import { useDebounce } from '@/hooks';

function SearchInput() {
  const [searchText, setSearchText] = useState('');
  const debouncedText = useDebounce(searchText, 500);

  useEffect(() => {
    if (debouncedText) {
      performSearch(debouncedText);
    }
  }, [debouncedText]);

  return <Input value={searchText} onChange={(e) => setSearchText(e.target.value)} />;
}
```

---

## 10. 快捷键模式

```typescript
import { useEffect } from 'react';

function useKeyboardShortcut(key: string, callback: () => void, deps: any[] = []) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === key) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [key, callback, ...deps]);
}

// 使用
function MyPage() {
  useKeyboardShortcut('s', handleSave);
  useKeyboardShortcut('k', () => setSearchOpen(true));

  // ...
}
```

---

## 参考资源

- [Ant Design 交互规范](https://ant.design/docs/spec/interaction-cn)
- [React Patterns](https://reactpatterns.com/)

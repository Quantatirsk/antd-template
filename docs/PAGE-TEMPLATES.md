# 页面模板

本模板提供三种典型页面模板，涵盖90%的企业应用场景。每个模板都是完整可运行的示例，可直接复制修改使用。

## 模板概览

| 模板 | 使用场景 | 核心功能 | 文件位置 |
|------|---------|---------|----------|
| **Dashboard** | 数据可视化、系统概览 | 统计卡片、图表、活动流 | `src/pages/DashboardPage.tsx` |
| **List** | 数据管理、内容浏览 | 搜索筛选、表格、批量操作 | `src/pages/ListPage.tsx` |
| **Detail** | 详细信息展示 | 多Tab、关联数据、操作 | `src/pages/DetailPage.tsx` |

## Dashboard 模板

### 适用场景

- 系统仪表板
- 数据可视化中心
- 运营监控大屏
- 项目概览页

### 核心功能

1. **统计卡片**：关键指标展示
2. **图表可视化**：趋势图、分布图（占位符，可替换为 ECharts/Recharts）
3. **活动流**：最近操作记录
4. **快捷操作**：常用功能入口
5. **系统状态**：CPU/内存/存储监控

### 布局结构

```
TopBar: 时间筛选 + 刷新 + 导出
├─ LeftSidebar: 快速导航 + 快捷操作
├─ Content:
│    ├─ 统计卡片（Grid 4列）
│    ├─ 图表区（趋势图 + 分布图）
│    └─ 最近活动列表
├─ RightSidebar: 系统状态 + 今日概览
└─ BottomBar: 时间范围 + 活动数 + 侧栏控制
```

### 快速开始

```bash
# 1. 复制模板
cp src/pages/DashboardPage.tsx src/pages/MyDashboard.tsx

# 2. 修改路由
# 在 router/index.tsx 中添加
<Route path="my-dashboard" element={<MyDashboard />} />

# 3. 修改菜单
# 在 MainLayout.tsx 中添加菜单项
```

### 自定义指南

#### 1. 修改统计卡片

```tsx
const mockStats: StatData[] = [
  {
    title: '自定义指标',
    value: 128,
    prefix: <DatabaseOutlined />,
    suffix: '个',
    trend: { value: 12, isIncrease: true },
  },
  // ... 更多指标
];
```

#### 2. 替换图表组件

使用 ECharts：

```tsx
import ReactECharts from 'echarts-for-react';

// 替换趋势图
const trendChartOption = {
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
  yAxis: { type: 'value' },
  series: [{ data: [120, 200, 150], type: 'line' }],
};

<Card title="查询趋势">
  <ReactECharts option={trendChartOption} style={{ height: '300px' }} />
</Card>
```

使用 Recharts：

```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

<Card title="查询趋势">
  <LineChart width={600} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="value" stroke="#005BAC" />
  </LineChart>
</Card>
```

#### 3. 连接真实 API

```tsx
import { useEffect, useState } from 'react';
import { getStatistics } from '@/api';

export default function MyDashboard() {
  const [stats, setStats] = useState<StatData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getStatistics();
      setStats(data);
    } catch (error) {
      message.error('加载失败');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingState />;

  // ... 渲染
}
```

## List 模板

### 适用场景

- 数据列表管理
- 内容浏览
- 用户管理
- 产品管理
- 订单管理

### 核心功能

1. **搜索筛选**：关键词搜索 + 多条件筛选
2. **视图切换**：表格视图 / 卡片视图
3. **批量操作**：批量删除、批量编辑
4. **分页**：支持大数据量
5. **CRUD 操作**：新建、编辑、删除
6. **侧边栏筛选**：高级筛选条件
7. **详情预览**：点击行显示右侧详情

### 布局结构

```
TopBar: 搜索框 + 状态筛选 + 视图切换 + 导出 + 新建
├─ LeftSidebar: 类型筛选 + 统计信息
├─ Content: 表格或卡片视图
├─ RightSidebar: 选中项详情 + 快捷操作
└─ BottomBar: 总数 + 选中数 + 页码 + 侧栏控制
```

### 快速开始

```bash
# 1. 复制模板
cp src/pages/ListPage.tsx src/pages/UsersPage.tsx

# 2. 定义数据类型
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  createdAt: string;
}

# 3. 修改表格列
# 4. 修改筛选条件
# 5. 连接 API
```

### 自定义指南

#### 1. 修改数据类型

```tsx
interface DataItem {
  id: string;
  // 根据你的业务修改字段
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  createdAt: string;
}
```

#### 2. 修改表格列

```tsx
const columns: ColumnsType<DataItem> = [
  {
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
    width: designSystem.tableColumnWidths.name,
    fixed: 'left',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    width: 200,
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
    width: designSystem.tableColumnWidths.type,
    render: (role: string) => {
      const roleMap = { admin: '管理员', user: '普通用户' };
      return roleMap[role];
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: designSystem.tableColumnWidths.status,
    render: (status: string) => (
      <Tag color={status === 'active' ? 'green' : 'red'}>
        {status === 'active' ? '激活' : '禁用'}
      </Tag>
    ),
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: designSystem.tableColumnWidths.action,
    render: (_, record) => (
      <Space size={parseInt(designSystem.spacing[0.5])}>
        <Button type="link" size="small" onClick={() => handleEdit(record)}>
          编辑
        </Button>
        <Button type="link" size="small" danger onClick={() => handleDelete(record)}>
          删除
        </Button>
      </Space>
    ),
  },
];
```

#### 3. 修改筛选条件

```tsx
// TopBar 搜索和快速筛选
<Input.Search
  placeholder="搜索用户名或邮箱..."
  value={searchText}
  onChange={e => setSearchText(e.target.value)}
  style={{ width: designSystem.inputWidths.search }}
/>

<Select
  value={statusFilter}
  onChange={setStatusFilter}
  style={{ width: designSystem.inputWidths.select }}
  options={[
    { label: '全部状态', value: 'all' },
    { label: '激活', value: 'active' },
    { label: '禁用', value: 'inactive' },
  ]}
/>

// LeftSidebar 高级筛选
<Card size="small" title="角色筛选">
  <Checkbox.Group
    value={roleFilter}
    onChange={setRoleFilter as any}
  >
    <Checkbox value="admin">管理员</Checkbox>
    <Checkbox value="user">普通用户</Checkbox>
  </Checkbox.Group>
</Card>
```

#### 4. 连接 API

```tsx
import { getUsers, createUser, updateUser, deleteUser } from '@/api/users';

// 加载数据
const loadData = async () => {
  try {
    setLoading(true);
    const response = await getUsers({
      page: currentPage,
      pageSize,
      search: searchText,
      status: statusFilter,
    });
    setData(response.data);
    setTotal(response.total);
  } catch (error) {
    message.error('加载失败');
  } finally {
    setLoading(false);
  }
};

// 创建
const handleCreate = async (values: any) => {
  try {
    await createUser(values);
    message.success('创建成功');
    setCreateModalOpen(false);
    loadData();
  } catch (error) {
    message.error('创建失败');
  }
};

// 更新
const handleUpdate = async (values: any) => {
  try {
    await updateUser(selectedItem!.id, values);
    message.success('更新成功');
    setEditModalOpen(false);
    loadData();
  } catch (error) {
    message.error('更新失败');
  }
};

// 删除
const handleDelete = (item: DataItem) => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除 "${item.name}" 吗？`,
    okType: 'danger',
    onOk: async () => {
      try {
        await deleteUser(item.id);
        message.success('删除成功');
        loadData();
      } catch (error) {
        message.error('删除失败');
      }
    },
  });
};
```

## Detail 模板

### 适用场景

- 用户详情
- 产品详情
- 订单详情
- 项目详情
- 文档详情

### 核心功能

1. **多 Tab 展示**：基本信息、关联数据、操作历史
2. **快速导航**：左侧栏 Tab 切换
3. **关键信息**：右侧栏显示摘要和状态
4. **操作栏**：编辑、删除、导出等
5. **关联数据表格**：显示关联的其他数据
6. **操作历史时间线**：记录所有操作

### 布局结构

```
TopBar: 返回 + 编辑 + 导出 + 删除
├─ LeftSidebar: Tab 快速导航
├─ Content:
│    ├─ 标题 + 描述
│    └─ Tabs（基本信息 | 关联数据 | 操作历史）
├─ RightSidebar: 状态 + 快速统计 + 元信息 + 标签
└─ BottomBar: 数据集ID + 当前Tab + 状态 + 侧栏控制
```

### 快速开始

```bash
# 1. 复制模板
cp src/pages/DetailPage.tsx src/pages/UserDetailPage.tsx

# 2. 修改数据类型
# 3. 修改 Tab 内容
# 4. 修改右侧栏信息
# 5. 连接 API
```

### 自定义指南

#### 1. 修改数据类型

```tsx
interface DetailData {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  avatar: string;
  phone: string;
  department: string;
  createdAt: string;
  updatedAt: string;
}
```

#### 2. 修改基本信息 Tab

```tsx
<Descriptions column={2} bordered size="small">
  <Descriptions.Item label="用户名">{data.name}</Descriptions.Item>
  <Descriptions.Item label="邮箱">{data.email}</Descriptions.Item>
  <Descriptions.Item label="角色">{data.role}</Descriptions.Item>
  <Descriptions.Item label="状态">
    <Tag color={data.status === 'active' ? 'green' : 'red'}>
      {data.status === 'active' ? '激活' : '禁用'}
    </Tag>
  </Descriptions.Item>
  <Descriptions.Item label="部门">{data.department}</Descriptions.Item>
  <Descriptions.Item label="电话">{data.phone}</Descriptions.Item>
</Descriptions>
```

#### 3. 添加自定义 Tab

```tsx
const tabs = [
  {
    key: 'basic',
    label: '基本信息',
    children: <BasicInfo data={data} />,
  },
  {
    key: 'permissions',
    label: '权限管理',
    children: <PermissionsTab data={data} />,
  },
  {
    key: 'activity',
    label: '活动记录',
    children: <ActivityTimeline data={mockHistory} />,
  },
];

<Tabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
```

#### 4. 修改右侧栏

```tsx
const rightSidebar = (
  <>
    <Card size="small" title="账户状态">
      <Tag color={data.status === 'active' ? 'green' : 'red'}>
        {data.status === 'active' ? '正常' : '已禁用'}
      </Tag>
      <div style={{ marginTop: designSystem.spacing[2] }}>
        <span style={{ color: designSystem.semantic.text.secondary }}>
          角色：
        </span>
        {data.role === 'admin' ? '管理员' : '普通用户'}
      </div>
    </Card>

    <Card size="small" title="快速统计">
      <div style={{ fontSize: designSystem.typography.fontSize.sm }}>
        <div style={{ marginBottom: designSystem.spacing[1] }}>
          <span style={{ color: designSystem.semantic.text.tertiary }}>
            登录次数
          </span>
          <span style={{
            float: 'right',
            fontWeight: designSystem.typography.fontWeight.semibold,
          }}>
            120
          </span>
        </div>
      </div>
    </Card>
  </>
);
```

## 通用最佳实践

### 1. 状态管理

```tsx
// 页面级状态
const [loading, setLoading] = useState(true);
const [data, setData] = useState<DataItem[]>([]);
const [error, setError] = useState<Error | null>(null);

// UI 状态
const [collapsed, setCollapsed] = useState(false);
const [modalOpen, setModalOpen] = useState(false);

// 筛选状态
const [searchText, setSearchText] = useState('');
const [filters, setFilters] = useState({});
```

### 2. 加载状态处理

```tsx
import { LoadingState, EmptyState, ErrorState } from '@/components/Common';

if (loading) return <LoadingState mode="skeleton" rows={10} />;
if (error) return <ErrorState error={error} onRetry={loadData} />;
if (!data.length) return <EmptyState type="general" />;

// 正常渲染
return <YourContent />;
```

### 3. 错误处理

```tsx
const loadData = async () => {
  try {
    setLoading(true);
    setError(null);
    const result = await fetchData();
    setData(result);
  } catch (err) {
    setError(err as Error);
    message.error('加载失败，请重试');
  } finally {
    setLoading(false);
  }
};
```

### 4. 表单验证

```tsx
<Form
  form={form}
  layout="vertical"
  onFinish={handleSubmit}
>
  <Form.Item
    name="name"
    label="名称"
    rules={[
      { required: true, message: '请输入名称' },
      { min: 2, max: 50, message: '长度在2-50个字符' },
    ]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    name="email"
    label="邮箱"
    rules={[
      { required: true, message: '请输入邮箱' },
      { type: 'email', message: '邮箱格式不正确' },
    ]}
  >
    <Input />
  </Form.Item>
</Form>
```

### 5. 权限控制

```tsx
// 使用自定义 Hook
function usePermission() {
  const user = useUser();
  return {
    canEdit: user.role === 'admin',
    canDelete: user.role === 'admin',
    canView: true,
  };
}

// 在页面中使用
function MyPage() {
  const { canEdit, canDelete } = usePermission();

  return (
    <>
      {canEdit && <Button>编辑</Button>}
      {canDelete && <Button danger>删除</Button>}
    </>
  );
}
```

## 下一步

- 阅读 [设计系统文档](./DESIGN-SYSTEM.md) 了解样式规范
- 阅读 [布局系统文档](./LAYOUT-SYSTEM.md) 掌握布局组件
- 阅读 [最佳实践](./BEST-PRACTICES.md) 提升代码质量
- 查看实际代码：`src/pages/` 目录下的三个模板文件

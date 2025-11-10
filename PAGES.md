# 页面模板使用指南

本文档介绍 3 个完整的页面模板及其使用方法。

---

## 1. ListPage（列表页模板）

### 功能特性

- ✅ **搜索功能**：实时搜索（防抖）
- ✅ **筛选功能**：状态筛选、类型筛选
- ✅ **视图切换**：表格视图 ↔ 卡片视图
- ✅ **分页功能**：支持分页展示
- ✅ **批量操作**：批量删除、批量导出
- ✅ **CRUD 操作**：新建、编辑、删除
- ✅ **三栏布局**：顶部工具栏 + 左侧筛选 + 右侧详情 + 底部状态栏

### 代码示例

```typescript
import { ListPage } from '@/pages';

function App() {
  return <ListPage />;
}
```

### 适用场景

- 数据集列表
- 用户列表
- 任务列表
- 文档列表
- 产品列表

### 可定制项

1. **数据源**：替换 `mockData` 为实际 API 调用
2. **筛选条件**：修改 `statusFilter`、`typeFilter` 等
3. **表格列**：自定义 `columns` 配置
4. **卡片样式**：修改卡片视图的渲染逻辑
5. **操作按钮**：添加/删除操作按钮

### 关键代码片段

#### 搜索和筛选

```typescript
const filteredData = useMemo(() => {
  return data.filter(item => {
    const matchSearch = searchText === '' ||
      item.name.toLowerCase().includes(searchText.toLowerCase());
    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchType = typeFilter.length === 0 || typeFilter.includes(item.type);
    return matchSearch && matchStatus && matchType;
  });
}, [data, searchText, statusFilter, typeFilter]);
```

#### 批量操作

```typescript
const handleBatchDelete = () => {
  Modal.confirm({
    title: `确定要删除选中的 ${selectedKeys.length} 项吗？`,
    onOk: () => {
      // 调用 API 删除
      setData(prev => prev.filter(d => !selectedKeys.includes(d.id)));
      setSelectedKeys([]);
      message.success('删除成功');
    },
  });
};
```

---

## 2. DetailPage（详情页模板）

### 功能特性

- ✅ **详细信息展示**：使用 Descriptions 组件
- ✅ **Tabs 切换**：基本信息、关联数据、操作历史
- ✅ **统计卡片**：节点数、边数、平均度数
- ✅ **编辑功能**：Modal 表单编辑
- ✅ **删除功能**：确认对话框
- ✅ **导出功能**：导出详情数据
- ✅ **返回导航**：返回列表

### 代码示例

```typescript
import { DetailPage } from '@/pages';

function App() {
  return <DetailPage />;
}
```

### 适用场景

- 数据集详情
- 用户详情
- 任务详情
- 订单详情
- 产品详情

### 可定制项

1. **数据源**：替换 `mockDetail` 为实际 API 调用
2. **Tabs 配置**：添加/删除 Tab 页
3. **字段展示**：修改 Descriptions 字段
4. **关联数据**：自定义关联数据表格
5. **操作历史**：自定义历史记录展示

### 关键代码片段

#### Tabs 配置

```typescript
<Tabs
  activeKey={activeTab}
  onChange={setActiveTab}
  items={[
    {
      key: 'basic',
      label: '基本信息',
      children: <BasicInfo />,
    },
    {
      key: 'related',
      label: `关联数据 (${mockRelatedItems.length})`,
      children: <RelatedData />,
    },
    {
      key: 'history',
      label: `操作历史 (${mockHistory.length})`,
      children: <HistoryTimeline />,
    },
  ]}
/>
```

#### 编辑功能

```typescript
const handleUpdate = (values: any) => {
  // 调用 API 更新
  setData({ ...data, ...values });
  message.success('更新成功');
  setEditModalOpen(false);
};
```

---

## 3. DashboardPage（仪表板模板）

### 功能特性

- ✅ **统计卡片**：总数据集、总节点数、总用户数、今日查询（带趋势）
- ✅ **趋势图**：柱状图展示查询趋势（7 天）
- ✅ **分布图**：进度条展示数据集分布
- ✅ **最近活动**：列表展示用户操作记录
- ✅ **快捷操作**：常用操作按钮组
- ✅ **系统状态**：CPU、内存、存储使用率

### 代码示例

```typescript
import { DashboardPage } from '@/pages';

function App() {
  return <DashboardPage />;
}
```

### 适用场景

- 数据概览
- 系统监控
- 业务统计
- 运营仪表板
- 管理后台首页

### 可定制项

1. **统计指标**：修改 `mockStats` 数据
2. **图表类型**：替换为真实图表库（如 ECharts、Recharts）
3. **活动类型**：自定义活动图标和颜色
4. **快捷操作**：添加/删除快捷按钮
5. **系统指标**：修改监控指标

### 关键代码片段

#### 统计卡片（带趋势）

```typescript
<Statistic
  title={stat.title}
  value={stat.value}
  prefix={stat.prefix}
  suffix={stat.suffix}
/>
{stat.trend && (
  <Space>
    {stat.trend.isIncrease ? (
      <ArrowUpOutlined style={{ color: designSystem.colors.success }} />
    ) : (
      <ArrowDownOutlined style={{ color: designSystem.colors.error }} />
    )}
    <span>{stat.trend.value}%</span>
  </Space>
)}
```

#### 简易柱状图

```typescript
<div style={{ height: '300px', display: 'flex', alignItems: 'flex-end' }}>
  {mockChartData.trend.map((item, index) => (
    <div key={index} style={{ flex: 1, textAlign: 'center' }}>
      <div
        style={{
          height: `${(item.value / maxValue) * 250}px`,
          background: designSystem.colors.primary[500],
          borderRadius: designSystem.borderRadius.sm,
        }}
      />
      <div>{item.date}</div>
    </div>
  ))}
</div>
```

---

## 集成真实 API

### 步骤 1：创建 API 服务

```typescript
// api/datasets.ts
import { BaseService, ApiResponse } from './base';

class DatasetsService extends BaseService {
  async getDatasets(): Promise<ApiResponse<Dataset[]>> {
    return this.get('/datasets');
  }

  async getDataset(id: string): Promise<ApiResponse<Dataset>> {
    return this.get(`/datasets/${id}`);
  }

  async createDataset(data: CreateDatasetRequest): Promise<ApiResponse<string>> {
    return this.post('/datasets', data);
  }
}

export const datasetsAPI = new DatasetsService();
```

### 步骤 2：创建 Zustand Store

```typescript
// stores/datasetStore.ts
import { create } from 'zustand';
import { datasetsAPI } from '@/api';

interface DatasetState {
  datasets: Dataset[];
  loading: boolean;
  fetchDatasets: () => Promise<void>;
}

export const useDatasetStore = create<DatasetState>((set) => ({
  datasets: [],
  loading: false,

  fetchDatasets: async () => {
    set({ loading: true });
    const response = await datasetsAPI.getDatasets();
    if (response.success) {
      set({ datasets: response.data, loading: false });
    } else {
      set({ loading: false });
    }
  },
}));
```

### 步骤 3：替换页面中的 Mock 数据

```typescript
// ListPage.tsx
import { useDatasetStore } from '@/stores/datasetStore';

function ListPage() {
  const { datasets, loading, fetchDatasets } = useDatasetStore();

  useEffect(() => {
    fetchDatasets();
  }, [fetchDatasets]);

  // 使用 datasets 替代 mockData
  // ...
}
```

---

## 性能优化建议

### 1. 虚拟列表

对于大数据量列表（>1000 项），使用虚拟列表：

```bash
npm install react-virtualized
```

```typescript
import { List } from 'react-virtualized';

<List
  width={800}
  height={600}
  rowCount={data.length}
  rowHeight={40}
  rowRenderer={({ index, key, style }) => (
    <div key={key} style={style}>
      {data[index].name}
    </div>
  )}
/>
```

### 2. 防抖搜索

搜索输入已使用 `useMemo` 优化，如需防抖：

```typescript
import { useDebounce } from '@/hooks';

const debouncedSearchText = useDebounce(searchText, 500);
```

### 3. 表格分页

大数据量时使用服务端分页：

```typescript
const fetchPage = async (page: number, pageSize: number) => {
  const response = await api.getDatasets({ page, pageSize });
  // ...
};
```

---

## 常见问题

### Q1: 如何修改表格列？

A: 修改 `columns` 配置：

```typescript
const columns: ColumnsType<DataItem> = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '描述', dataIndex: 'description', key: 'description' },
  // 添加更多列...
];
```

### Q2: 如何添加新的筛选条件？

A: 在左侧边栏添加筛选器：

```typescript
<Checkbox.Group
  value={yourFilter}
  onChange={setYourFilter}
>
  <Checkbox value="option1">选项 1</Checkbox>
  <Checkbox value="option2">选项 2</Checkbox>
</Checkbox.Group>
```

### Q3: 如何自定义图表？

A: 使用专业图表库（推荐 ECharts）：

```bash
npm install echarts echarts-for-react
```

```typescript
import ReactECharts from 'echarts-for-react';

<ReactECharts option={chartOption} />
```

---

## 总结

3 个页面模板提供了完整的功能实现，可直接使用或作为参考。每个模板都遵循：

- ✅ 设计系统规范
- ✅ TypeScript 类型安全
- ✅ 性能优化（useMemo、useCallback）
- ✅ 用户体验（Loading、Error、Empty 状态）
- ✅ 可定制性强

更多详情请参考源码和注释。

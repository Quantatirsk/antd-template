# 组件模式文档

## 概述

本文档介绍项目中的通用组件模式和最佳实践。

---

## 1. 状态组件

### 1.1 LoadingState

#### 接口

```typescript
interface LoadingStateProps {
  mode?: 'spin' | 'skeleton' | 'inline';
  size?: 'small' | 'default' | 'large';
  tip?: string;
  rows?: number;  // skeleton 模式下的行数
}
```

#### 使用场景

- `spin`：居中旋转加载（默认），适用于页面/区域加载
- `skeleton`：骨架屏，适用于列表/卡片加载
- `inline`：行内加载，适用于按钮/小组件

#### 示例

```typescript
// 页面加载
<LoadingState mode="spin" tip="加载中..." />

// 列表骨架屏
<LoadingState mode="skeleton" rows={5} />

// 按钮加载
<Button>
  <LoadingState mode="inline" size="small" />
  加载中
</Button>
```

### 1.2 ErrorState

#### 接口

```typescript
interface ErrorStateProps {
  error?: unknown;
  title?: string;
  message?: string;
  onRetry?: () => void;
  showDetails?: boolean;
}
```

#### 特性

- 自动识别错误类型（auth/not-found/network/unknown）
- 显示友好的错误图标和提示
- 提供重试按钮
- 可展开错误详情（开发模式）

#### 示例

```typescript
// 自动识别错误
<ErrorState error={error} onRetry={fetchData} />

// 自定义错误信息
<ErrorState
  title="加载失败"
  message="无法加载数据，请稍后重试"
  onRetry={fetchData}
/>
```

### 1.3 EmptyState

#### 接口

```typescript
type EmptyStateType = 'query' | 'conversation' | 'dataset' | 'graph' | 'general';

interface EmptyStateProps {
  type?: EmptyStateType;
  description?: string;
  action?: {
    text: string;
    icon?: ReactNode;
    onClick?: () => void;
  };
}
```

#### 预设类型

- `query`：查询无结果
- `conversation`：无对话记录
- `dataset`：无数据集
- `graph`：无图谱数据
- `general`：通用空状态

#### 示例

```typescript
// 使用预设类型
<EmptyState type="dataset" />

// 自定义描述和操作
<EmptyState
  type="general"
  description="还没有任何数据"
  action={{
    text: '立即创建',
    icon: <PlusOutlined />,
    onClick: () => setModalOpen(true),
  }}
/>
```

---

## 2. 数据展示组件

### 2.1 StatCard（统计卡片）

#### 接口

```typescript
interface StatCardProps {
  icon?: ReactNode;
  label: string;
  value: string | number;
  sublabel?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  color?: string;
  onClick?: () => void;
}
```

#### 示例

```typescript
<StatCard
  icon={<DatabaseOutlined />}
  label="总数据集"
  value={stats.total}
  sublabel="个"
  trend={{ value: 12, direction: 'up' }}
  color="#005BAC"
/>
```

#### 布局

通常使用 Grid 布局：

```typescript
<Row gutter={[16, 16]}>
  <Col span={6}><StatCard {...} /></Col>
  <Col span={6}><StatCard {...} /></Col>
  <Col span={6}><StatCard {...} /></Col>
  <Col span={6}><StatCard {...} /></Col>
</Row>
```

### 2.2 DataCard（数据卡片）

#### 接口

```typescript
interface DataCardProps {
  title: string;
  description?: string;
  extra?: ReactNode;
  fields: {
    label: string;
    value: any;
    render?: (value: any) => ReactNode;
  }[];
  actions?: {
    label: string;
    icon?: ReactNode;
    onClick: () => void;
  }[];
}
```

#### 示例

```typescript
<DataCard
  title="数据集详情"
  extra={<Tag color="green">活跃</Tag>}
  fields={[
    { label: '名称', value: 'my-dataset' },
    { label: '节点数', value: 1000 },
    { label: '创建时间', value: '2023-10-01', render: (v) => dayjs(v).format('YYYY-MM-DD') },
  ]}
  actions={[
    { label: '编辑', icon: <EditOutlined />, onClick: handleEdit },
    { label: '删除', icon: <DeleteOutlined />, onClick: handleDelete },
  ]}
/>
```

---

## 3. 表单组件

### 3.1 FilterPanel（筛选面板）

#### 接口

```typescript
interface FilterPanelConfig {
  groups: {
    title: string;
    filters: {
      key: string;
      label: string;
      type: 'checkbox' | 'radio' | 'select' | 'daterange';
      options?: { label: string; value: any }[];
      defaultValue?: any;
    }[];
  }[];
  onFilterChange?: (filters: Record<string, any>) => void;
}
```

#### 示例

```typescript
<FilterPanel
  groups={[
    {
      title: '状态',
      filters: [
        {
          key: 'status',
          label: '状态',
          type: 'checkbox',
          options: [
            { label: '活跃', value: 'active' },
            { label: '归档', value: 'archived' },
          ],
        },
      ],
    },
    {
      title: '时间范围',
      filters: [
        {
          key: 'dateRange',
          label: '创建时间',
          type: 'daterange',
        },
      ],
    },
  ]}
  onFilterChange={(filters) => console.log(filters)}
/>
```

### 3.2 SearchBar（搜索栏）

#### 接口

```typescript
interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  filters?: {
    key: string;
    label: string;
    options: { label: string; value: any }[];
  }[];
}
```

#### 示例

```typescript
<SearchBar
  placeholder="搜索数据集..."
  onSearch={(value) => handleSearch(value)}
  filters={[
    {
      key: 'type',
      label: '类型',
      options: [
        { label: '全部', value: 'all' },
        { label: '实体', value: 'entity' },
        { label: '关系', value: 'relation' },
      ],
    },
  ]}
/>
```

---

## 4. 组件设计模式

### 4.1 容器组件 + 展示组件分离

#### 原则
- **容器组件**：处理业务逻辑、数据获取、状态管理
- **展示组件**：纯 UI 展示，接收 props，无副作用

#### 示例

```typescript
// 容器组件（DatasetListPage.tsx）
function DatasetListPage() {
  const { datasets, loading, fetchDatasets } = useDatasetStore();

  useEffect(() => {
    fetchDatasets();
  }, [fetchDatasets]);

  if (loading) return <LoadingState mode="skeleton" rows={5} />;

  return <DatasetList data={datasets} onEdit={handleEdit} onDelete={handleDelete} />;
}

// 展示组件（DatasetList.tsx）
interface DatasetListProps {
  data: Dataset[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function DatasetList({ data, onEdit, onDelete }: DatasetListProps) {
  return (
    <List
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button onClick={() => onEdit(item.id)}>编辑</Button>,
            <Button onClick={() => onDelete(item.id)}>删除</Button>,
          ]}
        >
          {item.name}
        </List.Item>
      )}
    />
  );
}
```

### 4.2 Compound Component 模式

#### 原则
- 组件由多个子组件组成
- 子组件通过 Context 共享状态
- 提供灵活的组合方式

#### 示例

```typescript
// Card.tsx
const CardContext = createContext<{ size: 'small' | 'default' }>();

function Card({ size = 'default', children }) {
  return (
    <CardContext.Provider value={{ size }}>
      <div className="card">{children}</div>
    </CardContext.Provider>
  );
}

function CardHeader({ title, extra }) {
  const { size } = useContext(CardContext);
  return (
    <div className={`card-header card-header-${size}`}>
      <h3>{title}</h3>
      {extra}
    </div>
  );
}

function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
}

Card.Header = CardHeader;
Card.Body = CardBody;

// 使用
<Card size="small">
  <Card.Header title="标题" extra={<Button>操作</Button>} />
  <Card.Body>内容</Card.Body>
</Card>
```

### 4.3 Render Props 模式

#### 原则
- 通过函数 prop 自定义渲染逻辑
- 适用于高度可定制的组件

#### 示例

```typescript
interface ListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
  renderEmpty?: () => ReactNode;
}

function List<T>({ data, renderItem, renderEmpty }: ListProps<T>) {
  if (data.length === 0) {
    return renderEmpty?.() || <EmptyState />;
  }

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>{renderItem(item, index)}</div>
      ))}
    </div>
  );
}

// 使用
<List
  data={datasets}
  renderItem={(item) => <DatasetCard data={item} />}
  renderEmpty={() => <EmptyState type="dataset" />}
/>
```

### 4.4 Controlled vs Uncontrolled

#### 原则
- 优先使用**受控组件**（Controlled）
- 提供**非受控模式**作为备选

#### 示例

```typescript
interface SearchInputProps {
  // 受控模式
  value?: string;
  onChange?: (value: string) => void;

  // 非受控模式
  defaultValue?: string;
  onSearch?: (value: string) => void;
}

function SearchInput({ value, onChange, defaultValue, onSearch }: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || '');

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return <input value={currentValue} onChange={handleChange} />;
}

// 受控模式
<SearchInput value={searchText} onChange={setSearchText} />

// 非受控模式
<SearchInput defaultValue="初始值" onSearch={handleSearch} />
```

---

## 5. 性能优化模式

### 5.1 useMemo / useCallback

```typescript
// 缓存复杂计算
const filteredData = useMemo(() => {
  return data.filter(item => item.status === 'active');
}, [data]);

// 缓存回调函数
const handleClick = useCallback((id: string) => {
  console.log(id);
}, []);
```

### 5.2 React.memo

```typescript
// 避免不必要的重新渲染
export const DataCard = React.memo(DataCardComponent, (prevProps, nextProps) => {
  return prevProps.data.id === nextProps.data.id;
});
```

### 5.3 虚拟列表

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

---

## 6. 可访问性模式

### 6.1 键盘导航

```typescript
function Button({ onClick }) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick?.();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={handleKeyPress}
    >
      点击我
    </div>
  );
}
```

### 6.2 ARIA 属性

```typescript
<button
  aria-label="关闭对话框"
  aria-pressed={isPressed}
  aria-expanded={isExpanded}
>
  <CloseOutlined />
</button>
```

---

## 7. 组件测试模式

### 7.1 单元测试

```typescript
import { render, screen, fireEvent } from '@testing-library/react';

test('Button 点击事件', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>点击</Button>);

  fireEvent.click(screen.getByText('点击'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 7.2 Storybook

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;

export const Primary: StoryObj<typeof Button> = {
  args: {
    type: 'primary',
    children: '主按钮',
  },
};
```

---

## 参考资源

- [React Patterns](https://reactpatterns.com/)
- [Ant Design Components](https://ant.design/components/overview-cn)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

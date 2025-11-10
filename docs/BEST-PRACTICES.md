# 最佳实践

本文档总结了使用此模板开发项目的最佳实践和编码规范。

## 设计系统使用

### ✅ 正确示例

#### 1. 使用语义化颜色

```tsx
// ✅ 推荐：使用语义化命名
color: designSystem.semantic.text.primary
background: designSystem.semantic.surface.base
borderColor: designSystem.semantic.border.light

// ⚠️ 可用：直接引用系统
color: designSystem.colors.neutral[900]
background: designSystem.colors.neutral[0]

// ❌ 禁止：硬编码
color: '#1C1C1E'
background: '#FFFFFF'
```

#### 2. 使用间距系统

```tsx
// ✅ 推荐
padding: designSystem.spacing[3]
margin: `${designSystem.spacing[1]} 0`
gap: designSystem.spacing[2]

// ❌ 禁止
padding: '16px'
margin: '8px 0'
gap: '12px'
```

#### 3. 使用字体系统

```tsx
// ✅ 推荐
fontSize: designSystem.typography.fontSize.base
fontWeight: designSystem.typography.fontWeight.semibold
lineHeight: designSystem.typography.lineHeight.normal

// ❌ 禁止
fontSize: '13px'
fontWeight: 600
lineHeight: 1.5
```

### ❌ 反面示例

```tsx
// ❌ 混用硬编码和设计系统
<div style={{
  color: '#333',  // 硬编码
  padding: designSystem.spacing[3],  // 系统
  fontSize: '14px',  // 硬编码
}}>
  内容
</div>

// ✅ 全部使用设计系统
<div style={{
  color: designSystem.semantic.text.primary,
  padding: designSystem.spacing[3],
  fontSize: designSystem.typography.fontSize.base,
}}>
  内容
</div>
```

## 组件使用规范

### Button 组件

```tsx
// ✅ 主要操作：默认大小
<Button type="primary">提交</Button>
<Button>取消</Button>

// ✅ 辅助操作：小尺寸
<Button size="small">批量删除</Button>
<Button size="small">取消选择</Button>

// ✅ 表格内操作：链接 + 小尺寸
<Button type="link" size="small">编辑</Button>
<Button type="link" size="small" danger>删除</Button>

// ❌ 不要给主要操作按钮加 size="small"
<Button type="primary" size="small">提交</Button>  // ❌
```

### Card 组件

```tsx
// ✅ 统一使用 small size 和圆角
<Card
  size="small"
  style={{
    borderRadius: designSystem.borderRadius.lg,
    marginBottom: designSystem.spacing[1],
  }}
>
  内容
</Card>

// ❌ 不统一的卡片
<Card>内容</Card>  // 缺少 size 和圆角
```

### Table 组件

```tsx
// ✅ 完整的表格配置
<Table
  size="small"  // 统一使用 small
  columns={columns}
  dataSource={data}
  rowKey="id"  // 必须指定 rowKey
  pagination={{
    size: 'small',
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条`,
  }}
  scroll={{ x: 1000, y: 'calc(100vh - 306px)' }}  // 自适应高度
/>

// ❌ 缺少配置
<Table columns={columns} dataSource={data} />
```

## 布局最佳实践

### 1. PageLayout 使用

```tsx
// ✅ 推荐：统一间距 8px
function MyPage() {
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  const topBar = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: designSystem.spacing[1],  // 8px
      padding: designSystem.spacing[1],  // 8px
      width: '100%',
    }}>
      {/* 工具栏内容 */}
    </div>
  );

  const bottomBar = (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    }}>
      {/* 状态信息 + 侧栏控制 */}
    </div>
  );

  return (
    <PageLayout
      topBar={topBar}
      leftSidebar={leftSidebar}
      leftDefaultCollapsed={leftCollapsed}
      onLeftCollapsedChange={setLeftCollapsed}
      rightSidebar={rightSidebar}
      rightDefaultCollapsed={rightCollapsed}
      onRightCollapsedChange={setRightCollapsed}
      bottomBar={bottomBar}
    >
      {/* 主内容 */}
    </PageLayout>
  );
}
```

### 2. 主内容区滚动

```tsx
// ✅ 正确：设置 minHeight: 0 和 overflow: auto
<PageLayout topBar={topBar}>
  <div style={{
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,  // 关键：允许内容缩小
    overflow: 'auto',  // 关键：允许滚动
    padding: designSystem.spacing[1],
  }}>
    {/* 长内容 */}
  </div>
</PageLayout>

// ❌ 错误：缺少关键样式
<PageLayout topBar={topBar}>
  <div>  // 缺少 flex 和 overflow
    {/* 内容可能溢出 */}
  </div>
</PageLayout>
```

### 3. 表格容器

```tsx
// ✅ 正确：Card 包裹 + 自适应高度
<PageLayout topBar={topBar}>
  <div style={{
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  }}>
    <Card
      style={{
        flex: 1,
        margin: designSystem.spacing[1],
        borderRadius: designSystem.tableSystem.containerBorderRadius,
      }}
      styles={{
        body: {
          padding: parseInt(designSystem.spacing[1]),
          flex: 1,
          overflow: 'hidden',
        },
      }}
    >
      <Table
        scroll={{ y: 'calc(100vh - 306px)' }}  // 计算准确的高度
        {...props}
      />
    </Card>
  </div>
</PageLayout>
```

## 代码组织

### 1. 组件结构

```tsx
/**
 * 文件头注释：说明组件功能
 */

// 导入顺序：React → 第三方库 → 本地导入
import { useState, useEffect } from 'react';
import { Card, Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PageLayout from '@/components/layout/PageLayout';
import { designSystem } from '@/styles';

// ==================== 类型定义 ====================
interface DataItem {
  id: string;
  name: string;
  // ...
}

// ==================== Mock 数据（可选）====================
const mockData: DataItem[] = [];

// ==================== 主组件 ====================
export default function MyPage() {
  // ==================== 状态管理 ====================
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);

  // ==================== 副作用 ====================
  useEffect(() => {
    loadData();
  }, []);

  // ==================== 操作函数 ====================
  const loadData = async () => {
    // ...
  };

  const handleCreate = async (values: any) => {
    // ...
  };

  // ==================== 渲染辅助 ====================
  const topBar = (/* ... */);
  const leftSidebar = (/* ... */);

  // ==================== 渲染 ====================
  return (
    <PageLayout topBar={topBar} leftSidebar={leftSidebar}>
      {/* 主内容 */}
    </PageLayout>
  );
}
```

### 2. 文件命名

```bash
# 组件：PascalCase
components/
  ├── LoadingState.tsx
  ├── EmptyState.tsx
  └── ErrorState.tsx

# 页面：PascalCase + Page后缀
pages/
  ├── DashboardPage.tsx
  ├── ListPage.tsx
  └── UserDetailPage.tsx

# 工具函数：camelCase
utils/
  ├── formatDate.ts
  ├── validateEmail.ts
  └── index.ts

# Hooks：camelCase + use前缀
hooks/
  ├── useMediaQuery.ts
  ├── useDebounce.ts
  └── usePermission.ts
```

## 性能优化

### 1. 使用 useMemo 和 useCallback

```tsx
// ✅ 推荐：缓存计算结果
const filteredData = useMemo(() => {
  return data.filter(item =>
    item.name.includes(searchText)
  );
}, [data, searchText]);

// ✅ 推荐：缓存回调函数
const handleDelete = useCallback((id: string) => {
  // 删除逻辑
}, [/* 依赖 */]);

// ❌ 不推荐：每次渲染都计算
const filteredData = data.filter(item =>
  item.name.includes(searchText)
);
```

### 2. 避免内联对象和函数

```tsx
// ❌ 不推荐：每次渲染创建新对象
<div style={{ padding: '16px', color: '#333' }}>
  内容
</div>

// ✅ 推荐：提取到常量
const containerStyle = {
  padding: designSystem.spacing[3],
  color: designSystem.semantic.text.primary,
};

<div style={containerStyle}>
  内容
</div>

// 或者使用 useMemo
const containerStyle = useMemo(() => ({
  padding: designSystem.spacing[3],
  color: designSystem.semantic.text.primary,
}), []);
```

### 3. 列表渲染使用 key

```tsx
// ✅ 推荐：使用唯一 ID
{items.map(item => (
  <Card key={item.id}>
    {item.name}
  </Card>
))}

// ❌ 不推荐：使用 index
{items.map((item, index) => (
  <Card key={index}>  // index 不稳定
    {item.name}
  </Card>
))}
```

## 错误处理

### 1. API 调用

```tsx
// ✅ 完整的错误处理
const loadData = async () => {
  try {
    setLoading(true);
    setError(null);  // 清除之前的错误

    const result = await fetchData();
    setData(result);
  } catch (err) {
    const error = err as Error;
    setError(error);

    // 用户友好的错误提示
    if (error.message.includes('网络')) {
      message.error('网络连接失败，请检查网络');
    } else if (error.message.includes('权限')) {
      message.error('没有权限访问此资源');
    } else {
      message.error('加载失败，请重试');
    }

    // 可选：上报错误
    console.error('Load data error:', error);
  } finally {
    setLoading(false);
  }
};

// ❌ 简陋的错误处理
const loadData = async () => {
  const result = await fetchData();  // 没有 try-catch
  setData(result);
};
```

### 2. 状态展示

```tsx
// ✅ 完整的状态处理
import { LoadingState, EmptyState, ErrorState } from '@/components/Common';

function MyPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<DataItem[]>([]);

  if (loading) {
    return <LoadingState mode="skeleton" rows={10} />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={loadData} />;
  }

  if (data.length === 0) {
    return (
      <EmptyState
        type="general"
        description="暂无数据"
        action={{
          text: '新建',
          onClick: () => setCreateModalOpen(true),
        }}
      />
    );
  }

  return <YourContent data={data} />;
}
```

## TypeScript 使用

### 1. 定义清晰的类型

```tsx
// ✅ 推荐：完整的类型定义
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';  // 使用字面量类型
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  avatar?: string;  // 可选字段
}

// ✅ API 响应类型
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// ✅ 组件 Props 类型
interface MyComponentProps {
  user: User;
  onEdit?: (user: User) => void;  // 可选回调
  onDelete?: (id: string) => void;
}

// ❌ 不推荐：使用 any
const data: any = await fetchData();  // ❌
```

### 2. 泛型使用

```tsx
// ✅ 推荐：使用泛型复用类型
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // ...

  return { data, loading, error };
}

// 使用
const { data, loading } = useFetch<User[]>('/api/users');
```

### 3. 类型断言

```tsx
// ✅ 推荐：使用 as 进行类型断言
const error = err as Error;
const user = data as User;

// ⚠️ 避免：使用 as any
const user = data as any;  // 失去类型安全

// ✅ 更好：使用类型守卫
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data
  );
}

if (isUser(data)) {
  // data 被识别为 User 类型
  console.log(data.name);
}
```

## 代码风格

### 1. 命名规范

```tsx
// ✅ 推荐：有意义的命名
const userList = await fetchUsers();
const isLoading = true;
const hasError = false;

// ❌ 不推荐：无意义的命名
const data1 = await fetchData();
const flag = true;
const x = false;
```

### 2. 注释规范

```tsx
/**
 * 加载用户列表
 * @param page 页码
 * @param pageSize 每页数量
 * @returns 用户列表
 */
async function loadUsers(page: number, pageSize: number): Promise<User[]> {
  // 实现...
}

// ✅ 复杂逻辑添加注释
// 当用户首次访问时，自动展开侧边栏
// 后续访问恢复用户上次的折叠状态
if (isFirstVisit) {
  setCollapsed(false);
} else {
  setCollapsed(getUserPreference());
}
```

### 3. 函数长度

```tsx
// ✅ 推荐：函数保持简短（< 50行）
function handleSubmit(values: FormValues) {
  validateForm(values);
  const data = transformData(values);
  submitData(data);
}

// ❌ 不推荐：超长函数（> 100行）
function handleEverything() {
  // 100+ 行代码
  // 难以阅读和维护
}
```

## 测试建议

### 1. 组件测试

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('标题')).toBeInTheDocument();
  });

  it('should handle click', () => {
    const handleClick = jest.fn();
    render(<MyComponent onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### 2. Hook 测试

```tsx
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  it('should debounce value', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    expect(result.current).toBe('initial');

    // 测试防抖逻辑
  });
});
```

## 安全实践

### 1. XSS 防护

```tsx
// ✅ 推荐：使用 React 的默认转义
<div>{user.name}</div>

// ⚠️ 谨慎：使用 dangerouslySetInnerHTML
<div
  dangerouslySetInnerHTML={{
    __html: sanitize(userInput),  // 必须先消毒
  }}
/>
```

### 2. 敏感信息

```tsx
// ❌ 不要在前端暴露敏感信息
const API_KEY = 'sk-xxxxxxxxxxxx';  // ❌

// ✅ 使用环境变量
const API_URL = import.meta.env.VITE_API_URL;

// ❌ 不要在控制台输出敏感数据
console.log('User password:', password);  // ❌
```

## Git 提交规范

```bash
# 格式：<type>: <subject>

# 类型（type）：
# feat: 新功能
# fix: 修复 bug
# docs: 文档更新
# style: 代码格式（不影响功能）
# refactor: 重构
# perf: 性能优化
# test: 测试
# chore: 构建/工具配置

# 示例：
git commit -m "feat: add user management page"
git commit -m "fix: table pagination not working"
git commit -m "docs: update README"
git commit -m "refactor: extract common layout logic"
```

## 检查清单

### 代码提交前

- [ ] 代码符合 ESLint 规范
- [ ] 没有 TypeScript 错误
- [ ] 所有样式值从 designSystem 引用
- [ ] 组件命名清晰
- [ ] 函数功能单一
- [ ] 添加了必要的注释
- [ ] 删除了 console.log
- [ ] 测试通过

### Code Review 检查

- [ ] 代码可读性好
- [ ] 没有重复代码
- [ ] 错误处理完善
- [ ] 性能考虑合理
- [ ] 安全性检查通过
- [ ] 符合团队规范

## 常见问题

### Q: 什么时候使用 useMemo？
A: 当计算成本高或结果用于子组件的 props 时使用。不要过度优化。

### Q: 如何处理大量状态？
A: 考虑使用 useReducer 或状态管理库（Redux、Zustand）。

### Q: 如何避免重复渲染？
A: 使用 React.memo、useMemo、useCallback，合理拆分组件。

### Q: 如何组织大型表单？
A: 拆分成多个子表单组件，使用 Form.List 处理动态字段。

## 学习资源

- [React 官方文档](https://react.dev/)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [Ant Design 文档](https://ant.design/)
- [本项目架构文档](./ARCHITECTURE.md)
- [设计系统文档](./DESIGN-SYSTEM.md)

## 持续改进

代码质量是持续改进的过程：

1. 定期 Code Review
2. 编写测试
3. 重构遗留代码
4. 学习新技术
5. 分享经验

保持代码整洁，享受编程乐趣！

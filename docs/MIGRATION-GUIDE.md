# 项目迁移指南

本指南帮助你将现有项目迁移到本 Ant Design 模板，或在新项目中应用此模板的设计系统。

## 目录

- [快速开始](#快速开始)
- [设计系统迁移](#设计系统迁移)
- [布局系统迁移](#布局系统迁移)
- [页面迁移](#页面迁移)
- [组件迁移](#组件迁移)
- [常见问题](#常见问题)

---

## 快速开始

### 1. 复制核心文件

从本模板复制以下核心目录到你的项目：

```bash
# 设计系统（必需）
src/styles/

# 布局组件（必需）
src/layout/

# 通用组件（推荐）
src/components/common/
src/components/modal/

# Hooks（推荐）
src/hooks/useMediaQuery.ts
```

### 2. 配置 Ant Design ConfigProvider

复制 `src/App.tsx` 中的 ConfigProvider 配置：

```tsx
import { ConfigProvider } from 'antd';
import { designSystem } from '@/styles';
import { GlobalStyles } from '@/styles';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // 从 DesignSystem.ts 复制 token 配置
        },
        components: {
          // 从 DesignSystem.ts 复制组件配置
        }
      }}
    >
      <GlobalStyles />
      {/* 你的应用 */}
    </ConfigProvider>
  );
}
```

### 3. 设置路径别名

在 `vite.config.ts` 或 `tsconfig.json` 中配置：

```typescript
// vite.config.ts
export default {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};
```

---

## 设计系统迁移

### 颜色系统

**替换前：**
```tsx
// 硬编码颜色
<div style={{ color: '#1890ff' }}>文本</div>
```

**替换后：**
```tsx
import { designSystem } from '@/styles';

<div style={{ color: designSystem.colors.primary[500] }}>文本</div>
```

### 间距系统

**替换前：**
```tsx
// 魔法数字
<div style={{ padding: '16px', margin: '8px' }}>内容</div>
```

**替换后：**
```tsx
import { designSystem } from '@/styles';

<div style={{
  padding: designSystem.spacing[4],    // 16px
  margin: designSystem.spacing[2]      // 8px
}}>内容</div>
```

### 字体系统

**替换前：**
```tsx
<h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>标题</h1>
```

**替换后：**
```tsx
import { designSystem } from '@/styles';

<h1 style={{
  fontSize: designSystem.typography.fontSize.xl,
  fontWeight: designSystem.typography.fontWeight.bold
}}>标题</h1>
```

**完整映射表：**
| 原值 | 新值 | 说明 |
|------|------|------|
| `fontSize: 12px` | `designSystem.typography.fontSize.xs` | 最小字号 |
| `fontSize: 14px` | `designSystem.typography.fontSize.sm` | 小字号 |
| `fontSize: 16px` | `designSystem.typography.fontSize.base` | 基础字号 |
| `fontSize: 18px` | `designSystem.typography.fontSize.lg` | 大字号 |
| `fontSize: 20px` | `designSystem.typography.fontSize.xl` | 特大字号 |
| `fontWeight: normal` | `designSystem.typography.fontWeight.normal` | 400 |
| `fontWeight: bold` | `designSystem.typography.fontWeight.bold` | 700 |

---

## 布局系统迁移

### MainLayout（主布局）

用于整个应用的外层布局，包含侧边栏导航和顶部栏。

**迁移步骤：**

1. **替换路由配置：**

```tsx
// 原路由
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/list" element={<ListPage />} />
  </Routes>
</BrowserRouter>

// 改为嵌套路由
import MainLayout from '@/layout/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'list', element: <ListPage /> },
    ],
  },
]);
```

2. **自定义菜单项：**

编辑 `src/layout/MainLayout.tsx` 中的 `menuItems`：

```tsx
const menuItems = [
  {
    key: '/your-page',
    icon: <YourIcon />,
    label: '你的页面',
  },
  // 添加更多菜单项
];
```

### PageLayout（页面布局）

用于单个页面内部的布局，支持顶部工具栏、左右侧边栏、底部状态栏。

**常见场景：**

**1. 列表页布局：**
```tsx
import PageLayout from '@/layout/PageLayout';

function ListPage() {
  const topBar = (
    // 搜索框、筛选器
  );

  const leftSidebar = (
    // 分类筛选
  );

  const rightSidebar = (
    // 详情预览
  );

  const bottomBar = (
    // 分页、统计信息
  );

  return (
    <PageLayout
      topBar={topBar}
      leftSidebar={leftSidebar}
      rightSidebar={rightSidebar}
      bottomBar={bottomBar}
    >
      {/* 主要内容：表格 */}
    </PageLayout>
  );
}
```

**2. 详情页布局：**
```tsx
function DetailPage() {
  const leftSidebar = (
    // 目录导航
  );

  const rightSidebar = (
    // 相关信息
  );

  return (
    <PageLayout
      leftSidebar={leftSidebar}
      rightSidebar={rightSidebar}
      contentPadding={designSystem.spacing[1]}  // 详情页需要 padding
    >
      {/* 主要内容：详情信息 */}
    </PageLayout>
  );
}
```

**参考文件：**
- 示例实现：`src/pages/ListPage.tsx`、`src/pages/DetailPage.tsx`
- 布局说明：`src/pages/LayoutGuidePage.tsx`

---

## 页面迁移

### 迁移检查清单

对于每个页面，按以下顺序迁移：

- [ ] 1. 应用 PageLayout 布局
- [ ] 2. 替换硬编码颜色为 `designSystem.colors.*`
- [ ] 3. 替换硬编码间距为 `designSystem.spacing.*`
- [ ] 4. 替换硬编码字体为 `designSystem.typography.*`
- [ ] 5. 使用 Card 组件包装内容块
- [ ] 6. 添加 Loading/Empty/Error 状态处理

### 示例：迁移一个列表页

**迁移前：**
```tsx
function OldListPage() {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Input placeholder="搜索" />
      </div>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}
```

**迁移后：**
```tsx
import PageLayout from '@/layout/PageLayout';
import { designSystem } from '@/styles';
import { LoadingState, EmptyState } from '@/components/common';

function NewListPage() {
  const [loading, setLoading] = useState(false);

  const topBar = (
    <div style={{ padding: designSystem.spacing[1] }}>
      <Input placeholder="搜索" />
    </div>
  );

  if (loading) return <LoadingState />;
  if (!data.length) return <EmptyState type="general" />;

  return (
    <PageLayout topBar={topBar}>
      <Card>
        <Table dataSource={data} columns={columns} />
      </Card>
    </PageLayout>
  );
}
```

---

## 组件迁移

### 弹窗组件

**原弹窗代码：**
```tsx
<Modal title="编辑" visible={open} onOk={handleOk} onCancel={handleCancel}>
  <Form>
    <Form.Item label="名称">
      <Input />
    </Form.Item>
  </Form>
</Modal>
```

**使用模板布局：**
```tsx
import { StandardModalLayout } from '@/components/modal';

<Modal
  open={open}
  onCancel={handleCancel}
  footer={null}
  width={600}
>
  <StandardModalLayout
    title="编辑"
    footer={
      <>
        <Button onClick={handleCancel}>取消</Button>
        <Button type="primary" onClick={handleOk}>确定</Button>
      </>
    }
  >
    <Form>
      <Form.Item label="名称">
        <Input />
      </Form.Item>
    </Form>
  </StandardModalLayout>
</Modal>
```

**参考文件：**
- `src/pages/ModalDemoPage.tsx` - 完整弹窗示例
- `src/components/modal/` - 弹窗布局组件

### 加载状态

**替换前：**
```tsx
{loading && <Spin />}
```

**替换后：**
```tsx
import { LoadingState } from '@/components/common';

{loading && <LoadingState mode="skeleton" rows={5} />}
```

**可选模式：**
- `mode="spin"` - Spin 加载器
- `mode="skeleton"` - 骨架屏
- `mode="linear"` - 线性进度条

### 空状态

**替换前：**
```tsx
{!data.length && <Empty description="暂无数据" />}
```

**替换后：**
```tsx
import { EmptyState } from '@/components/common';

{!data.length && <EmptyState type="general" />}
```

**可选类型：**
- `type="general"` - 通用空状态
- `type="dataset"` - 数据集空状态
- `type="query"` - 查询空状态

---

## 常见问题

### Q1: 如何自定义主题色？

**A:** 修改 `src/styles/DesignSystem.ts` 中的颜色配置：

```typescript
export default {
  colors: {
    primary: {
      50: '#e6f7ff',
      // ... 修改为你的品牌色
      500: '#YOUR_BRAND_COLOR',
    },
  },
};
```

### Q2: 侧边栏折叠状态为什么不保持？

**A:** PageLayout 已内置 localStorage 持久化，确保：
1. 使用受控模式：`leftDefaultCollapsed={leftCollapsed}`
2. 传入回调：`onLeftCollapsedChange={setLeftCollapsed}`

### Q3: 如何禁用响应式自动折叠？

**A:** 修改 `src/layout/PageLayout.tsx` 中的 `isWideEnough` 断点：

```typescript
// 默认 900px 以下自动折叠
const isWideEnough = useMediaQuery(`(min-width: 900px)`);

// 改为永不自动折叠
const isWideEnough = useMediaQuery(`(min-width: 0px)`);
```

### Q4: 如何在已有项目中只使用设计系统？

**A:** 只需复制 `src/styles/` 目录，然后在 ConfigProvider 中应用：

```tsx
import { designSystem } from '@/styles';

<ConfigProvider
  theme={{
    token: designSystem.antdToken,
    components: designSystem.components,
  }}
>
  {/* 你的现有代码 */}
</ConfigProvider>
```

### Q5: bottomBar 如何控制侧边栏？

**A:** 使用受控模式：

```tsx
function MyPage() {
  const [leftCollapsed, setLeftCollapsed] = useState(false);

  const bottomBar = (
    <Button onClick={() => setLeftCollapsed(!leftCollapsed)}>
      切换左侧栏
    </Button>
  );

  return (
    <PageLayout
      leftSidebar={sidebar}
      leftDefaultCollapsed={leftCollapsed}
      onLeftCollapsedChange={setLeftCollapsed}
      bottomBar={bottomBar}
    >
      内容
    </PageLayout>
  );
}
```

---

## 下一步

- 查看 [RefIndexing.md](./RefIndexing.md) 获取快速参考索引
- 查看 [DESIGN-GUIDELINES.md](./DESIGN-GUIDELINES.md) 了解详细设计规范
- 参考示例页面：`src/pages/DashboardPage.tsx`、`src/pages/ListPage.tsx`、`src/pages/DetailPage.tsx`

---

## 技术支持

如有问题，请：
1. 查看示例页面源码
2. 参考 `src/pages/LayoutGuidePage.tsx` 布局说明
3. 检查 `src/styles/DesignSystem.ts` 设计系统配置

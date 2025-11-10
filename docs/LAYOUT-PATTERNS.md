# 布局模式文档

## 概述

本文档介绍项目中的核心布局模式，包括布局组件、页面模板和最佳实践。

---

## 1. ThreeColumnLayout（核心布局）

### 1.1 结构

```
┌─────────────────────────────────────┐
│         Top Bar (可选)               │
├───┬──────────────────────┬──────────┤
│   │                      │          │
│ L │   Main Content       │  Right   │
│ e │   (children)         │  Sidebar │
│ f │                      │          │
│ t │                      │          │
│   │                      │          │
├───┴──────────────────────┴──────────┤
│       Bottom Bar (可选)              │
└─────────────────────────────────────┘
```

### 1.2 Props 接口

```typescript
interface ThreeColumnLayoutProps {
  // 顶部工具栏
  topBar?: ReactNode;
  topBarHeight?: string;  // 默认 40px

  // 左侧边栏
  leftSidebar?: ReactNode;
  leftSidebarWidth?: string;  // 默认 240px
  leftCollapsible?: boolean;  // 是否可折叠，默认 true
  leftDefaultCollapsed?: boolean;  // 默认折叠状态

  // 主内容区
  children: ReactNode;

  // 右侧边栏
  rightSidebar?: ReactNode;
  rightSidebarWidth?: string;  // 默认 280px
  rightCollapsible?: boolean;  // 是否可折叠，默认 true
  rightDefaultCollapsed?: boolean;

  // 底部状态栏
  bottomBar?: ReactNode;
  bottomBarHeight?: string;  // 默认 24px
}
```

### 1.3 使用示例

```typescript
import ThreeColumnLayout from '@/components/layout/ThreeColumnLayout';
import { designSystem } from '@/styles';

function MyPage() {
  return (
    <ThreeColumnLayout
      topBar={
        <div style={{ display: 'flex', alignItems: 'center', gap: designSystem.spacing[3] }}>
          <Input.Search placeholder="搜索..." />
          <Select options={[...]} />
          <Button type="primary">新建</Button>
        </div>
      }
      leftSidebar={
        <div style={{ padding: designSystem.spacing[4] }}>
          <h3>筛选</h3>
          <Checkbox.Group options={[...]} />
        </div>
      }
      rightSidebar={
        <div style={{ padding: designSystem.spacing[4] }}>
          <h3>详情</h3>
          <p>选中项的详细信息</p>
        </div>
      }
      bottomBar={
        <>
          <span>总数: 100</span>
          <span style={{ marginLeft: designSystem.spacing[4] }}>选中: 5</span>
        </>
      }
    >
      {/* 主内容区 */}
      <div>列表或表格</div>
    </ThreeColumnLayout>
  );
}
```

### 1.4 适用场景

- ✅ 列表页（数据集、任务、用户列表）
- ✅ 查询页（搜索、筛选、结果）
- ✅ 可视化页（图谱、图表、仪表板）
- ✅ 编辑页（代码编辑器、文档编辑器）

### 1.5 响应式行为

- **Desktop（≥ 1024px）**：三栏完整展示
- **Tablet（640-1023px）**：右侧边栏默认折叠
- **Mobile（< 640px）**：左右侧边栏变为抽屉

---

## 2. MainLayout（应用主布局）

### 2.1 结构

```
┌──────┬──────────────────────────┐
│      │  Header (56px)           │
│ Side │  Logo + 用户信息 + 退出   │
│ bar  ├──────────────────────────┤
│      │                          │
│ 240px│  <Outlet />              │
│      │  (子路由渲染区)           │
│      │                          │
└──────┴──────────────────────────┘
```

### 2.2 特性

- **可折叠侧边栏**：240px ↔ 64px
- **移动端抽屉**：< 640px 自动变为抽屉
- **权限守卫**：集成 PrivateRoute
- **菜单驱动导航**：基于路由配置自动生成菜单

### 2.3 使用示例

```typescript
import MainLayout from '@/components/layout/MainLayout';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/home" /> },
      { path: 'home', element: <HomePage /> },
      { path: 'datasets', element: <DatasetsPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
]);
```

### 2.4 菜单配置

```typescript
const menuItems = [
  {
    key: '/home',
    icon: <HomeOutlined />,
    label: '首页',
  },
  {
    key: '/datasets',
    icon: <DatabaseOutlined />,
    label: '数据集',
  },
  {
    key: '/profile',
    icon: <UserOutlined />,
    label: '个人中心',
  },
];
```

---

## 3. 页面容器组件

### 3.1 PageHeader（页面标题栏）

```typescript
interface PageHeaderProps {
  title: string;
  description?: string;
  extra?: ReactNode;  // 额外操作按钮
}

// 使用示例
<PageHeader
  title="数据集管理"
  description="管理所有数据集"
  extra={<Button type="primary">新建数据集</Button>}
/>
```

**固定高度**：56px

### 3.2 PageToolbar（工具栏）

```typescript
interface PageToolbarProps {
  left?: ReactNode;   // 左侧操作区
  right?: ReactNode;  // 右侧操作区
  style?: CSSProperties;
}

// 使用示例
<PageToolbar
  left={
    <>
      <Input.Search placeholder="搜索..." />
      <Select options={[...]} />
    </>
  }
  right={
    <>
      <Button icon={<ExportOutlined />}>导出</Button>
      <Button type="primary">新建</Button>
    </>
  }
/>
```

**最小高度**：40px

### 3.3 PageContainer（页面容器）

```typescript
interface PageContainerProps {
  children: ReactNode;
  maxWidth?: string;  // 最大宽度，默认无限制
  padding?: string;   // 内边距，默认 24px
}

// 使用示例
<PageContainer maxWidth="1200px">
  <YourContent />
</PageContainer>
```

### 3.4 StatusBar（状态栏）

```typescript
interface StatusBarProps {
  items: {
    label: string;
    value: string | number;
    icon?: ReactNode;
  }[];
}

// 使用示例
<StatusBar
  items={[
    { label: '总数', value: 100, icon: <FileOutlined /> },
    { label: '选中', value: 5 },
    { label: '最后更新', value: '2023-10-01 12:00' },
  ]}
/>
```

**固定高度**：24px

---

## 4. 布局模式最佳实践

### 4.1 顶部工具栏设计

#### 原则
- 左侧：主要操作（搜索、筛选、数据源选择）
- 右侧：次要操作（导出、设置、新建）
- 高度：40px

#### 示例
```typescript
const topBar = (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: designSystem.spacing[3],
    padding: `0 ${designSystem.spacing[4]}`,
    height: '100%',
  }}>
    {/* 左侧主要操作 */}
    <Input.Search style={{ width: 240 }} />
    <Select style={{ width: 120 }} />

    {/* 占位 */}
    <div style={{ flex: 1 }} />

    {/* 右侧次要操作 */}
    <Button icon={<ExportOutlined />}>导出</Button>
    <Button type="primary" icon={<PlusOutlined />}>新建</Button>
  </div>
);
```

### 4.2 左侧控制面板设计

#### 原则
- 宽度：200-240px
- 内容：导航、筛选器、分组、统计
- 可折叠

#### 结构模板
```typescript
<div style={{ padding: designSystem.spacing[4] }}>
  {/* 导航/分组 */}
  <section style={{ marginBottom: designSystem.spacing[6] }}>
    <h3 style={{ marginBottom: designSystem.spacing[2] }}>分类</h3>
    <Menu items={[...]} />
  </section>

  {/* 筛选器 */}
  <section style={{ marginBottom: designSystem.spacing[6] }}>
    <h3 style={{ marginBottom: designSystem.spacing[2] }}>筛选</h3>
    <Checkbox.Group options={[...]} />
  </section>

  {/* 统计信息 */}
  <section>
    <h3 style={{ marginBottom: designSystem.spacing[2] }}>统计</h3>
    <div>总数: 100</div>
  </section>
</div>
```

### 4.3 右侧详情面板设计

#### 原则
- 宽度：260-320px
- 内容：详情、操作、推荐
- 可折叠

#### 结构模板
```typescript
<div style={{ padding: designSystem.spacing[4] }}>
  {/* 详情卡片 */}
  <Card size="small" title="详情" style={{ marginBottom: designSystem.spacing[4] }}>
    <div><strong>名称:</strong> xxx</div>
    <div><strong>创建时间:</strong> xxx</div>
  </Card>

  {/* 操作卡片 */}
  <Card size="small" title="操作" style={{ marginBottom: designSystem.spacing[4] }}>
    <Button block onClick={...}>编辑</Button>
    <Button block danger onClick={...}>删除</Button>
  </Card>

  {/* 相关推荐 */}
  <Card size="small" title="相关推荐">
    <List dataSource={[...]} />
  </Card>
</div>
```

### 4.4 主内容区设计

#### 原则
- 占据剩余空间（`flex: 1`）
- 可滚动（`overflow: auto`）
- 合理的内边距

#### 示例
```typescript
<div style={{
  flex: 1,
  overflow: 'auto',
  padding: designSystem.spacing[4],
}}>
  {/* 列表 */}
  <List dataSource={[...]} />

  {/* 或表格 */}
  <Table columns={[...]} dataSource={[...]} />

  {/* 或图表 */}
  <Chart data={[...]} />
</div>
```

### 4.5 底部状态栏设计

#### 原则
- 高度：24px
- 字号：12px
- 显示关键信息：数量、时间、选中项

#### 示例
```typescript
const bottomBar = (
  <>
    <span>总数: {total}</span>
    <span style={{ marginLeft: designSystem.spacing[4] }}>选中: {selected}</span>
    <span style={{ marginLeft: designSystem.spacing[4] }}>最后更新: {lastUpdate}</span>
  </>
);
```

---

## 5. 响应式布局策略

### 5.1 断点
```typescript
Mobile:  < 640px
Tablet:  640px - 1023px
Desktop: ≥ 1024px
```

### 5.2 布局适配

#### Mobile（< 640px）
```typescript
- 单栏布局
- 侧边栏变为抽屉（Drawer）
- 工具栏折叠为下拉菜单
- 表格横向滚动
```

#### Tablet（640-1023px）
```typescript
- 两栏布局（左侧边栏 + 主内容）
- 右侧详情面板默认折叠或变为 Modal
```

#### Desktop（≥ 1024px）
```typescript
- 三栏布局完整展示
- 所有功能可见
```

### 5.3 使用 useMediaQuery Hook

```typescript
import { useMediaQuery } from '@/hooks';

function MyPage() {
  const isMobile = useMediaQuery(`(max-width: ${designSystem.breakpoints.mobile})`);
  const isDesktop = useMediaQuery(`(min-width: ${designSystem.breakpoints.laptop})`);

  return (
    <ThreeColumnLayout
      leftSidebar={isMobile ? undefined : <LeftPanel />}
      rightSidebar={isDesktop ? <RightPanel /> : undefined}
    >
      <MainContent />
    </ThreeColumnLayout>
  );
}
```

---

## 6. 性能优化

### 6.1 避免不必要的重新渲染

```typescript
// 使用 React.memo 包裹布局组件
export const ThreeColumnLayout = React.memo(ThreeColumnLayoutComponent);

// 使用 useMemo 缓存复杂计算
const enrichedData = useMemo(() => processData(data), [data]);

// 使用 useCallback 缓存回调函数
const handleClick = useCallback(() => {
  // ...
}, []);
```

### 6.2 懒加载侧边栏内容

```typescript
const LeftSidebar = lazy(() => import('./LeftSidebar'));

<Suspense fallback={<Spin />}>
  <LeftSidebar />
</Suspense>
```

---

## 7. 参考示例

### 示例 1：列表页布局
```typescript
// examples/01-list-page/index.tsx
```

### 示例 2：详情页布局
```typescript
// examples/02-detail-page/index.tsx
```

### 示例 3：编辑器布局
```typescript
// examples/03-editor-page/index.tsx
```

---

## 8. 常见问题

### Q1: 如何自定义侧边栏宽度？
A: 通过 `leftSidebarWidth` 和 `rightSidebarWidth` props 设置。

### Q2: 如何禁用侧边栏折叠？
A: 设置 `leftCollapsible={false}` 或 `rightCollapsible={false}`。

### Q3: 如何在移动端隐藏侧边栏？
A: 使用 `useMediaQuery` Hook 根据屏幕宽度条件渲染。

### Q4: 顶部工具栏高度可以自定义吗？
A: 是的，通过 `topBarHeight` prop 设置，但建议使用标准 40px。

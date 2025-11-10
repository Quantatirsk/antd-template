# 布局系统

本模板提供两个核心布局组件，构建了完整的二级布局体系。

## 布局层级

```
MainLayout（应用级布局）
    ├── Header（顶部导航栏）
    ├── Sider（侧边菜单）
    └── Content（内容区域）
          │
          └── PageLayout（页面级布局）
                ├── TopBar（页面工具栏）
                ├── LeftSidebar（左侧边栏）
                ├── Content（主内容区）
                ├── RightSidebar（右侧边栏）
                └── BottomBar（底部状态栏）
```

## MainLayout - 应用级布局

### 功能特性

- ✅ 固定侧边栏菜单
- ✅ 顶部导航栏
- ✅ 路由嵌套支持
- ✅ 响应式折叠（< 1024px 自动折叠）
- ✅ 点击内容区自动折叠
- ✅ 用户偏好记忆

### 基本使用

```tsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import DashboardPage from '@/pages/DashboardPage';
import ListPage from '@/pages/ListPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="list" element={<ListPage />} />
        <Route path="detail" element={<DetailPage />} />
      </Route>
    </Routes>
  );
}
```

### 自定义菜单

编辑 `src/components/layout/MainLayout.tsx`：

```tsx
const menuItems = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: '仪表板',
  },
  {
    key: '/users',
    icon: <UserOutlined />,
    label: '用户管理',
  },
  {
    key: '/products',
    icon: <ShoppingOutlined />,
    label: '产品管理',
    children: [  // 支持子菜单
      {
        key: '/products/list',
        label: '产品列表',
      },
      {
        key: '/products/categories',
        label: '分类管理',
      },
    ],
  },
];
```

### 响应式行为

**自动折叠**：
- 窗口宽度 < 1024px 时，侧边栏自动折叠
- 窗口宽度 ≥ 1024px 时，恢复用户上次的折叠状态

**点击内容区折叠**：
- 在展开状态下，点击内容区域会自动折叠侧边栏
- 方便用户专注于内容

### 自定义样式

```tsx
// 修改侧边栏宽度
// 在 design-system.ts 中修改
sidebarSystem: {
  leftWidth: '280px',  // 默认 255px
  collapsedWidth: '64px',  // 默认 56px
}
```

## PageLayout - 页面级布局

### 功能特性

- ✅ 五区域布局（topBar, leftSidebar, content, rightSidebar, bottomBar）
- ✅ 所有区域可选
- ✅ 独立的侧边栏折叠控制
- ✅ 响应式自动折叠（< 900px）
- ✅ 智能恢复用户偏好

### 基本结构

```tsx
import PageLayout from '@/components/layout/PageLayout';

function MyPage() {
  return (
    <PageLayout
      topBar={topBar}
      leftSidebar={leftSidebar}
      rightSidebar={rightSidebar}
      bottomBar={bottomBar}
    >
      {/* 主内容区 */}
    </PageLayout>
  );
}
```

### Props API

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| `topBar` | `ReactNode` | - | 顶部工具栏 |
| `topBarHeight` | `string` | `'48px'` | 工具栏高度 |
| `leftSidebar` | `ReactNode` | - | 左侧边栏 |
| `leftSidebarWidth` | `string` | `'255px'` | 左侧栏宽度 |
| `leftSidebarPadding` | `string` | `'8px'` | 左侧栏内边距 |
| `leftDefaultCollapsed` | `boolean` | `false` | 左侧栏初始折叠状态 |
| `onLeftCollapsedChange` | `(collapsed: boolean) => void` | - | 左侧栏折叠状态改变回调 |
| `children` | `ReactNode` | **必需** | 主内容区 |
| `contentPadding` | `string` | - | 主内容区内边距 |
| `rightSidebar` | `ReactNode` | - | 右侧边栏 |
| `rightSidebarWidth` | `string` | `'270px'` | 右侧栏宽度 |
| `rightSidebarPadding` | `string` | `'8px'` | 右侧栏内边距 |
| `rightDefaultCollapsed` | `boolean` | `false` | 右侧栏初始折叠状态 |
| `onRightCollapsedChange` | `(collapsed: boolean) => void` | - | 右侧栏折叠状态改变回调 |
| `bottomBar` | `ReactNode` | - | 底部状态栏 |

### 使用模式

#### 模式 1：完整五区域布局

```tsx
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, Button } from 'antd';
import { designSystem } from '@/styles';

function FullLayoutPage() {
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  // 顶部工具栏
  const topBar = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: designSystem.spacing[1],
      padding: designSystem.spacing[1],
      width: '100%',
    }}>
      <Button>操作1</Button>
      <Button type="primary">操作2</Button>
    </div>
  );

  // 左侧边栏
  const leftSidebar = (
    <Card size="small" title="筛选">
      {/* 筛选内容 */}
    </Card>
  );

  // 右侧边栏
  const rightSidebar = (
    <Card size="small" title="详情">
      {/* 详情内容 */}
    </Card>
  );

  // 底部状态栏
  const bottomBar = (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    }}>
      <span>状态信息</span>
      <div>
        <Button
          type="text"
          size="small"
          onClick={() => setLeftCollapsed(!leftCollapsed)}
        >
          左侧栏
        </Button>
        <Button
          type="text"
          size="small"
          onClick={() => setRightCollapsed(!rightCollapsed)}
        >
          右侧栏
        </Button>
      </div>
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
      <div style={{ padding: designSystem.spacing[3] }}>
        <Card>内容区域</Card>
      </div>
    </PageLayout>
  );
}
```

#### 模式 2：仅 TopBar + Content

```tsx
function SimpleLayoutPage() {
  const topBar = (
    <div style={{
      display: 'flex',
      padding: designSystem.spacing[1],
      gap: designSystem.spacing[1],
    }}>
      <Button>返回</Button>
      <div style={{ flex: 1 }} />
      <Button type="primary">保存</Button>
    </div>
  );

  return (
    <PageLayout topBar={topBar}>
      <div style={{ padding: designSystem.spacing[3] }}>
        {/* 主内容 */}
      </div>
    </PageLayout>
  );
}
```

#### 模式 3：LeftSidebar + Content + RightSidebar

```tsx
function ThreeColumnPage() {
  return (
    <PageLayout
      leftSidebar={<Card>左侧栏</Card>}
      rightSidebar={<Card>右侧栏</Card>}
    >
      <div style={{ padding: designSystem.spacing[3] }}>
        {/* 主内容 */}
      </div>
    </PageLayout>
  );
}
```

### 响应式行为

**自动折叠断点**：900px

- **宽度 < 900px**：
  - 左右侧边栏自动折叠
  - 保存当前折叠状态到内存

- **宽度 ≥ 900px**：
  - 恢复用户上次的折叠偏好
  - 如果用户从未手动折叠过，则自动展开

**智能记忆**：
```
用户操作：展开左侧栏 → 拖窄窗口 → 自动折叠 → 拖宽窗口 → 恢复展开
用户操作：折叠右侧栏 → 拖窄窗口 → 保持折叠 → 拖宽窗口 → 保持折叠
```

### 内容区 Padding 控制

PageLayout 支持灵活的内容区 padding 控制：

#### 方案 1：不设置 contentPadding（推荐）

适合内容区包含多个区域，每个区域有自己的 padding：

```tsx
<PageLayout topBar={topBar}>
  {/* 主内容区无 padding */}
  <div style={{
    flex: 1,
    overflow: 'auto',
    padding: designSystem.spacing[1],  // 在内部自行控制
  }}>
    <Card>区域1</Card>
    <Card>区域2</Card>
  </div>
</PageLayout>
```

#### 方案 2：设置 contentPadding

适合简单页面，整个内容区统一 padding：

```tsx
<PageLayout
  topBar={topBar}
  contentPadding={designSystem.spacing[3]}  // 统一16px padding
>
  <Card>内容</Card>
</PageLayout>
```

### 侧边栏 Padding 控制

侧边栏默认有 8px 的 padding，可自定义：

```tsx
<PageLayout
  leftSidebar={leftSidebar}
  leftSidebarPadding={designSystem.spacing[2]}  // 自定义 12px
  rightSidebar={rightSidebar}
  rightSidebarPadding="0"  // 不要 padding
>
  {children}
</PageLayout>
```

### BottomBar 设计模式

BottomBar 通常包含以下内容：

1. **状态信息**（左侧）
2. **侧栏控制按钮**（右侧）

```tsx
const bottomBar = (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  }}>
    {/* 左侧：状态信息 */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: designSystem.spacing[3],
      fontSize: designSystem.typography.fontSize.sm,
    }}>
      <span>总数: 100</span>
      <span>选中: 5</span>
      <span>页码: 1/10</span>
    </div>

    {/* 右侧：侧栏控制 */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: designSystem.spacing[2],
    }}>
      <Button
        type="text"
        size="small"
        icon={leftCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setLeftCollapsed(!leftCollapsed)}
        style={{
          fontSize: designSystem.componentFontSize.button,
          color: leftCollapsed
            ? designSystem.semantic.text.tertiary
            : designSystem.colors.primary[500],
        }}
      >
        左侧栏
      </Button>
      <Button
        type="text"
        size="small"
        icon={rightCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        onClick={() => setRightCollapsed(!rightCollapsed)}
      >
        右侧栏
      </Button>
    </div>
  </div>
);
```

## 布局最佳实践

### 1. 统一间距

所有区域使用 `designSystem.spacing[1]`（8px）作为基础间距：

```tsx
// TopBar
padding: designSystem.spacing[1]

// 左右侧边栏
leftSidebarPadding: designSystem.spacing[1]

// Card 之间
marginBottom: designSystem.spacing[1]

// BottomBar
padding: designSystem.spacing[1]
```

### 2. 卡片样式统一

侧边栏的卡片使用统一样式：

```tsx
<Card
  size="small"
  style={{
    borderRadius: designSystem.borderRadius.lg,
    marginBottom: designSystem.spacing[1],
  }}
>
  内容
</Card>
```

### 3. 按钮尺寸规范

- **TopBar 主要操作**：默认大小
- **TopBar 辅助操作**：`size="small"`
- **BottomBar 控制按钮**：`size="small"`

### 4. 主内容区滚动

确保主内容区可滚动：

```tsx
<PageLayout topBar={topBar}>
  <div style={{
    flex: 1,
    overflow: 'auto',  // 关键：允许滚动
    padding: designSystem.spacing[1],
  }}>
    {/* 长内容 */}
  </div>
</PageLayout>
```

### 5. 表格容器

表格需要 Card 包裹：

```tsx
<PageLayout topBar={topBar}>
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
    <Card
      style={{
        flex: 1,
        margin: designSystem.spacing[1],
        borderRadius: designSystem.tableSystem.containerBorderRadius,
      }}
      styles={{ body: { padding: parseInt(designSystem.spacing[1]), flex: 1, overflow: 'hidden' } }}
    >
      <Table
        scroll={{ y: 'calc(100vh - 306px)' }}  // 自适应高度
        {...otherProps}
      />
    </Card>
  </div>
</PageLayout>
```

## 常见布局场景

### 场景 1：列表页

```tsx
// TopBar: 搜索、筛选、批量操作
// LeftSidebar: 高级筛选、统计
// Content: 表格或卡片列表
// RightSidebar: 选中项详情
// BottomBar: 分页、统计、侧栏控制
```

### 场景 2：详情页

```tsx
// TopBar: 返回、编辑、删除
// LeftSidebar: 快速导航
// Content: Tabs展示详细信息
// RightSidebar: 关键信息、系统状态
// BottomBar: 操作提示、侧栏控制
```

### 场景 3：仪表板

```tsx
// TopBar: 时间筛选、刷新、导出
// LeftSidebar: 快速导航、快捷操作
// Content: 统计卡片、图表、活动流
// RightSidebar: 系统状态、今日概览
// BottomBar: 统计摘要、侧栏控制
```

### 场景 4：表单页

```tsx
// TopBar: 返回、保存、取消
// Content: 表单内容
// (无侧边栏和底部栏)
```

## 调试技巧

### 1. 检查布局高度

```tsx
// 主内容区必须设置 minHeight: 0
<div style={{
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,  // ← 关键
}}>
```

### 2. 检查滚动容器

```tsx
// 内容区设置 overflow: auto
<div style={{
  flex: 1,
  overflow: 'auto',  // ← 关键
}}>
```

### 3. 使用浏览器开发工具

- 检查 flex 布局是否正确
- 检查高度是否被正确计算
- 检查是否有意外的 margin/padding

## 下一步

- 阅读 [页面模板文档](./PAGE-TEMPLATES.md) 学习具体页面实现
- 阅读 [设计系统文档](./DESIGN-SYSTEM.md) 了解样式规范
- 阅读 [最佳实践](./BEST-PRACTICES.md) 提升代码质量

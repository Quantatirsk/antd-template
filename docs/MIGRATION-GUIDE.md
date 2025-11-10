# 迁移指南

本指南帮助你将现有项目迁移到这套 UI 布局及视觉交互体系。

## 迁移前准备

### 1. 评估现有项目

回答以下问题：
- [ ] 是否使用 React？（需要 React 16.8+）
- [ ] 是否使用 TypeScript？（推荐但非必需）
- [ ] 是否使用 Ant Design？（需要 v5.0+）
- [ ] 当前使用哪种构建工具？（Vite/Webpack/其他）
- [ ] 是否有现有的设计系统？

### 2. 备份代码

```bash
# 创建分支进行迁移
git checkout -b migrate-to-new-ui-system
```

### 3. 依赖检查

确保安装以下依赖：

```bash
npm install antd@^5.0.0 @ant-design/icons react-router-dom
```

## 迁移步骤

### 步骤 1：集成设计系统

#### 1.1 复制设计系统文件

```bash
# 复制设计系统核心文件
cp template/src/styles/design-system.ts src/styles/design-system.ts
cp template/src/styles/GlobalStyles.tsx src/styles/GlobalStyles.tsx
cp template/src/styles/common-styles.ts src/styles/common-styles.ts
```

#### 1.2 配置 Ant Design 主题

在 `App.tsx` 或根组件中添加：

```tsx
import { ConfigProvider } from 'antd';
import { designSystem } from '@/styles/design-system';
import GlobalStyles from '@/styles/GlobalStyles';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: designSystem.colors.primary[500],
          fontSize: parseInt(designSystem.componentFontSize.global),
          borderRadius: parseInt(designSystem.borderRadius.md),
          controlHeight: parseInt(designSystem.heights.inputMd),
        },
        components: {
          Table: {
            headerBg: designSystem.tableSystem.headerBackground,
            fontSize: parseInt(designSystem.componentFontSize.tableCell),
          },
          Card: {
            borderRadiusLG: parseInt(designSystem.borderRadius.lg),
          },
        },
      }}
    >
      <GlobalStyles />
      {/* 你的应用内容 */}
    </ConfigProvider>
  );
}
```

### 步骤 2：迁移布局系统

#### 2.1 复制布局组件

```bash
# 复制布局组件
cp -r template/src/components/layout src/components/layout

# 复制自定义 Hooks
cp -r template/src/hooks src/hooks
```

#### 2.2 替换现有主布局

**之前**：
```tsx
// 旧的布局
<div className="app-layout">
  <header>...</header>
  <aside>...</aside>
  <main>...</main>
</div>
```

**之后**：
```tsx
import MainLayout from '@/components/layout/MainLayout';

// 使用 MainLayout（配合 React Router）
<Routes>
  <Route path="/" element={<MainLayout />}>
    <Route path="dashboard" element={<DashboardPage />} />
    <Route path="list" element={<ListPage />} />
  </Route>
</Routes>
```

### 步骤 3：迁移页面布局

#### 3.1 识别页面类型

将现有页面归类为三种类型之一：

1. **Dashboard 类型**：统计数据展示、图表、活动流
2. **List 类型**：数据列表、表格、筛选、批量操作
3. **Detail 类型**：详细信息、多 Tab、关联数据

#### 3.2 使用 PageLayout 重构

**之前**：
```tsx
function MyPage() {
  return (
    <div className="page">
      <div className="toolbar">...</div>
      <div className="sidebar">...</div>
      <div className="content">...</div>
    </div>
  );
}
```

**之后**：
```tsx
import PageLayout from '@/components/layout/PageLayout';
import { designSystem } from '@/styles';

function MyPage() {
  const topBar = (
    <div style={{
      display: 'flex',
      padding: designSystem.spacing[1],
      gap: designSystem.spacing[1],
    }}>
      {/* 工具栏内容 */}
    </div>
  );

  const leftSidebar = (
    <Card size="small">
      {/* 左侧栏内容 */}
    </Card>
  );

  return (
    <PageLayout topBar={topBar} leftSidebar={leftSidebar}>
      {/* 主内容 */}
    </PageLayout>
  );
}
```

### 步骤 4：迁移样式

#### 4.1 替换硬编码值

使用全局搜索替换硬编码样式：

**颜色迁移**：
```tsx
// 之前
color: '#333'
background: '#fff'
border: '1px solid #ddd'

// 之后
color: designSystem.semantic.text.primary
background: designSystem.semantic.surface.base
borderColor: designSystem.semantic.border.light
```

**间距迁移**：
```tsx
// 之前
padding: '16px'
margin: '8px 0'
gap: '12px'

// 之后
padding: designSystem.spacing[3]
margin: `${designSystem.spacing[1]} 0`
gap: designSystem.spacing[2]
```

**字体迁移**：
```tsx
// 之前
fontSize: '14px'
fontWeight: 600
lineHeight: 1.5

// 之后
fontSize: designSystem.typography.fontSize.base
fontWeight: designSystem.typography.fontWeight.semibold
lineHeight: designSystem.typography.lineHeight.normal
```

#### 4.2 批量替换工具

使用 VS Code 的查找替换功能：

1. 打开查找（Cmd/Ctrl + F）
2. 启用正则表达式
3. 查找：`padding:\s*['"](\d+)px['"]`
4. 替换：`padding: designSystem.spacing[计算值]`

### 步骤 5：迁移组件

#### 5.1 统一 Ant Design 组件使用

**Button 尺寸**：
```tsx
// 主要操作按钮 - 默认大小
<Button type="primary">提交</Button>

// 辅助操作按钮 - 小尺寸
<Button size="small">取消</Button>

// 表格内按钮 - 链接 + 小尺寸
<Button type="link" size="small">编辑</Button>
```

**Card 组件**：
```tsx
// 统一使用 small size 和圆角
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

#### 5.2 复制通用组件

```bash
# 复制状态组件
cp -r template/src/components/Common src/components/Common
```

使用状态组件：
```tsx
import { LoadingState, EmptyState, ErrorState } from '@/components/Common';

// 加载状态
{loading && <LoadingState />}

// 空状态
{!loading && data.length === 0 && (
  <EmptyState type="general" description="暂无数据" />
)}

// 错误状态
{error && <ErrorState error={error} onRetry={handleRetry} />}
```

### 步骤 6：迁移路由

#### 6.1 使用 React Router v6

**之前**（v5）：
```tsx
<Switch>
  <Route path="/dashboard" component={Dashboard} />
  <Route path="/list" component={List} />
</Switch>
```

**之后**（v6）：
```tsx
<Routes>
  <Route path="/" element={<MainLayout />}>
    <Route index element={<Navigate to="/dashboard" />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="list" element={<List />} />
  </Route>
</Routes>
```

#### 6.2 更新导航代码

**之前**：
```tsx
import { useHistory } from 'react-router-dom';
const history = useHistory();
history.push('/dashboard');
```

**之后**：
```tsx
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/dashboard');
```

### 步骤 7：迁移表格和列表

#### 7.1 使用统一的表格配置

```tsx
import { designSystem } from '@/styles';

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    width: designSystem.tableColumnWidths.name,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: designSystem.tableColumnWidths.status,
  },
  {
    title: '日期',
    dataIndex: 'date',
    width: designSystem.tableColumnWidths.date,
  },
  {
    title: '操作',
    key: 'action',
    width: designSystem.tableColumnWidths.action,
    render: (_, record) => (
      <Space size={parseInt(designSystem.spacing[0.5])}>
        <Button type="link" size="small">编辑</Button>
        <Button type="link" size="small" danger>删除</Button>
      </Space>
    ),
  },
];

<Table
  size="small"
  columns={columns}
  dataSource={data}
  pagination={{ size: 'small' }}
/>
```

### 步骤 8：测试迁移

#### 8.1 视觉测试清单

- [ ] 所有页面的布局是否正确
- [ ] 颜色主题是否统一
- [ ] 间距是否协调
- [ ] 字体大小是否合适
- [ ] 响应式是否正常工作

#### 8.2 功能测试清单

- [ ] 路由跳转是否正常
- [ ] 表单提交是否正常
- [ ] 数据加载是否正常
- [ ] 交互反馈是否正常
- [ ] 侧边栏折叠是否正常

#### 8.3 响应式测试

在不同屏幕尺寸下测试：
- 手机（< 640px）
- 平板（768px）
- 笔记本（1024px）
- 桌面（1280px+）

## 迁移模式

### 模式 1：渐进式迁移（推荐）

适合大型项目，逐步迁移：

1. **第一阶段**：集成设计系统
   - 复制 design-system.ts
   - 配置 ConfigProvider
   - 添加 GlobalStyles

2. **第二阶段**：迁移新页面
   - 新开发的页面使用新布局系统
   - 保持旧页面不变

3. **第三阶段**：逐步替换旧页面
   - 按优先级重构旧页面
   - 每次迁移一个模块

4. **第四阶段**：统一样式
   - 替换所有硬编码样式
   - 统一组件使用规范

### 模式 2：一次性迁移

适合小型项目，一次性完成：

1. 复制所有核心文件
2. 替换主布局
3. 批量重构页面
4. 全面测试

## 常见问题

### Q1: 现有的 CSS 样式如何处理？

**A**: 三种方式：

1. **保留共存**：旧样式继续使用，新功能用新系统
2. **逐步替换**：用 designSystem 替换硬编码值
3. **完全移除**：删除旧 CSS，全部用新系统

推荐方式 2（逐步替换）。

### Q2: 如何处理自定义组件？

**A**:
```tsx
// 在自定义组件中使用 designSystem
import { designSystem } from '@/styles';

function MyComponent() {
  return (
    <div style={{
      padding: designSystem.spacing[3],
      borderRadius: designSystem.borderRadius.md,
      background: designSystem.semantic.surface.base,
    }}>
      {/* 内容 */}
    </div>
  );
}
```

### Q3: 现有主题如何适配？

**A**: 修改 `design-system.ts` 中的颜色：

```typescript
export const colors = {
  primary: {
    500: '#你的品牌色',
    // 使用工具生成其他色阶
  },
}
```

### Q4: 如何处理第三方 UI 库？

**A**:
1. 优先使用 Ant Design 组件替换
2. 无法替换的，使用 designSystem 统一样式
3. 保持最少第三方依赖

### Q5: 性能会受影响吗？

**A**: 不会。设计系统是编译时的配置，运行时没有额外开销。

## 迁移检查清单

### 文件迁移
- [ ] 复制 `design-system.ts`
- [ ] 复制 `GlobalStyles.tsx`
- [ ] 复制布局组件（MainLayout, PageLayout）
- [ ] 复制通用组件（LoadingState, EmptyState, ErrorState）
- [ ] 复制自定义 Hooks
- [ ] 复制工具函数

### 配置更新
- [ ] 配置 ConfigProvider
- [ ] 添加 GlobalStyles
- [ ] 更新路由配置
- [ ] 更新菜单配置

### 代码重构
- [ ] 替换主布局
- [ ] 重构页面布局
- [ ] 替换硬编码颜色
- [ ] 替换硬编码间距
- [ ] 替换硬编码字体
- [ ] 统一组件使用规范

### 测试验证
- [ ] 视觉测试
- [ ] 功能测试
- [ ] 响应式测试
- [ ] 浏览器兼容性测试
- [ ] 性能测试

## 迁移后优化

### 1. 代码审查

使用 ESLint 规则检查硬编码值：

```javascript
// .eslintrc.js
module.exports = {
  rules: {
    'no-magic-numbers': ['warn', {
      ignore: [0, 1, -1],
      ignoreArrayIndexes: true,
    }],
  },
};
```

### 2. 文档更新

更新团队文档：
- 设计规范文档
- 组件使用文档
- 开发指南

### 3. 培训团队

组织团队培训：
- 设计系统介绍
- 布局系统使用
- 最佳实践分享

## 获取帮助

迁移遇到问题？

1. 查看 [架构概览](./ARCHITECTURE.md)
2. 查看 [设计系统](./DESIGN-SYSTEM.md)
3. 查看 [布局系统](./LAYOUT-SYSTEM.md)
4. 查看 [最佳实践](./BEST-PRACTICES.md)

## 下一步

- 阅读 [布局系统文档](./LAYOUT-SYSTEM.md)
- 阅读 [页面模板文档](./PAGE-TEMPLATES.md)
- 阅读 [最佳实践](./BEST-PRACTICES.md)

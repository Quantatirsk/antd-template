# 快速参考索引（RefIndexing）

本文档提供快速索引，帮助你在开发时快速找到参考页面、组件和样式配置。

---

## 🎯 我想要...

### 参考一个完整页面

| 页面类型 | 参考文件 | 包含功能 |
|---------|---------|---------|
| **仪表板/大屏展示** | `src/pages/DashboardPage.tsx` | DisplayLayout 全屏布局、统计卡片、图表展示、系统状态监控 |
| **列表页** | `src/pages/ListPage.tsx` | 搜索筛选、表格、分页、CRUD 操作、卡片/表格切换 |
| **详情页** | `src/pages/DetailPage.tsx` | Tabs 切换、信息展示、操作按钮、编辑弹窗 |
| **布局说明页** | `src/pages/LayoutGuidePage.tsx` | MainLayout 和 PageLayout 使用示例 |
| **弹窗演示页** | `src/pages/ModalDemoPage.tsx` | 标准弹窗、抽屉、向导式弹窗 |

### 使用某种布局

| 布局需求 | 参考文件 | 何时使用 |
|---------|---------|---------|
| **整个应用的外层布局** | `src/layout/MainLayout.tsx` | 侧边栏导航、顶部栏、路由嵌套 |
| **单个页面的内部布局** | `src/layout/PageLayout.tsx` | 顶部工具栏、左右侧边栏、底部状态栏 |
| **全屏展示布局** | `src/layout/DisplayLayout.tsx` | 大屏展示、数据可视化、演示模式 |
| **响应式网格布局** | `src/layout/ResponsiveGrid.tsx` | 统计卡片、产品列表等均匀网格布局 |
| **标准三段式弹窗** | `src/components/modal/StandardModalLayout.tsx` | Header + Content + Footer 弹窗 |
| **抽屉式弹窗** | `src/components/modal/DrawerLayout.tsx` | 侧边滑出的 Drawer |
| **向导式弹窗** | `src/components/modal/WizardModalLayout.tsx` | 多步骤操作流程 |

### 使用某个通用组件

| 组件类型 | 参考文件 | 使用场景 |
|---------|---------|---------|
| **加载状态** | `src/components/common/LoadingState.tsx` | Spin、Skeleton、Progress |
| **空状态** | `src/components/common/EmptyState.tsx` | 无数据时的占位提示 |
| **错误状态** | `src/components/common/ErrorState.tsx` | 错误页面/错误提示 |

### 查看设计规范

| 规范类型 | 参考文件 | 内容 |
|---------|---------|------|
| **颜色系统** | `src/styles/DesignSystem.ts` → `colors` | 主色、中性色、功能色 |
| **间距系统** | `src/styles/DesignSystem.ts` → `spacing` | 8px 网格系统 |
| **字体系统** | `src/styles/DesignSystem.ts` → `typography` | 字号、字重、行高 |
| **组件尺寸** | `src/styles/DesignSystem.ts` → `heights/widths` | 按钮、输入框、导航栏高度 |
| **Ant Design Token** | `src/styles/DesignSystem.ts` → `antdToken` | ConfigProvider 配置 |
| **通用样式工具** | `src/styles/CommonStyles.ts` | Flex 布局、卡片样式等 |

---

## 📖 常见场景速查

### 场景 1：创建响应式卡片网格

**步骤：**
1. 导入 `ResponsiveGrid` 组件
2. 定义响应式列数配置
3. 传入卡片子元素数组

**关键代码：**
```tsx
import { ResponsiveGrid } from '@/layout';
import { Card, Statistic } from 'antd';

function StatisticsGrid() {
  const stats = [
    { title: '总用户数', value: 1234 },
    { title: '今日访问', value: 567 },
    { title: '订单总数', value: 890 },
  ];

  return (
    <ResponsiveGrid columns={{ xs: 1, sm: 2, lg: 4 }}>
      {stats.map((stat, index) => (
        <Card key={index}>
          <Statistic title={stat.title} value={stat.value} />
        </Card>
      ))}
    </ResponsiveGrid>
  );
}
```

### 场景 2：创建一个列表页

**步骤：**
1. 参考 `src/pages/ListPage.tsx`
2. 使用 `PageLayout` 组件
3. 添加 topBar（搜索/筛选）
4. 添加 leftSidebar（分类）
5. 主内容区使用 `<Card><Table /></Card>`
6. 添加 bottomBar（分页/统计）

**关键代码：**
```tsx
import PageLayout from '@/layout/PageLayout';
import { designSystem } from '@/styles';

function MyListPage() {
  const topBar = (
    <div style={{ padding: designSystem.spacing[1] }}>
      <Input.Search placeholder="搜索" />
    </div>
  );

  return (
    <PageLayout topBar={topBar}>
      <Card>
        <Table dataSource={data} columns={columns} />
      </Card>
    </PageLayout>
  );
}
```

### 场景 3：创建一个详情页

**步骤：**
1. 参考 `src/pages/DetailPage.tsx`
2. 使用 `PageLayout` 组件
3. 使用 `contentPadding={designSystem.spacing[1]}`
4. 使用 `Tabs` 组织内容
5. 使用 `Descriptions` 展示信息

**关键代码：**
```tsx
import PageLayout from '@/layout/PageLayout';
import { Card, Descriptions, Tabs } from 'antd';
import { designSystem } from '@/styles';

function MyDetailPage() {
  return (
    <PageLayout contentPadding={designSystem.spacing[1]}>
      <Card>
        <Tabs items={[
          {
            key: 'basic',
            label: '基本信息',
            children: <Descriptions items={items} />
          }
        ]} />
      </Card>
    </PageLayout>
  );
}
```

### 场景 4：创建大屏展示页面

**步骤：**
1. 参考 `src/pages/DashboardPage.tsx`
2. 使用 `DisplayLayout` 组件
3. 配置 contentPadding 和 backgroundColor
4. 顶部栏整合系统状态和操作按钮
5. 主内容区全屏展示图表和数据

**关键代码：**
```tsx
import DisplayLayout from '@/layout/DisplayLayout';
import { designSystem } from '@/styles';

function MyDashboard() {
  const topBar = (
    <div style={{ display: 'flex', gap: designSystem.spacing[2], width: '100%' }}>
      {/* 左侧：筛选控制 */}
      <Space>
        <Select value={filter} onChange={setFilter} />
      </Space>

      {/* 中间：系统状态 */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Tooltip title="CPU"><Progress type="circle" percent={45} size={32} /></Tooltip>
        <Tooltip title="内存"><Progress type="circle" percent={72} size={32} /></Tooltip>
      </div>

      {/* 右侧：操作按钮 */}
      <Space>
        <Button icon={<ReloadOutlined />}>刷新</Button>
      </Space>
    </div>
  );

  return (
    <DisplayLayout
      topBar={topBar}
      contentPadding={designSystem.spacing[3]}
      backgroundColor={designSystem.semantic.surface.background}
    >
      {/* 统计卡片 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}><StatCard /></Col>
        <Col xs={24} sm={12} lg={6}><StatCard /></Col>
      </Row>

      {/* 图表展示 */}
      <Card><ChartComponent /></Card>
    </DisplayLayout>
  );
}
```

### 场景 5：添加一个编辑弹窗

**步骤：**
1. 参考 `src/pages/ModalDemoPage.tsx`
2. 使用 `StandardModalLayout` 组件
3. 包裹在 `Modal` 中

**关键代码：**
```tsx
import { Modal } from 'antd';
import { StandardModalLayout } from '@/components/modal';

<Modal open={open} onCancel={onClose} footer={null} width={600}>
  <StandardModalLayout
    title="编辑"
    footer={
      <>
        <Button onClick={onClose}>取消</Button>
        <Button type="primary" onClick={onSave}>保存</Button>
      </>
    }
  >
    <Form>
      {/* 表单内容 */}
    </Form>
  </StandardModalLayout>
</Modal>
```

### 场景 6：显示加载状态

**步骤：**
1. 参考 `src/components/common/LoadingState.tsx`
2. 根据场景选择模式

**关键代码：**
```tsx
import { LoadingState } from '@/components/common';

// Skeleton 模式（列表加载）
{loading && <LoadingState mode="skeleton" rows={5} />}

// Spin 模式（局部加载）
{loading && <LoadingState mode="spin" />}

// 进度条模式（文件上传）
{uploading && <LoadingState mode="linear" percent={progress} />}
```

### 场景 7：显示空状态

**步骤：**
1. 参考 `src/components/common/EmptyState.tsx`
2. 选择合适的类型

**关键代码：**
```tsx
import { EmptyState } from '@/components/common';

// 通用空状态
{!data.length && <EmptyState type="general" />}

// 数据集空状态
{!datasets.length && <EmptyState type="dataset" />}

// 查询结果为空
{!results.length && <EmptyState type="query" />}
```

### 场景 8：使用设计系统的颜色

**常用颜色速查：**
```tsx
import { designSystem } from '@/styles';

// 主色
designSystem.colors.primary[500]        // #005BAC

// 文字颜色
designSystem.semantic.text.primary      // 标题、主要内容
designSystem.semantic.text.secondary    // 正文、次要内容
designSystem.semantic.text.tertiary     // 辅助文字、禁用状态

// 背景色
designSystem.semantic.surface.base       // 卡片背景（白色）
designSystem.semantic.surface.background // 页面背景（浅灰）

// 边框
designSystem.semantic.border.light       // 浅色边框
designSystem.semantic.border.medium      // 标准边框

// 功能色
designSystem.colors.success  // #10B981 绿色
designSystem.colors.warning  // #F59E0B 橙色
designSystem.colors.error    // #EF4444 红色
designSystem.colors.info     // #2680C7 蓝色
```

### 场景 9：使用设计系统的间距

**常用间距速查：**
```tsx
import { designSystem } from '@/styles';

designSystem.spacing[1]   // 8px  - 最小间距（最常用）
designSystem.spacing[2]   // 12px - 紧凑间距
designSystem.spacing[3]   // 16px - 标准间距
designSystem.spacing[4]   // 20px - 舒适间距（卡片 padding）
designSystem.spacing[5]   // 24px - 大间距（卡片之间）
designSystem.spacing[6]   // 32px - 区域间距

// 实战示例
<Card style={{
  padding: designSystem.spacing[4],      // 内边距 20px
  marginBottom: designSystem.spacing[5]  // 外边距 24px
}}>
  <div style={{
    marginBottom: designSystem.spacing[3]  // 元素间距 16px
  }}>
    内容
  </div>
</Card>
```

### 场景 10：配置 Ant Design 主题

**步骤：**
1. 参考 `src/App.tsx`
2. 使用 `designSystem.antdToken` 和 `designSystem.components`

**关键代码：**
```tsx
import { ConfigProvider } from 'antd';
import { designSystem } from '@/styles';
import { GlobalStyles } from '@/styles';

<ConfigProvider
  theme={{
    token: designSystem.antdToken,
    components: designSystem.components,
  }}
>
  <GlobalStyles />
  {/* 你的应用 */}
</ConfigProvider>
```

---

## 🗂️ 文件结构速查

```
antd-template/
├── src/
│   ├── layout/                   # 布局组件
│   │   ├── MainLayout.tsx        # 主布局（侧边栏+导航）
│   │   ├── PageLayout.tsx        # 页面布局（工具栏+侧边栏）
│   │   ├── DisplayLayout.tsx     # 全屏展示布局（大屏模式）
│   │   └── ResponsiveGrid.tsx    # 响应式网格布局
│   │
│   ├── pages/                    # 示例页面
│   │   ├── DashboardPage.tsx     # 仪表板/大屏展示示例
│   │   ├── ListPage.tsx          # 列表页示例
│   │   ├── DetailPage.tsx        # 详情页示例
│   │   ├── LayoutGuidePage.tsx   # 布局说明
│   │   └── ModalDemoPage.tsx     # 弹窗示例
│   │
│   ├── components/
│   │   ├── common/               # 通用组件
│   │   │   ├── LoadingState.tsx  # 加载状态
│   │   │   ├── EmptyState.tsx    # 空状态
│   │   │   └── ErrorState.tsx    # 错误状态
│   │   │
│   │   └── modal/                # 弹窗布局
│   │       ├── StandardModalLayout.tsx  # 标准弹窗
│   │       ├── DrawerLayout.tsx         # 抽屉弹窗
│   │       └── WizardModalLayout.tsx    # 向导弹窗
│   │
│   ├── styles/                   # 设计系统
│   │   ├── DesignSystem.ts       # ⭐ 核心设计规范
│   │   ├── CommonStyles.ts       # 通用样式工具
│   │   └── GlobalStyles.tsx      # 全局样式
│   │
│   ├── hooks/
│   │   └── useMediaQuery.ts      # 响应式 Hook
│   │
│   ├── router/
│   │   └── index.tsx             # 路由配置
│   │
│   └── App.tsx                   # ⭐ ConfigProvider 配置
│
└── docs/                         # 文档
    ├── MIGRATION-GUIDE.md        # 迁移指南
    ├── DESIGN-GUIDELINES.md      # 设计规范
    └── RefIndexing.md            # 本文档
```

---

## 📚 设计系统核心文件

### src/styles/DesignSystem.ts

**结构：**
```typescript
export default {
  // 颜色系统
  colors: {
    primary: { 50...900 },
    neutral: { 0, 50, 100, 200, 400, 600, 900 },
    success, warning, error, info
  },

  // 语义化颜色
  semantic: {
    surface: { base, background, elevated, overlay },
    border: { light, medium },
    text: { primary, secondary, tertiary, inverse },
    interactive: { primary, primaryHover, secondary, secondaryHover }
  },

  // 间距系统（8px 网格）
  spacing: { 0, 0.25, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16 },

  // 字体系统
  typography: {
    fontSize: { xs, sm, base, lg, xl, 2xl, 3xl },
    fontWeight: { normal, medium, semibold, bold },
    lineHeight: { tight, normal, relaxed }
  },

  // 高度系统
  heights: {
    header, toolbar, breadcrumb,
    inputSm, input, inputLg,
    buttonSm, button, buttonLg
  },

  // 宽度系统
  inputWidths: { sm, md, lg, xl, search },
  buttonWidths: { sm, md, lg },

  // 布局系统
  sidebarSystem: { leftWidth, collapsedWidth, leftMinWidth, ... },
  cardSystem: { borderRadius, padding, shadow },
  borderRadius: { none, sm, md, lg, xl, full },

  // Ant Design Token
  antdToken: { ... },
  components: { Button, Input, Card, ... }
}
```

---

## 🔍 快速搜索

### 我想找...

| 关键词 | 查找位置 |
|--------|---------|
| **颜色** | `src/styles/DesignSystem.ts` → `colors` 或 `semantic` |
| **间距** | `src/styles/DesignSystem.ts` → `spacing` |
| **字体** | `src/styles/DesignSystem.ts` → `typography` |
| **按钮高度** | `src/styles/DesignSystem.ts` → `heights.button*` |
| **输入框宽度** | `src/styles/DesignSystem.ts` → `inputWidths` |
| **卡片样式** | `src/styles/DesignSystem.ts` → `cardSystem` |
| **侧边栏宽度** | `src/styles/DesignSystem.ts` → `sidebarSystem` |
| **圆角** | `src/styles/DesignSystem.ts` → `borderRadius` |
| **Ant Design 配置** | `src/App.tsx` → `ConfigProvider` |
| **路由配置** | `src/router/index.tsx` |
| **菜单配置** | `src/layout/MainLayout.tsx` → `menuItems` |

### 我想看...

| 功能 | 参考文件 |
|------|---------|
| **如何做搜索筛选** | `src/pages/ListPage.tsx` → topBar |
| **如何做 CRUD 操作** | `src/pages/ListPage.tsx` |
| **如何做 Tabs 切换** | `src/pages/DetailPage.tsx` |
| **如何做分页** | `src/pages/ListPage.tsx` |
| **如何做侧边栏折叠** | `src/layout/MainLayout.tsx` 或 `PageLayout.tsx` |
| **如何做响应式布局** | `src/hooks/useMediaQuery.ts` |
| **如何做弹窗** | `src/pages/ModalDemoPage.tsx` |
| **如何做加载/空状态** | `src/components/common/` |

---

## 💡 Vibecoding 提示

在使用 AI 辅助编码时，可以这样描述：

### ✅ 好的提示

```
"参考 src/pages/ListPage.tsx，创建一个用户管理页面，
包含搜索框、表格、编辑弹窗，使用 PageLayout 布局，
颜色和间距使用 designSystem"
```

```
"参考 src/pages/DetailPage.tsx，创建一个产品详情页，
使用 Tabs 展示基本信息和规格参数，
使用 designSystem.spacing[1] 作为 contentPadding"
```

```
"参考 src/components/modal/StandardModalLayout.tsx，
创建一个添加用户的弹窗，包含表单，高度600px"
```

```
"参考 src/pages/DashboardPage.tsx，创建一个数据大屏页面，
使用 DisplayLayout 全屏展示，包含系统状态、统计卡片和图表，
使用 designSystem.spacing[3] 作为 contentPadding"
```

### ❌ 不好的提示

```
"创建一个列表页"  // 太模糊，没有指定参考
```

```
"用蓝色做主题"  // 应该使用 designSystem.colors.primary[500]
```

```
"padding 用 20px"  // 应该使用 designSystem.spacing[4]
```

---

## 📝 相关文档

- **[MIGRATION-GUIDE.md](./MIGRATION-GUIDE.md)** - 如何迁移现有项目
- **[DESIGN-GUIDELINES.md](./DESIGN-GUIDELINES.md)** - 详细设计规范
- **在线运行** - `npm run dev` 查看所有示例页面

---

## 🎓 学习路径

**新手入门：**
1. 阅读 [DESIGN-GUIDELINES.md](./DESIGN-GUIDELINES.md) 了解设计系统
2. 运行 `npm run dev`，查看 "布局说明" 页面
3. 参考 `src/pages/ListPage.tsx` 创建第一个页面

**进阶开发：**
1. 阅读 [MIGRATION-GUIDE.md](./MIGRATION-GUIDE.md) 学习最佳实践
2. 研究 `src/styles/DesignSystem.ts` 理解设计规范
3. 参考 `src/pages/ModalDemoPage.tsx` 学习弹窗布局

**专家级：**
1. 自定义 `src/styles/DesignSystem.ts` 中的 token
2. 扩展 `src/components/modal/` 添加新的布局组件
3. 优化 `src/layout/` 布局组件以适应特定需求

---

**快速开始：**
```bash
# 安装依赖
npm install

# 运行开发服务器
npm run dev

# 查看示例页面
http://localhost:5173
```

Happy Coding! 🚀

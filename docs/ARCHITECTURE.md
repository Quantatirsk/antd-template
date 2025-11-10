# 架构概览

## 项目简介

这是一个基于 **Ant Design + React + TypeScript** 的企业级前端 UI 模板，提供完整的设计系统、布局组件和页面模板，帮助团队快速构建专业、一致的前端应用。

## 核心特性

### 1. 完整的设计系统
- **8px 网格系统**：遵循 Apple iOS 设计规范
- **统一的设计 Tokens**：颜色、间距、字体、阴影等全部配置化
- **语义化命名**：surface、text、interactive 等语义化颜色系统
- **响应式支持**：完善的断点系统和自适应布局

### 2. 灵活的布局系统
- **MainLayout**：应用级主布局（顶部导航 + 侧边菜单 + 内容区）
- **PageLayout**：页面级布局（topBar + 左右侧边栏 + bottomBar）
- **自动响应式折叠**：窗口缩小自动折叠侧边栏，放大时恢复用户偏好

### 3. 三大页面模板
- **Dashboard（仪表板）**：统计卡片 + 图表 + 活动流
- **List（列表页）**：搜索筛选 + 表格/卡片视图切换 + 批量操作
- **Detail（详情页）**：多 Tab 展示 + 侧边栏快速导航 + 关联数据

### 4. 现代化技术栈
- **React 18** + **TypeScript 5**
- **Vite** - 极速开发体验
- **React Router v6** - 现代化路由
- **Ant Design 5** - 企业级组件库

## 项目结构

```
antd-template/
├── src/
│   ├── api/                    # API 接口层
│   │   ├── base.ts            # 基础 API 配置
│   │   ├── types.ts           # API 类型定义
│   │   └── index.ts           # API 导出
│   │
│   ├── components/            # 组件库
│   │   ├── Common/           # 通用组件
│   │   │   ├── LoadingState.tsx   # 加载状态
│   │   │   ├── EmptyState.tsx     # 空状态
│   │   │   └── ErrorState.tsx     # 错误状态
│   │   │
│   │   └── layout/           # 布局组件
│   │       ├── MainLayout.tsx     # 主布局
│   │       └── PageLayout.tsx     # 页面布局
│   │
│   ├── pages/                # 页面模板
│   │   ├── DashboardPage.tsx # 仪表板
│   │   ├── ListPage.tsx      # 列表页
│   │   └── DetailPage.tsx    # 详情页
│   │
│   ├── styles/               # 样式系统
│   │   ├── design-system.ts  # 设计系统（核心）
│   │   ├── GlobalStyles.tsx  # 全局样式
│   │   └── common-styles.ts  # 通用样式工具
│   │
│   ├── hooks/                # 自定义 Hooks
│   │   ├── useMediaQuery.ts  # 响应式查询
│   │   └── useDebounce.ts    # 防抖
│   │
│   ├── utils/                # 工具函数
│   │   ├── error.ts          # 错误处理
│   │   └── index.ts
│   │
│   ├── router/               # 路由配置
│   │   └── index.tsx
│   │
│   ├── App.tsx               # 应用入口
│   └── main.tsx              # 主入口
│
├── docs/                     # 文档
│   ├── ARCHITECTURE.md       # 架构概览（本文档）
│   ├── DESIGN-SYSTEM.md      # 设计系统
│   ├── QUICK-START.md        # 快速开始
│   ├── MIGRATION-GUIDE.md    # 迁移指南
│   ├── LAYOUT-SYSTEM.md      # 布局系统
│   ├── PAGE-TEMPLATES.md     # 页面模板
│   └── BEST-PRACTICES.md     # 最佳实践
│
└── package.json
```

## 架构分层

### 1. 设计系统层（Design System Layer）
**位置**：`src/styles/design-system.ts`

这是整个应用的视觉基础，定义了所有设计 tokens：

```typescript
export const designSystem = {
  colors,           // 颜色系统
  semantic,         // 语义化颜色
  spacing,          // 间距系统（8px 网格）
  typography,       // 字体系统
  borderRadius,     // 圆角
  shadows,          // 阴影
  cardSystem,       // 卡片系统
  tableSystem,      // 表格系统
  sidebarSystem,    // 侧边栏系统
  transitions,      // 动画过渡
  breakpoints,      // 响应式断点
  // ... 更多系统
}
```

**特点**：
- 所有硬编码值都避免，统一从 designSystem 引用
- 支持主题切换（通过修改 tokens）
- 语义化命名，易于理解和维护

### 2. 布局组件层（Layout Layer）
**位置**：`src/components/layout/`

提供两个核心布局组件：

#### MainLayout（应用级布局）
- 负责应用的整体框架（Header + Sider + Content）
- 提供全局导航菜单
- 处理路由切换
- 响应式侧边栏折叠

#### PageLayout（页面级布局）
- 提供页面内的布局结构（topBar + 左右侧边栏 + bottomBar）
- 支持侧边栏独立折叠
- 响应式自动调整
- 高度灵活，可组合不同区域

### 3. 页面模板层（Page Templates Layer）
**位置**：`src/pages/`

提供三大典型页面模板：

- **DashboardPage**：数据可视化中心
- **ListPage**：数据列表管理
- **DetailPage**：详细信息展示

每个模板都是开箱即用的完整实现，可以直接复制修改。

### 4. 业务组件层（Business Components Layer）
**位置**：`src/components/Common/`

提供通用业务组件：
- LoadingState - 加载状态占位
- EmptyState - 空状态提示
- ErrorState - 错误状态展示

### 5. 工具层（Utilities Layer）
**位置**：`src/hooks/`, `src/utils/`

- **Hooks**：响应式查询、防抖等
- **Utils**：错误处理、格式化等

## 数据流

```
用户交互 → 事件处理 → 状态更新 → UI 重渲染
                ↓
           API 调用（可选）
                ↓
           数据处理
                ↓
           状态管理（useState/Redux/Zustand）
```

## 响应式策略

### 断点系统
```typescript
breakpoints: {
  mobile: '640px',      // 手机
  tablet: '768px',      // 平板
  threeColumn: '900px', // PageLayout 自动折叠
  laptop: '1024px',     // 笔记本
  desktop: '1280px',    // 桌面
  wide: '1536px',       // 宽屏
}
```

### 响应式行为
1. **< 900px**：PageLayout 自动折叠左右侧边栏
2. **< 1024px**：MainLayout 自动折叠主菜单
3. **拖宽窗口**：恢复用户上次的折叠偏好（智能记忆）

## 主题配置

通过 Ant Design ConfigProvider 统一配置：

```typescript
<ConfigProvider
  theme={{
    token: {
      colorPrimary: designSystem.colors.primary[500],
      fontSize: parseInt(designSystem.componentFontSize.global),
      borderRadius: parseInt(designSystem.borderRadius.md),
      // ... 更多配置
    },
  }}
>
  <App />
</ConfigProvider>
```

## 性能优化

1. **代码分割**：路由级别的懒加载
2. **虚拟滚动**：大数据列表使用 Ant Design Table 的虚拟滚动
3. **防抖节流**：搜索、窗口 resize 等使用自定义 hooks
4. **样式隔离**：使用 CSS-in-JS，避免全局污染

## 扩展性

### 添加新页面
1. 在 `src/pages/` 创建新页面组件
2. 使用 `PageLayout` 构建布局
3. 在 `src/router/index.tsx` 添加路由
4. 在 `MainLayout` 的菜单配置中添加入口

### 添加新组件
1. 在 `src/components/` 对应目录创建组件
2. 使用 `designSystem` 引用所有样式值
3. 导出到 `index.ts` 便于引用

### 自定义主题
修改 `src/styles/design-system.ts` 中的 color 定义即可全局生效。

## 开发工作流

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 开发新功能
# - 复制相应的页面模板
# - 修改业务逻辑和数据
# - 调整样式（使用 designSystem）

# 4. 构建生产版本
npm run build

# 5. 预览生产构建
npm run preview
```

## 下一步

- 阅读 [设计系统文档](./DESIGN-SYSTEM.md) 了解设计 tokens
- 阅读 [快速开始](./QUICK-START.md) 创建新项目
- 阅读 [迁移指南](./MIGRATION-GUIDE.md) 迁移现有项目
- 阅读 [布局系统](./LAYOUT-SYSTEM.md) 了解布局组件
- 阅读 [页面模板](./PAGE-TEMPLATES.md) 学习页面开发

## 技术支持

如有问题，请参考：
1. 项目 README.md
2. 各模块的代码注释
3. Ant Design 官方文档
4. 本目录下的其他文档

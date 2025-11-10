# 设计系统

## 概述

本设计系统基于 **8px 网格系统**（Apple iOS 标准），提供统一、专业的视觉语言。所有设计 tokens 都集中在 `src/styles/design-system.ts` 中，避免硬编码，确保一致性。

## 设计原则

1. **一致性优先**：所有样式值从 designSystem 引用，禁止硬编码
2. **语义化命名**：使用 `semantic.text.primary` 而不是 `colors.neutral[900]`
3. **响应式优先**：所有布局支持响应式，自动适配设备
4. **可访问性**：符合 WCAG 2.1 标准，最小触控目标 44px

## 核心系统

### 1. 颜色系统

#### 主色（Primary）
基于 `#005BAC`，提供 10 级色阶：

```typescript
colors.primary = {
  50: '#E6F0F9',   // 最浅
  100: '#B3D4ED',
  200: '#80B8E0',
  300: '#4D9CD4',
  400: '#2680C7',
  500: '#005BAC',  // 主色 ★
  600: '#004F96',
  700: '#004380',
  800: '#00376A',
  900: '#002B54',  // 最深
}
```

#### 中性色（Neutral）
Apple 级 7 级精简系统：

```typescript
colors.neutral = {
  0: '#FFFFFF',    // 纯白 - 卡片、面板
  50: '#F5F5F7',   // Apple Gray - 页面背景
  100: '#E8E8ED',  // 分隔线、禁用背景
  200: '#D1D1D6',  // 边框、次要分隔
  400: '#8E8E93',  // 次要文字、图标
  600: '#48484A',  // 正文、主要图标
  900: '#1C1C1E',  // 标题、强调文字
}
```

#### 功能色
```typescript
colors.success = '#10B981'  // 成功/绿色
colors.warning = '#F59E0B'  // 警告/黄色
colors.error = '#EF4444'    // 错误/红色
colors.info = '#2680C7'     // 信息/蓝色
```

### 2. 语义化颜色

**推荐使用语义化颜色，而不是直接引用 colors**：

#### Surface（表面）
```typescript
semantic.surface.base = colors.neutral[0]         // 卡片、面板
semantic.surface.background = colors.neutral[50]  // 页面背景
semantic.surface.elevated = colors.neutral[0]     // Modal、Popover
semantic.surface.overlay = 'rgba(0, 0, 0, 0.4)'  // 蒙层
```

#### Border（边框）
```typescript
semantic.border.light = colors.neutral[100]   // 浅色边框
semantic.border.medium = colors.neutral[200]  // 标准边框
```

#### Text（文字）
```typescript
semantic.text.primary = colors.neutral[900]    // 标题、主要内容
semantic.text.secondary = colors.neutral[600]  // 正文、次要内容
semantic.text.tertiary = colors.neutral[400]   // 辅助文字
semantic.text.inverse = colors.neutral[0]      // 反色文字
```

#### Interactive（交互）
```typescript
semantic.interactive.primary = colors.primary[500]      // 主按钮
semantic.interactive.primaryHover = colors.primary[600] // 主按钮悬停
```

### 3. 间距系统（8px 网格）

所有间距都基于 8px 的倍数：

```typescript
spacing = {
  0: '0',
  0.25: '2px',   // 微小间距（标签内部）
  0.5: '4px',    // 极小间距（图标与文字）
  1: '8px',      // ★ 最小间距（列表内元素）
  2: '12px',     // 紧凑间距（标签）
  3: '16px',     // 标准间距（卡片内元素）
  4: '20px',     // 舒适间距（卡片 padding）
  5: '24px',     // 大间距（卡片之间）
  6: '32px',     // 区域间距（section 之间）
  8: '40px',     // 大区域间距
  10: '48px',    // 超大区域间距
  12: '64px',    // 页面级间距
}
```

**使用示例**：
```typescript
// ✅ 正确
marginBottom: designSystem.spacing[3]  // 16px

// ❌ 错误
marginBottom: '16px'  // 硬编码
```

### 4. 字体系统

#### 字号（专业工具类网站 - 紧凑统一）
```typescript
typography.fontSize = {
  xs: '11px',    // 极小文字（脚注）
  sm: '12px',    // 辅助信息（Tag、Badge）
  base: '13px',  // ★ 核心字号（表格、按钮、表单）
  md: '15px',    // 正文（长文阅读）
  lg: '20px',    // Title 3
  xl: '22px',    // Title 2
  '2xl': '28px', // Title 1
  '3xl': '34px', // Large Title
}
```

#### 字重
```typescript
typography.fontWeight = {
  light: 300,    // 轻字重
  normal: 400,   // Regular
  medium: 500,   // Medium
  semibold: 600, // Semibold ★ 标题常用
  bold: 700,     // Bold
}
```

#### 行高
```typescript
typography.lineHeight = {
  tight: 1.2,      // 大标题
  snug: 1.375,     // 副标题、按钮
  normal: 1.5,     // ★ 正文
  relaxed: 1.625,  // 长文阅读
}
```

### 5. 圆角系统

```typescript
borderRadius = {
  none: '0',
  sm: '2px',    // Tag、Badge
  md: '4px',    // 按钮、输入框
  lg: '6px',    // ★ 卡片（推荐）
  xl: '8px',    // Modal、Sheet
  '2xl': '12px', // 大卡片
  full: '9999px', // 圆形
}
```

### 6. 阴影系统

Apple 级多层叠加：

```typescript
shadows = {
  xs: '0 1px 2px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)',
  sm: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
  md: '0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)',
  xl: '0 16px 48px rgba(0, 0, 0, 0.18), 0 8px 24px rgba(0, 0, 0, 0.10)',

  // 特殊
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  focus: '0 0 0 4px rgba(0, 91, 172, 0.15)',
}
```

## 组件系统

### 卡片系统（cardSystem）

```typescript
cardSystem = {
  borderRadius: borderRadius.lg,    // 6px
  background: colors.neutral[0],     // 白色
  shadow: shadows.xs,                // 轻量阴影
  shadowHover: shadows.sm,           // 悬停阴影
  padding: spacing[4],               // 20px
  paddingLarge: spacing[5],          // 24px（大卡片）
  paddingCompact: spacing[3],        // 16px（紧凑）
  gap: spacing[3],                   // 元素间距 16px
  pageBackground: colors.neutral[50], // 页面背景
}
```

**使用示例**：
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

### 表格系统（tableSystem）

```typescript
tableSystem = {
  containerBorderRadius: borderRadius.lg,
  containerBackground: colors.neutral[0],
  containerShadow: shadows.sm,
  rowHoverBackground: colors.neutral[50],
  headerBackground: colors.neutral[0],
  borderColor: colors.neutral[100],
}
```

### 侧边栏系统（sidebarSystem）

```typescript
sidebarSystem = {
  leftWidth: '255px',
  leftMinWidth: '225px',
  leftMaxWidth: '285px',
  rightWidth: '270px',
  rightMinWidth: '240px',
  rightMaxWidth: '300px',
  collapsedWidth: '56px',
  autoCollapseBreakpoint: breakpoints.threeColumn, // 900px
}
```

## 响应式断点

```typescript
breakpoints = {
  mobile: '640px',      // 手机
  tablet: '768px',      // 平板
  threeColumn: '900px', // ★ PageLayout 自动折叠
  laptop: '1024px',     // ★ MainLayout 自动折叠
  desktop: '1280px',    // 桌面
  wide: '1536px',       // 宽屏
}
```

## 动画与过渡

### 时长
```typescript
transitions.duration = {
  instant: '100ms',  // 即时反馈
  fast: '150ms',     // ★ 快速动画（推荐）
  base: '200ms',     // 标准动画
  slow: '300ms',     // 慢动画
  slower: '500ms',   // 特殊效果
}
```

### 缓动函数
```typescript
transitions.easing = {
  linear: 'linear',
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',  // ★ 标准（推荐）
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
}
```

### 常用组合
```typescript
transitions.default = '200ms cubic-bezier(0.4, 0, 0.2, 1)'
transitions.fast = '150ms cubic-bezier(0.4, 0, 0.2, 1)'
```

## Z-Index 层级

```typescript
zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
}
```

## 使用指南

### 1. 导入设计系统

```typescript
import { designSystem } from '@/styles';
```

### 2. 引用 Tokens

**✅ 推荐**：使用语义化名称
```typescript
color: designSystem.semantic.text.primary
background: designSystem.semantic.surface.base
```

**⚠️ 可用**：直接引用系统
```typescript
color: designSystem.colors.primary[500]
padding: designSystem.spacing[3]
```

**❌ 禁止**：硬编码
```typescript
color: '#1C1C1E'     // ❌
padding: '16px'      // ❌
```

### 3. 组件样式示例

```tsx
// 标准卡片
<Card
  size="small"
  style={{
    borderRadius: designSystem.borderRadius.lg,
    marginBottom: designSystem.spacing[1],
  }}
>
  <div style={{
    fontSize: designSystem.typography.fontSize.sm,
    fontWeight: designSystem.typography.fontWeight.semibold,
    color: designSystem.semantic.text.primary,
    marginBottom: designSystem.spacing[1],
  }}>
    标题
  </div>
  <div style={{
    fontSize: designSystem.typography.fontSize.sm,
    color: designSystem.semantic.text.secondary,
  }}>
    内容
  </div>
</Card>
```

### 4. 按钮尺寸指南

在不同场景使用不同尺寸：

```tsx
// 主要操作按钮：默认大小（无需设置 size）
<Button type="primary" icon={<PlusOutlined />}>
  新建
</Button>

// 辅助操作按钮：小尺寸
<Button size="small">取消</Button>

// 表格内操作按钮：链接 + 小尺寸
<Button type="link" size="small">编辑</Button>
```

### 5. 间距使用指南

```typescript
// 卡片之间
marginBottom: designSystem.spacing[1]  // 8px（紧凑布局）

// 卡片内元素
marginBottom: designSystem.spacing[1]  // 8px

// Section 之间
marginBottom: designSystem.spacing[2]  // 12px

// 页面级间距
padding: designSystem.spacing[1]       // 8px
```

## 自定义主题

### 修改主色

编辑 `src/styles/design-system.ts`：

```typescript
export const colors = {
  primary: {
    // ... 修改主色色阶
    500: '#YOUR_COLOR', // 主色
  },
}
```

### 修改字号

```typescript
export const typography = {
  fontSize: {
    base: '14px',  // 将核心字号改为 14px
    // ...
  },
}
```

### 修改间距

```typescript
export const spacing = {
  1: '10px',  // 将最小间距改为 10px
  // ...
}
```

## 与 Ant Design 集成

在 `App.tsx` 中配置：

```tsx
import { ConfigProvider } from 'antd';
import { designSystem } from '@/styles';

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
        headerColor: designSystem.semantic.text.primary,
        fontSize: parseInt(designSystem.componentFontSize.tableCell),
      },
    },
  }}
>
  <App />
</ConfigProvider>
```

## 常见问题

### Q: 为什么要用 designSystem 而不是直接写值？
A:
1. 保证全局一致性
2. 支持主题切换
3. 便于维护和批量修改
4. 提高代码可读性

### Q: 什么时候用 semantic，什么时候用 colors？
A:
- **优先使用 semantic**：文字颜色、背景色等语义明确的场景
- **使用 colors**：需要特定色阶或特殊颜色时

### Q: 如何确保响应式？
A:
使用 `useMediaQuery` hook 和 breakpoints：
```typescript
const isMobile = useMediaQuery(`(max-width: ${designSystem.breakpoints.mobile})`);
```

## 下一步

- 阅读 [布局系统](./LAYOUT-SYSTEM.md) 了解如何使用布局组件
- 阅读 [页面模板](./PAGE-TEMPLATES.md) 学习页面开发
- 阅读 [最佳实践](./BEST-PRACTICES.md) 掌握编码规范

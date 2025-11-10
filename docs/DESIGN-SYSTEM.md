# 设计系统文档

## 概述

本设计系统基于 4px 网格系统，提供完整的设计令牌（Design Tokens），确保 UI 的一致性和可维护性。

## 设计令牌（Design Tokens）

设计令牌是设计系统的最小单元，包括颜色、间距、字体等视觉属性。

### 导入

```typescript
import { designSystem } from '@/styles';
```

---

## 1. 颜色系统

### 1.1 主色调
```typescript
designSystem.colors.primary[500] // #005BAC
```

10档渐变：`50, 100, 200, 300, 400, 500, 600, 700, 800, 900`

### 1.2 中性色
```typescript
designSystem.colors.neutral[0]   // #FFFFFF 纯白
designSystem.colors.neutral[900] // #111827 最深
```

11档灰度：`0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900`

### 1.3 功能色
```typescript
designSystem.colors.success // #10B981
designSystem.colors.warning // #F59E0B
designSystem.colors.error   // #EF4444
designSystem.colors.info    // #3B82F6
```

### 1.4 语义化颜色
```typescript
// 表面颜色
designSystem.semantic.surface.primary   // 主背景
designSystem.semantic.surface.secondary // 次背景
designSystem.semantic.surface.tertiary  // 工具栏背景
designSystem.semantic.surface.border    // 边框
designSystem.semantic.surface.divider   // 分隔线

// 文字颜色
designSystem.semantic.text.primary      // 主文字
designSystem.semantic.text.secondary    // 次要文字
designSystem.semantic.text.tertiary     // 辅助文字
designSystem.semantic.text.inverse      // 反色文字

// 交互颜色
designSystem.semantic.interactive.primary       // 主按钮
designSystem.semantic.interactive.primaryHover  // 主按钮悬停
```

---

## 2. 间距系统

### 2.1 基准：4px

```typescript
designSystem.spacing[0]  // 0
designSystem.spacing[1]  // 4px
designSystem.spacing[2]  // 8px
designSystem.spacing[3]  // 12px
designSystem.spacing[4]  // 16px  ⭐ 标准间距
designSystem.spacing[6]  // 24px  ⭐ 卡片间距
designSystem.spacing[8]  // 32px  ⭐ 区域间距
```

### 2.2 使用示例

```typescript
// 内边距
<div style={{ padding: designSystem.spacing[4] }}>

// 外边距
<div style={{ marginBottom: designSystem.spacing[6] }}>

// Flex 间距
<div style={{ gap: designSystem.spacing[3] }}>
```

---

## 3. 高度系统

### 3.1 固定高度

```typescript
designSystem.heights.header     // 56px  主标题栏
designSystem.heights.toolbar    // 40px  工具栏
designSystem.heights.inputMd    // 32px  标准输入框
designSystem.heights.buttonMd   // 32px  标准按钮
designSystem.heights.statusBar  // 24px  状态栏
```

### 3.2 使用示例

```typescript
// 工具栏
<div style={{ height: designSystem.heights.toolbar }}>
```

---

## 4. 字体系统

### 4.1 字号

```typescript
designSystem.typography.fontSize.xs    // 12px
designSystem.typography.fontSize.sm    // 14px
designSystem.typography.fontSize.base  // 16px ⭐ 默认
designSystem.typography.fontSize['2xl'] // 24px
```

### 4.2 字重

```typescript
designSystem.typography.fontWeight.normal   // 400 正文
designSystem.typography.fontWeight.medium   // 500 强调
designSystem.typography.fontWeight.semibold // 600 副标题
designSystem.typography.fontWeight.bold     // 700 标题
```

### 4.3 行高

```typescript
designSystem.typography.lineHeight.tight   // 1.25 标题
designSystem.typography.lineHeight.normal  // 1.5  正文
designSystem.typography.lineHeight.relaxed // 1.75 阅读
```

### 4.4 字体族

```typescript
designSystem.typography.fontFamily.sans // 系统字体
designSystem.typography.fontFamily.mono // 等宽字体
```

### 4.5 使用示例

```typescript
// 标题样式
<h1 style={{
  fontSize: designSystem.typography.fontSize['2xl'],
  fontWeight: designSystem.typography.fontWeight.bold,
  color: designSystem.semantic.text.primary,
}}>

// 正文样式
<p style={{
  fontSize: designSystem.typography.fontSize.base,
  lineHeight: designSystem.typography.lineHeight.normal,
  color: designSystem.semantic.text.secondary,
}}>
```

---

## 5. 圆角系统

```typescript
designSystem.borderRadius.none // 0
designSystem.borderRadius.sm   // 4px
designSystem.borderRadius.md   // 8px  ⭐ 默认
designSystem.borderRadius.lg   // 12px
designSystem.borderRadius.full // 9999px 完全圆角
```

使用示例：
```typescript
<div style={{ borderRadius: designSystem.borderRadius.md }}>
```

---

## 6. 阴影系统

```typescript
designSystem.shadows.none // none
designSystem.shadows.sm   // 轻微投影
designSystem.shadows.md   // 卡片投影
designSystem.shadows.lg   // 弹出层投影
designSystem.shadows.xl   // 模态框投影
```

使用示例：
```typescript
<div style={{ boxShadow: designSystem.shadows.md }}>
```

---

## 7. 断点系统

```typescript
designSystem.breakpoints.mobile  // 640px
designSystem.breakpoints.tablet  // 768px
designSystem.breakpoints.laptop  // 1024px
designSystem.breakpoints.desktop // 1280px
designSystem.breakpoints.wide    // 1536px
```

使用示例：
```typescript
@media (min-width: ${designSystem.breakpoints.laptop}) {
  /* 笔记本及以上 */
}
```

---

## 8. Z-Index 层级

```typescript
designSystem.zIndex.dropdown      // 1000
designSystem.zIndex.sticky        // 1020
designSystem.zIndex.fixed         // 1030
designSystem.zIndex.modalBackdrop // 1040
designSystem.zIndex.modal         // 1050
designSystem.zIndex.popover       // 1060
designSystem.zIndex.tooltip       // 1070
```

---

## 9. 通用样式工具

除了设计令牌，我们还提供了通用样式工具 `common-styles.ts`。

### 9.1 Flex 布局

```typescript
import { flexStyles } from '@/styles';

// 水平居中
<div style={flexStyles.centerX}>

// 垂直居中
<div style={flexStyles.centerY}>

// 完全居中
<div style={flexStyles.center}>

// 两端对齐
<div style={flexStyles.spaceBetween}>

// 列布局
<div style={flexStyles.column}>
```

### 9.2 文本样式

```typescript
import { textStyles } from '@/styles';

// 单行截断
<div style={textStyles.ellipsis}>

// 多行截断
<div style={textStyles.ellipsisMultiline(3)}>

// 标题
<h1 style={textStyles.heading}>

// 正文
<p style={textStyles.body}>
```

### 9.3 卡片样式

```typescript
import { cardStyles } from '@/styles';

// 默认卡片
<div style={cardStyles.default}>

// 可悬停卡片
<div style={cardStyles.hover}>
```

---

## 10. 最佳实践

### 10.1 优先使用语义化颜色

```typescript
// ✅ 推荐
color: designSystem.semantic.text.primary

// ❌ 不推荐
color: designSystem.colors.neutral[900]
```

**原因**：语义化颜色易于理解和维护，支持主题切换。

### 10.2 使用设计令牌替代硬编码

```typescript
// ✅ 推荐
padding: designSystem.spacing[4]

// ❌ 不推荐
padding: '16px'
```

**原因**：设计令牌保证一致性，易于全局调整。

### 10.3 遵循 4px 网格系统

```typescript
// ✅ 推荐
width: '240px'  // 60 × 4px

// ❌ 不推荐
width: '235px'  // 不是 4 的倍数
```

**原因**：保持视觉节奏一致，避免次像素渲染。

### 10.4 使用通用样式工具

```typescript
// ✅ 推荐
import { flexStyles } from '@/styles';
<div style={flexStyles.center}>

// ❌ 不推荐
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
```

**原因**：减少重复代码，保持一致性。

---

## 11. 扩展设计系统

如需扩展设计系统，请修改 `src/styles/design-system.ts`：

```typescript
export const customTokens = {
  // 自定义令牌
  myColor: '#FF5733',
};

export const designSystem = {
  colors,
  semantic,
  spacing,
  // ...
  custom: customTokens,
};
```

---

## 12. 主题化支持

本设计系统支持主题化扩展，可通过 Ant Design 的 `ConfigProvider` 实现：

```typescript
import { ConfigProvider } from 'antd';
import { designSystem } from '@/styles';

<ConfigProvider
  theme={{
    token: {
      colorPrimary: designSystem.colors.primary[500],
      borderRadius: parseInt(designSystem.borderRadius.md),
      fontSize: parseInt(designSystem.typography.fontSize.base),
    },
  }}
>
  <App />
</ConfigProvider>
```

---

## 参考资源

- [Ant Design 设计语言](https://ant.design/docs/spec/introduce-cn)
- [Material Design 色彩系统](https://material.io/design/color)
- [Tailwind CSS 设计系统](https://tailwindcss.com/docs/customizing-colors)

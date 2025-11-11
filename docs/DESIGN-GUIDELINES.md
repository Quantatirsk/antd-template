# UI 设计规范指南

本文档详细说明本模板的 UI 设计规范，包括颜色、间距、字体、组件尺寸等设计标准。

## 目录

- [设计原则](#设计原则)
- [颜色系统](#颜色系统)
- [间距系统](#间距系统)
- [字体系统](#字体系统)
- [组件规范](#组件规范)
- [布局规范](#布局规范)
- [Ant Design Token 配置](#ant-design-token-配置)

---

## 设计原则

### 核心原则

1. **8px 网格系统**
   - 所有间距、尺寸基于 8px 的倍数
   - 遵循 Apple iOS 设计标准

2. **Apple 级现代化设计**
   - 简洁、优雅、专业
   - 减少视觉干扰，突出内容

3. **统一配置驱动**
   - 避免硬编码
   - 所有设计 token 集中在 `src/styles/DesignSystem.ts`

4. **响应式优先**
   - 支持多种屏幕尺寸
   - 触控友好（最小 44px 触控目标）

---

## 颜色系统

所有颜色定义在 `src/styles/DesignSystem.ts` 的 `colors` 对象中。

### 主色调（Primary）

**品牌主色：`#005BAC`**

```typescript
// 使用方式
import { designSystem } from '@/styles';

designSystem.colors.primary[500]  // #005BAC 主色
```

**色阶：**
| 色阶 | 值 | 用途 |
|------|----|----|
| 50 | `#E6F0F9` | 最浅背景色 |
| 100 | `#B3D4ED` | 浅背景色 |
| 200 | `#80B8E0` | 次浅色 |
| 300 | `#4D9CD4` | 辅助色 |
| 400 | `#2680C7` | 次主色 |
| **500** | **`#005BAC`** | **主色（默认）** |
| 600 | `#004F96` | 悬停色 |
| 700 | `#004380` | 按下色 |
| 800 | `#00376A` | 深色 |
| 900 | `#002B54` | 最深色 |

### 中性色（Neutral）

**Apple 级 7 级精简系统**

```typescript
designSystem.colors.neutral[0]    // #FFFFFF - 纯白
designSystem.colors.neutral[50]   // #F5F5F7 - 页面背景
designSystem.colors.neutral[100]  // #E8E8ED - 分隔线
designSystem.colors.neutral[200]  // #D1D1D6 - 边框
designSystem.colors.neutral[400]  // #8E8E93 - 次要文字
designSystem.colors.neutral[600]  // #48484A - 正文
designSystem.colors.neutral[900]  // #1C1C1E - 标题
```

**用途映射：**
| 场景 | 使用色阶 | 说明 |
|------|---------|------|
| 页面背景 | neutral[50] | `#F5F5F7` Apple Gray |
| 卡片/面板 | neutral[0] | `#FFFFFF` 纯白 |
| 分隔线 | neutral[100] | `#E8E8ED` |
| 边框 | neutral[200] | `#D1D1D6` |
| 次要文字/图标 | neutral[400] | `#8E8E93` |
| 正文 | neutral[600] | `#48484A` |
| 标题 | neutral[900] | `#1C1C1E` |

### 功能色

```typescript
designSystem.colors.success  // #10B981 - 成功
designSystem.colors.warning  // #F59E0B - 警告
designSystem.colors.error    // #EF4444 - 错误
designSystem.colors.info     // #2680C7 - 信息
```

### 语义化颜色

**推荐使用语义化颜色而非直接引用色值**

```typescript
// ✅ 推荐
designSystem.semantic.text.primary      // 主要文字
designSystem.semantic.text.secondary    // 次要文字
designSystem.semantic.text.tertiary     // 辅助文字

designSystem.semantic.surface.base       // 卡片背景
designSystem.semantic.surface.background // 页面背景

designSystem.semantic.border.light       // 浅色边框
designSystem.semantic.border.medium      // 标准边框

// ❌ 不推荐
designSystem.colors.neutral[900]
```

---

## 间距系统

**基于 8px 网格系统**

### 标准间距表

```typescript
import { designSystem } from '@/styles';

designSystem.spacing[0]     // '0'
designSystem.spacing[0.25]  // '2px'  - 微小间距
designSystem.spacing[0.5]   // '4px'  - 极小间距
designSystem.spacing[1]     // '8px'  - 最小间距（基础单位）
designSystem.spacing[2]     // '12px' - 紧凑间距
designSystem.spacing[3]     // '16px' - 标准间距
designSystem.spacing[4]     // '20px' - 舒适间距
designSystem.spacing[5]     // '24px' - 大间距
designSystem.spacing[6]     // '32px' - 区域间距
designSystem.spacing[8]     // '40px' - 大区域间距
designSystem.spacing[10]    // '48px' - 超大间距
designSystem.spacing[12]    // '64px' - 页面级间距
```

### 使用场景

| 间距值 | 使用场景 | 示例 |
|--------|---------|------|
| `0.25` (2px) | 微小间距 | 标签内部微调 |
| `0.5` (4px) | 极小间距 | 图标与文字 |
| `1` (8px) | **最小间距** | **列表内元素、紧凑布局** |
| `2` (12px) | 紧凑间距 | 标签、小按钮 |
| `3` (16px) | 标准间距 | 表单项间距 |
| `4` (20px) | 舒适间距 | 卡片 padding |
| `5` (24px) | 大间距 | 卡片之间 |
| `6` (32px) | 区域间距 | 页面 section |
| `8` (40px) | 大区域间距 | 页面顶部/底部 |

### 实战示例

**卡片间距：**
```tsx
<Card style={{
  padding: designSystem.spacing[4],      // 20px 内边距
  marginBottom: designSystem.spacing[5]  // 24px 卡片间距
}}>
  <div style={{
    marginBottom: designSystem.spacing[3]  // 16px 元素间距
  }}>
    标题
  </div>
</Card>
```

**表单间距：**
```tsx
<Form layout="vertical">
  <Form.Item
    style={{ marginBottom: designSystem.spacing[3] }}  // 16px
  >
    <Input />
  </Form.Item>
</Form>
```

---

## 字体系统

### 字号

```typescript
designSystem.typography.fontSize.xs    // '12px'
designSystem.typography.fontSize.sm    // '14px'
designSystem.typography.fontSize.base  // '16px' - 基础字号
designSystem.typography.fontSize.lg    // '18px'
designSystem.typography.fontSize.xl    // '20px'
designSystem.typography.fontSize['2xl'] // '24px'
designSystem.typography.fontSize['3xl'] // '30px'
```

### 字重

```typescript
designSystem.typography.fontWeight.normal    // 400
designSystem.typography.fontWeight.medium    // 500
designSystem.typography.fontWeight.semibold  // 600
designSystem.typography.fontWeight.bold      // 700
```

### 行高

```typescript
designSystem.typography.lineHeight.tight   // 1.25
designSystem.typography.lineHeight.normal  // 1.5
designSystem.typography.lineHeight.relaxed // 1.75
```

### 字体使用规范

| 元素类型 | 字号 | 字重 | 颜色 |
|---------|------|------|------|
| 页面标题 | `xl` (20px) | `semibold` (600) | `semantic.text.primary` |
| 区块标题 | `lg` (18px) | `semibold` (600) | `semantic.text.primary` |
| 卡片标题 | `base` (16px) | `medium` (500) | `semantic.text.primary` |
| 正文 | `base` (16px) | `normal` (400) | `semantic.text.secondary` |
| 辅助文字 | `sm` (14px) | `normal` (400) | `semantic.text.tertiary` |
| 小字 | `xs` (12px) | `normal` (400) | `semantic.text.tertiary` |

### 示例

```tsx
// 页面标题
<h1 style={{
  fontSize: designSystem.typography.fontSize.xl,
  fontWeight: designSystem.typography.fontWeight.semibold,
  color: designSystem.semantic.text.primary
}}>
  页面标题
</h1>

// 正文
<p style={{
  fontSize: designSystem.typography.fontSize.base,
  color: designSystem.semantic.text.secondary,
  lineHeight: designSystem.typography.lineHeight.normal
}}>
  这是正文内容
</p>

// 辅助文字
<span style={{
  fontSize: designSystem.typography.fontSize.sm,
  color: designSystem.semantic.text.tertiary
}}>
  辅助说明
</span>
```

---

## 组件规范

### 高度系统

```typescript
// 导航与工具栏
designSystem.heights.header      // '56px'  - 主标题栏
designSystem.heights.toolbar     // '48px'  - 工具栏
designSystem.heights.breadcrumb  // '32px'  - 面包屑

// 输入组件（iOS 最小 44px 触控标准）
designSystem.heights.inputSm     // '32px'  - 小输入框
designSystem.heights.input       // '40px'  - 标准输入框
designSystem.heights.inputLg     // '48px'  - 大输入框

// 按钮（iOS 触控友好）
designSystem.heights.buttonSm    // '32px'  - 小按钮
designSystem.heights.button      // '40px'  - 标准按钮
designSystem.heights.buttonLg    // '48px'  - 大按钮
```

### 宽度系统

```typescript
// 输入框宽度
designSystem.inputWidths.sm      // '120px'
designSystem.inputWidths.md      // '180px'
designSystem.inputWidths.lg      // '240px'
designSystem.inputWidths.xl      // '320px'
designSystem.inputWidths.search  // '240px'  - 搜索框

// 按钮宽度
designSystem.buttonWidths.sm     // '64px'
designSystem.buttonWidths.md     // '88px'
designSystem.buttonWidths.lg     // '120px'
```

### 侧边栏系统

```typescript
// MainLayout 侧边栏
designSystem.sidebarSystem.leftWidth       // '255px'  - 展开宽度
designSystem.sidebarSystem.collapsedWidth  // '64px'   - 折叠宽度

// PageLayout 侧边栏
designSystem.sidebarSystem.leftMinWidth    // '200px'
designSystem.sidebarSystem.leftMaxWidth    // '300px'
designSystem.sidebarSystem.rightMinWidth   // '220px'
designSystem.sidebarSystem.rightMaxWidth   // '400px'
```

### 卡片系统

```typescript
// 圆角
designSystem.cardSystem.borderRadius  // '8px'

// 内边距
designSystem.cardSystem.paddingXs     // '12px'
designSystem.cardSystem.paddingSm     // '16px'
designSystem.cardSystem.padding       // '20px'
designSystem.cardSystem.paddingLg     // '24px'

// 阴影
designSystem.cardSystem.shadow        // '0 1px 2px rgba(0, 0, 0, 0.05)'
```

### 圆角系统

```typescript
designSystem.borderRadius.none  // '0'
designSystem.borderRadius.sm    // '4px'
designSystem.borderRadius.md    // '8px'   - 标准圆角
designSystem.borderRadius.lg    // '12px'
designSystem.borderRadius.xl    // '16px'
designSystem.borderRadius.full  // '9999px' - 完全圆形
```

---

## 布局规范

### MainLayout（主布局）

**结构：**
```
┌──────────────────────────────────┐
│  Sider (255px/64px)  │  Header   │
│  ─────────────────   │  (56px)   │
│  Menu Items          │────────── │
│                      │  Content  │
│                      │           │
└──────────────────────────────────┘
```

**尺寸配置：**
- 侧边栏展开：255px
- 侧边栏折叠：64px
- Header 高度：56px
- 自动折叠断点：1024px

**最紧凑布局：**
- Content padding：`8px`（`designSystem.spacing[1]`）

### PageLayout（页面布局）

**结构：**
```
┌──────────────────────────────────┐
│  TopBar (48px, 可选)             │
├────┬────────────────────┬────────┤
│ L  │                    │    R   │
│ e  │    MainContent     │    i   │
│ f  │                    │    g   │
│ t  │                    │    h   │
│    │                    │    t   │
├────┴────────────────────┴────────┤
│  BottomBar (可选)                │
└──────────────────────────────────┘
```

**尺寸配置：**
- TopBar 高度：48px
- 左侧栏：200-300px
- 右侧栏：220-400px
- 响应式断点：900px（三栏布局）

**内边距规范：**
- TopBar：`8px`
- 侧边栏：`8px`
- MainContent：由页面自行控制（默认无 padding）
- BottomBar：`8px`

**何时使用 contentPadding？**
```tsx
// ✅ 详情页（需要内边距）
<PageLayout contentPadding={designSystem.spacing[1]}>
  <Descriptions />
</PageLayout>

// ✅ 列表页（不需要内边距，Card 自带 padding）
<PageLayout>
  <Card>
    <Table />
  </Card>
</PageLayout>
```

---

## Ant Design Token 配置

### 主题 Token

在 `src/App.tsx` 中配置 ConfigProvider：

```tsx
import { ConfigProvider } from 'antd';
import { designSystem } from '@/styles';

<ConfigProvider
  theme={{
    token: {
      // 颜色
      colorPrimary: designSystem.colors.primary[500],
      colorSuccess: designSystem.colors.success,
      colorWarning: designSystem.colors.warning,
      colorError: designSystem.colors.error,
      colorInfo: designSystem.colors.info,

      // 圆角
      borderRadius: 8,
      borderRadiusLG: 12,
      borderRadiusSM: 4,

      // 字号
      fontSize: 16,
      fontSizeSM: 14,
      fontSizeLG: 18,
      fontSizeXL: 20,

      // 间距
      margin: 16,
      marginXS: 8,
      marginSM: 12,
      marginLG: 24,
      marginXL: 32,

      padding: 16,
      paddingXS: 8,
      paddingSM: 12,
      paddingLG: 24,
      paddingXL: 32,
    },
    components: {
      // 组件级配置
      Button: {
        controlHeight: 40,
        controlHeightSM: 32,
        controlHeightLG: 48,
      },
      Input: {
        controlHeight: 40,
        controlHeightSM: 32,
        controlHeightLG: 48,
      },
      Card: {
        borderRadiusLG: 8,
        paddingLG: 20,
      },
    },
  }}
>
  {/* 应用内容 */}
</ConfigProvider>
```

### 完整 Token 列表

参考文件：`src/styles/DesignSystem.ts` 的 `antdToken` 和 `components` 配置。

---

## 设计检查清单

在开发页面时，请确保遵循以下规范：

### 颜色
- [ ] 使用 `designSystem.colors.*` 或 `designSystem.semantic.*`
- [ ] 不使用硬编码颜色值
- [ ] 文字颜色使用语义化颜色

### 间距
- [ ] 所有间距基于 8px 网格
- [ ] 使用 `designSystem.spacing.*`
- [ ] 页面最紧凑布局使用 `spacing[1]` (8px)

### 字体
- [ ] 使用 `designSystem.typography.*`
- [ ] 标题使用正确的字重和颜色
- [ ] 行高设置合理

### 组件
- [ ] 按钮高度符合触控标准（最小 40px）
- [ ] 输入框高度符合标准
- [ ] 卡片使用统一的 padding 和圆角

### 布局
- [ ] 使用 MainLayout 或 PageLayout
- [ ] 响应式适配良好
- [ ] 侧边栏可折叠且状态持久化

---

## 工具与资源

### 设计文件位置
- 设计系统：`src/styles/DesignSystem.ts`
- 通用样式：`src/styles/CommonStyles.ts`
- 全局样式：`src/styles/GlobalStyles.tsx`

### 参考页面
- 布局说明：`src/pages/LayoutGuidePage.tsx`
- 仪表板示例：`src/pages/DashboardPage.tsx`
- 列表页示例：`src/pages/ListPage.tsx`
- 详情页示例：`src/pages/DetailPage.tsx`
- 弹窗示例：`src/pages/ModalDemoPage.tsx`

### 相关文档
- [迁移指南](./MIGRATION-GUIDE.md)
- [快速参考索引](./RefIndexing.md)

---

## 常见错误

### ❌ 错误示例

```tsx
// 硬编码颜色
<div style={{ color: '#1890ff' }}>文本</div>

// 硬编码间距
<div style={{ padding: '16px', margin: '20px' }}>内容</div>

// 非 8px 网格
<div style={{ height: '37px' }}>元素</div>
```

### ✅ 正确示例

```tsx
import { designSystem } from '@/styles';

// 使用设计系统
<div style={{
  color: designSystem.colors.primary[500]
}}>文本</div>

// 使用标准间距
<div style={{
  padding: designSystem.spacing[4],  // 20px
  margin: designSystem.spacing[5]    // 24px
}}>内容</div>

// 使用标准高度
<div style={{
  height: designSystem.heights.button  // 40px
}}>元素</div>
```

---

如有疑问，请参考示例页面源码或查看 [RefIndexing.md](./RefIndexing.md) 快速索引。

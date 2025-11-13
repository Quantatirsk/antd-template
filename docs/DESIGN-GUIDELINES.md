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
- MainContent：**由 PageLayout 的 `contentPadding` prop 统一控制**
- BottomBar：`8px`

### 容器页模式（Container + Children Pattern）

**核心原则：避免 PageLayout 嵌套**

容器页模式适用于需要统一导航的多功能模块系统。

**三栏职责划分：**
- **左侧栏**：子模块导航菜单（固定）
- **中间区域**：当前子模块的页面内容（通过 Outlet 渲染）
- **右侧栏**：根据当前子模块和页面状态动态显示相关信息

**实现要点：**

**1. 容器页（使用 PageLayout）**
```tsx
import PageLayout from '@/layout/PageLayout';
import { useModuleStore } from '@/store/moduleStore';
import { SubModule1Sidebar, SubModule2Sidebar } from './SubModulePages';

export default function ModuleContainer() {
  const { activeModule, leftCollapsed, rightCollapsed } = useModuleStore();

  // 左侧：固定的功能菜单
  const leftSidebar = (
    <Menu mode="inline" selectedKeys={[activeModule]} items={menuConfig} />
  );

  // 右侧：根据当前模块动态切换
  const rightSidebar = (() => {
    switch (activeModule) {
      case 'sub1': return <SubModule1Sidebar />;
      case 'sub2': return <SubModule2Sidebar />;
      default: return undefined;
    }
  })();

  return (
    <PageLayout
      leftSidebar={leftSidebar}
      rightSidebar={rightSidebar}
      leftDefaultCollapsed={leftCollapsed}
      rightDefaultCollapsed={rightCollapsed}
      contentPadding={designSystem.spacing[1]}
    >
      <Outlet />  {/* 子页面在此渲染 */}
    </PageLayout>
  );
}
```

**2. 子页面（不使用 PageLayout）**
```tsx
import { useModuleStore } from '@/store/moduleStore';

// 导出 Sidebar 组件
export function SubModule1Sidebar() {
  const { selectedItemId } = useModuleStore();
  // 根据选中状态显示相关信息
  return <Card>详情: {selectedItemId}</Card>;
}

// 子页面主组件
export default function SubModule1Page() {
  const { selectItem } = useModuleStore();

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: designSystem.spacing[1] }}>
      <Card><Input.Search /></Card>
      <Card style={{ flex: 1 }}>
        <Table onRow={(record) => ({ onClick: () => selectItem(record.id) })} />
      </Card>
    </div>
  );
}
```

**3. 状态管理（Zustand）**
```tsx
// src/store/moduleStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useModuleStore = create()(persist(
  (set) => ({
    selectedItemId: null,
    activeModule: 'sub1',
    leftCollapsed: false,
    rightCollapsed: false,
    selectItem: (id) => set({ selectedItemId: id }),
    setActiveModule: (module) => set({ activeModule: module }),
  }),
  { name: 'module-storage' }
));
```

**联动机制：**
1. 用户在子页面点击项目 → `selectItem(id)` 更新 store
2. `SubModule1Sidebar` 监听 `selectedItemId` 变化
3. 右侧栏自动更新显示该项目的详情

**使用场景：**
- ✅ 多模块系统（文档比对、知识图谱、数据管理等）
- ✅ 需要统一的子模块导航和状态共享
- ✅ 右侧栏需要根据页面操作实时联动

**完整示例：**`src/pages/module/`

#### 子页面 Padding 对齐规范（重要）

**核心原则：**
1. **所有布局容器都用 Card 包裹** - 保持左右边距一致
2. **避免 Card 嵌套 Card** - 如果只有一个主要内容，不需要外层 Card
3. **内容卡片可以嵌套** - Tabs 或可滚动区域内部的内容卡片（详细信息、统计信息等）可以嵌套

**正确示例：**

```tsx
// ✅ 正确：多个布局容器，每个都用 Card
export default function ListPage() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: designSystem.spacing[1] }}>
      {/* 顶部工具栏 */}
      <Card size="small" style={{ borderRadius: designSystem.borderRadius.lg }}>
        <Input.Search />
      </Card>

      {/* 主内容区 - 表格 */}
      <Card
        size="small"
        style={{ flex: 1, borderRadius: designSystem.borderRadius.lg, minHeight: 0 }}
        styles={{ body: { padding: designSystem.spacing[1], overflow: 'hidden' } }}
      >
        <Table />
      </Card>
    </div>
  );
}

// ✅ 正确：Tabs 内的内容卡片可以嵌套
export default function DetailPage() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: designSystem.spacing[1] }}>
      {/* 顶部工具栏 */}
      <Card size="small" style={{ borderRadius: designSystem.borderRadius.lg }}>
        <div>操作按钮</div>
      </Card>

      {/* 主内容区 - Tabs */}
      <Card size="small" style={{ flex: 1, borderRadius: designSystem.borderRadius.lg, minHeight: 0 }}>
        <Tabs items={[
          {
            key: 'basic',
            label: '基本信息',
            children: (
              <div style={{ padding: designSystem.spacing[1] }}>
                {/* 内容卡片，不是布局嵌套 */}
                <Card size="small" title="详细信息"><Descriptions /></Card>
                <Card size="small" title="统计信息"><Statistics /></Card>
              </div>
            ),
          },
        ]} />
      </Card>
    </div>
  );
}

// ❌ 错误：主内容区没有 Card 包裹
export default function BadPage() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: designSystem.spacing[1] }}>
      <Card size="small"><Input.Search /></Card>

      {/* 直接用 div，左右边距与上面的 Card 不一致 */}
      <div style={{ flex: 1, padding: designSystem.spacing[1] }}>
        <Table />
      </div>
    </div>
  );
}

// ❌ 错误：Card 嵌套 Card（布局层面）
export default function BadPage2() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: designSystem.spacing[1] }}>
      <Card size="small"><Input.Search /></Card>

      {/* 外层 Card */}
      <Card size="small" style={{ flex: 1 }}>
        {/* 内层 Card - 多余的嵌套 */}
        <Card size="small">
          <Table />
        </Card>
      </Card>
    </div>
  );
}
```

**关键点：**
1. **布局容器（顶部工具栏、主内容区等）都用 Card** - 保持左右边距一致
2. **避免布局 Card 嵌套** - 不要在 Card 里再包一层 Card
3. **统一使用 `size="small"`** - 保持一致的内边距
4. **统一使用 `borderRadius: designSystem.borderRadius.lg`** - 保持一致的圆角
5. **内容卡片可以嵌套** - Tabs/可滚动区域内的卡片（详细信息、统计卡片等）是内容，不是布局嵌套

### 页面开发规范（重要）

**核心原则：使用 `contentPadding` prop，不在页面内部添加 padding**

#### 正确做法

**方案 1：在布局层设置 contentPadding（推荐）**
```tsx
// 布局层
<PageLayout contentPadding={designSystem.spacing[1]}>
  <MyPage />
</PageLayout>

// 页面组件 - 直接返回内容
export default function MyPage() {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: designSystem.spacing[1],
    }}>
      <Card>内容 1</Card>
      <Card>内容 2</Card>
    </div>
  );
}
```

**方案 2：Card 自带 margin（表格场景）**
```tsx
// 布局层 - 无 contentPadding
<PageLayout>
  <MyPage />
</PageLayout>

// 页面组件
export default function MyPage() {
  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <Card style={{ margin: designSystem.spacing[1] }}>
        <Table />
      </Card>
    </div>
  );
}
```

#### 何时使用 contentPadding？

| 场景 | contentPadding | 说明 |
|------|----------------|------|
| **简单内容页** | `spacing[1]` (8px) | 直接渲染文本、表单、描述等 |
| **卡片列表页** | `spacing[1]` (8px) | 多个 Card 垂直排列，使用 gap 间隔 |
| **表格页** | **不使用** | Card 自带 `margin: 8px` |
| **全屏图表页** | **不使用** | 图表组件自带边距 |
| **复杂布局页** | `spacing[1]` (8px) | 使用 flex/grid 布局 |

#### 完整示例

```tsx
// ComparisonSystemPage.tsx - 布局层统一控制
<PageLayout contentPadding={designSystem.spacing[1]}>
  <Outlet />
</PageLayout>

// ProjectManagementPage.tsx - 页面组件
export default function ProjectManagementPage() {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: designSystem.spacing[1],
    }}>
      <Card>...</Card>
      <Card>...</Card>
    </div>
  );
}
```

#### 检查清单

开发页面时，请确保：
- [ ] **不在页面组件内部添加外层 padding div**
- [ ] 在布局层使用 `contentPadding` prop 控制间距
- [ ] Card 之间使用 `gap: spacing[1]` (8px) 间隔
- [ ] 表格场景下 Card 使用 `margin: spacing[1]` (8px)
- [ ] 所有间距基于 8px 网格系统

---

### Flex 布局高度控制（易错点⚠️）

**核心问题：**PageLayout 中使用 flex 嵌套时，Card 内容溢出无法滚动。

**根本原因：**Flex 子元素默认 `min-height: auto`，内容会撑开容器，破坏滚动。

#### 核心规则

> **在 flex 嵌套层级中，需要滚动的每一层都必须加 `minHeight: 0`**

**记忆三原则：**
1. **父是 flex？**子用 `flex: 1`（不是 `height: 100%`）
2. **要滚动？**每层加 `minHeight: 0`
3. **最内层？**加 `overflow: 'auto'`

#### 正确实现

```tsx
// 每层都加 minHeight: 0
<div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
  <div style={{ flex: 1, minHeight: 0 }}>
    <Card
      style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}
      styles={{ body: { flex: 1, overflow: 'auto', minHeight: 0 } }}
    >
      {content}
    </Card>
  </div>
</div>
```

#### 常用模板

**左右双栏：**
```tsx
<div style={{ flex: 1, minHeight: 0, display: 'flex', gap: 8 }}>
  <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
    <Card style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}
          styles={{ body: { flex: 1, overflow: 'auto', minHeight: 0 } }}>
      {content}
    </Card>
  </div>
</div>
```

**垂直分栏：**
```tsx
<div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
  <Card>固定顶部</Card>
  <div style={{ flex: 1, overflow: 'hidden' }}>{scrollableContent}</div>
</div>
```

**调试检查清单：**
- [ ] 每个 flex 嵌套层都有 `minHeight: 0`
- [ ] 父容器用 `flex: 1` 而非 `height: 100%`
- [ ] `overflow: auto` 在正确层级（通常是 Card body）

**参考：**`src/pages/comparison/ReportCenterPage.tsx`

### DisplayLayout（全屏展示布局）

**功能说明：**
- 专为大屏展示、数据可视化设计的全屏布局组件
- 移除侧边栏和底部栏，最大化内容展示区域
- 提供可选的固定顶部操作栏

**结构：**
```
┌──────────────────────────────────┐
│  TopBar (56px, 可选)             │
├──────────────────────────────────┤
│                                  │
│                                  │
│        MainContent               │
│        (全屏展示)                 │
│                                  │
│                                  │
└──────────────────────────────────┘
```

**尺寸配置：**
- TopBar 高度：56px（与 MainLayout.Header 一致）
- MainContent：自动填充剩余空间（100vh 减去 topBar 高度）
- contentPadding：默认 `0`（可配置）
- backgroundColor：默认白色（可配置）

**Props 接口：**
```tsx
interface DisplayLayoutProps {
  /** 主内容区 */
  children: ReactNode;

  /** 可选的顶部操作栏（返回、关闭、全屏切换等） */
  topBar?: ReactNode;

  /** 主内容区 padding，默认 0（适合大屏展示） */
  contentPadding?: string;

  /** 背景色，默认白色 */
  backgroundColor?: string;
}
```

**基本用法：**
```tsx
import DisplayLayout from '@/layout/DisplayLayout';

// 最简用法 - 纯内容全屏
<DisplayLayout>
  <DataVisualization />
</DisplayLayout>

// 带顶部操作栏
<DisplayLayout
  topBar={<Space><Button>退出</Button><Button>全屏</Button></Space>}
  contentPadding={designSystem.spacing[3]}
>
  <DashboardCharts />
</DisplayLayout>
```

**适用场景：**
- ✅ 大屏展示、数据可视化、演示投影
- ❌ 需要侧边栏导航（使用 PageLayout）

**与 PageLayout 对比：**
| 特性 | PageLayout | DisplayLayout |
|------|------------|---------------|
| 用途 | 工作台/管理 | 全屏展示 |
| 侧边栏 | 支持左右侧边栏 | 无 |
| 默认 padding | 由页面控制 | 默认 0 |
| 最佳场景 | 数据管理 | 数据展示 |

**参考：**`src/pages/DashboardPage.tsx`

### ResponsiveGrid（响应式网格）

**功能说明：**
- 基于 Ant Design Grid 系统的封装组件
- 自动计算列数和响应式布局
- 简化卡片网格的创建

**结构：**
```tsx
import { ResponsiveGrid } from '@/layout';

<ResponsiveGrid
  columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
  gutter={[16, 16]}
>
  {items.map(item => <Card key={item.id}>{item.content}</Card>)}
</ResponsiveGrid>
```

**Props 配置：**
- `children`: ReactNode[] - 子元素数组
- `columns`: 各断点列数配置
  - `xs`: < 576px（默认 1）
  - `sm`: ≥ 576px（默认 2）
  - `md`: ≥ 768px（默认 3）
  - `lg`: ≥ 992px（默认 4）
  - `xl`: ≥ 1200px（默认继承 lg）
- `gutter`: 间距配置（默认 `[8, 8]`）

**基本用法：**
```tsx
// 统计卡片网格
<ResponsiveGrid columns={{ xs: 1, sm: 2, lg: 4 }}>
  {stats.map(stat => (
    <Card key={stat.id}>
      <Statistic {...stat} />
    </Card>
  ))}
</ResponsiveGrid>
```

**适用场景：**
- ✅ 快速创建响应式卡片网格，列数规则统一
- ❌ 需要复杂列宽控制（使用 Row/Col）

---

## Ant Design Token 配置

在 `src/App.tsx` 中配置 ConfigProvider：

```tsx
import { ConfigProvider } from 'antd';
import { designSystem } from '@/styles';

<ConfigProvider
  theme={{
    token: designSystem.antdToken,
    components: designSystem.components,
  }}
>
  {/* 应用内容 */}
</ConfigProvider>
```

**Token 配置参考：**`src/styles/DesignSystem.ts`

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
- 仪表板示例（DisplayLayout）：`src/pages/DashboardPage.tsx`
- 模块系统（容器页模式）：`src/pages/module/`
  - 容器页：`src/pages/module/ModuleContainerPage.tsx`
  - 数据管理：`src/pages/module/SubModule1Page.tsx`（访问路径：`/module/data`）
  - 列表页示例：`src/pages/module/ListPage.tsx`（访问路径：`/module/list`）
  - 详情页示例：`src/pages/module/DetailPage.tsx`（访问路径：`/module/detail`）
  - 布局说明：`src/pages/module/LayoutGuidePage.tsx`（访问路径：`/module/layout`）
  - 弹窗示例：`src/pages/module/ModalDemoPage.tsx`（访问路径：`/module/modal`）

### 相关文档
- [迁移指南](./MIGRATION-GUIDE.md)
- [快速参考索引](./RefIndexing.md)

---

如有疑问，请参考示例页面源码或查看 [RefIndexing.md](./RefIndexing.md) 快速索引。

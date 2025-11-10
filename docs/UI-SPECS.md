# UI 规范文档

## 1. 设计原则

### 1.1 核心原则
- **4px 网格系统**：所有尺寸基于 4px 的倍数
- **简洁高效**：减少视觉噪音，专注核心功能
- **响应式设计**：适配多种设备和屏幕尺寸
- **可访问性**：符合 WCAG 2.1 AA 标准

### 1.2 设计参考
- Photoshop、Figma、VS Code 的布局规范
- Ant Design 5.0 设计语言
- 现代 Web 应用最佳实践

---

## 2. 视觉规范

### 2.1 颜色系统

#### 主色调
```css
主色：#005BAC (蓝色)
```

使用场景：
- 主按钮
- 链接
- 选中状态
- 强调内容

#### 中性色（11档灰度）
```css
0   - #FFFFFF  纯白
50  - #F9FAFB  浅灰背景
100 - #F3F4F6  工具栏背景
200 - #E5E7EB  边框
300 - #D1D5DB  分隔线
400 - #9CA3AF  次要文字
500 - #6B7280  辅助文字
600 - #4B5563  正文
700 - #374151  标题
800 - #1F2937  深色文字
900 - #111827  最深文字
```

#### 功能色
```css
成功 Success: #10B981
警告 Warning: #F59E0B
错误 Error:   #EF4444
信息 Info:    #3B82F6
```

#### 语义化颜色映射
```typescript
surface: {
  primary:   #FFFFFF   // 主背景
  secondary: #F9FAFB   // 次背景
  tertiary:  #F3F4F6   // 工具栏背景
  border:    #E5E7EB   // 边框
  divider:   #D1D5DB   // 分隔线
}

text: {
  primary:   #111827   // 主文字
  secondary: #4B5563   // 次要文字
  tertiary:  #9CA3AF   // 辅助文字
  inverse:   #FFFFFF   // 反色文字
}
```

### 2.2 字体系统

#### 字号档位（8档）
```css
xs:   12px   // 提示文字、标签
sm:   14px   // 次要信息、辅助文字
base: 16px   // 正文（默认）
lg:   18px   // 副标题
xl:   20px   // 小标题
2xl:  24px   // 页面标题
3xl:  30px   // 大标题
4xl:  36px   // 超大标题
```

#### 字重
```css
normal:   400  // 正文
medium:   500  // 强调
semibold: 600  // 副标题
bold:     700  // 标题
```

#### 行高
```css
tight:   1.25  // 标题
normal:  1.5   // 正文
relaxed: 1.75  // 阅读型内容
```

#### 字体族
```css
无衬线字体：-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ...
等宽字体：  "SF Mono", Monaco, "Cascadia Code", Consolas, ...
```

### 2.3 间距系统

#### 基准：4px
```css
0:  0      // 无间距
1:  4px    // 最小间距（紧密元素）
2:  8px    // 紧凑间距（相关元素）
3:  12px   // 小间距（表单字段）
4:  16px   // 标准间距（卡片内边距）
5:  20px   // 中等间距
6:  24px   // 大间距（卡片间距）
8:  32px   // 超大间距（区域间距）
10: 40px   // 区域间距
12: 48px   // 超大区域间距
16: 64px   // 特大区域间距
```

#### 使用场景
- **内边距（Padding）**：组件内部元素间距
- **外边距（Margin）**：组件之间的间距
- **间隙（Gap）**：Flex/Grid 布局中的间距

### 2.4 圆角系统

```css
none: 0      // 无圆角
sm:   4px    // 小圆角（标签、徽章）
md:   8px    // 标准圆角（按钮、输入框、卡片）
lg:   12px   // 大圆角（大卡片）
xl:   16px   // 超大圆角（弹窗、抽屉）
full: 9999px // 完全圆角（头像、徽章）
```

### 2.5 阴影系统

```css
none: none
sm:   0 1px 2px 0 rgba(0, 0, 0, 0.05)             // 轻微投影
md:   0 4px 6px -1px rgba(0, 0, 0, 0.1), ...      // 卡片投影
lg:   0 10px 15px -3px rgba(0, 0, 0, 0.1), ...    // 弹出层投影
xl:   0 20px 25px -5px rgba(0, 0, 0, 0.1), ...    // 模态框投影
```

使用场景：
- `sm`：列表项悬停
- `md`：卡片、下拉菜单
- `lg`：弹出层、Popover
- `xl`：模态框、抽屉

---

## 3. 布局规范

### 3.1 栅格系统

#### 断点
```css
mobile:  < 640px   // 手机
tablet:  640-1023px  // 平板
laptop:  1024-1279px // 笔记本
desktop: 1280-1535px // 桌面
wide:    ≥ 1536px   // 宽屏
```

#### 列数：12 列

#### 间距
- 移动端：16px
- 桌面端：24px

### 3.2 间距系统

#### 组件内间距
- 紧密相关元素：4px / 8px
- 一般元素：12px / 16px
- 独立元素：16px / 24px

#### 组件间间距
- 相关组件：16px / 24px
- 独立组件：32px / 40px

#### 区域间间距
- 小区域：40px / 48px
- 大区域：64px

### 3.3 标准高度规范

```css
header:     56px  // 主标题栏
toolbar:    40px  // 工具栏
breadcrumb: 32px  // 面包屑
statusBar:  24px  // 状态栏
tabBar:     40px  // 标签栏

inputSm:    24px  // 小输入框
inputMd:    32px  // 标准输入框
inputLg:    40px  // 大输入框

buttonSm:   24px  // 小按钮
buttonMd:   32px  // 标准按钮
buttonLg:    40px  // 大按钮

listItem:   32px  // 列表项
tableRow:   40px  // 表格行
```

---

## 4. 组件规范

### 4.1 按钮

#### 类型
- `primary`：主按钮（最重要操作）
- `default`：默认按钮（常规操作）
- `dashed`：虚线按钮（次要操作）
- `text`：文本按钮（轻量操作）
- `link`：链接按钮（导航）

#### 尺寸
- `small`：24px 高度
- `default`：32px 高度
- `large`：40px 高度

#### 状态
- **默认**：静态状态
- **悬停**：鼠标悬停，背景色变深
- **激活**：点击时，背景色更深
- **禁用**：灰色，不可点击
- **加载**：显示 Spin，文字变为"加载中..."

#### 使用原则
- 一个页面/区域只有一个主按钮
- 按钮组合：主按钮 + 默认按钮
- 危险操作使用 `danger` 属性

### 4.2 输入框

#### 类型
- `text`：单行文本
- `textarea`：多行文本
- `search`：搜索框
- `password`：密码框

#### 尺寸
- `small`：24px 高度
- `default`：32px 高度
- `large`：40px 高度

#### 状态
- **默认**：边框 #E5E7EB
- **聚焦**：边框 #005BAC，阴影
- **错误**：边框 #EF4444，错误提示
- **禁用**：灰色背景，不可编辑

#### 使用原则
- 必填字段标注 `*`
- 提供 placeholder 提示
- 错误时显示错误信息

### 4.3 卡片

#### 类型
- `default`：默认卡片（白色背景+边框）
- `bordered`：带边框卡片
- `hoverable`：可悬停卡片

#### 尺寸
- `small`：12px 内边距
- `default`：16px 内边距

#### 内边距
- Title：16px
- Body：16px / 24px

#### 使用原则
- 相关内容组织在同一卡片
- 卡片间距：24px
- 避免嵌套超过 2 层

### 4.4 表格

#### 行高
- `default`：40px
- `small`：32px

#### 内边距
- Cell：8px 16px

#### 样式
- 表头：背景 #F9FAFB，字重 semibold
- 斑马纹：可选，奇数行 #FFFFFF，偶数行 #F9FAFB

#### 使用原则
- 可排序字段显示排序图标
- 长文本使用 ellipsis 截断
- 操作列固定在右侧

---

## 5. 交互规范

### 5.1 动画

#### 过渡时间
- 快速：150ms（悬停、点击）
- 标准：300ms（展开/折叠、淡入/淡出）
- 慢速：500ms（页面切换）

#### 缓动函数
- `ease-in-out`：默认
- `ease-out`：进入动画
- `ease-in`：退出动画

### 5.2 反馈

#### 加载
- **Spin**：按钮、小区域
- **Skeleton**：列表、卡片、表格

#### 错误
- **ErrorState**：页面级错误
- **Toast**：操作失败提示
- **表单验证**：字段下方显示错误信息

#### 成功
- **Toast**：操作成功提示（绿色，3秒自动关闭）
- **Notification**：重要成功通知

### 5.3 快捷键

```
搜索：    Cmd/Ctrl + K
保存：    Cmd/Ctrl + S
取消：    Escape
刷新：    Cmd/Ctrl + R
全屏：    F11
```

---

## 6. 响应式设计规范

### 6.1 断点

```css
Mobile:  < 640px
Tablet:  640px - 1023px
Desktop: ≥ 1024px
```

### 6.2 布局适配

#### Mobile（< 640px）
- 单栏布局
- 侧边栏变为抽屉
- 工具栏折叠为下拉菜单
- 表格横向滚动

#### Tablet（640-1023px）
- 两栏布局（侧边栏 + 主内容）
- 右侧详情面板可折叠

#### Desktop（≥ 1024px）
- 三栏布局（左侧边栏 + 主内容 + 右侧详情）
- 所有功能完整展示

### 6.3 字号适配

```css
Mobile:  基准 14px
Desktop: 基准 16px
```

### 6.4 间距适配

```css
Mobile:  间距减半（spacing / 2）
Desktop: 标准间距
```

---

## 7. Z-Index 层级

```css
内容层:     0
下拉菜单:   1000
Sticky:    1020
Fixed:     1030
模态背景:   1040
模态框:     1050
Popover:   1060
Tooltip:   1070
```

---

## 8. 无障碍设计

### 8.1 语义化 HTML
- 使用正确的 HTML 标签（`<button>`, `<nav>`, `<main>`）
- 避免纯 `<div>` 结构

### 8.2 ARIA 属性
- `aria-label`：无文本元素
- `aria-labelledby`：关联标签
- `aria-describedby`：关联描述
- `role`：定义元素角色

### 8.3 键盘导航
- 所有交互元素可通过 Tab 键访问
- Enter 键确认操作
- Escape 键关闭弹出层

### 8.4 色彩对比度
- 文字与背景对比度 ≥ 4.5:1
- 大文字（≥18px）对比度 ≥ 3:1

---

## 9. 性能规范

### 9.1 动画性能
- 优先使用 `transform` 和 `opacity`
- 避免动画 `width`, `height`, `top`, `left`

### 9.2 图片优化
- 使用 WebP 格式
- 提供多尺寸响应式图片
- 懒加载非首屏图片

### 9.3 代码分割
- 路由级别代码分割
- 大组件按需加载

---

## 10. 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

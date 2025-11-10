/**
 * Ant Design Template - Design System
 *
 * 设计原则：
 * - 基于 4px 网格系统
 * - 主色调：#005BAC
 * - 参考专业软件（Photoshop、Figma、VS Code）的布局规范
 */

// ==================== 色彩系统 ====================

export const colors = {
  // 主色 - 基于 #005BAC
  primary: {
    50: '#E6F0F9',
    100: '#B3D4ED',
    200: '#80B8E0',
    300: '#4D9CD4',
    400: '#2680C7',
    500: '#005BAC', // 主色
    600: '#004F96',
    700: '#004380',
    800: '#00376A',
    900: '#002B54',
  },

  // 中性色
  neutral: {
    0: '#FFFFFF',    // 纯白
    50: '#F9FAFB',   // 浅灰背景
    100: '#F3F4F6',  // 工具栏背景
    200: '#E5E7EB',  // 边框
    300: '#D1D5DB',  // 分隔线
    400: '#9CA3AF',  // 次要文字
    500: '#6B7280',  // 辅助文字
    600: '#4B5563',  // 正文
    700: '#374151',  // 标题
    800: '#1F2937',  // 深色文字
    900: '#111827',  // 最深文字
  },

  // 功能色
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#2680C7', // 基于主色 primary.400
} as const;

// 语义化颜色
export const semantic = {
  surface: {
    primary: colors.neutral[0],      // 主背景 - 白色
    secondary: colors.neutral[50],   // 次背景 - 极浅灰
    tertiary: colors.neutral[100],   // 工具栏背景 - 浅灰
    border: colors.neutral[200],     // 边框
    divider: colors.neutral[300],    // 分隔线
  },
  text: {
    primary: colors.neutral[900],    // 主文字
    secondary: colors.neutral[600],  // 次要文字
    tertiary: colors.neutral[400],   // 辅助文字
    inverse: colors.neutral[0],      // 反色文字
  },
  interactive: {
    primary: colors.primary[500],         // 主按钮
    primaryHover: colors.primary[600],    // 主按钮悬停
    secondary: colors.neutral[100],       // 次要按钮背景
    secondaryHover: colors.neutral[200],  // 次要按钮悬停
  },
} as const;

// ==================== 间距系统（基于 4px 网格）====================

export const spacing = {
  0: '0',
  1: '4px',    // 最小间距
  2: '8px',    // 紧凑间距
  3: '12px',   // 小间距
  4: '16px',   // 标准间距
  5: '20px',   // 中等间距
  6: '24px',   // 大间距
  8: '32px',   // 超大间距
  10: '40px',  // 区域间距
  12: '48px',  // 超大区域间距
  16: '64px',  // 特大区域间距
} as const;

// ==================== 高度系统 ====================

export const heights = {
  // 顶部栏
  header: '56px',       // 主标题栏（包含导航）
  toolbar: '40px',      // 工具栏
  breadcrumb: '32px',   // 面包屑

  // 输入组件
  inputSm: '24px',      // 小输入框
  inputMd: '32px',      // 标准输入框
  inputLg: '40px',      // 大输入框

  // 按钮
  buttonSm: '24px',     // 小按钮
  buttonMd: '32px',     // 标准按钮
  buttonLg: '40px',     // 大按钮

  // 其他
  listItem: '32px',     // 列表项
  tableRow: '40px',     // 表格行
  statusBar: '24px',    // 状态栏
  tabBar: '40px',       // 标签栏
} as const;

// ==================== 字体系统 ====================

export const typography = {
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
  },
} as const;

// ==================== 圆角系统 ====================

export const borderRadius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

// ==================== 阴影系统 ====================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
} as const;

// ==================== 断点系统 ====================

export const breakpoints = {
  mobile: '640px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1280px',
  wide: '1536px',
} as const;

// ==================== Z-Index 层级 ====================

export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

// ==================== 完整设计系统导出 ====================

export const designSystem = {
  colors,
  semantic,
  spacing,
  heights,
  typography,
  borderRadius,
  shadows,
  breakpoints,
  zIndex,
} as const;

export default designSystem;

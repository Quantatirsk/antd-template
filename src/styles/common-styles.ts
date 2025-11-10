/**
 * 通用样式常量
 * 提供常用的 CSS 样式对象，避免重复定义
 */

import { CSSProperties } from 'react';
import { designSystem } from './design-system';

/**
 * Flex 布局相关样式
 */
export const flexStyles = {
  // 水平居中
  centerX: {
    display: 'flex',
    justifyContent: 'center',
  } as CSSProperties,

  // 垂直居中
  centerY: {
    display: 'flex',
    alignItems: 'center',
  } as CSSProperties,

  // 完全居中
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as CSSProperties,

  // 两端对齐
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as CSSProperties,

  // 列布局
  column: {
    display: 'flex',
    flexDirection: 'column',
  } as CSSProperties,
};

/**
 * 文本样式
 */
export const textStyles = {
  // 文本截断（单行）
  ellipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } as CSSProperties,

  // 多行文本截断
  ellipsisMultiline: (lines: number) => ({
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  } as CSSProperties),

  // 主标题
  heading: {
    fontSize: designSystem.typography.fontSize['2xl'],
    fontWeight: designSystem.typography.fontWeight.bold,
    lineHeight: designSystem.typography.lineHeight.tight,
  } as CSSProperties,

  // 副标题
  subheading: {
    fontSize: designSystem.typography.fontSize.lg,
    fontWeight: designSystem.typography.fontWeight.semibold,
    opacity: 0.85,
    lineHeight: designSystem.typography.lineHeight.normal,
  } as CSSProperties,

  // 正文
  body: {
    fontSize: designSystem.typography.fontSize.base,
    fontWeight: designSystem.typography.fontWeight.normal,
    lineHeight: designSystem.typography.lineHeight.normal,
  } as CSSProperties,

  // 小字（次要文字）
  small: {
    fontSize: designSystem.typography.fontSize.sm,
    opacity: 0.65,
  } as CSSProperties,

  // 提示文字（辅助文字）
  hint: {
    fontSize: designSystem.typography.fontSize.xs,
    opacity: 0.45,
  } as CSSProperties,

  // 文字颜色层级（使用 opacity 自动适配主题）
  primary: {} as CSSProperties,  // 主文字，继承默认
  secondary: { opacity: 0.65 } as CSSProperties,  // 次要文字
  tertiary: { opacity: 0.45 } as CSSProperties,   // 辅助文字
};

/**
 * 卡片样式
 */
export const cardStyles = {
  default: {
    background: designSystem.semantic.surface.primary,
    border: `1px solid ${designSystem.semantic.surface.border}`,
    borderRadius: designSystem.borderRadius.md,
    padding: designSystem.spacing[4],
  } as CSSProperties,

  hover: {
    background: designSystem.semantic.surface.primary,
    border: `1px solid ${designSystem.semantic.surface.border}`,
    borderRadius: designSystem.borderRadius.md,
    padding: designSystem.spacing[4],
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  } as CSSProperties,
};

/**
 * 阴影样式
 */
export const shadowStyles = {
  sm: {
    boxShadow: designSystem.shadows.sm,
  } as CSSProperties,

  md: {
    boxShadow: designSystem.shadows.md,
  } as CSSProperties,

  lg: {
    boxShadow: designSystem.shadows.lg,
  } as CSSProperties,

  xl: {
    boxShadow: designSystem.shadows.xl,
  } as CSSProperties,
};

/**
 * 滚动条样式
 */
export const scrollbarStyles = {
  thin: {
    '&::-webkit-scrollbar': {
      width: '6px',
      height: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: designSystem.semantic.surface.divider,
      borderRadius: designSystem.borderRadius.full,
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
  },
};

/**
 * 全局样式组件
 * 从设计系统配置中自动生成全局 CSS 样式
 * 用于无法通过 ConfigProvider 配置的样式（如 hover 动画效果）
 */

import { designSystem } from './design-system';

export function GlobalStyles() {
  const styles = `
    /* 全局滚动条样式 - 统一设计 */
    /* 配置来源: designSystem.spacing, designSystem.colors */
    * {
      scrollbar-width: thin;  /* Firefox */
      scrollbar-color: ${designSystem.semantic.text.tertiary} transparent;  /* Firefox: thumb track */
    }

    /* WebKit 浏览器 (Chrome, Safari, Edge) */
    *::-webkit-scrollbar {
      width: 4px;  /* 垂直滚动条宽度 - 极简设计 */
      height: 4px;  /* 水平滚动条高度 */
    }

    *::-webkit-scrollbar-track {
      background: transparent;  /* 轨道背景透明 */
    }

    *::-webkit-scrollbar-thumb {
      background-color: ${designSystem.semantic.text.tertiary};  /* 滑块颜色 - 浅灰 */
      border-radius: 2px;  /* 圆角 */
      transition: background-color ${designSystem.transitions.fast};  /* 平滑过渡 */
    }

    *::-webkit-scrollbar-thumb:hover {
      background-color: ${designSystem.colors.primary[500]};  /* hover 时变为品牌色 */
    }

    /* 确保滚动条尺寸不变 */
    *::-webkit-scrollbar-button {
      display: none;  /* 隐藏滚动条箭头按钮 */
    }

    *::-webkit-scrollbar-corner {
      background: transparent;  /* 滚动条交角透明 */
    }

    /* 全局卡片样式 - Apple级现代设计 */
    /* 配置来源: designSystem.cardSystem */
    .ant-card {
      border: none !important;
      box-shadow: ${designSystem.cardSystem.shadow} !important;
      border-radius: ${designSystem.cardSystem.borderRadius} !important;
      transition: box-shadow ${designSystem.transitions.default}, transform ${designSystem.transitions.default} !important;
    }

    .ant-card:hover {
      box-shadow: ${designSystem.cardSystem.shadowHover} !important;
      transform: translateY(${designSystem.cardSystem.hover.translateY}) !important;
    }

    .ant-card-body {
      padding: ${designSystem.spacing[3]} !important;  /* 12px (全局默认) */
    }

    /* 卡片操作栏样式 - 极致紧凑设计 */
    .ant-card-actions {
      background-color: ${designSystem.semantic.surface.base} !important;
      border-top: 1px solid ${designSystem.semantic.border.light} !important;
      padding: 0 !important;
    }

    .ant-card-actions > li {
      margin: 6px 0 !important;  /* 上下各6px，总高度约28px */
      padding: 0 !important;
    }

    .ant-card-actions > li > span {
      font-size: ${designSystem.componentFontSize.button} !important;  /* 13px */
      line-height: 1.2 !important;  /* 紧凑行高 */
      padding: 0 !important;
      display: inline-flex !important;
      align-items: center !important;
      cursor: pointer !important;
    }

    .ant-card-actions > li > span > .anticon {
      font-size: 16px !important;  /* 图标稍大保持可点击性 */
    }

    /* Table容器卡片样式 - 统一Table组件外观 */
    /* 配置来源: designSystem.tableSystem */
    .ant-table-wrapper > .ant-card {
      border-radius: ${designSystem.tableSystem.containerBorderRadius} !important;
      box-shadow: ${designSystem.tableSystem.containerShadow} !important;
      transition: box-shadow ${designSystem.tableSystem.hoverTransition}, transform ${designSystem.tableSystem.hoverTransition} !important;
    }

    .ant-table-wrapper > .ant-card:hover {
      box-shadow: ${designSystem.tableSystem.containerShadowHover} !important;
      transform: translateY(${designSystem.tableSystem.hoverTranslateY}) !important;
    }

    /* Table充分利用空间 */
    .ant-table-wrapper {
      display: flex !important;
      flex-direction: column !important;
      height: 100%;
    }

    .ant-spin-nested-loading,
    .ant-spin-container {
      display: flex !important;
      flex-direction: column !important;
      height: 100%;
    }

    /* Table组件样式 - 完整配置 */
    /* 配置来源: designSystem.tableSystem */
    .ant-table {
      flex: 1 !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden;
      border-radius: ${designSystem.tableSystem.containerBorderRadius} !important;
      background-color: ${designSystem.tableSystem.containerBackground} !important;
    }

    .ant-table-container {
      flex: 1 !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden;
    }

    .ant-table-body {
      flex: 1 !important;
      overflow-y: auto !important;
    }

    .ant-table-pagination {
      flex-shrink: 0 !important;
      margin-top: 12px !important;
    }

    /* 分页器字体大小 */
    .ant-pagination {
      font-size: ${designSystem.componentFontSize.pagination} !important;
    }

    .ant-pagination-item,
    .ant-pagination-prev,
    .ant-pagination-next,
    .ant-pagination-jump-prev,
    .ant-pagination-jump-next {
      font-size: ${designSystem.componentFontSize.pagination} !important;
    }

    .ant-pagination-options {
      font-size: ${designSystem.componentFontSize.pagination} !important;
    }

    .ant-pagination-options .ant-select-selector {
      font-size: ${designSystem.componentFontSize.pagination} !important;
    }

    .ant-pagination-total-text {
      font-size: ${designSystem.componentFontSize.pagination} !important;
    }

    .ant-table-thead > tr > th {
      background-color: ${designSystem.tableSystem.headerBackground} !important;
      padding-block: 8px !important;
      padding-inline: 12px !important;
      font-size: ${designSystem.componentFontSize.tableHeader} !important;
      font-weight: ${designSystem.typography.fontWeight.semibold} !important;
    }

    .ant-table-tbody > tr > td {
      padding-block: 8px !important;
      padding-inline: 12px !important;
      border-color: ${designSystem.tableSystem.borderColor} !important;
      font-size: ${designSystem.componentFontSize.tableCell} !important;
    }

    .ant-table-tbody > tr:hover > td {
      background-color: ${designSystem.tableSystem.rowHoverBackground} !important;
    }

    /* Layout组件样式 */
    /* 配置来源: designSystem.semantic.surface */
    .ant-layout-header {
      background-color: ${designSystem.semantic.surface.base} !important;
    }

    .ant-layout-content {
      background-color: ${designSystem.semantic.surface.base} !important;
    }

    .ant-layout-sider {
      background-color: ${designSystem.semantic.surface.base} !important;
    }

    /* Tooltip统一样式 */
    /* 配置来源: designSystem.tooltipSystem */
    .ant-tooltip {
      max-width: ${designSystem.tooltipSystem.maxWidth} !important;
    }

    .ant-tooltip-inner {
      font-size: ${designSystem.componentFontSize.tooltip} !important;
      padding: ${designSystem.tooltipSystem.paddingBlock} ${designSystem.tooltipSystem.paddingInline} !important;
      border-radius: ${designSystem.tooltipSystem.borderRadius} !important;
      background-color: ${designSystem.tooltipSystem.background} !important;
      box-shadow: ${designSystem.tooltipSystem.boxShadow} !important;
      min-height: auto !important;
    }

    .ant-tooltip-arrow::before {
      background: ${designSystem.tooltipSystem.background} !important;
    }

    /* 全局组件字体统一 - 语义化配置 */
    /* 按钮组件 */
    .ant-btn {
      font-size: ${designSystem.componentFontSize.button} !important;
    }

    /* 输入框组件 */
    .ant-input,
    .ant-input-number-input {
      font-size: ${designSystem.componentFontSize.input} !important;
    }

    /* 下拉选择器（展示和选项统一） */
    .ant-select-selection-item,
    .ant-select-item {
      font-size: ${designSystem.componentFontSize.select} !important;
    }

    /* Checkbox & Radio */
    .ant-checkbox-wrapper,
    .ant-radio-wrapper {
      font-size: ${designSystem.componentFontSize.checkbox} !important;
    }

    /* Tag 标签 */
    .ant-tag {
      font-size: ${designSystem.componentFontSize.tag} !important;
    }

    /* Badge 徽标 */
    .ant-badge {
      font-size: ${designSystem.componentFontSize.badge} !important;
    }

    /* 表单标签 */
    .ant-form-item-label > label {
      font-size: ${designSystem.componentFontSize.formLabel} !important;
    }

    /* List 列表 */
    .ant-list-item {
      font-size: ${designSystem.componentFontSize.list} !important;
    }

    /* Menu 菜单 */
    .ant-menu-item,
    .ant-menu-submenu-title {
      font-size: ${designSystem.componentFontSize.menu} !important;
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}

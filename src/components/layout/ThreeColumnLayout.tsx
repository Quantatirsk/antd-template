/**
 * ThreeColumnLayout - 经典三栏布局组件
 *
 * 布局结构：
 * - 顶部工具栏（可选）
 * - 左侧边栏（可折叠）
 * - 主内容区
 * - 右侧边栏（可折叠）
 * - 底部状态栏（可选）
 */

import { useState, useEffect, ReactNode } from 'react';
import { designSystem } from '@/styles/design-system';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ThreeColumnLayoutProps {
  // 顶部工具栏
  topBar?: ReactNode;
  topBarHeight?: string;

  // 左侧边栏
  leftSidebar?: ReactNode;
  leftSidebarWidth?: string;
  leftDefaultCollapsed?: boolean;
  onLeftCollapsedChange?: (collapsed: boolean) => void;

  // 主内容区
  children: ReactNode;

  // 右侧边栏
  rightSidebar?: ReactNode;
  rightSidebarWidth?: string;
  rightDefaultCollapsed?: boolean;
  onRightCollapsedChange?: (collapsed: boolean) => void;

  // 底部状态栏
  bottomBar?: ReactNode;
}

export default function ThreeColumnLayout({
  topBar,
  topBarHeight = '40px',
  leftSidebar,
  leftSidebarWidth = '240px',
  leftDefaultCollapsed = false,
  onLeftCollapsedChange,
  children,
  rightSidebar,
  rightSidebarWidth = '280px',
  rightDefaultCollapsed = false,
  onRightCollapsedChange,
  bottomBar,
}: ThreeColumnLayoutProps) {
  const [leftCollapsed, setLeftCollapsed] = useState(leftDefaultCollapsed);
  const [rightCollapsed, setRightCollapsed] = useState(rightDefaultCollapsed);

  // 处理折叠状态变化
  const handleLeftCollapse = (collapsed: boolean) => {
    setLeftCollapsed(collapsed);
    onLeftCollapsedChange?.(collapsed);
  };

  const handleRightCollapse = (collapsed: boolean) => {
    setRightCollapsed(collapsed);
    onRightCollapsedChange?.(collapsed);
  };

  // 响应式断点：小于 900px 自动折叠侧边栏
  // 计算：左侧 240px + 右侧最小 220px + 主内容最小 400px = 860px，加上边距设为 900px
  const isWideEnough = useMediaQuery('(min-width: 900px)');

  // 响应式折叠/展开侧边栏
  useEffect(() => {
    if (!isWideEnough) {
      // 窗口太小，自动折叠
      handleLeftCollapse(true);
      handleRightCollapse(true);
    } else {
      // 窗口足够大，恢复展开（恢复到初始默认值）
      handleLeftCollapse(leftDefaultCollapsed);
      handleRightCollapse(rightDefaultCollapsed);
    }
  }, [isWideEnough, leftDefaultCollapsed, rightDefaultCollapsed]);

  // 监听外部状态变化（支持受控模式）
  useEffect(() => {
    setLeftCollapsed(leftDefaultCollapsed);
  }, [leftDefaultCollapsed]);

  useEffect(() => {
    setRightCollapsed(rightDefaultCollapsed);
  }, [rightDefaultCollapsed]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        backgroundColor: designSystem.semantic.surface.base,
      }}
    >
      {/* 顶部工具栏 */}
      {topBar && (
        <div
          style={{
            minHeight: topBarHeight,
            flexShrink: 0,
            backgroundColor: designSystem.semantic.surface.base,
            display: 'flex',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          {topBar}
        </div>
      )}

      {/* 主体区域 */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {/* 左侧边栏 */}
        {leftSidebar && !leftCollapsed && (
          <div
            style={{
              width: leftSidebarWidth,
              minWidth: '200px',
              maxWidth: '300px',
              flexShrink: 0,
              backgroundColor: designSystem.semantic.surface.base,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <div style={{ flex: 1, overflow: 'auto' }}>
              {leftSidebar}
            </div>
          </div>
        )}

        {/* 主内容区 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, minWidth: 0 }}>
          {children}
        </div>

        {/* 右侧边栏 */}
        {rightSidebar && !rightCollapsed && (
          <div
            style={{
              flexBasis: rightSidebarWidth,
              minWidth: '220px',
              maxWidth: '350px',
              flexShrink: 1,
              flexGrow: 0,
              backgroundColor: designSystem.semantic.surface.base,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <div style={{ flex: 1, overflow: 'auto' }}>
              {rightSidebar}
            </div>
          </div>
        )}
      </div>

      {/* 底部状态栏 */}
      {bottomBar && (
        <div
          style={{
            flexShrink: 0,
            boxShadow: '0 -1px 2px 0 rgba(0, 0, 0, 0.05)',
            display: 'flex',
            alignItems: 'center',
            padding: designSystem.spacing[1],  // 8px 最紧凑布局
            fontSize: designSystem.typography.fontSize.sm,
            gap: designSystem.spacing[1],  // 8px
            backgroundColor: designSystem.semantic.surface.base,
          }}
        >
          {bottomBar}
        </div>
      )}
    </div>
  );
}

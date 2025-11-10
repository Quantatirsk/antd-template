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

import { useState, useEffect, useRef, ReactNode } from 'react';
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
  topBarHeight = designSystem.heights.toolbar,
  leftSidebar,
  leftSidebarWidth = designSystem.sidebarSystem.leftWidth,
  leftDefaultCollapsed = false,
  onLeftCollapsedChange,
  children,
  rightSidebar,
  rightSidebarWidth = designSystem.sidebarSystem.rightWidth,
  rightDefaultCollapsed = false,
  onRightCollapsedChange,
  bottomBar,
}: ThreeColumnLayoutProps) {
  const [leftCollapsed, setLeftCollapsed] = useState(leftDefaultCollapsed);
  const [rightCollapsed, setRightCollapsed] = useState(rightDefaultCollapsed);

  // 记住用户在宽屏时的手动设置状态（用于窗口拉宽后恢复）
  const leftUserPreference = useRef(leftDefaultCollapsed);
  const rightUserPreference = useRef(rightDefaultCollapsed);

  // 记录上一次的 isWideEnough 状态，用于检测窗口宽度变化
  const prevIsWideEnough = useRef<boolean | null>(null);

  // 处理折叠状态变化
  const handleLeftCollapse = (collapsed: boolean, isUserAction = false) => {
    setLeftCollapsed(collapsed);
    onLeftCollapsedChange?.(collapsed);

    // 如果是用户手动操作且窗口足够宽，保存偏好
    if (isUserAction && isWideEnough) {
      leftUserPreference.current = collapsed;
    }
  };

  const handleRightCollapse = (collapsed: boolean, isUserAction = false) => {
    setRightCollapsed(collapsed);
    onRightCollapsedChange?.(collapsed);

    // 如果是用户手动操作且窗口足够宽，保存偏好
    if (isUserAction && isWideEnough) {
      rightUserPreference.current = collapsed;
    }
  };

  // 响应式断点：小于 900px 自动折叠侧边栏
  // 计算：左侧 240px + 右侧最小 220px + 主内容最小 400px = 860px，加上边距设为 900px
  const isWideEnough = useMediaQuery(`(min-width: ${designSystem.breakpoints.threeColumn})`);

  // 响应式折叠/展开侧边栏
  useEffect(() => {
    // 初始化
    if (prevIsWideEnough.current === null) {
      prevIsWideEnough.current = isWideEnough;
      return;
    }

    const wasWideEnough = prevIsWideEnough.current;

    // 窗口从宽变窄：保存当前状态并自动折叠
    if (wasWideEnough && !isWideEnough) {
      leftUserPreference.current = leftCollapsed;
      rightUserPreference.current = rightCollapsed;
      handleLeftCollapse(true);
      handleRightCollapse(true);
    }

    // 窗口从窄变宽：恢复用户偏好
    if (!wasWideEnough && isWideEnough) {
      handleLeftCollapse(leftUserPreference.current);
      handleRightCollapse(rightUserPreference.current);
    }

    prevIsWideEnough.current = isWideEnough;
  }, [isWideEnough]);

  // 监听外部状态变化（支持受控模式）
  useEffect(() => {
    setLeftCollapsed(leftDefaultCollapsed);
    // 如果窗口足够宽，同步更新用户偏好
    if (isWideEnough) {
      leftUserPreference.current = leftDefaultCollapsed;
    }
  }, [leftDefaultCollapsed, isWideEnough]);

  useEffect(() => {
    setRightCollapsed(rightDefaultCollapsed);
    // 如果窗口足够宽，同步更新用户偏好
    if (isWideEnough) {
      rightUserPreference.current = rightDefaultCollapsed;
    }
  }, [rightDefaultCollapsed, isWideEnough]);

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
              minWidth: designSystem.sidebarSystem.leftMinWidth,
              maxWidth: designSystem.sidebarSystem.leftMaxWidth,
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
              minWidth: designSystem.sidebarSystem.rightMinWidth,
              maxWidth: designSystem.sidebarSystem.rightMaxWidth,
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
            boxShadow: designSystem.shadows.xs,
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

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
import { Button, Tooltip } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { designSystem } from '@/styles/design-system';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ThreeColumnLayoutProps {
  // 顶部工具栏
  topBar?: ReactNode;
  topBarHeight?: string;

  // 左侧边栏
  leftSidebar?: ReactNode;
  leftSidebarWidth?: string;
  leftCollapsible?: boolean;
  leftDefaultCollapsed?: boolean;

  // 主内容区
  children: ReactNode;

  // 右侧边栏
  rightSidebar?: ReactNode;
  rightSidebarWidth?: string;
  rightCollapsible?: boolean;
  rightDefaultCollapsed?: boolean;

  // 底部状态栏
  bottomBar?: ReactNode;
  bottomBarHeight?: string;
}

export default function ThreeColumnLayout({
  topBar,
  topBarHeight = '40px',
  leftSidebar,
  leftSidebarWidth = '240px',
  leftCollapsible = true,
  leftDefaultCollapsed = false,
  children,
  rightSidebar,
  rightSidebarWidth = '280px',
  rightCollapsible = true,
  rightDefaultCollapsed = false,
  bottomBar,
}: ThreeColumnLayoutProps) {
  const [leftCollapsed, setLeftCollapsed] = useState(leftDefaultCollapsed);
  const [rightCollapsed, setRightCollapsed] = useState(rightDefaultCollapsed);
  const [leftTooltipOpen, setLeftTooltipOpen] = useState(false);
  const [rightTooltipOpen, setRightTooltipOpen] = useState(false);

  // 响应式断点：小于 900px 自动折叠侧边栏
  // 计算：左侧 240px + 右侧最小 220px + 主内容最小 400px = 860px，加上边距设为 900px
  const isWideEnough = useMediaQuery('(min-width: 900px)');

  // 响应式折叠/展开侧边栏
  useEffect(() => {
    if (!isWideEnough) {
      // 窗口太小，自动折叠
      setLeftCollapsed(true);
      setRightCollapsed(true);
    } else {
      // 窗口足够大，恢复展开（恢复到初始默认值）
      setLeftCollapsed(leftDefaultCollapsed);
      setRightCollapsed(rightDefaultCollapsed);
    }
  }, [isWideEnough, leftDefaultCollapsed, rightDefaultCollapsed]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        backgroundColor: designSystem.semantic.surface.primary,
      }}
    >
      {/* 顶部工具栏 */}
      {topBar && (
        <div
          style={{
            minHeight: topBarHeight,
            flexShrink: 0,
            borderBottom: `1px solid ${designSystem.semantic.surface.border}`,
            display: 'flex',
            alignItems: 'center',
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
              borderRight: `1px solid ${designSystem.semantic.surface.border}`,
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
          {/* 折叠按钮容器 */}
          {((leftSidebar && leftCollapsible) || (rightSidebar && rightCollapsible)) && (
            <div
              style={{
                minHeight: '40px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: `0 ${designSystem.spacing[2]}`,
                borderBottom: `1px solid ${designSystem.semantic.surface.border}`,
              }}
            >
              {/* 左侧折叠按钮 */}
              {leftSidebar && leftCollapsible ? (
                <Tooltip
                  title={leftCollapsed ? '展开左侧边栏' : '折叠左侧边栏'}
                  placement="right"
                  open={leftTooltipOpen}
                  onOpenChange={setLeftTooltipOpen}
                >
                  <Button
                    type="text"
                    size="small"
                    icon={leftCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => {
                      setLeftCollapsed(!leftCollapsed);
                      setLeftTooltipOpen(false);
                    }}
                  />
                </Tooltip>
              ) : <div />}

              {/* 右侧折叠按钮 */}
              {rightSidebar && rightCollapsible ? (
                <Tooltip
                  title={rightCollapsed ? '展开右侧边栏' : '折叠右侧边栏'}
                  placement="left"
                  open={rightTooltipOpen}
                  onOpenChange={setRightTooltipOpen}
                >
                  <Button
                    type="text"
                    size="small"
                    icon={rightCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                    onClick={() => {
                      setRightCollapsed(!rightCollapsed);
                      setRightTooltipOpen(false);
                    }}
                  />
                </Tooltip>
              ) : <div />}
            </div>
          )}

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
              borderLeft: `1px solid ${designSystem.semantic.surface.border}`,
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
            borderTop: `1px solid ${designSystem.semantic.surface.border}`,
            display: 'flex',
            alignItems: 'center',
            padding: designSystem.spacing[3],
            fontSize: designSystem.typography.fontSize.sm,
            gap: designSystem.spacing[4],
          }}
        >
          {bottomBar}
        </div>
      )}
    </div>
  );
}

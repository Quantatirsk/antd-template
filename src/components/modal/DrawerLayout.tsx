/**
 * DrawerLayout - 侧边栏弹窗布局
 *
 * 与 PageLayout 类似，但针对 Drawer 优化
 * 支持顶部工具栏、底部操作栏
 */

import type { ReactNode } from 'react';
import { designSystem } from '@/styles/DesignSystem';

interface DrawerLayoutProps {
  // Header 区域（可选）
  header?: ReactNode;
  headerHeight?: string;

  // Content 区域
  children: ReactNode;
  contentPadding?: string;

  // Footer 区域（可选）
  footer?: ReactNode;
  footerAlign?: 'left' | 'center' | 'right';
}

export default function DrawerLayout({
  header,
  headerHeight = designSystem.heights.toolbar,
  children,
  contentPadding = '0',  // 默认无 padding，由用户自主构建 div 设置 spacing[1]
  footer,
  footerAlign = 'right',
}: DrawerLayoutProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
      }}
    >
      {/* Header 工具栏 */}
      {header && (
        <div
          style={{
            minHeight: headerHeight,
            padding: `0 ${designSystem.spacing[1]}`,  // 左右 8px
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: designSystem.spacing[2],
          }}
        >
          {header}
        </div>
      )}

      {/* Content - 可滚动 */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: contentPadding,
          minHeight: 0,
        }}
      >
        {children}
      </div>

      {/* Footer 操作栏 */}
      {footer && (
        <div
          style={{
            flexShrink: 0,
            padding: designSystem.spacing[1],  // 上下左右全部 8px
            display: 'flex',
            alignItems: 'center',
            justifyContent: footerAlign === 'left' ? 'flex-start' : footerAlign === 'center' ? 'center' : 'flex-end',
            gap: designSystem.spacing[2],
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

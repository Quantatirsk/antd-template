/**
 * StandardModalLayout - 标准三段式弹窗布局
 *
 * 结构：Header + Content + Footer
 * 特性：Content 可滚动，自动高度限制
 */

import { ReactNode } from 'react';
import { designSystem } from '@/styles/DesignSystem';

interface StandardModalLayoutProps {
  // Header 区域
  title?: ReactNode;
  extra?: ReactNode;  // Header 右侧额外内容

  // Content 区域
  children: ReactNode;
  contentPadding?: string;
  maxHeight?: string;  // Content 最大高度，默认 65vh

  // Footer 区域
  footer?: ReactNode;
  footerAlign?: 'left' | 'center' | 'right';  // 底部按钮对齐方式
}

export default function StandardModalLayout({
  title,
  extra,
  children,
  contentPadding = '0',  // 默认无 padding，由用户自主构建 div 设置 spacing[1]
  maxHeight = '70vh',  // 进一步提升空间利用率
  footer,
  footerAlign = 'right',
}: StandardModalLayoutProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
      }}
    >
      {/* Header */}
      {(title || extra) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: designSystem.heights.header,
            padding: `0 ${designSystem.spacing[1]}`,  // 左右 8px
            flexShrink: 0,
          }}
        >
          {title && (
            <div
              style={{
                fontSize: designSystem.typography.fontSize.lg,
                fontWeight: designSystem.typography.fontWeight.semibold,
                color: designSystem.semantic.text.primary,
              }}
            >
              {title}
            </div>
          )}
          {extra && <div>{extra}</div>}
        </div>
      )}

      {/* Content - 可滚动 */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: contentPadding,
          maxHeight,
          minHeight: 0,
        }}
      >
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: footerAlign === 'left' ? 'flex-start' : footerAlign === 'center' ? 'center' : 'flex-end',
            gap: designSystem.spacing[2],
            padding: designSystem.spacing[1],  // 上下左右全部 8px
            flexShrink: 0,
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

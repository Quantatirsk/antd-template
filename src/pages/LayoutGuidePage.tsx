/**
 * 布局说明页 - Layout Guide Page
 *
 * 说明：本页面用于展示 MainLayout 和 PageLayout 的结构
 * 注意：所有颜色值均为硬编码，仅用于演示布局区域，不代表设计系统规范
 */

import { useState } from 'react';
import { Card, Button, Tag, Typography } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import PageLayout from '@/components/layout/PageLayout';
import { designSystem } from '@/styles';

const { Title, Text, Paragraph } = Typography;

/* ==================== 硬编码颜色（仅用于演示区域）==================== */
// 警告：这些颜色不在设计系统中，仅用于本页面标注布局区域
const DEMO_COLORS = {
  mainLayout: {
    sider: 'rgba(139, 92, 246, 0.15)',      // 紫色 - 主导航栏
    header: 'rgba(59, 130, 246, 0.15)',     // 蓝色 - 顶部栏
    content: 'rgba(34, 197, 94, 0.15)',     // 绿色 - 内容区
  },
  pageLayout: {
    topBar: 'rgba(251, 146, 60, 0.15)',     // 橙色 - 顶部工具栏
    leftSidebar: 'rgba(236, 72, 153, 0.15)', // 粉色 - 左侧边栏
    mainContent: 'rgba(14, 165, 233, 0.15)', // 天蓝色 - 主内容区
    rightSidebar: 'rgba(168, 85, 247, 0.15)', // 紫罗兰 - 右侧边栏
    bottomBar: 'rgba(245, 158, 11, 0.15)',   // 琥珀色 - 底部状态栏
  },
  border: {
    main: '#000',
    secondary: '#666',
  }
};

/* ==================== 组件说明内容 ==================== */
interface AreaInfo {
  name: string;
  component: string;
  description: string;
  suggestions: string[];
  dimensions?: string;
}

const MAIN_LAYOUT_INFO: Record<string, AreaInfo> = {
  sider: {
    name: '主导航栏',
    component: 'MainLayout > Sider',
    description: '全局导航区域，固定定位在页面左侧',
    dimensions: '255px（展开）/ 56px（折叠）',
    suggestions: [
      '放置全局导航菜单',
      '支持折叠，优化小屏体验',
      '<1024px 自动折叠',
      '避免放置页面级操作',
    ],
  },
  header: {
    name: '顶部标题栏',
    component: 'MainLayout > Header',
    description: '显示当前页面标题和全局操作',
    dimensions: '高度 56px',
    suggestions: [
      '显示当前路由对应的页面标题',
      '可放置全局搜索、通知、用户菜单',
      'sticky 定位，滚动时保持可见',
      '避免过多操作，保持简洁',
    ],
  },
  content: {
    name: '主内容区',
    component: 'MainLayout > Content',
    description: '渲染子路由内容，包含 PageLayout',
    dimensions: '自适应，含 8px padding',
    suggestions: [
      '通过 <Outlet /> 渲染子路由',
      '使用 PageLayout 组织页面布局',
      'padding: 8px 为最紧凑布局',
      '高度自动计算：100vh - 56px',
    ],
  },
};

const PAGE_LAYOUT_INFO: Record<string, AreaInfo> = {
  topBar: {
    name: '顶部工具栏',
    component: 'PageLayout > topBar',
    description: '页面级操作工具栏（可选）',
    dimensions: '高度 48px（默认）',
    suggestions: [
      '放置搜索、筛选、视图切换',
      '页面级操作按钮（新建、导出等）',
      '日期选择器、下拉筛选器',
      '保持单行，避免换行',
    ],
  },
  leftSidebar: {
    name: '左侧边栏',
    component: 'PageLayout > leftSidebar',
    description: '页面左侧辅助内容（可选、可折叠）',
    dimensions: '宽度 255px，padding 8px',
    suggestions: [
      '放置筛选面板、导航标签',
      '类目树、标签列表',
      '快速导航、快捷操作',
      '<900px 自动折叠',
    ],
  },
  mainContent: {
    name: '主内容区',
    component: 'PageLayout > children',
    description: '页面核心内容区域',
    dimensions: '自适应，无默认 padding',
    suggestions: [
      '放置表格、卡片、图表等主要内容',
      '自行控制 padding（根据内容类型）',
      '保持纵向滚动',
      '避免横向滚动',
    ],
  },
  rightSidebar: {
    name: '右侧边栏',
    component: 'PageLayout > rightSidebar',
    description: '页面右侧辅助内容（可选、可折叠）',
    dimensions: '宽度 270px，padding 8px',
    suggestions: [
      '放置详情面板、统计信息',
      '元数据、标签、快速统计',
      '相关信息、操作历史',
      '<900px 自动折叠',
    ],
  },
  bottomBar: {
    name: '底部状态栏',
    component: 'PageLayout > bottomBar',
    description: '页面底部状态信息（可选）',
    dimensions: '高度自适应，padding 8px',
    suggestions: [
      '显示统计信息（总数、选中数）',
      '分页控件、侧栏展开/折叠按钮',
      '状态信息、最后更新时间',
      '负 margin 贴合底部和两边',
    ],
  },
};

/* ==================== 区域展示组件 ==================== */
interface AreaCardProps {
  info: AreaInfo;
  color: string;
  height?: string;
  compact?: boolean; // 紧凑模式，用于小高度区域
}

function AreaCard({ info, color, height = 'auto', compact = false }: AreaCardProps) {
  if (compact) {
    // 紧凑模式：横向布局，适合小高度区域（40-56px）
    return (
      <div
        style={{
          backgroundColor: color,
          border: `2px dashed ${DEMO_COLORS.border.secondary}`,
          borderRadius: designSystem.borderRadius.md,
          padding: `${designSystem.spacing[1]} ${designSystem.spacing[2]}`, // 上下8px，左右12px
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: designSystem.spacing[2],
          position: 'relative',
        }}
      >
        {/* 左侧：名称 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: designSystem.spacing[2] }}>
          <Tag color="blue" style={{ fontSize: designSystem.typography.fontSize.xs, margin: 0 }}>
            {info.component}
          </Tag>
          <Text strong style={{ fontSize: designSystem.typography.fontSize.sm, whiteSpace: 'nowrap' }}>
            {info.name}
          </Text>
        </div>

        {/* 右侧：尺寸 */}
        {info.dimensions && (
          <Text type="secondary" style={{ fontSize: designSystem.typography.fontSize.xs, whiteSpace: 'nowrap' }}>
            {info.dimensions}
          </Text>
        )}
      </div>
    );
  }

  // 完整模式：显示所有信息，内容可滚动
  return (
    <div
      style={{
        backgroundColor: color,
        border: `2px dashed ${DEMO_COLORS.border.secondary}`,
        borderRadius: designSystem.borderRadius.md,
        padding: designSystem.spacing[3],
        height,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', // 外层隐藏溢出
      }}
    >
      {/* 内容区域 - 可滚动 */}
      <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
        <div style={{ marginBottom: designSystem.spacing[2] }}>
          <Tag color="blue" style={{ marginBottom: designSystem.spacing[1] }}>
            {info.component}
          </Tag>
          <Title level={5} style={{ margin: 0, marginBottom: designSystem.spacing[1] }}>
            {info.name}
          </Title>
          {info.dimensions && (
            <Text type="secondary" style={{ fontSize: designSystem.typography.fontSize.sm }}>
              尺寸：{info.dimensions}
            </Text>
          )}
        </div>

        <Paragraph style={{ fontSize: designSystem.typography.fontSize.sm, marginBottom: designSystem.spacing[2] }}>
          {info.description}
        </Paragraph>

        <div>
          <Text strong style={{ fontSize: designSystem.typography.fontSize.sm }}>设计建议：</Text>
          <ul style={{
            margin: `${designSystem.spacing[1]} 0 0 0`,
            paddingLeft: designSystem.spacing[4],
            fontSize: designSystem.typography.fontSize.sm,
          }}>
            {info.suggestions.map((suggestion, index) => (
              <li key={index} style={{ marginBottom: designSystem.spacing[0.5] }}>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ==================== 主组件 ==================== */
export default function LayoutGuidePage() {
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  /* ==================== MainLayout 示意图 ==================== */
  // 按照 15寸 Mac 实际比例：1440px 宽度，Sider 255px ≈ 17.7%
  const mainLayoutDemo = (
    <Card
      title="MainLayout 结构（按15寸Mac实际比例）"
      size="small"
      style={{ marginBottom: designSystem.spacing[3] }}
    >
      <div style={{
        display: 'flex',
        gap: designSystem.spacing[2],
        minHeight: '500px', // 模拟实际高度比例
      }}>
        {/* 主导航栏 - 实际 255px / 1440px ≈ 17.7% */}
        <div style={{ width: '255px', flexShrink: 0 }}>
          <AreaCard
            info={MAIN_LAYOUT_INFO.sider}
            color={DEMO_COLORS.mainLayout.sider}
            height="100%"
          />
        </div>

        {/* 右侧区域 - 剩余空间 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: designSystem.spacing[2] }}>
          {/* 顶部栏 - 实际 56px */}
          <div style={{ height: '56px', flexShrink: 0 }}>
            <AreaCard
              info={MAIN_LAYOUT_INFO.header}
              color={DEMO_COLORS.mainLayout.header}
              height="100%"
              compact={true}
            />
          </div>

          {/* 主内容区 - 剩余高度 */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <AreaCard
              info={MAIN_LAYOUT_INFO.content}
              color={DEMO_COLORS.mainLayout.content}
              height="100%"
            />
          </div>
        </div>
      </div>
    </Card>
  );

  /* ==================== PageLayout 示意图 ==================== */
  // 按照实际比例：在 MainLayout.Content 内（约 1169px 宽度）
  // leftSidebar: 255px ≈ 21.8%, rightSidebar: 270px ≈ 23.1%
  const pageLayoutDemo = (
    <Card
      title="PageLayout 结构（在 MainLayout.Content 内，按15寸Mac实际比例）"
      size="small"
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: designSystem.spacing[2],
        minHeight: '550px', // 模拟实际高度
      }}>
        {/* 顶部工具栏 - 实际 48px */}
        <div style={{ height: '48px', flexShrink: 0 }}>
          <AreaCard
            info={PAGE_LAYOUT_INFO.topBar}
            color={DEMO_COLORS.pageLayout.topBar}
            height="100%"
            compact={true}
          />
        </div>

        {/* 中间三栏 - 剩余高度 */}
        <div style={{ flex: 1, display: 'flex', gap: designSystem.spacing[2], minHeight: 0 }}>
          {/* 左侧边栏 - 实际 255px */}
          <div style={{ width: '255px', flexShrink: 0 }}>
            <AreaCard
              info={PAGE_LAYOUT_INFO.leftSidebar}
              color={DEMO_COLORS.pageLayout.leftSidebar}
              height="100%"
            />
          </div>

          {/* 主内容区 - 剩余宽度 */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <AreaCard
              info={PAGE_LAYOUT_INFO.mainContent}
              color={DEMO_COLORS.pageLayout.mainContent}
              height="100%"
            />
          </div>

          {/* 右侧边栏 - 实际 270px */}
          <div style={{ width: '270px', flexShrink: 0 }}>
            <AreaCard
              info={PAGE_LAYOUT_INFO.rightSidebar}
              color={DEMO_COLORS.pageLayout.rightSidebar}
              height="100%"
            />
          </div>
        </div>

        {/* 底部状态栏 - 实际约 40px */}
        <div style={{ height: '40px', flexShrink: 0 }}>
          <AreaCard
            info={PAGE_LAYOUT_INFO.bottomBar}
            color={DEMO_COLORS.pageLayout.bottomBar}
            height="100%"
            compact={true}
          />
        </div>
      </div>
    </Card>
  );

  /* ==================== 顶部工具栏 ==================== */
  const topBar = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: designSystem.spacing[2],
      padding: designSystem.spacing[1],
      width: '100%',
    }}>
      <Tag color="blue">布局说明页</Tag>
      <div style={{ flex: 1 }} />
      <Text type="secondary" style={{ fontSize: designSystem.typography.fontSize.sm }}>
        所有颜色仅用于演示，不代表设计规范
      </Text>
    </div>
  );

  /* ==================== 左侧边栏 ==================== */
  const leftSidebar = (
    <>
      <Card size="small" title="图例" style={{ marginBottom: designSystem.spacing[1] }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: designSystem.spacing[1] }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: designSystem.spacing[1] }}>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: DEMO_COLORS.mainLayout.sider,
              border: `1px solid ${DEMO_COLORS.border.secondary}`,
              borderRadius: designSystem.borderRadius.sm,
            }} />
            <Text style={{ fontSize: designSystem.typography.fontSize.sm }}>MainLayout 区域</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: designSystem.spacing[1] }}>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: DEMO_COLORS.pageLayout.topBar,
              border: `1px solid ${DEMO_COLORS.border.secondary}`,
              borderRadius: designSystem.borderRadius.sm,
            }} />
            <Text style={{ fontSize: designSystem.typography.fontSize.sm }}>PageLayout 区域</Text>
          </div>
        </div>
      </Card>

      <Card size="small" title="快速导航">
        <div style={{ display: 'flex', flexDirection: 'column', gap: designSystem.spacing[1] }}>
          <Button type="text" block style={{ justifyContent: 'flex-start', fontSize: designSystem.typography.fontSize.sm }}>
            MainLayout 结构
          </Button>
          <Button type="text" block style={{ justifyContent: 'flex-start', fontSize: designSystem.typography.fontSize.sm }}>
            PageLayout 结构
          </Button>
          <Button type="text" block style={{ justifyContent: 'flex-start', fontSize: designSystem.typography.fontSize.sm }}>
            使用示例
          </Button>
        </div>
      </Card>
    </>
  );

  /* ==================== 右侧边栏 ==================== */
  const rightSidebar = (
    <>
      <Card size="small" title="响应式断点" style={{ marginBottom: designSystem.spacing[1] }}>
        <div style={{ fontSize: designSystem.typography.fontSize.sm }}>
          <div style={{ marginBottom: designSystem.spacing[1] }}>
            <Text strong>MainLayout.Sider</Text>
            <div style={{ color: designSystem.semantic.text.secondary }}>
              &lt;1024px 自动折叠
            </div>
          </div>
          <div>
            <Text strong>PageLayout 侧边栏</Text>
            <div style={{ color: designSystem.semantic.text.secondary }}>
              &lt;900px 自动折叠
            </div>
          </div>
        </div>
      </Card>

      <Card size="small" title="布局层级">
        <div style={{ fontSize: designSystem.typography.fontSize.sm }}>
          <pre style={{
            backgroundColor: designSystem.colors.neutral[50],
            padding: designSystem.spacing[2],
            borderRadius: designSystem.borderRadius.md,
            fontSize: designSystem.typography.fontSize.xs,
            margin: 0,
            overflow: 'auto',
          }}>
{`MainLayout
├─ Sider (导航)
└─ Layout
   ├─ Header (标题)
   └─ Content
      └─ PageLayout
         ├─ topBar
         ├─ 主体
         │  ├─ leftSidebar
         │  ├─ children
         │  └─ rightSidebar
         └─ bottomBar`}
          </pre>
        </div>
      </Card>
    </>
  );

  /* ==================== 底部状态栏 ==================== */
  const bottomBar = (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: designSystem.spacing[3], fontSize: designSystem.typography.fontSize.sm }}>
        <Text type="secondary">提示：此页面展示布局结构和设计建议</Text>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: designSystem.spacing[2] }}>
        <Button
          type="text"
          size="small"
          icon={leftCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setLeftCollapsed(!leftCollapsed)}
          style={{
            fontSize: designSystem.componentFontSize.button,
            color: leftCollapsed ? designSystem.semantic.text.tertiary : designSystem.colors.primary[500],
          }}
        >
          左侧栏
        </Button>
        <Button
          type="text"
          size="small"
          icon={rightCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          onClick={() => setRightCollapsed(!rightCollapsed)}
          style={{
            fontSize: designSystem.componentFontSize.button,
            color: rightCollapsed ? designSystem.semantic.text.tertiary : designSystem.colors.primary[500],
          }}
        >
          右侧栏
        </Button>
      </div>
    </div>
  );

  /* ==================== 主内容区 ==================== */
  const mainContent = (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      overflow: 'auto',
      padding: designSystem.spacing[1],
      gap: designSystem.spacing[2],
    }}>
      {/* 页面说明 */}
      <Card size="small">
        <Title level={4} style={{ marginTop: 0 }}>布局系统说明</Title>
        <Paragraph>
          本项目采用两层布局系统：<Text code>MainLayout</Text> 负责全局框架（导航+标题），
          <Text code>PageLayout</Text> 负责页面内容组织（工具栏+侧边栏+内容）。
        </Paragraph>
        <Paragraph style={{ marginBottom: 0 }}>
          <Text strong>注意：</Text>页面中的所有颜色为硬编码演示色，
          <Text type="danger">不属于设计系统</Text>，仅用于区分布局区域。
          实际开发请使用 <Text code>designSystem</Text> 中的标准配置。
        </Paragraph>
      </Card>

      {mainLayoutDemo}
      {pageLayoutDemo}

      {/* 使用示例 */}
      <Card title="使用示例" size="small">
        <pre style={{
          backgroundColor: designSystem.colors.neutral[50],
          padding: designSystem.spacing[3],
          borderRadius: designSystem.borderRadius.md,
          fontSize: designSystem.typography.fontSize.sm,
          overflow: 'auto',
        }}>
{`import PageLayout from '@/components/layout/PageLayout';

export default function MyPage() {
  const topBar = <div>工具栏内容</div>;
  const leftSidebar = <div>筛选面板</div>;
  const rightSidebar = <div>详情面板</div>;
  const bottomBar = <div>状态信息</div>;

  return (
    <PageLayout
      topBar={topBar}
      leftSidebar={leftSidebar}
      rightSidebar={rightSidebar}
      bottomBar={bottomBar}
      leftDefaultCollapsed={false}
      rightDefaultCollapsed={false}
    >
      {/* 主内容区 */}
      <div>页面主要内容</div>
    </PageLayout>
  );
}`}
        </pre>
      </Card>
    </div>
  );

  return (
    <PageLayout
      topBar={topBar}
      leftSidebar={leftSidebar}
      leftDefaultCollapsed={leftCollapsed}
      onLeftCollapsedChange={setLeftCollapsed}
      rightSidebar={rightSidebar}
      rightDefaultCollapsed={rightCollapsed}
      onRightCollapsedChange={setRightCollapsed}
      bottomBar={bottomBar}
    >
      {mainContent}
    </PageLayout>
  );
}

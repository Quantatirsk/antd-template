/**
 * MainLayout - 主布局组件
 *
 * 功能：
 * - 侧边栏导航
 * - 顶部栏
 * - 内容区域（使用 Outlet 渲染子路由）
 */

import { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer, Tooltip } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
  MenuOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { designSystem } from '@/styles/design-system';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const { Header, Sider, Content } = Layout;

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // 响应式：窗口宽度小于 1024px 时自动折叠
  const isWideEnough = useMediaQuery(`(min-width: ${designSystem.breakpoints.laptop})`);

  useEffect(() => {
    if (!isWideEnough) {
      setCollapsed(true);
    }
    // 注意：窗口变宽时不自动展开，用户需要手动展开
  }, [isWideEnough]);

  // 菜单项配置
  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '仪表板',
    },
    {
      key: '/list',
      icon: <UnorderedListOutlined />,
      label: '列表页',
    },
    {
      key: '/detail',
      icon: <FileTextOutlined />,
      label: '详情页',
    },
  ];

  const selectedKey = location.pathname === '/' ? '/dashboard' : location.pathname;

  const menuContent = (
    <>
      <div
        style={{
          height: designSystem.heights.header,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          paddingLeft: collapsed ? 0 : designSystem.spacing[6],
          paddingRight: collapsed ? 0 : designSystem.spacing[2],
        }}
      >
        <span
          style={{
            fontSize: designSystem.typography.fontSize.lg,
            fontWeight: designSystem.typography.fontWeight.semibold,
            color: designSystem.colors.primary[500],
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            opacity: collapsed ? 0 : 1,
            width: collapsed ? 0 : 'auto',
            transition: `opacity ${designSystem.transitions.fast}, width ${designSystem.transitions.default}`,
            transitionDelay: collapsed ? '0ms' : '150ms', // 展开时延迟显示文字
          }}
        >
          Ant Design
        </span>
        <Tooltip
          title={collapsed ? '展开菜单' : '折叠菜单'}
          placement="right"
          open={tooltipOpen}
          onOpenChange={setTooltipOpen}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => {
              setCollapsed(!collapsed);
              setTooltipOpen(false);
            }}
            style={{
              width: designSystem.buttonSizes.iconButton.width,
              height: designSystem.buttonSizes.iconButton.height,
            }}
          />
        </Tooltip>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        onClick={({ key }) => {
          navigate(key);
          setMobileDrawerOpen(false);
        }}
        inlineCollapsed={collapsed}
        style={{ borderRight: 'none' }}
      />
    </>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 桌面侧边栏 */}
      <Sider
        theme="light"
        width={parseInt(designSystem.sidebarSystem.leftWidth)}
        collapsedWidth={parseInt(designSystem.sidebarSystem.collapsedWidth)}
        collapsed={collapsed}
        trigger={null}
        style={{
          boxShadow: designSystem.cardSystem.shadow,
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        {menuContent}
      </Sider>

      {/* 移动端抽屉 */}
      <Drawer
        title="菜单"
        placement="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => {
            navigate(key);
            setMobileDrawerOpen(false);
          }}
          style={{ borderRight: 'none' }}
        />
      </Drawer>

      <Layout style={{
        marginLeft: collapsed ? parseInt(designSystem.sidebarSystem.collapsedWidth) : parseInt(designSystem.sidebarSystem.leftWidth),
        transition: 'margin-left 0.2s'
      }}>
        <Header
          style={{
            backgroundColor: designSystem.semantic.surface.base,
            boxShadow: designSystem.cardSystem.shadow,
            padding: `0 ${designSystem.spacing[6]}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: designSystem.heights.header,
            position: 'sticky',
            top: 0,
            zIndex: 50,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: designSystem.spacing[4] }}>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileDrawerOpen(true)}
              style={{ display: 'none' }}
            />
            <span
              style={{
                fontSize: designSystem.typography.fontSize.base,
                fontWeight: designSystem.typography.fontWeight.medium,
              }}
            >
              Ant Design Template
            </span>
          </div>
        </Header>

        <Content
          style={{
            height: `calc(100vh - ${designSystem.heights.header})`,
            overflow: 'auto',
            padding: designSystem.spacing[1],  // 8px 最紧凑布局
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

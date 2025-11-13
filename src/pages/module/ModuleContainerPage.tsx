/**
 * ModuleContainerPage - 模块容器页
 *
 * 演示容器页模式：
 * - 左侧栏：子模块导航菜单
 * - 主区域：通过 Outlet 渲染子模块页面
 * - 右侧栏：根据当前子模块动态显示相关信息
 * - 顶部栏：面包屑导航
 * - 底部栏：状态信息
 */

import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Breadcrumb, Card } from 'antd';
import {
  DatabaseOutlined,
  TableOutlined,
  FileTextOutlined,
  LayoutOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';
import PageLayout from '@/layout/PageLayout';
import { useModuleStore, type SubModule } from '@/store/moduleStore';
import { SubModule1Sidebar } from './SubModule1Page';
import { LayoutGuidePageSidebar } from './LayoutGuidePage';
import { ModalDemoPageSidebar } from './ModalDemoPage';
import { designSystem } from '@/styles/DesignSystem';

// 子模块配置
const SUB_MODULE_CONFIG = [
  {
    key: 'data' as SubModule,
    icon: <DatabaseOutlined />,
    label: '数据管理',
    path: '/module/data',
  },
  {
    key: 'list' as SubModule,
    icon: <TableOutlined />,
    label: '列表页面',
    path: '/module/list',
  },
  {
    key: 'detail' as SubModule,
    icon: <FileTextOutlined />,
    label: '详情页面',
    path: '/module/detail',
  },
  {
    key: 'layout' as SubModule,
    icon: <LayoutOutlined />,
    label: '布局指南',
    path: '/module/layout',
  },
  {
    key: 'modal' as SubModule,
    icon: <AppstoreAddOutlined />,
    label: '弹窗组件',
    path: '/module/modal',
  },
];

export default function ModuleContainerPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    selectedItemId,
    activeSubModule,
    leftCollapsed,
    rightCollapsed,
    setActiveSubModule,
    setLeftCollapsed,
    setRightCollapsed,
  } = useModuleStore();

  // 根据当前路径更新 activeSubModule
  useEffect(() => {
    const path = location.pathname;
    const module = SUB_MODULE_CONFIG.find((m) => path.startsWith(m.path));
    if (module && module.key !== activeSubModule) {
      setActiveSubModule(module.key);
    }
  }, [location.pathname, activeSubModule, setActiveSubModule]);

  // 左侧功能菜单
  const leftSidebar = (
    <Menu
      mode="inline"
      selectedKeys={[activeSubModule]}
      items={SUB_MODULE_CONFIG.map((module) => ({
        key: module.key,
        icon: module.icon,
        label: module.label,
      }))}
      onClick={({ key }) => {
        const module = SUB_MODULE_CONFIG.find((m) => m.key === key);
        if (module) {
          navigate(module.path);
        }
      }}
      style={{ borderRight: 'none', height: '100%' }}
    />
  );

  // 顶部面包屑
  const getCurrentModuleLabel = () => {
    return SUB_MODULE_CONFIG.find((m) => m.key === activeSubModule)?.label || '模块系统';
  };

  const topBar = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: designSystem.spacing[1],
        width: '100%',
      }}
    >
      <Breadcrumb
        items={[
          {
            title: '模块系统',
          },
          {
            title: getCurrentModuleLabel(),
          },
        ]}
      />
    </div>
  );

  // 底部状态栏
  const bottomBar = (
    <>
      {selectedItemId && <span>选中项: #{selectedItemId}</span>}
      <span>当前模块: {getCurrentModuleLabel()}</span>
    </>
  );

  // 右侧栏（根据子模块动态显示）
  const rightSidebar = (() => {
    switch (activeSubModule) {
      case 'data':
        return <SubModule1Sidebar />;
      case 'list':
        return (
          <Card size="small" title="列表页面" style={{ borderRadius: designSystem.borderRadius.lg }}>
            <div style={{ fontSize: designSystem.typography.fontSize.sm, color: designSystem.semantic.text.secondary }}>
              <p>演示数据列表展示，包括：</p>
              <ul style={{ paddingLeft: designSystem.spacing[4], margin: 0 }}>
                <li>表格和卡片视图切换</li>
                <li>搜索和筛选功能</li>
                <li>分页和排序</li>
                <li>批量操作</li>
              </ul>
            </div>
          </Card>
        );
      case 'detail':
        return (
          <Card size="small" title="详情页面" style={{ borderRadius: designSystem.borderRadius.lg }}>
            <div style={{ fontSize: designSystem.typography.fontSize.sm, color: designSystem.semantic.text.secondary }}>
              <p>演示详情页面布局，包括：</p>
              <ul style={{ paddingLeft: designSystem.spacing[4], margin: 0 }}>
                <li>Tabs 多标签页</li>
                <li>详细信息展示</li>
                <li>关联数据表格</li>
                <li>操作历史时间线</li>
              </ul>
            </div>
          </Card>
        );
      case 'layout':
        return <LayoutGuidePageSidebar />;
      case 'modal':
        return <ModalDemoPageSidebar />;
      default:
        return undefined;
    }
  })();

  return (
    <PageLayout
      topBar={topBar}
      leftSidebar={leftSidebar}
      leftSidebarWidth={designSystem.sidebarSystem.leftWidth}
      leftDefaultCollapsed={leftCollapsed}
      onLeftCollapsedChange={setLeftCollapsed}
      rightSidebar={rightSidebar}
      rightDefaultCollapsed={rightCollapsed}
      onRightCollapsedChange={setRightCollapsed}
      bottomBar={bottomBar}
      contentPadding={designSystem.spacing[1]}
    >
      <Outlet />
    </PageLayout>
  );
}

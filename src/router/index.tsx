/**
 * Router Configuration
 *
 * 使用 React Router v6 配置路由
 */

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LoadingState } from '@/components/common';

// ==================== 组件懒加载 ====================

const DashboardPage = lazy(() => import('@/pages/DashboardPage'));

// 模块系统（容器页模式演示）
const ModuleContainerPage = lazy(() => import('@/pages/module/ModuleContainerPage'));
const SubModule1Page = lazy(() => import('@/pages/module/SubModule1Page'));
const ModuleListPage = lazy(() => import('@/pages/module/ListPage'));
const ModuleDetailPage = lazy(() => import('@/pages/module/DetailPage'));
const ModuleLayoutGuidePage = lazy(() => import('@/pages/module/LayoutGuidePage'));
const ModuleModalDemoPage = lazy(() => import('@/pages/module/ModalDemoPage'));

// ==================== 布局组件 ====================

import MainLayout from '@/layout/MainLayout';

/**
 * Loading 组件 - 懒加载时的占位符
 */
function PageLoading() {
  return (
    <div style={{ height: '100vh' }}>
      <LoadingState mode="skeleton" rows={10} />
    </div>
  );
}

// ==================== 路由配置 ====================

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<PageLoading />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      // 模块系统（容器页模式演示）
      {
        path: 'module',
        element: (
          <Suspense fallback={<PageLoading />}>
            <ModuleContainerPage />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="/module/data" replace />,
          },
          {
            path: 'data',
            element: (
              <Suspense fallback={<PageLoading />}>
                <SubModule1Page />
              </Suspense>
            ),
          },
          {
            path: 'list',
            element: (
              <Suspense fallback={<PageLoading />}>
                <ModuleListPage />
              </Suspense>
            ),
          },
          {
            path: 'detail',
            element: (
              <Suspense fallback={<PageLoading />}>
                <ModuleDetailPage />
              </Suspense>
            ),
          },
          {
            path: 'layout',
            element: (
              <Suspense fallback={<PageLoading />}>
                <ModuleLayoutGuidePage />
              </Suspense>
            ),
          },
          {
            path: 'modal',
            element: (
              <Suspense fallback={<PageLoading />}>
                <ModuleModalDemoPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);

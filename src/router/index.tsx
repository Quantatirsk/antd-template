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
const ListPage = lazy(() => import('@/pages/ListPage'));
const DetailPage = lazy(() => import('@/pages/DetailPage'));
const LayoutGuidePage = lazy(() => import('@/pages/LayoutGuidePage'));
const ModalDemoPage = lazy(() => import('@/pages/ModalDemoPage'));

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
      {
        path: 'list',
        element: (
          <Suspense fallback={<PageLoading />}>
            <ListPage />
          </Suspense>
        ),
      },
      {
        path: 'detail',
        element: (
          <Suspense fallback={<PageLoading />}>
            <DetailPage />
          </Suspense>
        ),
      },
      {
        path: 'layout-guide',
        element: (
          <Suspense fallback={<PageLoading />}>
            <LayoutGuidePage />
          </Suspense>
        ),
      },
      {
        path: 'modal-demo',
        element: (
          <Suspense fallback={<PageLoading />}>
            <ModalDemoPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);

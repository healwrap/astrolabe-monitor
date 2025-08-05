import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Layout } from '@/layout';

import AuthRoute from './AuthRoute';

// 这里是为了解决 react-router-dom 的类型问题
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PickRouter<T> = T extends (...args: any[]) => infer R ? R : never;

type A = typeof createBrowserRouter;

export const router: PickRouter<A> = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        path: 'projects',
        element: React.createElement(lazy(() => import('@/views/Projects'))),
      },
      {
        path: 'issues',
        element: React.createElement(lazy(() => import('@/views/Issues'))),
      },
      {
        path: 'performance',
        element: React.createElement(lazy(() => import('@/views/Performance'))),
      },
      {
        path: 'performance/summary',
        element: React.createElement(lazy(() => import('@/views/PerformanceSummary'))),
      },
      {
        path: 'dashboard',
        element: React.createElement(lazy(() => import('@/views/Dashboard'))),
      },
      {
        path: 'crons',
        element: React.createElement(lazy(() => import('@/views/Corns'))),
      },
      {
        path: 'alerts',
        element: React.createElement(lazy(() => import('@/views/Alerts'))),
      },
      {
        path: '/',
        element: <Navigate to="/projects" replace />,
      },
    ],
  },
  {
    path: '/auth/login',
    element: React.createElement(lazy(() => import('@/views/Login'))),
  },
]);

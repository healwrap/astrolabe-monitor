import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

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
    children: [],
  },
  {
    path: '/auth/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        {React.createElement(lazy(() => import('@/views/Login').then(m => ({ default: m.Login }))))}
      </Suspense>
    ),
  },
]);

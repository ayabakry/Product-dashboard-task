import { Suspense, type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { PageFallback } from './RouteFallback';
import { Dashboard, ProductDetails, Favorites } from './lazyPages';

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<PageFallback />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: withSuspense(<Dashboard />) },
      { path: 'products/:id', element: withSuspense(<ProductDetails />) },
      { path: 'favorites', element: withSuspense(<Favorites />) },
    ],
  },
]);
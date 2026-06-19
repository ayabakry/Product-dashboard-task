import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import ProductDetails from '../pages/ProductDetails';
import Favorites from '../pages/Favorites';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'products/:id', element: <ProductDetails /> },
      { path: 'favorites', element: <Favorites /> },
    ],
  },
]);

import { apiClient } from './client';
import type { Product, ProductsResponse, CategoryListItem } from '../types/product';

export async function fetchProducts() {
  const { data } = await apiClient.get<ProductsResponse>('/products?limit=0');
  return data;
}

export async function fetchProductById(id: number) {
  const { data } = await apiClient.get<Product>(`/products/${id}`);
  return data;
}

export async function fetchCategories() {
  const { data } = await apiClient.get<CategoryListItem[]>('/products/categories');
  return data;
}

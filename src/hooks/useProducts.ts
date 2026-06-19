import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import { queryKeys } from '../api/queryKeys';

export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products.all,
    queryFn: fetchProducts,
  });
}
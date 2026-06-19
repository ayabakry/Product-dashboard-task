import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../api/products';
import { queryKeys } from '../api/queryKeys';

export function useProduct(id: number) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
}

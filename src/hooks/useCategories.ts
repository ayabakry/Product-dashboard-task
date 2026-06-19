import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/products';
import { queryKeys } from '../api/queryKeys';

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: fetchCategories,
  });
}

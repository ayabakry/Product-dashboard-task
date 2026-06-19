export const queryKeys = {
  products: {
    all: ['products'] as const,
    detail: (id: number) => ['products', id] as const,
  },
  categories: {
    all: ['categories'] as const,
  },
};
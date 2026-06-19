import { useState } from 'react';
import { Grid, Typography, CircularProgress, Alert, Box, Stack, Button } from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortControl, { type SortOption } from '../components/SortControl';

function Dashboard() {
  const { data, isLoading, error } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState<SortOption>('');
  const debouncedSearch = useDebounce(search, 400);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        Failed to load products. Please try again later.
      </Alert>
    );
  }

  const allProducts = data?.products ?? [];

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesCategory = category === '' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'priceLowHigh') return a.price - b.price;
    if (sort === 'priceHighLow') return b.price - a.price;
    if (sort === 'ratingHighLow') return b.rating - a.rating;
    if (sort === 'nameAZ') return a.title.localeCompare(b.title);
    return 0;
  });

  const hasActiveFilters = search !== '' || category !== '' || sort !== '';

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setSort('');
  };

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter value={category} onChange={setCategory} />
        <SortControl value={sort} onChange={setSort} />
        {hasActiveFilters && (
          <Button onClick={clearFilters} variant="outlined">
            Clear Filters
          </Button>
        )}
      </Stack>

      {sortedProducts.length === 0 ? (
        <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
          No products found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {sortedProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default Dashboard;

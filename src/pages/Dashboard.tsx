import { useState } from 'react';
import { Grid, Typography, CircularProgress, Alert, Box, Stack, Button } from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';

function Dashboard() {
  const { data, isLoading, error } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
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

  const hasActiveFilters = search !== '' || category !== '';

  const clearFilters = () => {
    setSearch('');
    setCategory('');
  };

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter value={category} onChange={setCategory} />
        {hasActiveFilters && (
          <Button onClick={clearFilters} variant="outlined">
            Clear Filters
          </Button>
        )}
      </Stack>

      {filteredProducts.length === 0 ? (
        <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
          No products found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default Dashboard;
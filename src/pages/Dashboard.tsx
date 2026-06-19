import { useState } from 'react';
import { Grid, Typography, CircularProgress, Alert, Box } from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

function Dashboard() {
  const { data, isLoading, error } = useProducts();
  const [search, setSearch] = useState('');
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

  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <>
      <SearchBar value={search} onChange={setSearch} />

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
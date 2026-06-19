import { Grid, Typography, CircularProgress, Alert, Box } from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

function Dashboard() {
  const { data, isLoading, error } = useProducts();

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

  const products = data?.products ?? [];

  if (products.length === 0) {
    return (
      <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
        No products found.
      </Typography>
    );
  }

  return (
  <Grid container spacing={3}>
    {products.map((product) => (
      <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <ProductCard product={product} />
      </Grid>
    ))}
  </Grid>
);
}

export default Dashboard;
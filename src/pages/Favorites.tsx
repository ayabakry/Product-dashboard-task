import { Grid, Typography, CircularProgress, Alert, Box } from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';

function Favorites() {
  const { data, isLoading, error } = useProducts();
  const { favorites } = useFavorites();

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
  const favoriteProducts = allProducts.filter((product) => favorites.includes(product.id));

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        My Favorites
      </Typography>

      {favoriteProducts.length === 0 ? (
        <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
          You haven't added any favorites yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {favoriteProducts.map((product) => (
<Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default Favorites;
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Chip,
  Rating,
  CircularProgress,
  Alert,
  Button,
  Grid,
  Paper,
  Divider,
  Stack,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useProduct } from '../hooks/useProduct';
import { useFavorites } from '../hooks/useFavorites';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useProduct(Number(id));
  const { isFavorite, toggleFavorite } = useFavorites();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        Failed to load product details. Please try again later.
      </Alert>
    );
  }

  const favorite = isFavorite(product.id);

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        Back
      </Button>

      <Paper sx={{ p: { xs: 2, md: 4 } }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src={product.images[0] || product.thumbnail}
              alt={product.title}
              sx={{
  width: '100%',
  borderRadius: 2,
  objectFit: 'contain',
  backgroundColor: (theme) =>
    theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#fafafa',
  p: 3,
}}
            />
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
              <Chip label={product.category} size="small" sx={{ mb: 2 }} />
              <IconButton
                onClick={() => toggleFavorite(product.id)}
                aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {' '}
                {favorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
              </IconButton>
            </Stack>

            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              {product.title}
            </Typography>

            {product.brand && (
              <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                by {product.brand}
              </Typography>
            )}

            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary">
                {product.rating} rating
              </Typography>
            </Stack>

            <Typography variant="h3" color="primary" fontWeight={700} sx={{ mb: 3 }}>
              ${product.price}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
              {product.description}
            </Typography>

            {product.tags && product.tags.length > 0 && (
              <Stack direction="row" spacing={1} sx={{ mb: 3 }} flexWrap="wrap" useFlexGap>
                {product.tags.map((tag) => (
                  <Chip key={tag} label={tag} variant="outlined" size="small" />
                ))}
              </Stack>
            )}

            <Divider sx={{ mb: 3 }} />

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="caption" color="text.secondary">
                  STOCK
                </Typography>
                <Typography variant="body2">{product.stock} units available</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  SKU
                </Typography>
                <Typography variant="body2">{product.sku}</Typography>
              </Box>
              {product.warrantyInformation && (
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    WARRANTY
                  </Typography>
                  <Typography variant="body2">{product.warrantyInformation}</Typography>
                </Box>
              )}
              {product.shippingInformation && (
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    SHIPPING
                  </Typography>
                  <Typography variant="body2">{product.shippingInformation}</Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default ProductDetails;

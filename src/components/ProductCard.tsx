import { Card, CardActionArea, CardMedia, CardContent, Typography, Chip, Rating, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import type { Product } from '../types/product';
import { useFavorites } from '../context/FavoritesContext';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(product.id);
        }}
        sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, backgroundColor: 'rgba(255,255,255,0.8)' }}
      >
        {favorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </IconButton>

      <CardActionArea onClick={() => navigate(`/products/${product.id}`)} sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="180"
          image={product.thumbnail}
          alt={product.title}
          sx={{ objectFit: 'contain', p: 2, backgroundColor: '#fff' }}
        />
        <CardContent>
          <Chip label={product.category} size="small" sx={{ mb: 1 }} />
          <Typography variant="subtitle1" fontWeight={600} noWrap>
            {product.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Rating value={product.rating} precision={0.1} size="small" readOnly />
            <Typography variant="body2" color="text.secondary">
              ({product.rating})
            </Typography>
          </Box>
          <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
            ${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
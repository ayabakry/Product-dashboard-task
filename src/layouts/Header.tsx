import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useFavorites } from '../hooks/useFavorites';
import { useSearch } from '../hooks/useSearch';

function Header() {
  const { favorites } = useFavorites();
  const { search, setSearch } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  function handleSearchChange(value: string) {
    setSearch(value);
    if (location.pathname !== '/') {
      navigate('/');
    }
  }

  function closeSearch() {
    setSearchOpen(false);
    setSearch('');
  }

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar sx={{ gap: 1 }}>
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <StorefrontIcon fontSize="large" />
          <Typography variant="h6" fontWeight={700} sx={{ display: { xs: 'none', sm: 'block' } }}>
              ProductHub

          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {searchOpen ? (
          <TextField
            autoFocus
            size="small"
            placeholder="Search products..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{ color: 'white' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={closeSearch} sx={{ color: 'white' }}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              width: { xs: 160, sm: 280 },
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: 1,
              input: { color: 'white' },
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              transition: 'width 0.2s ease',
            }}
          />
        ) : (
          <IconButton color="inherit" onClick={() => setSearchOpen(true)}>
            <SearchIcon />
          </IconButton>
        )}

        <IconButton component={Link} to="/favorites" color="inherit">
          <Badge badgeContent={favorites.length} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Header() {
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          Product Dashboard
        </Typography>
        <Button component={Link} to="/favorites" color="inherit" startIcon={<FavoriteIcon />}>
          Favorites
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
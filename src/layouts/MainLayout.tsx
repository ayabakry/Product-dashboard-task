import { Outlet } from 'react-router-dom';
import { Container, Toolbar } from '@mui/material';
import Header from './Header';

function MainLayout() {
  return (
    <>
      <Header />
      <Toolbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default MainLayout;
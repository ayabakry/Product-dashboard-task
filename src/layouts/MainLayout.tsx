import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './Header';

function MainLayout() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default MainLayout;
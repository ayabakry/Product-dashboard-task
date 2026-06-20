import { Box, Typography, Button, Container } from '@mui/material';

function Hero() {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 280, md: 380 },
        borderRadius: 2,
        overflow: 'hidden',
        mb: 4,
        backgroundImage:
          'url(https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
        }}
      />
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <Typography variant="h3" fontWeight={700} sx={{ mb: 1, maxWidth: 500 }}>
          Discover Our Products
        </Typography>
        <Typography variant="h6" fontWeight={400} sx={{ mb: 3, maxWidth: 450, opacity: 0.9 }}>
          Browse, search, and find exactly what you're looking for
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          href="#products"
          sx={{ width: 'fit-content' }}
        >
          Shop Now
        </Button>
      </Container>
    </Box>
  );
}

export default Hero;
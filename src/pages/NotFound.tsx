import { Box, Typography, Container, useMediaQuery, useTheme } from '@mui/material';
import Lottie from 'react-lottie';
import animation from '../assets/animations/animation.json';

const NotFound = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const lottieOptions = {
    animationData: animation,
    width: isMobile ? 150 : 250,  // Dostosowany rozmiar dla mobilnych i desktopów
    height: isMobile ? 150 : 250, // Dostosowany rozmiar dla mobilnych i desktopów
  };

  return (
    <Container maxWidth="md" className='test'>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" textAlign="center">
        <Typography variant={isMobile ? 'h4' : 'h3'} color="textPrimary" gutterBottom>
          404
        </Typography>
        <Typography variant={isMobile ? 'h6' : 'h5'} color="textSecondary" gutterBottom>
          Oops! Page not found
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={2}>
          Sorry, but the page you are looking for is not found. Please, make sure you have typed the current URL.
        </Typography>
        <Box height={isMobile ? '150px' : '250px'} width="100%" overflow="hidden">
          <Lottie options={lottieOptions} />
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;

import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Stack } from '@mui/material';
import { MdHome, MdArrowBack } from 'react-icons/md';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={4} alignItems="center" textAlign="center">
          {/* 404 Icon */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '6rem', md: '8rem' },
              fontWeight: 'bold',
              color: 'primary.main',
              lineHeight: 1,
            }}
          >
            404
          </Typography>

          {/* Message */}
          <Box>
            <Typography variant="h4" gutterBottom>
              Page Not Found
            </Typography>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Cairo' }}>
              الصفحة غير موجودة
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              The page you're looking for doesn't exist or has been moved.
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="contained"
              size="large"
              startIcon={<MdHome />}
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<MdArrowBack />}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default NotFoundPage;


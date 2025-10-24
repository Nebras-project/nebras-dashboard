import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Stack } from '@mui/material';
import { MdHome, MdArrowBack } from 'react-icons/md';
import { useTranslation } from '../hooks';

function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
              {t('messages.error.notFound')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              {t('auth.unauthorized')}
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
              {t('navigation.dashboard')}
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<MdArrowBack />}
              onClick={() => navigate(-1)}
            >
              {t('common.back')}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default NotFoundPage;


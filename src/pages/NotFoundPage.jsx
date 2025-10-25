import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Stack } from '@mui/material';
import { MdHome, MdArrowBack, MdSentimentDissatisfied } from 'react-icons/md';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useTranslation } from '../hooks';

/**
 * Animation Variants
 */
const animations = {
  icon: {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      duration: 0.6,
    },
  },
  number: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: 0.2,
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
  content: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.4, duration: 0.5 },
  },
  buttons: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.6, duration: 0.5 },
  },
};

/**
 * NotFoundPage Component
 * Displays a 404 error page with icon, message, and navigation options
 */
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
        px: 3,
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={6} alignItems="center" textAlign="center">
          <IconBadge />
          <ErrorNumber />
          <ErrorMessage t={t} />
          <ActionButtons navigate={navigate} t={t} />
        </Stack>
      </Container>
    </Box>
  );
}

/**
 * Icon Badge Component
 * Displays the sad face icon in a circular badge
 */
function IconBadge() {
  return (
    <motion.div {...animations.icon}>
      <Box
        sx={{
          width: { xs: 120, md: 150 },
          height: { xs: 120, md: 150 },
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: (theme) => `${theme.palette.primary.main}15`,
          border: (theme) => `3px solid ${theme.palette.primary.main}30`,
        }}
      >
        <MdSentimentDissatisfied
          style={{
            fontSize: '5rem',
            color: 'var(--mui-palette-primary-main)',
          }}
        />
      </Box>
    </motion.div>
  );
}

/**
 * Error Number Component
 * Displays the large 404 number
 */
function ErrorNumber() {
  return (
    <motion.div {...animations.number}>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '6rem', sm: '8rem', md: '10rem' },
          fontWeight: 900,
          lineHeight: 1,
          color: 'text.primary',
          letterSpacing: '-0.02em',
        }}
      >
        404
      </Typography>
    </motion.div>
  );
}

/**
 * Error Message Component
 * Displays title and description
 */
function ErrorMessage({ t }) {
  return (
    <motion.div {...animations.content}>
      <Stack spacing={2} sx={{ maxWidth: 600 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          {t('messages.error.notFound')}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.125rem',
            color: 'text.secondary',
            lineHeight: 1.7,
          }}
        >
          {t('common.pageNotFoundMessage')}
        </Typography>
      </Stack>
    </motion.div>
  );
}

ErrorMessage.propTypes = {
  t: PropTypes.func.isRequired,
};

/**
 * Action Buttons Component
 * Navigation buttons for dashboard and back
 */
function ActionButtons({ navigate, t }) {
  return (
    <motion.div {...animations.buttons} style={{ width: '100%' }}>
      <Stack
        direction={{ mobile: 'column', tablet: 'row' }}
        spacing={2}
        sx={{
          maxWidth: 500,
          mx: 'auto',
        }}
      >
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => navigate('/dashboard')}
          startIcon={<MdHome />}
          sx={{
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 2,
          }}
        >
          {t('navigation.dashboard')}
        </Button>

        <Button
          variant="outlined"
          size="large"
          fullWidth
          onClick={() => navigate(-1)}
          startIcon={<MdArrowBack />}
          sx={{
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 2,
          }}
        >
          {t('common.back')}
        </Button>
      </Stack>
    </motion.div>
  );
}

ActionButtons.propTypes = {
  navigate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default NotFoundPage;


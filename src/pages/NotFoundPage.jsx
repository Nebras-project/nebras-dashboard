import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Stack, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useTranslation } from '@hooks';
import { Icon } from '@components';

const createAnimations = (theme) => ({
  icon: {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      duration: theme.transitions.duration.standard / 1000,
    },
  },
  number: {
    initial: { opacity: 0, y: theme.spacing(6) },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: 0.2,
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
  content: {
    initial: { opacity: 0, y: theme.spacing(4) },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: 0.4,
      duration: theme.transitions.duration.short / 1000,
    },
  },
  buttons: {
    initial: { opacity: 0, y: theme.spacing(4) },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: 0.6,
      duration: theme.transitions.duration.short / 1000,
    },
  },
});

function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        px: theme.spacing(3),
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={theme.spacing(6)} alignItems="center" textAlign="center">
          <IconBadge />
          <ErrorNumber />
          <ErrorMessage t={t} />
          <ActionButtons navigate={navigate} t={t} />
        </Stack>
      </Container>
    </Box>
  );
}

function IconBadge() {
  const theme = useTheme();
  const animations = createAnimations(theme);

  return (
    <motion.div {...animations.icon}>
      <Box
        sx={{
          width: { xs: theme.spacing(15), md: theme.spacing(18.75) },
          height: { xs: theme.spacing(15), md: theme.spacing(18.75) },
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: `${theme.palette.primary.main}15`,
          border: `${theme.spacing(0.375)} solid ${theme.palette.primary.main}30`,
        }}
      >
        <Icon
          name="sad"
          size={80}
          style={{
            color: 'var(--mui-palette-primary-main)',
          }}
        />
      </Box>
    </motion.div>
  );
}

function ErrorNumber() {
  const theme = useTheme();
  const animations = createAnimations(theme);

  return (
    <motion.div {...animations.number}>
      <Typography
        variant="h1"
        sx={{
          fontSize: {
            xs: `${theme.spacing(12)}`,
            sm: `${theme.spacing(16)}`,
            md: `${theme.spacing(20)}`,
          },
          fontWeight: theme.typography.fontWeightBold || theme.typography.h1.fontWeight,
          lineHeight: theme.typography.h1.lineHeight,
          color: 'text.primary',
          letterSpacing: '-0.02em',
        }}
      >
        404
      </Typography>
    </motion.div>
  );
}

function ErrorMessage({ t }) {
  const theme = useTheme();
  const animations = createAnimations(theme);

  return (
    <motion.div {...animations.content}>
      <Stack spacing={theme.spacing(2)} sx={{ maxWidth: theme.spacing(75) }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: theme.typography.h4.fontWeight,
            color: 'text.primary',
          }}
        >
          {t('messages.error.notFound')}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: theme.typography.h5.fontSize,
            color: 'text.secondary',
            lineHeight: theme.typography.body1.lineHeight,
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

function ActionButtons({ navigate, t }) {
  const theme = useTheme();
  const animations = createAnimations(theme);

  return (
    <motion.div {...animations.buttons} style={{ width: '100%' }}>
      <Stack
        direction={{ mobile: 'column', tablet: 'row' }}
        spacing={theme.spacing(2)}
        sx={{
          maxWidth: theme.spacing(62.5),
          mx: 'auto',
        }}
      >
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => navigate('/dashboard')}
          startIcon={<Icon name="home" />}
          sx={{
            py: theme.spacing(1.5),
            fontSize: theme.typography.body1.fontSize,
            fontWeight: theme.typography.button.fontWeight,
            textTransform: 'none',
            borderRadius: theme.shape.borderRadius,
          }}
        >
          {t('navigation.dashboard')}
        </Button>

        <Button
          variant="outlined"
          size="large"
          fullWidth
          onClick={() => navigate(-1)}
          startIcon={<Icon name="arrowBack" />}
          sx={{
            py: theme.spacing(1.5),
            fontSize: theme.typography.body1.fontSize,
            fontWeight: theme.typography.button.fontWeight,
            textTransform: 'none',
            borderRadius: theme.shape.borderRadius,
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

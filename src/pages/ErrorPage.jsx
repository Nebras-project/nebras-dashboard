// external imports
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Stack, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// internal imports
import { useTranslation, useResponsive } from '@hooks';
import { Icon, BackButton, Button } from '@components';
import { borderRadius, fontWeights } from '@theme';
import { gap, getErrorConfig, getErrorIconColor, margin, padding, spacing } from '@constants';
import { NAVIGATION_PATHS } from '@config';
import Message from '@components/feedback/Message';

// Animation configurations
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

// Style getters
const getContainerStyles = () => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  width: '100%',
});

const getContentStyles = () => ({
  width: '500px',
  textAlign: 'center',
  ...padding.all.md,
});

const getIconBadgeStyles = (theme, iconColor) => ({
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: alpha(iconColor, 0.15),
  border: `${theme.spacing(0.375)} solid ${alpha(iconColor, 0.3)}`,
  ...padding.all.sm,
});

const getErrorNumberStyles = () => ({
  fontWeight: fontWeights.bold,
  color: 'text.primary',
  letterSpacing: '-0.02em',
});

const getActionButtonsStackStyles = () => ({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  ...gap.xl,
});

const getActionButtonStyles = () => ({
  minWidth: '190px',
  borderRadius: borderRadius.full,
});

function ErrorPage({ errorCode }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isSmallScreen } = useResponsive();
  const theme = useTheme();
  // Get error configuration from constants
  const errorConfig = getErrorConfig(errorCode);

  // Fallback to defaults if config not found
  const iconName = errorConfig?.iconName || 'error';
  const titleKey = errorConfig?.titleKey || 'messages.error.general';
  const messageKey = errorConfig?.messageKey || 'common.errorMessage';
  const iconColor = getErrorIconColor(theme, errorCode);

  const containerStyles = getContainerStyles(theme);
  const contentStyles = getContentStyles(theme);

  return (
    <Box sx={containerStyles}>
      <Stack direction="column" spacing={spacing.values.xl} alignItems="center" sx={contentStyles}>
        <IconBadge iconName={iconName} iconColor={iconColor} />
        <ErrorNumber errorCode={errorCode} />
        <ErrorMessage t={t} titleKey={titleKey} messageKey={messageKey} />
        <ActionButtons navigate={navigate} t={t} isSmallScreen={isSmallScreen} />
      </Stack>
    </Box>
  );
}

ErrorPage.propTypes = {
  errorCode: PropTypes.string.isRequired,
};

function IconBadge({ iconName, iconColor }) {
  const theme = useTheme();
  const animations = createAnimations(theme);
  const badgeStyles = getIconBadgeStyles(theme, iconColor);

  return (
    <motion.div {...animations.icon}>
      <Box sx={badgeStyles}>
        <Icon name={iconName} size={80} color={iconColor} />
      </Box>
    </motion.div>
  );
}

IconBadge.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
};

function ErrorNumber({ errorCode }) {
  const theme = useTheme();
  const animations = createAnimations(theme);
  const numberStyles = getErrorNumberStyles(theme);

  return (
    <motion.div {...animations.number}>
      <Typography variant="h1" sx={numberStyles}>
        {errorCode}
      </Typography>
    </motion.div>
  );
}

ErrorNumber.propTypes = {
  errorCode: PropTypes.string.isRequired,
};

function ErrorMessage({ t, titleKey, messageKey }) {
  const theme = useTheme();
  const animations = createAnimations(theme);

  return (
    <motion.div {...animations.content} sx={{ ...margin.bottom.lg }}>
      <Message title={t(titleKey)} content={t(messageKey)} />
    </motion.div>
  );
}

ErrorMessage.propTypes = {
  t: PropTypes.func.isRequired,
  titleKey: PropTypes.string.isRequired,
  messageKey: PropTypes.string.isRequired,
};

function ActionButtons({ navigate, t, isSmallScreen }) {
  const theme = useTheme();
  const animations = createAnimations(theme);
  const stackStyles = getActionButtonsStackStyles(theme);
  const buttonStyles = getActionButtonStyles(theme);

  return (
    <motion.div {...animations.buttons} style={{ width: '100%' }}>
      <Stack direction={isSmallScreen ? 'column' : 'row'} sx={stackStyles}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate(NAVIGATION_PATHS.DASHBOARD)}
          startIcon={<Icon name="home" />}
          sx={buttonStyles}
          fullWidth={isSmallScreen}
        >
          {t('navigation.dashboard')}
        </Button>

        <BackButton
          variant="icon-text"
          size="large"
          showTooltip={false}
          sx={buttonStyles}
          fullWidth={isSmallScreen}
        />
      </Stack>
    </motion.div>
  );
}

ActionButtons.propTypes = {
  navigate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
};

export default ErrorPage;

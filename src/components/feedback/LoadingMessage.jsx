// external imports
import { memo } from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { useTranslation } from '@hooks';

/**
 * LoadingMessage Component
 *
 * Single Responsibility: Display loading message text
 *
 * @component
 */
const LoadingMessage = memo(function LoadingMessage({ message, variant = 'body2' }) {
  const { t } = useTranslation();
  const defaultMessage = t('common.loading', 'Loading...');
  const displayMessage = message || defaultMessage;

  return (
    <Typography
      variant={variant}
      color="text.secondary"
      sx={{
        fontWeight: variant === 'h6' ? 600 : 500,
        textAlign: 'center',
      }}
      aria-live="polite"
    >
      {displayMessage}
    </Typography>
  );
});

LoadingMessage.propTypes = {
  /**
   * Custom loading message
   * If not provided, uses default "Loading..." translation
   */
  message: PropTypes.string,

  /**
   * Typography variant to use
   * @default 'body2'
   */
  variant: PropTypes.oneOf(['body1', 'body2', 'h6']),
};

LoadingMessage.displayName = 'LoadingMessage';

export default LoadingMessage;


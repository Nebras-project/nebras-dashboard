// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { useTranslation } from '@hooks';
import Message from './Message';

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

    <Message message={displayMessage} variant={variant} />
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


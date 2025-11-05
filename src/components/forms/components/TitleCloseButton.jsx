// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

// internal imports
import { CloseButton } from '@components';

const getAbsoluteButtonStyles = () => ({
  position: 'absolute',
  right: 8,
  top: 8,
});

/**
 * TitleCloseButton Component
 *
 * Single Responsibility: Render close button with proper positioning
 */
const TitleCloseButton = memo(function TitleCloseButton({
  onClose,
  size = 'small',
  absolute = false,
}) {
  if (!onClose) return null;

  const button = <CloseButton onClick={onClose} size={size} />;

  if (absolute) {
    return <Box sx={getAbsoluteButtonStyles()}>{button}</Box>;
  }

  return button;
});

TitleCloseButton.propTypes = {
  onClose: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  absolute: PropTypes.bool,
};

TitleCloseButton.displayName = 'TitleCloseButton';

export default TitleCloseButton;

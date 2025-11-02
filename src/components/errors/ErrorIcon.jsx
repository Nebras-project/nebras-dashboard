// external imports
import { memo } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import Icon from '../display/Icon';
import { margin } from '@constants/spacing';

// Constants
const DEFAULT_ICON_SIZE = 48;
const DEFAULT_CONTAINER_SIZE = 80;

// Style Getters
const getIconContainerStyles = () => ({
  display: 'flex',
  justifyContent: 'center',
  ...margin.bottom.lg,
});

const getIconCircleStyles = (containerSize) => ({
  width: containerSize,
  height: containerSize,
  borderRadius: '50%',
  bgcolor: 'error.light',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ErrorIcon = memo(function ErrorIcon({
  iconSize = DEFAULT_ICON_SIZE,
  containerSize = DEFAULT_CONTAINER_SIZE,
}) {
  return (
    <Box aria-hidden="true" sx={getIconContainerStyles()}>
      <Box sx={getIconCircleStyles(containerSize)}>
        <Icon name="error" size={iconSize} color="white" />
      </Box>
    </Box>
  );
});

ErrorIcon.propTypes = {
  iconSize: PropTypes.number,
  containerSize: PropTypes.number,
};

ErrorIcon.displayName = 'ErrorIcon';

export default ErrorIcon;

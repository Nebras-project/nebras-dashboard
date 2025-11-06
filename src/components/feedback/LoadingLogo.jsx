// external imports
import { memo } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import Logo from '../display/Logo';

// Constants
const DEFAULT_LOGO_HEIGHT = 40;

// Style Getters
const getContainerBaseStyles = () => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const getPulseAnimation = () => ({
  animation: 'pulse 2s ease-in-out infinite',
  '@keyframes pulse': {
    '0%, 100%': { opacity: 0.6 },
    '50%': { opacity: 1 },
  },
});

const getScaleAnimation = () => ({
  animation: 'scaleAnimation 2s ease-in-out infinite',
  '@keyframes scaleAnimation': {
    '0%, 100%': {
      opacity: 0.7,
      transform: 'scale(1)',
    },
    '50%': {
      opacity: 1,
      transform: 'scale(1.05)',
    },
  },
});

const getAnimationStyles = (animationType) => {
  const animations = {
    pulse: getPulseAnimation(),
    scale: getScaleAnimation(),
  };
  return animations[animationType];
};

const getContainerStyles = (animationType) => ({
  ...getContainerBaseStyles(),
  ...getAnimationStyles(animationType),
});

const LoadingLogo = memo(function LoadingLogo({
  height = DEFAULT_LOGO_HEIGHT,
  animationType = 'pulse',
  mode = 'dark',
}) {
  return (
    <Box aria-hidden="true" sx={getContainerStyles(animationType)}>
      <Logo height={height} mode={mode} />
    </Box>
  );
});

LoadingLogo.propTypes = {
  /**
   * Height of the logo in pixels
   * @default 40
   */
  height: PropTypes.number,

  /**
   * Type of animation to apply
   * @default 'pulse'
   */
  animationType: PropTypes.oneOf(['pulse', 'scale']),

  /**
   * Logo mode: 'light' or 'dark'. If not provided, uses theme mode.
   */
  mode: PropTypes.oneOf(['light', 'dark']),
};

LoadingLogo.displayName = 'LoadingLogo';

export default LoadingLogo;

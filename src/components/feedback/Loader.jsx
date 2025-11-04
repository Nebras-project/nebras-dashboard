// external imports
import { memo } from 'react';
import { Box, Fade, Backdrop } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { LoadingLogo, LoadingMessage, FireLoader } from '.';
import { gap, padding } from '@constants/spacing';

// Constants
const DEFAULT_SIZE = 70;
const DEFAULT_MIN_HEIGHT = '60vh';
const FADE_TIMEOUT = 300;
const BACKDROP_BLUR = 'blur(8px)';
const DARK_BG_OPACITY = 0.9;
const LIGHT_BG_OPACITY = 0.9;

// Style Getters for Page Loader
const getPageContainerStyles = (fullScreen, minHeight) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: fullScreen ? '100vh' : minHeight,
  ...gap.lg,
  ...padding.all.lg,
});

// Style Getters for Full Screen Loader
const getBackdropStyles = () => ({
  color: '#fff',
  zIndex: (theme) => theme.zIndex.modal + 1,
  backgroundColor: (theme) =>
    theme.palette.mode === 'dark'
      ? `rgba(0, 0, 0, ${DARK_BG_OPACITY})`
      : `rgba(255, 255, 255, ${LIGHT_BG_OPACITY})`,
  backdropFilter: BACKDROP_BLUR,
  WebkitBackdropFilter: BACKDROP_BLUR,
});

const getContentContainerStyles = () => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  ...gap.lg,
});

// Shared Style Getters
const getSpinnerContainerStyles = () => ({
  position: 'relative',
  display: 'inline-flex',
});

const getLogoOverlayStyles = () => ({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Loader = memo(function Loader({
  variant = 'page',
  open = true,
  message = null,
  showLogo = true,
  minHeight = DEFAULT_MIN_HEIGHT,
  size = DEFAULT_SIZE,
  fullScreen = false,
}) {
  const isFullScreenVariant = variant === 'fullscreen';
  const effectiveSize = isFullScreenVariant ? 80 : size; // Increased for better visibility
  const animationType = isFullScreenVariant ? 'scale' : 'pulse';
  const messageVariant = isFullScreenVariant ? 'h6' : 'body2';

  // Content that's shared between both variants
  const loaderContent = (
    <Box sx={getSpinnerContainerStyles()}>
      <FireLoader size={effectiveSize} />
      {showLogo && (
        <Box sx={getLogoOverlayStyles()}>
          <LoadingLogo height={effectiveSize * 0.5} animationType={animationType} />
        </Box>
      )}
    </Box>
  );

  // Full Screen Loader
  if (isFullScreenVariant) {
    return (
      <Backdrop open={open} sx={getBackdropStyles()} onClick={(e) => e.stopPropagation()}>
        <Box role="status" aria-live="assertive" sx={getContentContainerStyles()}>
          {loaderContent}
          {(message || !showLogo) && <LoadingMessage message={message} variant={messageVariant} />}
        </Box>
      </Backdrop>
    );
  }

  // Page Loader
  return (
    <Fade in timeout={FADE_TIMEOUT}>
      <Box role="status" aria-live="polite" sx={getPageContainerStyles(fullScreen, minHeight)}>
        {loaderContent}
        {(message || !showLogo) && <LoadingMessage message={message} variant={messageVariant} />}
      </Box>
    </Fade>
  );
});

Loader.propTypes = {
  variant: PropTypes.oneOf(['page', 'fullscreen']),
  open: PropTypes.bool,
  message: PropTypes.string,
  showLogo: PropTypes.bool,
  minHeight: PropTypes.string,
  size: PropTypes.number,
  fullScreen: PropTypes.bool,
};

Loader.displayName = 'Loader';

export default Loader;

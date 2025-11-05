// external imports
import { memo } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
/**
 * CSS is imported globally in main.jsx to ensure it loads before component renders.
 *
 * Reason: Previously, styles were injected via useEffect using document.createElement('style'),
 * which caused issues in production builds (especially on Vercel). Dynamic style injection
 * can be unreliable because:
 * 1. Styles may not be injected before component renders in production
 * 2. Build tools may strip or optimize away dynamic DOM manipulation
 * 3. CSS-in-JS solutions may not handle keyframe animations correctly
 *
 * By importing CSS in main.jsx (like other global styles), Vite ensures the styles are
 * always available in both development and production environments before any component renders.
 */

// Constants
const DEFAULT_SIZE = 80; // Increased from 48 for better visibility
const BASE_SIZE = 100; // CSS animation is designed for 100px

/**
 * FireLoader Component
 *
 * Displays an animated fire loader with particle effects.
 * The animation uses CSS from FireLoader.css file which is properly bundled.
 *
 * @component
 */
const FireLoader = memo(function FireLoader({
  size = DEFAULT_SIZE,
  thickness: _thickness,
  color: _color,
}) {
  // Calculate scale factor to maintain animation proportions
  const scale = size / BASE_SIZE;

  return (
    <Box
      className="fire-loader-wrapper"
      sx={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
      }}
      aria-hidden="true"
    >
      <Box
        className="fire"
        sx={{
          position: 'relative',
          width: `${BASE_SIZE}px`,
          height: `${BASE_SIZE}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        <Box className="fire-center">
          <Box className="main-fire" />
          <Box className="particle-fire" />
        </Box>
        <Box className="fire-right">
          <Box className="main-fire" />
          <Box className="particle-fire" />
        </Box>
        <Box className="fire-left">
          <Box className="main-fire" />
          <Box className="particle-fire" />
        </Box>
        <Box className="fire-bottom">
          <Box className="main-fire" />
        </Box>
      </Box>
    </Box>
  );
});

FireLoader.propTypes = {
  /**
   * Size of the loader in pixels
   * @default 80
   */
  size: PropTypes.number,

  /**
   * Thickness of the loader (deprecated - kept for compatibility)
   * @default undefined
   */
  thickness: PropTypes.number,

  /**
   * Color of the loader (deprecated - kept for compatibility)
   * @default undefined
   */
  color: PropTypes.string,
};

FireLoader.displayName = 'FireLoader';

export default FireLoader;

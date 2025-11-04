// external imports
import { memo, useEffect } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// Constants
const DEFAULT_SIZE = 80; // Increased from 48 for better visibility
const BASE_SIZE = 100; // CSS animation is designed for 100px
const STYLE_ID = 'fire-loader-styles';

// Fire Loader Animation CSS - From Uiverse.io by Admin12121
const fireLoaderStyles = `
@keyframes fire-scaleUpDown {
  0%, 100% {
    transform: scaleY(1) scaleX(1);
  }
  50%, 90% {
    transform: scaleY(1.1);
  }
  75% {
    transform: scaleY(0.95);
  }
  80% {
    transform: scaleX(0.95);
  }
}

@keyframes fire-shake {
  0%, 100% {
    transform: skewX(0) scale(1);
  }
  50% {
    transform: skewX(5deg) scale(0.9);
  }
}

@keyframes fire-particleUp {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    top: -100%;
    transform: scale(0.5);
  }
}

@keyframes fire-glow {
  0%, 100% {
    background-color: #ef5a00;
  }
  50% {
    background-color: #ff7800;
  }
}

.fire-loader-wrapper .fire {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: transparent;
}

.fire-loader-wrapper .fire-center {
  position: absolute;
  height: 100%;
  width: 100%;
  animation: fire-scaleUpDown 3s ease-out infinite;
  animation-fill-mode: both;
}

.fire-loader-wrapper .fire-center .main-fire {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(farthest-corner at 10px 0, #d43300 0%, #ef5a00 95%);
  transform: scaleX(0.8) rotate(45deg);
  border-radius: 0 40% 60% 40%;
  filter: drop-shadow(0 0 10px #d43322);
}

.fire-loader-wrapper .fire-center .particle-fire {
  position: absolute;
  top: 60%;
  left: 45%;
  width: 10px;
  height: 10px;
  background-color: #ef5a00;
  border-radius: 50%;
  filter: drop-shadow(0 0 10px #d43322);
  animation: fire-particleUp 2s ease-out 0 infinite;
  animation-fill-mode: both;
}

.fire-loader-wrapper .fire-right {
  height: 100%;
  width: 100%;
  position: absolute;
  animation: fire-shake 2s ease-out 0 infinite;
  animation-fill-mode: both;
}

.fire-loader-wrapper .fire-right .main-fire {
  position: absolute;
  top: 15%;
  right: -25%;
  width: 80%;
  height: 80%;
  background-color: #ef5a00;
  transform: scaleX(0.8) rotate(45deg);
  border-radius: 0 40% 60% 40%;
  filter: drop-shadow(0 0 10px #d43322);
}

.fire-loader-wrapper .fire-right .particle-fire {
  position: absolute;
  top: 45%;
  left: 50%;
  width: 15px;
  height: 15px;
  background-color: #ef5a00;
  transform: scaleX(0.8) rotate(45deg);
  border-radius: 50%;
  filter: drop-shadow(0 0 10px #d43322);
  animation: fire-particleUp 2s ease-out 0 infinite;
  animation-fill-mode: both;
}

.fire-loader-wrapper .fire-left {
  position: absolute;
  height: 100%;
  width: 100%;
  animation: fire-shake 3s ease-out 0 infinite;
  animation-fill-mode: both;
}

.fire-loader-wrapper .fire-left .main-fire {
  position: absolute;
  top: 15%;
  left: -20%;
  width: 80%;
  height: 80%;
  background-color: #ef5a00;
  transform: scaleX(0.8) rotate(45deg);
  border-radius: 0 40% 60% 40%;
  filter: drop-shadow(0 0 10px #d43322);
}

.fire-loader-wrapper .fire-left .particle-fire {
  position: absolute;
  top: 10%;
  left: 20%;
  width: 10%;
  height: 10%;
  background-color: #ef5a00;
  border-radius: 50%;
  filter: drop-shadow(0 0 10px #d43322);
  animation: fire-particleUp 3s infinite ease-out 0;
  animation-fill-mode: both;
}

.fire-loader-wrapper .fire-bottom .main-fire {
  position: absolute;
  top: 30%;
  left: 20%;
  width: 75%;
  height: 75%;
  background-color: #ff7800;
  transform: scaleX(0.8) rotate(45deg);
  border-radius: 0 40% 100% 40%;
  filter: blur(10px);
  animation: fire-glow 2s ease-out 0 infinite;
  animation-fill-mode: both;
}
`;

/**
 * FireLoader Component
 *
 * Displays an animated fire loader with particle effects.
 * The animation is self-contained with injected CSS styles.
 *
 * @component
 */
const FireLoader = memo(function FireLoader({
  size = DEFAULT_SIZE,
  thickness: _thickness,
  color: _color,
}) {
  // Inject styles once when component mounts
  useEffect(() => {
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement('style');
      style.id = STYLE_ID;
      style.textContent = fireLoaderStyles;
      document.head.appendChild(style);
    }
  }, []);

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

// external imports
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { FireLoader } from '@components';
import LoadingLogo from './LoadingLogo';

// Style getters
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

/**
 * LogoWithFireLoader Component
 * Displays a logo with FireLoader animation behind it
 */
function LogoWithFireLoader({ logoHeight, fireLoaderSize }) {
  return (
    <Box sx={getSpinnerContainerStyles()}>
      <FireLoader size={fireLoaderSize} />
      <Box sx={getLogoOverlayStyles()}>
        <LoadingLogo height={logoHeight} />
      </Box>
    </Box>
  );
}

LogoWithFireLoader.propTypes = {
  /**
   * Height of the logo in pixels
   */
  logoHeight: PropTypes.number.isRequired,
  /**
   * Size of the FireLoader in pixels
   */
  fireLoaderSize: PropTypes.number.isRequired,
};

export default LogoWithFireLoader;

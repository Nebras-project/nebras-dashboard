// external imports
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

// internal imports
import NebrasLogoLight from '@data/images/Nebras Logo Light.svg';
import NebrasLogoDark from '@data/images/Nebras Logo Dark.svg';
import { useReduxTheme } from '@hooks';

const LOGO_HEIGHT = 35;

const getLogoStyles = (height) => ({
  height,
  flexShrink: 0,
});

function Logo({ height = LOGO_HEIGHT, alt = 'Nebras Logo', sx = {}, mode: modeProp }) {
  const { mode: themeMode } = useReduxTheme();

  // Use prop mode if provided, otherwise fall back to theme mode
  const mode = modeProp ?? themeMode;

  const logoSrc = useMemo(() => (mode === 'light' ? NebrasLogoDark : NebrasLogoLight), [mode]);

  return <Box component="img" src={logoSrc} alt={alt} sx={{ ...getLogoStyles(height), ...sx }} />;
}

Logo.propTypes = {
  /**
   * Height of the logo
   */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Alt text for the logo image
   */
  alt: PropTypes.string,
  /**
   * MUI sx prop for custom styling
   */
  sx: PropTypes.object,
  /**
   * Logo mode: 'light' or 'dark'. If not provided, uses theme mode.
   */
  mode: PropTypes.oneOf(['light', 'dark']),
};

export default Logo;

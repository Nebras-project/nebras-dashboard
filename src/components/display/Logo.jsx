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

function Logo({ height = LOGO_HEIGHT, alt = 'Nebras Logo', sx = {} }) {
  const { mode } = useReduxTheme();

  const logoSrc = useMemo(() => (mode === 'light' ? NebrasLogoDark : NebrasLogoLight), [mode]);

  return <Box component="img" src={logoSrc} alt={alt} sx={{ ...getLogoStyles(height), ...sx }} />;
}

Logo.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  alt: PropTypes.string,
  sx: PropTypes.object,
};

export default Logo;

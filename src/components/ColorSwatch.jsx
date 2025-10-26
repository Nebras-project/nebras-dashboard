import { Box } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * ColorSwatch Component
 * A reusable color swatch indicator
 * Used to display color samples throughout the application
 * 
 * @param {Object} props
 * @param {string} props.color - The background color to display
 * @param {number} props.size - Size of the swatch in pixels (default: 20)
 * @param {Object} props.sx - Additional MUI sx styles
 */
function ColorSwatch({ color, size = 20, sx = {} }) {
  return (
    <Box 
      sx={{ 
        width: size, 
        height: size, 
        borderRadius: 1,
        bgcolor: color,
        border: 2,
        borderColor: 'divider',
        flexShrink: 0,
        ...sx,
      }}
    />
  );
}

ColorSwatch.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number,
  sx: PropTypes.object,
};

export default ColorSwatch;


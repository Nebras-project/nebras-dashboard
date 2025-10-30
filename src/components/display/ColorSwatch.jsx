import { Box } from '@mui/material';
import PropTypes from 'prop-types';

function ColorSwatch({ color, size = 20, sx = {} }) {
  return (
    <Box 
      sx={{ 
        width: size, 
        height: size, 
        borderRadius: '50%',
        bgcolor: color,
        border: 1,
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



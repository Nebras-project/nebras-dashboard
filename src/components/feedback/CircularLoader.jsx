import { memo } from 'react';
import { CircularProgress, Box } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * CircularLoader Component
 *
 * Single Responsibility: Display a circular loading indicator for sections/components
 */
const CircularLoader = memo(function CircularLoader({ size = 40, sx = {} }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...sx,
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
});

CircularLoader.propTypes = {
  size: PropTypes.number,
  sx: PropTypes.object,
};

CircularLoader.displayName = 'CircularLoader';

export default CircularLoader;

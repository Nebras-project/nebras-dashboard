// external imports
import { memo } from 'react';
import { CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

// Constants
const DEFAULT_SIZE = 48;
const DEFAULT_THICKNESS = 3;

/**
 * LoadingSpinner Component
 *
 * Single Responsibility: Display a circular progress spinner
 *
 * @component
 */
const LoadingSpinner = memo(function LoadingSpinner({
  size = DEFAULT_SIZE,
  thickness = DEFAULT_THICKNESS,
  color = 'primary.main',
}) {
  return <CircularProgress size={size} thickness={thickness} sx={{ color }} aria-hidden="true" />;
});

LoadingSpinner.propTypes = {
  /**
   * Size of the spinner in pixels
   * @default 48
   */
  size: PropTypes.number,

  /**
   * Thickness of the spinner
   * @default 4
   */
  thickness: PropTypes.number,

  /**
   * Color of the spinner (MUI color reference)
   * @default 'primary.main'
   */
  color: PropTypes.string,
};

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;

// external imports
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';

// internal imports
import { useReduxTheme } from '@hooks';

/**
 * TypeChip Component
 *
 * Renders a chip for question types with variant based on theme mode
 * Different colors for MultipleChoice and TrueFalse
 */
export function TypeChip({ label, value }) {
  const { isDark } = useReduxTheme();

  // Assign different colors based on type value
  const getColor = () => {
    if (value === 'MultipleChoice') return 'primary';
    if (value === 'TrueFalse') return 'info';
    return 'info'; // fallback
  };

  return (
    <Chip label={label} size="small" color={getColor()} variant={isDark ? 'outlined' : 'filled'} />
  );
}

TypeChip.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

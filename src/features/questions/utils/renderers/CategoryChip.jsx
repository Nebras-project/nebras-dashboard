// external imports
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';

// internal imports
import { useReduxTheme } from '@hooks';

/**
 * CategoryChip Component
 *
 * Renders a chip for question categories with variant based on theme mode
 * Different colors for Ministerial and Enrichment
 */
export function CategoryChip({ label, value }) {
  const { isDark } = useReduxTheme();

  // Assign different colors based on category value
  const getColor = () => {
    if (value === 'Ministerial') return 'teal';
    if (value === 'Enrichment') return 'cyan';
    return 'primary'; // fallback
  };

  return (
    <Chip label={label} size="small" color={getColor()} variant={isDark ? 'outlined' : 'filled'} />
  );
}

CategoryChip.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

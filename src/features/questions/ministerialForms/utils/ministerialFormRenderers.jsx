// external imports
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';

// internal imports
import { useReduxTheme } from '@hooks';

/**
 * GradeChip Component
 *
 * Renders a chip for grade names with variant based on theme mode
 */
function GradeChip({ value }) {
  const { isDark } = useReduxTheme();

  if (!value) return null;

  return (
    <Chip label={value} size="small" color="primary" variant={isDark ? 'outlined' : 'filled'} />
  );
}

GradeChip.propTypes = {
  value: PropTypes.string,
};

/**
 * SubjectChip Component
 *
 * Renders a chip for subject names with variant based on theme mode
 */
function SubjectChip({ value }) {
  const { isDark } = useReduxTheme();

  if (!value) return null;

  return (
    <Chip label={value} size="small" color="default" variant={isDark ? 'outlined' : 'filled'} />
  );
}

SubjectChip.propTypes = {
  value: PropTypes.string,
};

/**
 * Ministerial Form Column Renderers
 *
 * Single Responsibility: Define renderer functions for ministerial form table columns
 */
const RENDERERS = {
  gradeChip:
    () =>
    ({ value }) =>
      <GradeChip value={value} />,
  subjectChip:
    () =>
    ({ value }) =>
      <SubjectChip value={value} />,
};

export default RENDERERS;

// external imports
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';

// internal imports
import { padding } from '@constants';

/**
 * FilterContent Component
 *
 * Single Responsibility: Wrapper component for filter content with consistent spacing
 * Provides standardized padding and spacing for filter menus/dropdowns
 */
function FilterContent({ children, ...stackProps }) {
  return (
    <Stack direction="column" spacing={2} sx={{ ...padding.x.md, ...padding.y.lg }} {...stackProps}>
      {children}
    </Stack>
  );
}

FilterContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterContent;

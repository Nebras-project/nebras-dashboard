// external imports
import { Box } from '@mui/material';

// internal imports
import ChoicesDropdown from '../../components/ChoicesDropdown';

/**
 * Custom renderer for Choices column that displays choices in a dropdown
 * Wraps ChoicesDropdown with centered alignment for table cell
 *
 * @param {Object} params - Renderer parameters
 * @param {Object} params.row - Row data
 * @returns {JSX.Element} ChoicesDropdown component wrapped in centered Box
 */
export const choicesRenderer = ({ row }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <ChoicesDropdown row={row} />
    </Box>
  );
};

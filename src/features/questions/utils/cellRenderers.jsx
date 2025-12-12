// external imports
import { Box, Chip } from '@mui/material';

// internal imports
import ChoicesDropdown from '../question/components/ChoicesDropdown';
import { toCamelCase } from '@utils';

/**
 * Custom renderer for Year/Form column that combines Year and FormNumber
 *
 * @param {Object} params - Renderer parameters
 * @param {Object} params.row - Row data
 * @returns {string} Formatted year/form string or '-'
 */
export const yearFormRenderer = ({ row }) => {
  const year = row.Year ?? null;
  const formNumber = row.FormNumber ?? null;

  // Handle null/undefined/empty string cases
  const yearValue = year !== null && year !== undefined && year !== '' ? String(year) : null;
  const formValue =
    formNumber !== null && formNumber !== undefined && formNumber !== ''
      ? String(formNumber)
      : null;

  if (!yearValue && !formValue) {
    return '-';
  }

  const parts = [];
  if (yearValue) parts.push(yearValue);
  if (formValue) parts.push(formValue);

  return parts.join(' / ');
};

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

/**
 * Factory function for Type column renderer that translates the type value and displays it as a Chip
 * Returns a renderer function that can be used in DataGrid columns
 *
 * @param {Function} t - Translation function
 * @returns {Function} Renderer function for DataGrid
 */
export const typeRenderer = (t) => {
  const renderType = ({ row }) => {
    if (!row.Type) return '-';
    const translationKey = `questions.types.${toCamelCase(row.Type)}`;
    const label = t(translationKey) || row.Type;

    return <Chip label={label} size="small" color="info" variant="filled" />;
  };
  return renderType;
};

/**
 * Factory function for Category column renderer that translates the category value and displays it as a Chip
 * Returns a renderer function that can be used in DataGrid columns
 *
 * @param {Function} t - Translation function
 * @returns {Function} Renderer function for DataGrid
 */
export const categoryRenderer = (t) => {
  const renderCategory = ({ row }) => {
    if (!row.Category) return '-';
    const translationKey = `questions.categories.${toCamelCase(row.Category)}`;
    const label = t(translationKey) || row.Category;

    return <Chip label={label} size="small" color="warning" variant="filled" />;
  };
  return renderCategory;
};

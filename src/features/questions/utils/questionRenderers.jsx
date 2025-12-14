// external imports
import { Box } from '@mui/material';

// internal imports
import ChoicesDropdown from '../question/components/ChoicesDropdown';
import { toCamelCase } from '@utils';
import { TypeChip, CategoryChip } from './questionChips';

/**
 * Custom renderer for Year/Form column that combines Year and FormNumber
 *
 * @param {Object} params - Renderer parameters
 * @param {Object} params.row - Row data
 * @returns {string} Formatted year/form string or '-'
 */
export const yearFormRenderer = ({ row }) => {
  const year = row.year ?? null;
  const formNumber = row.formNumber ?? null;

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
    if (!row.type) return '-';
    const translationKey = `questions.types.${toCamelCase(row.type)}`;
    const label = t(translationKey) || row.type;

    return <TypeChip label={label} value={row.type} />;
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
    if (!row.category) return '-';
    const translationKey = `questions.categories.${toCamelCase(row.category)}`;
    const label = t(translationKey) || row.category;

    return <CategoryChip label={label} value={row.category} />;
  };
  return renderCategory;
};

/**
 * Custom renderer for Year/Form column that combines Year and FormNumber
 *
 * @param {Object} params - Renderer parameters
 * @param {Object} params.row - Row data
 * @returns {string} Formatted year/form string or '-'
 */
export const yearFormRenderer = ({ row }) => {
  const formYear = row.formYear ?? null;
  const formNumber = row.formNumber ?? null;

  // Handle null/undefined/empty string cases
  const yearValue =
    formYear !== null && formYear !== undefined && formYear !== '' ? String(formYear) : null;
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

// internal imports
import { toCamelCase } from '@utils';
import { CategoryChip } from './CategoryChip';

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

// internal imports
import { toCamelCase } from '@utils';
import { TypeChip } from './TypeChip';

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

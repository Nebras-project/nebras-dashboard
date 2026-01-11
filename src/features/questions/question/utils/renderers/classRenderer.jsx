// internal imports
import { toCamelCase } from '@utils';
import { ClassChip } from './ClassChip';

/**
 * Factory function for Class column renderer that translates the class value and displays it as a Chip
 * Returns a renderer function that can be used in DataGrid columns
 *
 * @param {Function} t - Translation function
 * @returns {Function} Renderer function for DataGrid
 */
export const classRenderer = (t) => {
  const renderClass = ({ row }) => {
    if (!row.class) return '-';
    const translationKey = `questions.classes.${toCamelCase(row.class)}`;
    const label = t(translationKey) || row.class;

    return <ClassChip label={label} value={row.class} />;
  };
  return renderClass;
};

/**
 * Parse an option value from either a string/number or an object with value/label
 *
 * Single Responsibility: Normalize option data structure
 *
 * @param {string|number|Object} option - Option value (string/number) or object with value/label
 * @returns {Object} Normalized option with value and label
 */
export const parseOption = (option) => {
  if (typeof option === 'object' && option !== null) {
    return {
      value: option.value,
      label: option.label,
    };
  }
  return {
    value: option,
    label: option,
  };
};

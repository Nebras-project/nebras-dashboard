/**
 * Unit Utilities
 */

/**
 * Get unit name based on current language (supports bilingual)
 * @param {Object} unit - Unit object
 * @returns {string} Unit name in the current language
 */
export const getUnitName = (unit) => {
  return unit.name;
};

/**
 * Get unit options for select input
 * Transforms an array of units into options format { value, label }
 *
 * @param {Array} units - Array of unit objects
 * @returns {Array} Array of options with value and label
 */
export const getUnitOptions = (units = []) => {
  return units?.map((unit) => ({
    value: unit.id,
    label: getUnitName(unit),
  }));
};

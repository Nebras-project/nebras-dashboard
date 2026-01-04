/**
 * Query String Utilities
 *
 * Single Responsibility: Helper functions for working with query strings and URL parameters
 */

/**
 * Convert filter params object to query string
 * Filters out undefined, null, and empty string values
 *
 * @param {Object} filterParams - Object containing filter key-value pairs
 * @returns {string} Query string (e.g., "Year=2024&GradeId=5&SubjectId=10")
 */
export const filterParamsToQueryString = (filterParams = {}) => {
  const params = new URLSearchParams();
  Object.entries(filterParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value));
    }
  });
  return params.toString();
};

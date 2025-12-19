/**
 * Simple case utilities
 *
 * Single Responsibility:
 * - Convert backend PascalCase keys to camelCase for frontend usage.
 *
 * Assumptions:
 * - Backend sends PascalCase or already camelCase (no nested/snake_case handling needed).
 */

/**
 * Convert a single string to camelCase.
 * Handles various formats:
 * - PascalCase: "UserName" -> "userName"
 * - Space-separated: "General Admin" -> "generalAdmin"
 * - Already camelCase: "generalAdmin" -> "generalAdmin" (unchanged)
 * - Single word: "Owner" -> "owner"
 *
 * If the value is not a string, it is returned as-is.
 *
 * @param {string} str - String to convert
 * @returns {string} camelCase string
 */
export const toCamelCase = (str) => {
  if (typeof str !== 'string' || str.length === 0) return str;

  // If already camelCase (no spaces, starts with lowercase), return as-is
  if (!str.includes(' ') && str.charAt(0) === str.charAt(0).toLowerCase()) {
    return str;
  }

  // Convert space-separated or PascalCase to camelCase
  return str
    .split(/\s+/) // Split by spaces
    .map((word, index) => {
      if (index === 0) {
        // First word: lowercase
        return word.toLowerCase();
      }
      // Subsequent words: capitalize first letter, lowercase rest
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
};

/**
 * Shallow convert object keys from PascalCase to camelCase.
 * Does NOT recurse deeply – keeps it simple for typical API DTOs.
 *
 * @param {Object} obj
 * @returns {Object}
 */
export const keysToCamelCase = (obj) => {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj;

  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[toCamelCase(key)] = value;
    return acc;
  }, {});
};

/**
 * Convenience helper for normalizing API responses.
 * If the response is:
 * - an array: applies keysToCamelCase to each item
 * - an object: applies keysToCamelCase directly
 * - anything else: returns as-is
 *
 * @param {any} data
 * @returns {any}
 */
export const normalizeApiResponse = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => keysToCamelCase(item));
  }

  if (data && typeof data === 'object') {
    return keysToCamelCase(data);
  }

  return data;
};

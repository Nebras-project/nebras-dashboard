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
 * Convert a single PascalCase string to camelCase.
 * - "UserName" -> "userName"
 * - "LessonCount" -> "lessonCount"
 * If the value is not a string, it is returned as-is.
 *
 * @param {string} key
 * @returns {string}
 */
export const toCamelCase = (key) => {
  if (typeof key !== 'string' || key.length === 0) return key;
  return key.charAt(0).toLowerCase() + key.slice(1);
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

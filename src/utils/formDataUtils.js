/**
 * FormData Utilities
 *
 * Reusable utilities for creating FormData objects from entity data
 */

/**
 * Creates a FormData object from entity data, handling file uploads
 * @param {Object} data - Entity data object
 * @param {Object} options - Configuration options
 * @param {string|string[]} options.fileFields - Field name(s) that contain File objects (default: 'profileImage')
 * @param {string|string[]} options.excludeFields - Field name(s) to exclude from FormData (default: ['confirmPassword'])
 * @returns {FormData} FormData object ready for multipart/form-data requests
 *
 * @example
 * const formData = createFormData(userData, {
 *   fileFields: ['profileImage', 'avatar'],
 *   excludeFields: ['confirmPassword', 'id']
 * });
 */
export const createFormData = (data, options = {}) => {
  const { fileFields = 'profileImage', excludeFields = ['confirmPassword'] } = options;

  // Normalize to arrays for easier processing
  const fileFieldsArray = Array.isArray(fileFields) ? fileFields : [fileFields];
  const excludeFieldsArray = Array.isArray(excludeFields) ? excludeFields : [excludeFields];

  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    // Skip excluded fields
    if (excludeFieldsArray.includes(key)) {
      return;
    }

    const value = data[key];

    // Handle file fields
    if (fileFieldsArray.includes(key) && value instanceof File) {
      formData.append(key, value);
      return;
    }

    // Skip file fields that are not File objects (e.g., existing image URLs)
    if (fileFieldsArray.includes(key) && !(value instanceof File)) {
      return;
    }

    // Append all other fields
    formData.append(key, value);
  });

  return formData;
};

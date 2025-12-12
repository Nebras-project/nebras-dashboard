/**
 * File Validation Utilities
 *
 * Single Responsibility: Validate image files (type, size, format)
 */

import { ACCEPTED_IMAGE_TYPES } from '../constants';
import { bytesToMB } from './fileHelpers';

/**
 * Validates if a file is a valid image file
 * @param {File} file - File to validate
 * @param {number} maxSize - Maximum file size in bytes
 * @param {Function} t - Translation function
 * @returns {string|true} Error message if invalid, true if valid
 */
export const validateImageFile = (file, maxSize, t) => {
  if (!file) {
    return true; // Optional field
  }

  if (!(file instanceof File)) {
    return t('forms.invalidFile');
  }

  // Check file type
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return t('forms.invalidImageFormat');
  }

  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = bytesToMB(maxSize);
    return t('forms.fileSizeExceeded', { maxSize: maxSizeMB });
  }

  return true;
};

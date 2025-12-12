/**
 * useFileValidation Hook
 *
 * Single Responsibility: Provide file validation logic
 */

import { useCallback } from 'react';
import { useTranslation } from '@hooks';
import { validateImageFile } from '../utils/fileValidation';

/**
 * Hook to validate files
 * @param {number} maxSize - Maximum file size in bytes
 * @returns {Function} Validation function
 */
export const useFileValidation = (maxSize) => {
  const { t } = useTranslation();

  const validateFile = useCallback(
    (file) => {
      return validateImageFile(file, maxSize, t);
    },
    [maxSize, t]
  );

  return validateFile;
};

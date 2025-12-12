/**
 * useImagePreview Hook
 *
 * Single Responsibility: Manage image preview state and creation
 */

import { useState, useEffect, useCallback } from 'react';
import { createPreviewFromFile } from '../utils/fileHelpers';

/**
 * Hook to manage image preview
 * @param {*} formValue - Form value (File object or URL string)
 * @returns {[string|null, Function]} Preview URL and setter function
 */
export const useImagePreview = (formValue) => {
  const [preview, setPreview] = useState(null);

  // Create preview from File object
  const createPreview = useCallback((file) => {
    createPreviewFromFile(file, setPreview);
  }, []);

  // Update preview when form value changes
  useEffect(() => {
    if (formValue) {
      if (formValue instanceof File) {
        createPreview(formValue);
      } else if (typeof formValue === 'string' && formValue.trim() !== '') {
        // Existing image URL
        setPreview(formValue);
      }
    } else {
      setPreview(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue]);

  return [preview, setPreview, createPreview];
};

/**
 * useFileInput Hook
 *
 * Single Responsibility: Manage file input ref and handlers including file selection and removal
 */

import { useRef, useCallback } from 'react';
import { getFirstFile } from '../utils/fileHelpers';

/**
 * Hook to manage file input element
 * @param {Object} options - Hook options
 * @param {Function} options.validateFile - File validation function
 * @param {Function} options.setError - Function to set form error
 * @param {Function} options.clearErrors - Function to clear form errors
 * @param {Function} options.createPreview - Function to create preview from file
 * @param {Function} options.setPreview - Function to set preview state
 * @param {string} options.name - Form field name
 * @returns {Object} File input ref and handlers
 */
export const useFileInput = ({
  validateFile,
  setError,
  clearErrors,
  createPreview,
  setPreview,
  name,
}) => {
  const fileInputRef = useRef(null);
  const onChangeRef = useRef(null);

  // Handle file selection with validation
  const handleFileSelect = useCallback(
    (file) => {
      const onChange = onChangeRef.current;
      if (!onChange) return;

      if (!file) {
        onChange(null);
        setPreview(null);
        clearErrors(name);
        return;
      }

      const validation = validateFile(file);
      if (validation !== true) {
        setError(name, {
          type: 'manual',
          message: validation,
        });
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      clearErrors(name);
      onChange(file);
      createPreview(file);
    },
    [name, setError, clearErrors, validateFile, createPreview, setPreview]
  );

  const handleInputChange = useCallback(
    (e) => {
      const file = getFirstFile(e.target.files);
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleReplace = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Handle remove
  const handleRemove = useCallback(() => {
    const onChange = onChangeRef.current;
    if (onChange) {
      onChange(null);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [setPreview]);

  const clearInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  // Function to set onChange from form field
  const setOnChange = useCallback((onChange) => {
    onChangeRef.current = onChange;
  }, []);

  return {
    fileInputRef,
    handleInputChange,
    handleReplace,
    handleRemove,
    handleFileSelect,
    clearInput,
    setOnChange,
  };
};

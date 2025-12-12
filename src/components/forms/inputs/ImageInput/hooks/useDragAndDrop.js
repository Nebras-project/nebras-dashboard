/**
 * useDragAndDrop Hook
 *
 * Single Responsibility: Handle drag and drop events for file upload
 */

import { useState, useCallback } from 'react';
import { getFirstFile } from '../utils/fileHelpers';

/**
 * Hook to manage drag and drop state and handlers
 * @param {Function} onFileSelect - Callback when file is selected
 * @returns {Object} Drag state and event handlers
 */
export const useDragAndDrop = (onFileSelect) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = getFirstFile(e.dataTransfer.files);
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  return {
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  };
};

/**
 * File Helper Utilities
 *
 * Single Responsibility: Helper functions for file operations
 */

/**
 * Creates a preview URL from a File object using FileReader
 * @param {File} file - File to create preview from
 * @param {Function} onLoad - Callback when preview is ready
 */
export const createPreviewFromFile = (file, onLoad) => {
  if (!file || !(file instanceof File)) {
    onLoad(null);
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    onLoad(reader.result);
  };
  reader.onerror = () => {
    onLoad(null);
  };
  reader.readAsDataURL(file);
};

/**
 * Gets the first file from a FileList
 * @param {FileList} fileList - FileList from input or drag event
 * @returns {File|null} First file or null
 */
export const getFirstFile = (fileList) => {
  if (!fileList || fileList.length === 0) {
    return null;
  }
  return fileList[0];
};

/**
 * Converts bytes to megabytes
 * @param {number} bytes - Size in bytes
 * @returns {string} Size in MB as formatted string
 */
export const bytesToMB = (bytes) => {
  return (bytes / (1024 * 1024)).toFixed(0);
};

/**
 * Error Utilities
 *
 * Single Responsibility: Extract and format error messages from various error formats
 */

/**
 * Extract error message from error object
 * Handles various error formats:
 * - Error.message (standard JavaScript Error - after Axios interceptor processing)
 * - error.response.data.message (Axios error with response - before interceptor)
 * - error.response.data.error (Alternative error format)
 * - error.response.data.errors (Validation errors array)
 *
 * Note: Axios interceptor converts API errors to Error objects with message property.
 * This function handles both raw Axios errors and converted Error objects.
 *
 * @param {Error|Object} error - The error object
 * @returns {string|null} The error message or null if not found
 */
export const getErrorMessage = (error) => {
  if (!error) return null;

  // Check for Axios error with response (before interceptor processing)
  // This handles cases where error hasn't been processed by interceptor yet
  if (error.response?.data) {
    const data = error.response.data;

    // Try different possible message fields
    if (data.message) {
      const message = typeof data.message === 'string' ? data.message : null;
      if (message) return message;
    }

    if (data.error) {
      const errorMsg = typeof data.error === 'string' ? data.error : null;
      if (errorMsg) return errorMsg;
    }

    // Handle validation errors array
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      // Return first error message
      const firstError = data.errors[0];
      if (typeof firstError === 'string') {
        return firstError;
      }
      if (firstError?.message) {
        return firstError.message;
      }
    }
  }

  // Standard Error.message (after Axios interceptor processing)
  // The interceptor converts API errors to Error objects with message from data.message
  if (error.message && typeof error.message === 'string') {
    return error.message;
  }

  // Fallback for string errors
  if (typeof error === 'string') {
    return error;
  }

  return null;
};

/**
 * Format error message with details
 * Combines generic message with specific error details from API
 *
 * @param {string} genericMessage - Generic error message (translated)
 * @param {Error|Object} error - The error object
 * @param {Object} options - Formatting options
 * @param {boolean} options.showDetails - Whether to include error details (default: true)
 * @param {string} options.separator - Separator between generic and details (default: ': ')
 * @returns {string} Formatted error message
 */
export const formatErrorMessage = (genericMessage, error, options = {}) => {
  const { showDetails = true, separator = ' : ' } = options;

  if (!showDetails || !error) {
    return genericMessage;
  }

  const errorDetail = getErrorMessage(error);

  // Don't duplicate the message if it's the same
  if (errorDetail && errorDetail !== genericMessage && !genericMessage.includes(errorDetail)) {
    return `${genericMessage}${separator}${errorDetail}`;
  }

  return genericMessage;
};

export default {
  getErrorMessage,
  formatErrorMessage,
};

/**
 * Error Logger Utility
 *
 * Centralized error logging utility.
 * Single Responsibility: Log errors to console and external services.
 *
 * @module errorLogger
 */

import { IS_DEV } from '@config';

/**
 * Log error to console in development mode
 * @param {Error} error - The error object
 * @param {Object} errorInfo - Additional error information
 */
const logToConsole = (error, errorInfo) => {
  if (IS_DEV) {
    console.group('🔴 Error Boundary Caught Error');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Stack:', error.stack);
    console.groupEnd();
  }
};

/**
 * Log error to Sentry (when configured)
 * @param {Error} error - The error object
 * @param {Object} errorInfo - Additional error information
 */
const logToSentry = (error, errorInfo) => {
  // TODO: Implement when Sentry is configured
  // if (window.Sentry) {
  //   window.Sentry.captureException(error, {
  //     extra: errorInfo,
  //     tags: { errorBoundary: true }
  //   });
  // }
};

/**
 * Log error to LogRocket (when configured)
 * @param {Error} error - The error object
 * @param {Object} errorInfo - Additional error information
 */
const logToLogRocket = (error, errorInfo) => {
  // TODO: Implement when LogRocket is configured
  // if (window.LogRocket) {
  //   window.LogRocket.captureException(error, {
  //     extra: errorInfo
  //   });
  // }
};

/**
 * Main error logging function
 * Single Responsibility: Coordinate error logging to multiple destinations
 *
 * @param {Error} error - The error object
 * @param {Object} errorInfo - Additional error information from React
 */
export const logError = (error, errorInfo) => {
  // Log to console in development
  logToConsole(error, errorInfo);

  // Log to external services in production
  if (!IS_DEV) {
    logToSentry(error, errorInfo);
    logToLogRocket(error, errorInfo);
  }
};

/**
 * Log a custom message with error
 * @param {string} message - Custom message
 * @param {Error} error - The error object
 */
export const logErrorWithMessage = (message, error) => {
  logError(error, { customMessage: message });
};

export default {
  logError,
  logErrorWithMessage,
};


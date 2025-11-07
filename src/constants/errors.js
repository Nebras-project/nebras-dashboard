/**
 * Error Constants
 *
 * Centralized error code definitions for HTTP status codes and application errors
 */

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

// Error Page Codes
export const ERROR_CODES = {
  NOT_FOUND: '404',
  UNAUTHORIZED: '401',
  FORBIDDEN: '403',
  INTERNAL_ERROR: '500',
  BAD_GATEWAY: '502',
  SERVICE_UNAVAILABLE: '503',
};

// Error Code Configuration
export const ERROR_CONFIG = {
  [ERROR_CODES.NOT_FOUND]: {
    iconName: 'sad',
    iconColorKey: 'primary', // Maps to theme.palette.primary.main
    titleKey: 'messages.error.notFound',
    messageKey: 'common.pageNotFoundMessage',
  },
  [ERROR_CODES.UNAUTHORIZED]: {
    iconName: 'lock',
    iconColorKey: 'warning', // Maps to theme.palette.warning.main
    titleKey: 'messages.error.unauthorized',
    messageKey: 'common.unauthorizedMessage',
  },
  [ERROR_CODES.FORBIDDEN]: {
    iconName: 'lock',
    iconColorKey: 'warning', // Maps to theme.palette.warning.main
    titleKey: 'messages.error.forbidden',
    messageKey: 'common.unauthorizedMessage',
  },
  [ERROR_CODES.INTERNAL_ERROR]: {
    iconName: 'error',
    iconColorKey: 'error', // Maps to theme.palette.error.main
    titleKey: 'messages.error.serverError',
    messageKey: 'common.serverErrorMessage',
  },
  [ERROR_CODES.BAD_GATEWAY]: {
    iconName: 'error',
    iconColorKey: 'error', // Maps to theme.palette.error.main
    titleKey: 'messages.error.badGateway',
    messageKey: 'common.badGatewayMessage',
  },
  [ERROR_CODES.SERVICE_UNAVAILABLE]: {
    iconName: 'error',
    iconColorKey: 'error', // Maps to theme.palette.error.main
    titleKey: 'messages.error.serviceUnavailable',
    messageKey: 'common.serviceUnavailableMessage',
  },
};

/**
 * Get error configuration by error code
 * @param {string} errorCode - The error code
 * @returns {Object|null} Error configuration or null if not found
 */
export const getErrorConfig = (errorCode) => {
  return ERROR_CONFIG[errorCode] || null;
};

/**
 * Get icon color from theme based on error code
 * @param {Object} theme - MUI theme object
 * @param {string} errorCode - The error code
 * @returns {string} Color value from theme palette
 */
export const getErrorIconColor = (theme, errorCode) => {
  const config = getErrorConfig(errorCode);
  const colorKey = config?.iconColorKey || 'error';

  // Map color keys to theme palette paths
  const colorMap = {
    primary: theme.palette.primary.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
    info: theme.palette.info.main,
    success: theme.palette.success.main,
  };

  return colorMap[colorKey] || theme.palette.error.main;
};

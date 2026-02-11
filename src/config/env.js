/**
 * Environment Configuration
 *
 * Centralized access to environment variables with defaults
 * All env variables in Vite must be prefixed with VITE_
 *
 * @see https://vitejs.dev/guide/env-and-mode.html
 */

// Helper function to get env variable with fallback
const getEnv = (key, defaultValue = '') => {
  return import.meta.env[key] ?? defaultValue;
};

// Helper to get boolean env variable
const getBoolEnv = (key, defaultValue = false) => {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  return value === 'true' || value === true;
};

// Helper to get number env variable
const getNumberEnv = (key, defaultValue = 0) => {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

// Helper to get array of numbers env variable
const getNumberArrayEnv = (key, defaultValue = []) => {
  const value = import.meta.env[key];
  if (value === undefined || value === null) {
    return defaultValue;
  }

  if (Array.isArray(value)) {
    const parsed = value
      .map((item) => (typeof item === 'number' ? item : parseInt(item, 10)))
      .filter((item) => !Number.isNaN(item));
    return parsed.length > 0 ? parsed : defaultValue;
  }

  const parsed = String(value)
    .split(',')
    .map((item) => parseInt(item.trim(), 10))
    .filter((item) => !Number.isNaN(item));

  return parsed.length > 0 ? parsed : defaultValue;
};

// ============================================
// APPLICATION
// ============================================
export const APP_NAME = getEnv('VITE_APP_NAME', 'Nebras Dashboard');
export const APP_VERSION = getEnv('VITE_APP_VERSION', '1.0.0');
export const APP_ENV = getEnv('VITE_APP_ENV', 'development');
export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;

// ============================================
// API CONFIGURATION
// ============================================
// In development, always use relative path to leverage Vite proxy
// This avoids CORS issues. The proxy in vite.config.js will forward to the backend.
// In production, use full URL from VITE_API_URL env variable
const envApiUrl = getEnv('VITE_API_URL', '');
export const API_URL = IS_DEV
  ? '/api' // Always use relative path in dev for proxy
  : envApiUrl || 'https://admitted-compare-institutions-introduces.trycloudflare.com:8080/api'; // Use env var or default in production
export const API_TIMEOUT = getNumberEnv('VITE_API_TIMEOUT', 30000);

// ============================================
// AUTHENTICATION
// ============================================
export const AUTH_TOKEN_KEY = getEnv('VITE_AUTH_TOKEN_KEY', 'nebras_auth_token');
export const AUTH_REFRESH_TOKEN_KEY = getEnv('VITE_AUTH_REFRESH_TOKEN_KEY', 'nebras_refresh_token');
export const ACCESS_TOKEN_EXPIRY = getNumberEnv('VITE_ACCESS_TOKEN_EXPIRY', 3600);
export const REFRESH_TOKEN_EXPIRY = getNumberEnv('VITE_REFRESH_TOKEN_EXPIRY', 604800);

// ============================================
// STORAGE
// ============================================
export const STORAGE_PREFIX = getEnv('VITE_STORAGE_PREFIX', 'nebras_');

// ============================================
// FEATURES FLAGS
// ============================================
export const ENABLE_DEVTOOLS = getBoolEnv('VITE_ENABLE_DEVTOOLS', IS_DEV);
export const ENABLE_LOGGING = getBoolEnv('VITE_ENABLE_LOGGING', IS_DEV);
export const ENABLE_ANALYTICS = getBoolEnv('VITE_ENABLE_ANALYTICS', false);

// ============================================
// EXTERNAL SERVICES
// ============================================
export const ANALYTICS_ID = getEnv('VITE_ANALYTICS_ID', '');
export const SENTRY_DSN = getEnv('VITE_SENTRY_DSN', '');
export const UPLOAD_URL = getEnv('VITE_UPLOAD_URL', '');
export const MAX_FILE_SIZE = getNumberEnv('VITE_MAX_FILE_SIZE', 5242880); // 5MB

// ============================================
// UI CONFIGURATION
// ============================================
export const DEFAULT_THEME = getEnv('VITE_DEFAULT_THEME', 'dark');
export const DEFAULT_LANGUAGE = getEnv('VITE_DEFAULT_LANGUAGE', 'ar');
export const SIDEBAR_DEFAULT_COLLAPSED = getBoolEnv('VITE_SIDEBAR_DEFAULT_COLLAPSED', false);

// ============================================
// PAGINATION
// ============================================
export const DEFAULT_PAGE_SIZE = getNumberEnv('VITE_DEFAULT_PAGE_SIZE', 10);
export const MAX_PAGE_SIZE = getNumberEnv('VITE_MAX_PAGE_SIZE', 100);
export const DEFAULT_PAGE_SIZE_OPTIONS = getNumberArrayEnv(
  'VITE_DEFAULT_PAGE_SIZE_OPTIONS',
  '10,25,50,100'
);

// ============================================
// DEVELOPMENT
// ============================================
export const ENABLE_QUERY_DEVTOOLS_IN_PROD = getBoolEnv(
  'VITE_ENABLE_QUERY_DEVTOOLS_IN_PROD',
  false
);
export const ENABLE_REDUX_DEVTOOLS_IN_PROD = getBoolEnv(
  'VITE_ENABLE_REDUX_DEVTOOLS_IN_PROD',
  false
);

// ============================================
// COMPUTED VALUES
// ============================================
export const SHOW_QUERY_DEVTOOLS = IS_DEV || ENABLE_QUERY_DEVTOOLS_IN_PROD;
export const SHOW_REDUX_DEVTOOLS = IS_DEV || ENABLE_REDUX_DEVTOOLS_IN_PROD;

// Export all as an object for convenience
export const env = {
  // App
  APP_NAME,
  APP_VERSION,
  APP_ENV,
  IS_DEV,
  IS_PROD,

  // API
  API_URL,
  API_TIMEOUT,

  // Auth
  AUTH_TOKEN_KEY,
  AUTH_REFRESH_TOKEN_KEY,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,

  // Storage
  STORAGE_PREFIX,

  // Features
  ENABLE_DEVTOOLS,
  ENABLE_LOGGING,
  ENABLE_ANALYTICS,

  // External Services
  ANALYTICS_ID,
  SENTRY_DSN,
  UPLOAD_URL,
  MAX_FILE_SIZE,

  // UI
  DEFAULT_THEME,
  DEFAULT_LANGUAGE,
  SIDEBAR_DEFAULT_COLLAPSED,

  // Pagination
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_OPTIONS,

  // Development
  SHOW_QUERY_DEVTOOLS,
  SHOW_REDUX_DEVTOOLS,
};

// Log environment info in development
if (IS_DEV && ENABLE_LOGGING) {
  console.log('🔧 Environment Configuration:', {
    APP_NAME,
    APP_ENV,
    API_URL,
    DEFAULT_LANGUAGE,
    DEFAULT_THEME,
  });
}

export default env;

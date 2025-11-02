// Color utilities
export { generateColorPalette, adjustColor, generateBackgroundColor } from './colorUtils';

// Language utilities
export { getInitialLanguage, getBrowserLanguage, resolveLanguage } from './languageUtils';

// Layout utilities
export { isPublicPage } from './layoutUtils';

// Storage utilities
export { migrateLocalStorage } from './migrateLocalStorage';
export {
  setSecureToken,
  getSecureToken,
  getRefreshToken,
  clearSecureTokens,
  hasValidToken,
} from './secureStorage';

// RTL utilities
export { isRTL, getDirection, getTextAlign, getFlexDirection } from './rtl';

// Date utilities
export { dayjs, getLocalizedDayjs, formatDate, getDateSeparator } from './dateUtils';

// Error utilities
export { logError, logErrorWithMessage } from './errorLogger';
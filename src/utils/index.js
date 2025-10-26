/**
 * Utils Barrel Export
 * Central export point for all utility functions
 *
 * Usage:
 * import { lighten, darken, isPublicPage } from '@utils';
 */

// Color utilities
export {
  generateColorPalette,
  adjustColor,
  generateBackgroundColor,
} from "./colorHelpers";

// Language utilities
export { getInitialLanguage } from "./getInitialLanguage";

// Layout utilities
export { isPublicPage } from "./layoutHelpers";

// Storage utilities
export { migrateLocalStorage } from "./migrateLocalStorage";
export {
  setSecureToken,
  getSecureToken,
  getRefreshToken,
  clearSecureTokens,
  hasValidToken,
} from "./secureStorage";

// RTL utilities
export { isRTL, getDirection, getTextAlign, getFlexDirection } from "./rtl";
